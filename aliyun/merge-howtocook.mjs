// 安全合并：把 howtocook-recipes.json 按 id 去重追加到云端共享库
// 用法：node aliyun/merge-howtocook.mjs
import { readFileSync } from "node:fs";

const API = "https://recipe-api-uymdkfbhbi.cn-hangzhou.fcapp.run/recipes";
const incoming = JSON.parse(readFileSync(new URL("./howtocook-recipes.json", import.meta.url), "utf8"));

const getRes = await fetch(API, { headers: { Accept: "application/json" } });
if (!getRes.ok) throw new Error("拉取云端失败 HTTP " + getRes.status);
const cloud = await getRes.json();
const currentList = Array.isArray(cloud) ? cloud : (cloud.list || []);
console.log("云端现有:", currentList.length, "道");

const existingIds = new Set(currentList.map((r) => r.id));
const toAdd = incoming.filter((s) => !existingIds.has(s.id));
console.log("待追加:", toAdd.length, "道（已存在的跳过）");

if (toAdd.length === 0) { console.log("无需追加。"); process.exit(0); }

const merged = [...currentList, ...toAdd];
const putRes = await fetch(API, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ list: merged, updatedAt: new Date().toISOString() })
});
if (!putRes.ok) throw new Error("写回失败 HTTP " + putRes.status);

const verify = await (await fetch(API, { headers: { Accept: "application/json" } })).json();
const finalList = Array.isArray(verify) ? verify : (verify.list || []);
console.log("写回后云端总数:", finalList.length, "道");
console.log("合并完成。");
