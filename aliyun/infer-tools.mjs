// 根据菜谱步骤/菜名/描述，用规则推断所需工具，回填 tools 字段到云端
// 规则宁可少标不误标：只标证据明确的工具
// 用法：node aliyun/infer-tools.mjs [--dry]  (--dry 只预览不写云端)
const API = "https://recipe-api-uymdkfbhbi.cn-hangzhou.fcapp.run/recipes";
const DRY = process.argv.includes("--dry");

// 只推断"有区分度的设备类工具"，家家都有的案板/菜刀/碗盆不列入筛选维度
// （否则每道菜都要案刀，筛选失去意义。"器材不全"真正关心的是这些设备）
const TOOL_RULES = [
  { tool: "炒锅", kw: ["炒", "爆香", "翻炒", "煸", "热锅下油", "滑炒", "回锅"] },
  { tool: "汤锅", kw: ["煮", "炖", "焯", "汆", "熬", "煲", "沸水", "高汤", "涮"] },
  { tool: "蒸锅", kw: ["蒸", "上汽", "隔水蒸", "水开后放"] },
  { tool: "烤箱", kw: ["烤箱", "预热", "上下火", "烘烤", "180度", "200度", "180°", "200°", "烤制"] },
  { tool: "微波炉", kw: ["微波炉", "微波", "高火叮", "中火叮"] },
  { tool: "空气炸锅", kw: ["空气炸锅"] },
  { tool: "油炸锅", kw: ["油炸", "炸至", "下油锅", "复炸", "宽油", "炸到金黄", "热油"] },
  { tool: "平底锅", kw: ["平底锅", "煎", "摊", "松饼", "班戟", "煎至"] },
  { tool: "电饭煲", kw: ["电饭煲", "电饭锅", "煮饭", "焖饭"] },
  { tool: "搅拌机", kw: ["搅拌机", "破壁机", "料理机", "打成泥", "打成糊", "榨汁", "打碎"] },
  { tool: "打蛋器", kw: ["打蛋器", "打发", "搅打至", "蛋白霜", "湿性发泡", "干性发泡"] },
  { tool: "摇酒壶", kw: ["摇酒壶", "摇匀至冰凉", "调酒", "shake"] }
];

function inferTools(recipe) {
  const text = [
    recipe.name || "",
    recipe.variant || "",
    (recipe.steps || []).join(" "),
    recipe.description || ""
  ].join(" ");

  const found = new Set();
  for (const rule of TOOL_RULES) {
    if (rule.kw.some((k) => text.includes(k))) found.add(rule.tool);
  }
  return Array.from(found);
}

const getRes = await fetch(API, { headers: { Accept: "application/json" } });
if (!getRes.ok) throw new Error("拉取云端失败 HTTP " + getRes.status);
const cloud = await getRes.json();
const list = Array.isArray(cloud) ? cloud : (cloud.list || []);
console.log("云端菜谱:", list.length, "道");

let filled = 0;
const updated = list.map((r) => {
  // 已有 tools 且非空则不覆盖（尊重用户手填）
  if (Array.isArray(r.tools) && r.tools.length > 0) return r;
  const tools = inferTools(r);
  if (tools.length > 0) filled++;
  return { ...r, tools };
});

console.log(`推断出工具的菜: ${filled} / ${list.length}`);
console.log("示例前 5 道：");
updated.slice(0, 5).forEach((r) => console.log(`  ${r.name}: [${(r.tools || []).join("、")}]`));

if (DRY) { console.log("\n(--dry 预览模式，未写云端)"); process.exit(0); }

const putRes = await fetch(API, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ list: updated, updatedAt: new Date().toISOString() })
});
if (!putRes.ok) throw new Error("写回失败 HTTP " + putRes.status);
console.log("\n已回填 tools 字段到云端。");
