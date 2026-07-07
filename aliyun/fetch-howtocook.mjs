// fetch-howtocook.mjs
// 从开源项目 HowToCook (The Unlicense / 公共领域) 抓取菜谱，
// 解析为本站菜谱对象，写入本地 JSON。
// 仅本地产出，不写云端、不做 git 操作。
//
// 用法: node aliyun/fetch-howtocook.mjs

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = join(__dirname, "howtocook-recipes.json");

const REPO = "Anduin2017/HowToCook";
const BRANCH = "master";
const MAX_PER_CATEGORY = 6; // 每个分类最多抓 6 道，控制总量约 40

// 分类目录 -> 场景(occasion)映射
const CATEGORIES = [
  { dir: "breakfast", occasion: "早餐" },
  { dir: "staple", occasion: "主食" },
  { dir: "vegetable_dish", occasion: "午餐 / 晚餐" },
  { dir: "meat_dish", occasion: "午餐 / 晚餐" },
  { dir: "soup", occasion: "汤 / 晚餐" },
  { dir: "dessert", occasion: "甜点" },
  { dir: "aquatic", occasion: "午餐 / 晚餐" },
  { dir: "drink", occasion: "饮品" },
];

const UA = "recipe-fetcher (HowToCook importer)";

// ---------- 通用工具 ----------

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// 带超时的 fetch
async function fetchWithTimeout(url, opts = {}, timeoutMs = 25000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetch(url, { ...opts, signal: ctrl.signal });
  } finally {
    clearTimeout(t);
  }
}

// 抓取 JSON（GitHub contents API），带重试
async function fetchJson(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetchWithTimeout(
        url,
        { headers: { "User-Agent": UA, Accept: "application/vnd.github+json" } },
        25000
      );
      if (res.status === 403) {
        // GitHub 限流
        const reset = res.headers.get("x-ratelimit-remaining");
        throw new Error(`GitHub API 403 (rate limit? remaining=${reset})`);
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      if (i === retries - 1) throw e;
      await sleep(1200 * (i + 1));
    }
  }
}

// 抓取原始 markdown 文本：优先 jsdelivr CDN，失败回退 raw.githubusercontent，带重试
async function fetchMarkdown(path) {
  const encoded = path
    .split("/")
    .map((seg) => encodeURIComponent(seg))
    .join("/");
  const sources = [
    `https://cdn.jsdelivr.net/gh/${REPO}@${BRANCH}/${encoded}`,
    `https://raw.githubusercontent.com/${REPO}/${BRANCH}/${encoded}`,
  ];
  let lastErr;
  for (let attempt = 0; attempt < 2; attempt++) {
    for (const url of sources) {
      try {
        const res = await fetchWithTimeout(url, { headers: { "User-Agent": UA } }, 25000);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        if (text && text.trim().length > 0) return text;
        throw new Error("空内容");
      } catch (e) {
        lastErr = e;
        await sleep(600);
      }
    }
  }
  throw lastErr || new Error("抓取失败");
}

// ---------- markdown 解析 ----------

// 判断是否是无序列表项，返回去掉 bullet 的内容，否则返回 null
function listItemText(line) {
  const m = line.match(/^\s*[-*+]\s+(.*)$/);
  return m ? m[1].trim() : null;
}

// 判断是否是有序列表项(顶层，非缩进)，返回内容，否则 null
function orderedItemText(line) {
  // 顶层有序项：行首无空白 + 数字. 
  const m = line.match(/^(\d+)\.\s+(.*)$/);
  return m ? m[2].trim() : null;
}

// 从整段文本里提取 “约 X 分钟” 时间，找不到返回 ""
function extractTime(text) {
  // 常见： 约 40 分钟 / 大约 40 分钟 / 耗时 40 分钟 / 共约 17 分钟 / 40分钟
  const patterns = [
    /(?:大约|约|共约|总共约|耗时|需要|需|用时|花费)\s*([0-9]{1,3})\s*分钟/,
    /([0-9]{1,3})\s*分钟(?:就能|即可|完成|出锅|搞定)/,
  ];
  for (const re of patterns) {
    const m = text.match(re);
    if (m) return `约 ${m[1]} 分钟`;
  }
  return "";
}

// 去掉括号备注，返回 { name, note }
function splitNote(raw) {
  // 支持中文括号（）与英文括号()
  const m = raw.match(/^(.*?)[（(]([^）)]*)[）)]\s*$/);
  if (m && m[1].trim()) {
    return { name: m[1].trim(), note: m[2].trim() };
  }
  return { name: raw.trim(), note: "" };
}

// 截断到 maxLen 字（按字符）
function truncate(str, maxLen) {
  const s = str.trim();
  if (s.length <= maxLen) return s;
  return s.slice(0, maxLen);
}

// 把 markdown 切成 { title, level, lines[] } 的 section 序列（按 ## / ### 标题）
function splitSections(md) {
  const lines = md.split(/\r?\n/);
  const sections = [];
  let current = { title: "__PREAMBLE__", level: 0, lines: [] };
  for (const line of lines) {
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      sections.push(current);
      current = { title: h[2].trim(), level: h[1].length, lines: [] };
    } else {
      current.lines.push(line);
    }
  }
  sections.push(current);
  return sections;
}

// 从 markdown 解析出菜谱字段
function parseRecipe(md) {
  const sections = splitSections(md);

  // 1. 菜名：第一个 # 一级标题(level=1)，形如 "XXX的做法"
  const h1 = sections.find((s) => s.level === 1);
  if (!h1) return null;
  let name = h1.title.replace(/的做法\s*$/, "").trim();
  if (!name) return null;

  // 2. 介绍：h1 之后、下一个 ## 之前的第一段非空文字
  //    h1 section 的 lines 就是 h1 标题到下一个标题之间的内容
  const introLines = h1.lines.filter((l) => {
    const t = l.trim();
    if (!t) return false;
    if (t.startsWith("![")) return false; // 图片
    if (/^预估(烹饪难度|难度|卡路里)/.test(t)) return false;
    if (/^难度[:：]/.test(t)) return false;
    return true;
  });
  const introFull = introLines.join(" ").replace(/\s+/g, " ").trim();
  const description = truncate(introFull, 120);

  // 3. 原料：从含“原料/材料”的 section 起，收集到下一个同级(##)标题之前的
  //    所有无序列表项。跨 ### 子段（如“### 原料”），但跳过纯“工具”子段。
  const ingredients = [];
  const ingIdx = sections.findIndex((s) => /原料|材料/.test(s.title));
  if (ingIdx >= 0) {
    const ingLevel = sections[ingIdx].level;
    for (let i = ingIdx; i < sections.length; i++) {
      const sec = sections[i];
      if (i > ingIdx && sec.level <= ingLevel) break; // 到下一个同级 ## 停止
      // 跳过纯“工具”子段（标题含“工具”但不含“原料/材料”）
      if (i > ingIdx && /工具/.test(sec.title) && !/原料|材料/.test(sec.title)) continue;
      for (const line of sec.lines) {
        const item = listItemText(line);
        if (!item) continue;
        // 剥离开头方括号标记（如“[可选]”）放入 note
        let raw = item;
        let optNote = "";
        const optM = raw.match(/^\[([^\]]*)\]\s*(.*)$/);
        if (optM) {
          optNote = optM[1].trim();
          raw = optM[2].trim();
        }
        const { name: iname, note } = splitNote(raw);
        if (iname) {
          const finalNote = [optNote, note].filter(Boolean).join("；");
          ingredients.push({ name: iname, amount: "", category: "主料", note: finalNote });
        }
      }
    }
  }

  // 4. 步骤：标题为“操作”的 section 下的顶层有序列表项。
  //    该 section 内可能有 ### 子标题，splitSections 会把子标题内容切走，
  //    所以要收集“操作”标题之后、直到下一个同级(##)或更高标题之前的所有 section。
  const steps = [];
  const opIdx = sections.findIndex((s) => /^操作$/.test(s.title) || /操作/.test(s.title));
  if (opIdx >= 0) {
    const opLevel = sections[opIdx].level; // 通常 2
    for (let i = opIdx; i < sections.length; i++) {
      const sec = sections[i];
      // 跳过第一个之后：遇到同级或更高级别标题(且不是初始那个)则停止
      if (i > opIdx && sec.level <= opLevel) break;
      for (const line of sec.lines) {
        const t = orderedItemText(line);
        if (t) steps.push(t.replace(/\s+/g, " ").trim());
      }
    }
  }

  // time 只从介绍段(完整未截断)提取总烹饪时长，避免误抓正文分步时长
  return { name, description, ingredients, steps, introFull };
}

// ---------- 主流程 ----------

async function collectCategory(cat) {
  const results = [];
  const apiUrl = `https://api.github.com/repos/${REPO}/contents/dishes/${cat.dir}`;
  let entries;
  try {
    entries = await fetchJson(apiUrl);
  } catch (e) {
    console.log(`[${cat.dir}] 列表抓取失败: ${e.message}`);
    return results;
  }
  if (!Array.isArray(entries)) {
    console.log(`[${cat.dir}] 返回非数组，跳过`);
    return results;
  }

  let seq = 0;
  for (const entry of entries) {
    if (results.length >= MAX_PER_CATEGORY) break;

    // 解析目标 md 路径
    let mdPath = null;
    let dishName = null;
    if (entry.type === "file" && entry.name.endsWith(".md") && entry.name !== "README.md") {
      mdPath = entry.path;
      dishName = entry.name.replace(/\.md$/, "");
    } else if (entry.type === "dir") {
      // 进目录找同名 .md
      mdPath = `${entry.path}/${entry.name}.md`;
      dishName = entry.name;
    } else {
      continue;
    }

    try {
      const md = await fetchMarkdown(mdPath);
      const parsed = parseRecipe(md);
      if (!parsed || !parsed.name || parsed.steps.length === 0) {
        console.log(`[${cat.dir}] 跳过(解析不完整): ${dishName}`);
        continue;
      }
      seq += 1;
      const recipe = {
        id: `htc-${cat.dir}-${seq}`,
        name: parsed.name,
        image: "",
        source: "HowToCook 程序员做饭指南",
        variant: "开源指南版",
        world: "现实中的饭",
        description: parsed.description,
        cost: "",
        occasion: cat.occasion,
        time: extractTime(parsed.introFull),
        video: "",
        ingredients: parsed.ingredients,
        steps: parsed.steps,
      };
      results.push(recipe);
      console.log(
        `[${cat.dir}] OK ${recipe.id} ${recipe.name} (原料${recipe.ingredients.length}/步骤${recipe.steps.length})`
      );
    } catch (e) {
      console.log(`[${cat.dir}] 抓取失败(跳过): ${dishName} -> ${e.message}`);
    }
    await sleep(150); // 轻微限速，做个友好抓取
  }
  return results;
}

async function main() {
  console.log("开始抓取 HowToCook 菜谱...\n");
  const all = [];
  for (const cat of CATEGORIES) {
    console.log(`==== 分类: ${cat.dir} ====`);
    const list = await collectCategory(cat);
    all.push(...list);
    console.log(`---- ${cat.dir} 完成: ${list.length} 道 ----\n`);
  }

  writeFileSync(OUTPUT, JSON.stringify(all, null, 2), "utf8");
  console.log(`\n全部完成，共 ${all.length} 道菜，已写入:\n${OUTPUT}`);

  // 分类分布统计
  const dist = {};
  for (const r of all) {
    const catKey = r.id.replace(/^htc-/, "").replace(/-\d+$/, "");
    dist[catKey] = (dist[catKey] || 0) + 1;
  }
  console.log("分类分布:", JSON.stringify(dist));
}

main().catch((e) => {
  console.error("脚本异常:", e);
  process.exit(1);
});
