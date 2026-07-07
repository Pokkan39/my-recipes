// 安全合并脚本：拉取云端现有菜谱 → 按 id 去重追加示例 → 写回云端
// 用法：node aliyun/merge-samples.mjs
import { readFileSync } from "node:fs";

const API = "https://recipe-api-uymdkfbhbi.cn-hangzhou.fcapp.run/recipes";

const samples = JSON.parse(readFileSync(new URL("./sample-recipes.json", import.meta.url), "utf8"));

const getRes = await fetch(API, { headers: { Accept: "application/json" } });
if (!getRes.ok) throw new Error("拉取云端失败 HTTP " + getRes.status);
const cloud = await getRes.json();
const currentList = Array.isArray(cloud) ? cloud : (cloud.list || []);
console.log("云端现有菜谱:", currentList.length, "道");

const existingIds = new Set(currentList.map((r) => r.id));
const toAdd = samples.filter((s) => !existingIds.has(s.id));
console.log("待追加示例:", toAdd.length, "道（已存在的会跳过）");

if (toAdd.length === 0) {
  console.log("没有需要追加的示例，云端保持不变。");
  process.exit(0);
}

const merged = [...currentList, ...toAdd];

const putRes = await fetch(API, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ list: merged, updatedAt: new Date().toISOString() })
});
if (!putRes.ok) throw new Error("写回云端失败 HTTP " + putRes.status);

const verifyRes = await fetch(API, { headers: { Accept: "application/json" } });
const verify = await verifyRes.json();
const finalList = Array.isArray(verify) ? verify : (verify.list || []);
console.log("写回后云端菜谱总数:", finalList.length, "道");
console.log("合并完成。");
