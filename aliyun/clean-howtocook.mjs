// 清理 HowToCook 解析结果：把误当成食材的厨具从 ingredients 里剔除
// 只修改每道菜的 ingredients 数组，不动 name/steps 等其它字段
// 用法：node aliyun/clean-howtocook.mjs
import { readFileSync, writeFileSync } from "node:fs";

const FILE = new URL("./howtocook-recipes.json", import.meta.url);
const list = JSON.parse(readFileSync(FILE, "utf8"));

// 厨具关键词：食材名里出现这些词，判定为工具而非食材
const TOOL_WORDS = [
  "面包机", "微波炉", "烤箱", "电饭煲", "高压锅", "电压力锅", "压力锅",
  "平底锅", "炒锅", "厚底锅", "大锅", "小锅", "奶锅", "砂锅", "蒸锅", "汤锅", "沸水锅", "温水锅",
  "漏勺", "吧勺", "汤勺", "锅铲", "铲", "小刀", "菜刀", "案板", "砧板",
  "碗", "盆", "打火机", "料理机", "破壁机", "搅拌机", "厨房纸", "锡纸", "保鲜膜",
  "工具", "模具", "裱花", "电动打蛋器", "打蛋器", "筛网", "滤网", "温度计"
];

// 例外：这些即使含上面的字，也算食材，保留
const KEEP_WHITELIST = ["碗豆", "豌豆"];

function isTool(name) {
  const n = String(name || "");
  if (KEEP_WHITELIST.some((w) => n.includes(w))) return false;
  return TOOL_WORDS.some((w) => n.includes(w));
}

let removed = 0;
let touched = 0;
for (const recipe of list) {
  if (!Array.isArray(recipe.ingredients)) continue;
  const before = recipe.ingredients.length;
  recipe.ingredients = recipe.ingredients.filter((ing) => {
    if (isTool(ing.name)) { removed++; return false; }
    return true;
  });
  if (recipe.ingredients.length !== before) touched++;
}

writeFileSync(FILE, JSON.stringify(list, null, 2), "utf8");
console.log(`清理完成：剔除 ${removed} 个厨具条目，涉及 ${touched} 道菜。`);
console.log(`菜谱总数不变：${list.length} 道。`);
