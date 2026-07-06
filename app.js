const STORAGE_KEY = "my-recipe-site-data";
const APPEARANCE_KEY = "my-recipe-site-appearance";
const INGREDIENT_CATEGORIES = ["主料", "辅料", "调味料"];

// ── Firebase 配置 ──────────────────────────────────────────
// 在 Firebase 控制台创建项目后，把下方的值替换成你自己的配置。
// 替换完成前网站仍可正常使用本地存储模式。
const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyARVFPwhXBk3LCvyheHmrFzLnQ5aYd9RvE",
  authDomain:        "my-recipes-a00ac.firebaseapp.com",
  projectId:         "my-recipes-a00ac",
  storageBucket:     "my-recipes-a00ac.firebasestorage.app",
  messagingSenderId: "952405161007",
  appId:             "1:952405161007:web:a60a1b560876a21ba542da"
};
const FIRESTORE_DOC = "shared/recipes"; // 所有菜谱存在这一个文档里
// ───────────────────────────────────────────────────────────

let db = null; // Firestore 实例，初始化成功后赋值

const DEFAULT_APPEARANCE = {
  title: "我的自用食谱",
  eyebrow: "Personal Recipe Book",
  description: "记录菜名、配图、做法、视频链接、成本、适合时间和制作耗时。所有编辑内容会优先保存在当前浏览器中。",
  brandColor: "#d95f28",
  backgroundColor: "#fff8ef",
  panelRadius: 28,
  imageHeight: 280,
  listWidth: 360
};

const DEFAULT_RECIPES = [
  {
    id: "tomato-eggs",
    name: "番茄炒蛋",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=1200&q=80",
    description: "酸甜开胃、做法稳定的家常菜，适合刚开始记录食谱时作为模板。",
    source: "自用做法",
    variant: "家常快手版",
    cost: "约 10-15 元",
    occasion: "工作日晚餐 / 米饭配菜",
    time: "约 15 分钟",
    video: "https://www.bilibili.com/",
    ingredients: [
      { name: "番茄", amount: "2 个", category: "主料", note: "买红透的，酸甜味更足" },
      { name: "鸡蛋", amount: "3 个", category: "主料", note: "" },
      { name: "食用油", amount: "适量", category: "辅料", note: "" },
      { name: "盐", amount: "少许", category: "调味料", note: "" },
      { name: "白糖", amount: "少许", category: "调味料", note: "中和番茄的酸味" },
      { name: "葱花", amount: "少许", category: "辅料", note: "出锅前撒，可省略" }
    ],
    steps: [
      "鸡蛋打散，加少许盐搅匀。",
      "番茄切块，喜欢汤汁多可以去皮后再切。",
      "热锅下油，先把鸡蛋炒到凝固后盛出。",
      "锅里补少许油，放番茄炒出汁，加一点盐和糖调整味道。",
      "倒回鸡蛋翻炒均匀，出锅前撒葱花。"
    ]
  },
  {
    id: "tomato-eggs-chef-wang",
    name: "番茄炒蛋",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=1200&q=80",
    description: "偏饭店口感的番茄炒蛋，蛋更嫩、汤汁更浓，适合想做得更下饭的时候。",
    source: "王刚参考版",
    variant: "饭店下饭版",
    cost: "约 12-18 元",
    occasion: "周末正餐 / 下饭菜",
    time: "约 20 分钟",
    video: "https://www.bilibili.com/",
    ingredients: [
      { name: "番茄", amount: "2 个", category: "主料", note: "买熟透的" },
      { name: "鸡蛋", amount: "3 个", category: "主料", note: "" },
      { name: "食用油", amount: "适量", category: "辅料", note: "" },
      { name: "水淀粉", amount: "少许", category: "辅料", note: "加入蛋液让口感更嫩" },
      { name: "盐", amount: "少许", category: "调味料", note: "" },
      { name: "白糖", amount: "少许", category: "调味料", note: "" },
      { name: "生抽", amount: "少许", category: "调味料", note: "淡色酱油，提鲜用" }
    ],
    steps: [
      "鸡蛋加少许盐和水淀粉打散，让口感更嫩。",
      "番茄切块，先用中火炒出明显汤汁。",
      "鸡蛋单独滑熟后盛出，避免炒老。",
      "番茄汁里加盐、少量糖和一点生抽调味。",
      "倒回鸡蛋快速翻匀，让蛋裹上番茄汁后出锅。"
    ]
  },
  {
    id: "chicken-broccoli",
    name: "西兰花鸡胸肉",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
    description: "清爽高蛋白，适合想吃得轻一点但又需要饱腹感的时候。",
    source: "自用做法",
    variant: "清爽少油版",
    cost: "约 18-25 元",
    occasion: "健身餐 / 工作日午餐",
    time: "约 25 分钟",
    video: "https://www.bilibili.com/",
    ingredients: [
      { name: "鸡胸肉", amount: "200g", category: "主料", note: "超市冷鲜区有售，比鸡腿肉脂肪少很多" },
      { name: "西兰花", amount: "半棵", category: "主料", note: "约 200g，切小朵焯水更容易熟" },
      { name: "食用油", amount: "少量", category: "辅料", note: "" },
      { name: "淀粉", amount: "少许", category: "辅料", note: "让鸡胸肉口感嫩滑，不柴" },
      { name: "盐", amount: "少许", category: "调味料", note: "" },
      { name: "黑胡椒", amount: "少许", category: "调味料", note: "超市有整粒研磨瓶，比黑胡椒粉香" },
      { name: "生抽", amount: "少许", category: "调味料", note: "淡色酱油，提鲜用" }
    ],
    steps: [
      "鸡胸肉切片，加盐、黑胡椒和少量淀粉抓匀。",
      "西兰花切小朵，焯水 1 分钟后捞出。",
      "锅中放油，把鸡胸肉煎到两面变色。",
      "加入西兰花翻炒，按口味补盐或生抽。",
      "出锅前磨一点黑胡椒。"
    ]
  }
];

let recipes = [];
let selectedId = "";
let appearance = loadAppearance();
let helperDraft = null;
let editingIngredients = [];
let selectedDishIds = new Set();
let activeOccasionFilters = new Set();
let activeTimeFilters = new Set();
let aiChatHistory = [];
let aiDraft = null;

const recipeList = document.querySelector("#recipeList");
const recipeDetail = document.querySelector("#recipeDetail");
const recipeCount = document.querySelector("#recipeCount");
const searchInput = document.querySelector("#searchInput");
const editorPanel = document.querySelector("#editorPanel");
const editorTitle = document.querySelector("#editorTitle");
const recipeForm = document.querySelector("#recipeForm");
const deleteRecipeButton = document.querySelector("#deleteRecipeButton");
const importInput = document.querySelector("#importInput");
const customizePanel = document.querySelector("#customizePanel");
const appearanceForm = document.querySelector("#appearanceForm");
const siteTitle = document.querySelector("#siteTitle");
const siteEyebrow = document.querySelector("#siteEyebrow");
const siteDescription = document.querySelector("#siteDescription");
const draftPreview = document.querySelector("#draftPreview");
const aiPromptOutput = document.querySelector("#aiPromptOutput");
const shoppingListPanel = document.querySelector("#shoppingListPanel");
const shoppingDishPicker = document.querySelector("#shoppingDishPicker");
const shoppingIngredients = document.querySelector("#shoppingIngredients");
const ingredientRows = document.querySelector("#ingredientRows");
const ingredientParseArea = document.querySelector("#ingredientParseArea");
const ingredientPasteInput = document.querySelector("#ingredientPasteInput");
const whatToEatPanel = document.querySelector("#whatToEatPanel");
const whatToEatResult = document.querySelector("#whatToEatResult");
const occasionFilters = document.querySelector("#occasionFilters");
const timeFilters = document.querySelector("#timeFilters");
const aiChatSection = document.querySelector("#aiChatSection");
const aiChatMessages = document.querySelector("#aiChatMessages");
const aiChatInput = document.querySelector("#aiChatInput");
const aiFillFormButton = document.querySelector("#aiFillFormButton");

const helperFields = {
  videoUrl: document.querySelector("#helperVideoUrl"),
  videoTitle: document.querySelector("#helperVideoTitle"),
  source: document.querySelector("#helperSource"),
  variant: document.querySelector("#helperVariant"),
  transcript: document.querySelector("#helperTranscript")
};

const fields = {
  id: document.querySelector("#recipeId"),
  name: document.querySelector("#recipeName"),
  image: document.querySelector("#recipeImage"),
  source: document.querySelector("#recipeSource"),
  variant: document.querySelector("#recipeVariant"),
  description: document.querySelector("#recipeDescription"),
  cost: document.querySelector("#recipeCost"),
  occasion: document.querySelector("#recipeOccasion"),
  time: document.querySelector("#recipeTime"),
  video: document.querySelector("#recipeVideo"),
  steps: document.querySelector("#recipeSteps")
};

const appearanceFields = {
  title: document.querySelector("#settingTitle"),
  eyebrow: document.querySelector("#settingEyebrow"),
  description: document.querySelector("#settingDescription"),
  brandColor: document.querySelector("#settingBrandColor"),
  backgroundColor: document.querySelector("#settingBackgroundColor"),
  panelRadius: document.querySelector("#settingPanelRadius"),
  imageHeight: document.querySelector("#settingImageHeight"),
  listWidth: document.querySelector("#settingListWidth"),
  panelRadiusValue: document.querySelector("#panelRadiusValue"),
  imageHeightValue: document.querySelector("#imageHeightValue"),
  listWidthValue: document.querySelector("#listWidthValue")
};

init();

async function init() {
  applyAppearance();
  fillAppearanceForm();
  initFirebase();
  recipes = await loadRecipes();
  selectedId = recipes[0]?.id || "";
  bindEvents();
  render();
  initFloatAi();
  if (db) subscribeFirestore();
}

/** 初始化 Firebase，配置未填写时静默跳过 */
function initFirebase() {
  if (FIREBASE_CONFIG.apiKey === "YOUR_API_KEY") return;
  try {
    const app = firebase.apps.length
      ? firebase.app()
      : firebase.initializeApp(FIREBASE_CONFIG);
    db = firebase.firestore(app);
  } catch (e) {
    console.warn("Firebase 初始化失败，使用本地存储模式。", e);
    db = null;
  }
}

/** 实时监听 Firestore，有人改动时自动刷新页面 */
function subscribeFirestore() {
  const [col, doc] = FIRESTORE_DOC.split("/");
  db.collection(col).doc(doc).onSnapshot((snap) => {
    if (!snap.exists) return;
    const remote = normalizeRecipes(snap.data().list || []);
    // 只有数据真正变化时才重渲，避免自己保存后闪烁
    if (JSON.stringify(remote) === JSON.stringify(recipes)) return;
    recipes = remote;
    const stillExists = recipes.find((r) => r.id === selectedId);
    if (!stillExists) selectedId = recipes[0]?.id || "";
    render();
  }, (err) => {
    console.warn("Firestore 监听失败：", err);
  });
}

async function loadRecipes() {
  // 优先从 Firestore 加载
  if (db) {
    try {
      const [col, doc] = FIRESTORE_DOC.split("/");
      const snap = await db.collection(col).doc(doc).get();
      if (snap.exists) {
        const list = normalizeRecipes(snap.data().list || []);
        if (list.length > 0) return list;
      }
      // Firestore 里还没有数据，把默认数据写进去
      const defaults = normalizeRecipes(DEFAULT_RECIPES);
      await db.collection(col).doc(doc).set({ list: defaults });
      return defaults;
    } catch (e) {
      console.warn("Firestore 读取失败，降级到本地存储。", e);
    }
  }

  // 降级：本地 localStorage
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try { return normalizeRecipes(JSON.parse(stored)); } catch { /* 忽略 */ }
  }

  // 再降级：recipes.json
  try {
    const response = await fetch("recipes.json");
    if (response.ok) return normalizeRecipes(await response.json());
  } catch { /* 忽略 */ }

  return normalizeRecipes(DEFAULT_RECIPES);
}

async function saveToLocalStorage() {
  // 有 Firestore 时同步到云端
  if (db) {
    try {
      const [col, doc] = FIRESTORE_DOC.split("/");
      await db.collection(col).doc(doc).set({ list: recipes });
      return;
    } catch (e) {
      console.warn("Firestore 写入失败，已保存到本地。", e);
    }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
}
  document.querySelector("#customizeButton").addEventListener("click", toggleCustomizePanel);
  document.querySelector("#closeCustomizeButton").addEventListener("click", toggleCustomizePanel);
  document.querySelector("#resetAppearanceButton").addEventListener("click", resetAppearance);
  document.querySelector("#generateDraftButton").addEventListener("click", generateDraftFromHelper);
  document.querySelector("#fillDraftButton").addEventListener("click", fillDraftToForm);
  document.querySelector("#copyPromptButton").addEventListener("click", copyAiPrompt);
  document.querySelector("#videoHelperButton").addEventListener("click", openVideoHelper);
  document.querySelector("#newRecipeButton").addEventListener("click", openNewEditor);
  document.querySelector("#cancelEditButton").addEventListener("click", closeEditor);
  document.querySelector("#exportButton").addEventListener("click", exportRecipes);
  document.querySelector("#shoppingListButton").addEventListener("click", toggleShoppingListPanel);
  document.querySelector("#closeShoppingListButton").addEventListener("click", toggleShoppingListPanel);
  document.querySelector("#copyShoppingListButton").addEventListener("click", copyShoppingList);
  document.querySelector("#whatToEatButton").addEventListener("click", toggleWhatToEatPanel);
  document.querySelector("#closeWhatToEatButton").addEventListener("click", toggleWhatToEatPanel);
  document.querySelector("#randomPickButton").addEventListener("click", randomPickRecipe);
  document.querySelector("#clearFiltersButton").addEventListener("click", clearWhatToEatFilters);
  document.querySelector("#addIngredientButton").addEventListener("click", addIngredientRow);
  document.querySelector("#parseIngredientsButton").addEventListener("click", toggleParseArea);
  document.querySelector("#confirmParseButton").addEventListener("click", confirmParseIngredients);
  document.querySelector("#aiAssistButton").addEventListener("click", toggleAiChat);
  document.querySelector("#closeAiChatButton").addEventListener("click", toggleAiChat);
  document.querySelector("#saveAiConfigButton").addEventListener("click", saveAiConfig);
  document.querySelector("#aiStartButton").addEventListener("click", aiStartConversation);
  document.querySelector("#aiSendButton").addEventListener("click", aiSendMessage);
  document.querySelector("#aiFillFormButton").addEventListener("click", aiFillForm);
  document.querySelector("#aiChatInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); aiSendMessage(); }
  });
  appearanceForm.addEventListener("input", updateAppearanceFromForm);
  appearanceForm.addEventListener("submit", (event) => event.preventDefault());
  searchInput.addEventListener("input", renderList);
  recipeForm.addEventListener("submit", saveRecipe);
  deleteRecipeButton.addEventListener("click", deleteCurrentRecipe);
  importInput.addEventListener("change", importRecipes);
}

const AI_CONFIG_KEY = "my-recipe-ai-config";
const AI_SYSTEM_PROMPT = `你是一个菜谱记录助手。你的任务是通过逐步问答，帮用户填写一道菜的完整菜谱信息。

需要收集的字段：
1. 菜名
2. 厨师/来源（谁教的，或自创）
3. 做法版本/特点（如：家常版、少油版、饭店版）
4. 菜品介绍（一两句话描述口味和特点）
5. 食材清单（每条包含：名称、用量、分类：主料/辅料/调味料、小白备注）
6. 大概成本
7. 适合什么时候吃（早餐/午餐/晚餐/宵夜/健身餐等）
8. 大概耗时
9. 教学视频链接（如有）
10. 具体做法步骤（每步一行，选填，有视频可不填）

规则：
- 每次只问 1-2 个问题，不要一次全问。
- 如果用户直接粘贴了视频字幕或大段描述，直接从中提取所有能提取的字段，然后询问缺少的部分。
- 当你认为信息已足够完整时，输出一个 JSON 代码块，格式严格如下（不要输出其他格式）：

\`\`\`json
{
  "name": "菜名",
  "source": "来源",
  "variant": "版本",
  "description": "介绍",
  "ingredients": [
    { "name": "食材名", "amount": "用量", "category": "主料", "note": "备注" }
  ],
  "cost": "约 XX 元",
  "occasion": "适合时间",
  "time": "约 XX 分钟",
  "video": "",
  "steps": ["步骤1", "步骤2"]
}
\`\`\`

- 输出 JSON 后，在 JSON 下方说一句：「菜谱信息已整理好，点击"一键填入表单"即可保存。」`;

function loadAiConfig() {
  try {
    return JSON.parse(localStorage.getItem(AI_CONFIG_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveAiConfig() {
  const key = document.querySelector("#aiApiKey").value.trim();
  const baseUrl = document.querySelector("#aiBaseUrl").value.trim();
  const model = document.querySelector("#aiModel").value.trim();
  if (!key) { alert("请填写 API Key。"); return; }
  localStorage.setItem(AI_CONFIG_KEY, JSON.stringify({ key, baseUrl, model }));
  alert("配置已保存。");
}

function fillAiConfigForm() {
  const cfg = loadAiConfig();
  if (cfg.key) document.querySelector("#aiApiKey").value = cfg.key;
  if (cfg.baseUrl) document.querySelector("#aiBaseUrl").value = cfg.baseUrl;
  if (cfg.model) document.querySelector("#aiModel").value = cfg.model;
}

function toggleAiChat() {
  const isHidden = aiChatSection.style.display === "none";
  aiChatSection.style.display = isHidden ? "block" : "none";
  if (isHidden) {
    fillAiConfigForm();
    if (aiChatHistory.length === 0) aiStartConversation();
    aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
  }
}

function aiStartConversation() {
  aiChatHistory = [];
  aiDraft = null;
  aiFillFormButton.style.display = "none";
  aiChatMessages.innerHTML = "";
  aiAppendMessage("assistant", "你好！我来帮你记录菜谱。\n\n先告诉我：这道菜叫什么名字？或者直接把视频字幕 / 菜谱文字粘贴过来，我帮你整理。");
}

function aiAppendMessage(role, content) {
  const div = document.createElement("div");
  div.className = `ai-message ai-message-${role}`;

  // 检测 JSON 代码块并高亮
  const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[1]);
      aiDraft = parsed;
      aiFillFormButton.style.display = "inline-flex";
    } catch { /* JSON 解析失败则忽略 */ }
  }

  // 简单 Markdown：换行、粗体、代码块
  div.innerHTML = escapeHtml(content)
    .replace(/```json\n([\s\S]*?)\n```/g, '<pre class="ai-code-block">$1</pre>')
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br>");

  aiChatMessages.appendChild(div);
  aiChatMessages.scrollTop = aiChatMessages.scrollHeight;

  if (role !== "assistant") return;
  aiChatHistory.push({ role, content });
}

async function aiSendMessage() {
  const text = aiChatInput.value.trim();
  if (!text) return;

  const cfg = loadAiConfig();
  if (!cfg.key) {
    alert("请先填写 API Key 并保存配置。");
    return;
  }

  aiChatInput.value = "";
  aiAppendMessage("user", text);
  aiChatHistory.push({ role: "user", content: text });

  const sendBtn = document.querySelector("#aiSendButton");
  sendBtn.disabled = true;
  sendBtn.textContent = "发送中…";

  const thinkingDiv = document.createElement("div");
  thinkingDiv.className = "ai-message ai-message-assistant ai-thinking";
  thinkingDiv.textContent = "AI 正在思考…";
  aiChatMessages.appendChild(thinkingDiv);
  aiChatMessages.scrollTop = aiChatMessages.scrollHeight;

  try {
    const baseUrl = (cfg.baseUrl || "https://api.openai.com/v1").replace(/\/$/, "");
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cfg.key}`
      },
      body: JSON.stringify({
        model: cfg.model || "gpt-4o",
        messages: [
          { role: "system", content: AI_SYSTEM_PROMPT },
          ...aiChatHistory
        ],
        temperature: 0.4
      })
    });

    thinkingDiv.remove();

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      const msg = err?.error?.message || `HTTP ${response.status}`;
      aiAppendMessage("assistant", `⚠️ 请求失败：${msg}\n\n请检查 API Key 和接口地址是否正确。`);
      return;
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "（AI 无回复）";
    aiAppendMessage("assistant", reply);

  } catch (error) {
    thinkingDiv.remove();
    aiAppendMessage("assistant", `⚠️ 网络错误：${error.message}\n\n请检查接口地址是否可访问。`);
  } finally {
    sendBtn.disabled = false;
    sendBtn.textContent = "发送";
  }
}

function aiFillForm() {
  if (!aiDraft) return;
  const d = aiDraft;

  fields.id.value = "";
  editorTitle.textContent = "新增菜谱";
  deleteRecipeButton.style.display = "none";
  fields.name.value = d.name || "";
  fields.source.value = d.source || "";
  fields.variant.value = d.variant || "";
  fields.image.value = d.image || "";
  fields.description.value = d.description || "";
  fields.cost.value = d.cost || "";
  fields.occasion.value = d.occasion || "";
  fields.time.value = d.time || "";
  fields.video.value = d.video || "";
  fields.steps.value = Array.isArray(d.steps) ? d.steps.join("\n") : (d.steps || "");

  resetIngredientEditor(
    Array.isArray(d.ingredients)
      ? d.ingredients.map((ing) => ({
          name: String(ing.name || ""),
          amount: String(ing.amount || ""),
          category: INGREDIENT_CATEGORIES.includes(ing.category) ? ing.category : "主料",
          note: String(ing.note || "")
        }))
      : []
  );

  aiChatSection.style.display = "none";
  fields.name.focus();
  alert("AI 整理的菜谱已填入表单，检查一下再保存。");
}

function toggleWhatToEatPanel() {
  const isOpen = whatToEatPanel.classList.toggle("is-open");
  if (isOpen) renderWhatToEatPanel();
}

function renderWhatToEatPanel() {
  const occasions = new Set();
  const times = new Set();
  recipes.forEach((r) => {
    if (r.occasion) r.occasion.split(/[/／、]/).forEach((s) => { const t = s.trim(); if (t) occasions.add(t); });
    if (r.time) times.add(r.time.trim());
  });

  const occasionList = [...occasions];
  const timeList = [...times];

  function toggleOccasion(val) {
    activeOccasionFilters.has(val) ? activeOccasionFilters.delete(val) : activeOccasionFilters.add(val);
    renderFilterChips(occasionFilters, occasionList, activeOccasionFilters, toggleOccasion);
    renderWhatToEatResult();
  }

  function toggleTime(val) {
    activeTimeFilters.has(val) ? activeTimeFilters.delete(val) : activeTimeFilters.add(val);
    renderFilterChips(timeFilters, timeList, activeTimeFilters, toggleTime);
    renderWhatToEatResult();
  }

  renderFilterChips(occasionFilters, occasionList, activeOccasionFilters, toggleOccasion);
  renderFilterChips(timeFilters, timeList, activeTimeFilters, toggleTime);
  renderWhatToEatResult();
}

function renderFilterChips(container, values, activeSet, onToggle) {
  container.innerHTML = "";
  if (values.length === 0) {
    container.innerHTML = '<span class="filter-empty">（暂无数据）</span>';
    return;
  }
  values.forEach((val) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `filter-chip${activeSet.has(val) ? " is-active" : ""}`;
    btn.textContent = val;
    btn.addEventListener("click", () => onToggle(val));
    container.appendChild(btn);
  });
}

function getFilteredRecipes() {
  return recipes.filter((r) => {
    const occasionMatch = activeOccasionFilters.size === 0
      || [...activeOccasionFilters].some((f) => r.occasion && r.occasion.includes(f));
    const timeMatch = activeTimeFilters.size === 0
      || [...activeTimeFilters].some((f) => r.time && r.time.includes(f));
    return occasionMatch && timeMatch;
  });
}

function renderWhatToEatResult() {
  const filtered = getFilteredRecipes();
  const groups = getRecipeGroups(filtered);
  if (groups.length === 0) {
    whatToEatResult.innerHTML = '<p class="what-to-eat-empty">没有符合条件的菜，换个筛选试试。</p>';
    return;
  }
  whatToEatResult.innerHTML = `
    <p class="what-to-eat-count">符合条件：<strong>${groups.length} 道菜</strong>（${filtered.length} 个做法）</p>
    <div class="what-to-eat-grid">
      ${groups.map((g) => `
        <button class="what-to-eat-card" type="button" data-id="${escapeAttr(g.recipes[0].id)}">
          <span class="wtec-name">${escapeHtml(g.name)}</span>
          <span class="wtec-meta">${escapeHtml(g.recipes[0].occasion || "")} · ${escapeHtml(g.recipes[0].time || "")}</span>
        </button>
      `).join("")}
    </div>
  `;
  whatToEatResult.querySelectorAll(".what-to-eat-card").forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedId = btn.dataset.id;
      whatToEatPanel.classList.remove("is-open");
      render();
      document.querySelector("#recipeDetail").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function randomPickRecipe() {
  const filtered = getFilteredRecipes();
  if (filtered.length === 0) {
    alert("没有符合条件的菜，换个筛选试试。");
    return;
  }
  const picked = filtered[Math.floor(Math.random() * filtered.length)];

  whatToEatResult.innerHTML = `
    <div class="random-result">
      <p class="random-result-label">今天就吃——</p>
      <p class="random-result-name">${escapeHtml(picked.name)}</p>
      <p class="random-result-meta">${escapeHtml(picked.source)} · ${escapeHtml(picked.variant)}</p>
      <p class="random-result-info">${escapeHtml(picked.occasion || "")} · ${escapeHtml(picked.time || "")} · ${escapeHtml(picked.cost || "")}</p>
      <div class="random-result-actions">
        <button class="primary-button" type="button" id="goToPickedButton">查看做法</button>
        <button class="secondary-button" type="button" id="rerollButton">换一个</button>
      </div>
    </div>
  `;
  document.querySelector("#goToPickedButton").addEventListener("click", () => {
    selectedId = picked.id;
    whatToEatPanel.classList.remove("is-open");
    render();
    document.querySelector("#recipeDetail").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  document.querySelector("#rerollButton").addEventListener("click", randomPickRecipe);
}

function clearWhatToEatFilters() {
  activeOccasionFilters.clear();
  activeTimeFilters.clear();
  renderWhatToEatPanel();
}

function toggleShoppingListPanel() {
  const isOpen = shoppingListPanel.classList.toggle("is-open");
  if (isOpen) renderShoppingListPanel();
}

function renderShoppingListPanel() {
  const uniqueDishes = getRecipeGroups(recipes);

  shoppingDishPicker.innerHTML = `
    <p class="shopping-picker-label">选择今天要做的菜：</p>
    <div class="shopping-dish-grid">
      ${uniqueDishes.map((group) => {
        const representativeId = group.recipes[0].id;
        const isSelected = group.recipes.some((r) => selectedDishIds.has(r.id));
        return `
          <button class="shopping-dish-chip${isSelected ? " is-selected" : ""}" type="button" data-dish="${escapeAttr(group.name)}">
            ${escapeHtml(group.name)}
          </button>
        `;
      }).join("")}
    </div>
  `;

  shoppingDishPicker.querySelectorAll(".shopping-dish-chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      const dishName = btn.dataset.dish;
      const dishRecipes = recipes.filter((r) => r.name.trim().toLowerCase() === dishName.trim().toLowerCase());
      const anySelected = dishRecipes.some((r) => selectedDishIds.has(r.id));
      dishRecipes.forEach((r) => {
        if (anySelected) {
          selectedDishIds.delete(r.id);
        } else {
          selectedDishIds.add(r.id);
        }
      });
      renderShoppingListPanel();
    });
  });

  renderShoppingIngredients();
}

function renderShoppingIngredients() {
  const selected = recipes.filter((r) => selectedDishIds.has(r.id));

  if (selected.length === 0) {
    shoppingIngredients.innerHTML = '<p class="shopping-empty">还没有选菜，勾选上方菜名后会自动汇总食材。</p>';
    return;
  }

  // 合并同名食材（按 name 去重，amount 合并显示）
  const merged = new Map();
  selected.forEach((recipe) => {
    (recipe.ingredients || []).forEach((ing) => {
      const key = ing.name.trim();
      if (!merged.has(key)) {
        merged.set(key, {
          name: ing.name,
          amounts: [],
          category: ing.category || "主料",
          note: ing.note || "",
          sources: []
        });
      }
      const entry = merged.get(key);
      entry.amounts.push(`${ing.amount}（${recipe.name} ${recipe.variant}）`);
      if (!entry.sources.includes(recipe.name)) entry.sources.push(recipe.name);
    });
  });

  // 按分类分组
  const byCategory = {};
  INGREDIENT_CATEGORIES.forEach((cat) => { byCategory[cat] = []; });
  merged.forEach((ing) => {
    const cat = INGREDIENT_CATEGORIES.includes(ing.category) ? ing.category : "主料";
    byCategory[cat].push(ing);
  });

  let html = "";
  INGREDIENT_CATEGORIES.forEach((cat) => {
    const items = byCategory[cat];
    if (items.length === 0) return;
    html += `<div class="shopping-category"><h4>${escapeHtml(cat)}</h4><ul class="shopping-item-list">`;
    items.forEach((ing) => {
      const amountStr = ing.amounts.length === 1
        ? ing.amounts[0].replace(/（.*）/, "").trim()
        : ing.amounts.join(" / ");
      html += `
        <li class="shopping-item">
          <label>
            <input type="checkbox" class="shopping-check">
            <span class="shopping-item-name">${escapeHtml(ing.name)}</span>
            <span class="shopping-item-amount">${escapeHtml(amountStr)}</span>
            ${ing.note ? `<span class="shopping-item-note">${escapeHtml(ing.note)}</span>` : ""}
          </label>
        </li>
      `;
    });
    html += `</ul></div>`;
  });

  shoppingIngredients.innerHTML = html;
}

async function copyShoppingList() {
  const selected = recipes.filter((r) => selectedDishIds.has(r.id));
  if (selected.length === 0) {
    alert("还没有选菜，请先勾选今天要做的菜。");
    return;
  }

  const dishNames = [...new Set(selected.map((r) => r.name))].join("、");
  const lines = [`今日菜单：${dishNames}`, ""];

  const merged = new Map();
  selected.forEach((recipe) => {
    (recipe.ingredients || []).forEach((ing) => {
      const key = ing.name.trim();
      if (!merged.has(key)) {
        merged.set(key, { name: ing.name, amount: ing.amount, category: ing.category || "主料", note: ing.note || "" });
      }
    });
  });

  INGREDIENT_CATEGORIES.forEach((cat) => {
    const items = [...merged.values()].filter((ing) => (INGREDIENT_CATEGORIES.includes(ing.category) ? ing.category : "主料") === cat);
    if (items.length === 0) return;
    lines.push(`【${cat}】`);
    items.forEach((ing) => {
      lines.push(`□ ${ing.name} ${ing.amount}${ing.note ? `（${ing.note}）` : ""}`);
    });
    lines.push("");
  });

  const text = lines.join("\n");
  try {
    await navigator.clipboard.writeText(text);
    alert("购物清单已复制，可直接粘贴给微信或备忘录。");
  } catch {
    alert("复制失败，请手动截图或抄写。");
  }
}

function toggleCustomizePanel() {
  customizePanel.classList.toggle("is-open");
}

function toggleParseArea() {
  const isHidden = ingredientParseArea.style.display === "none";
  ingredientParseArea.style.display = isHidden ? "grid" : "none";
  if (isHidden) ingredientPasteInput.focus();
}

function confirmParseIngredients() {
  const text = ingredientPasteInput.value.trim();
  if (!text) return;
  const parsed = parseIngredientsText(text);
  editingIngredients = [...editingIngredients, ...parsed];
  ingredientPasteInput.value = "";
  ingredientParseArea.style.display = "none";
  renderIngredientRows();
}

function parseIngredientsText(text) {
  // 支持换行或顿号/逗号分隔，每条解析出 name + amount + note
  const rawItems = text.includes("\n")
    ? text.split("\n")
    : text.split(/[，,、；;]+/);

  return rawItems
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      // 括号内内容作为 note
      const noteMatch = item.match(/[（(]([^）)]+)[）)]/);
      const note = noteMatch ? noteMatch[1].trim() : "";
      const cleaned = item.replace(/[（(][^）)]*[）)]/g, "").trim();
      // 名称+用量：以第一个数字或空格分割
      const parts = cleaned.match(/^([^\d\s]+)\s*(.*)$/);
      const name = parts ? parts[1].trim() : cleaned;
      const amount = parts ? parts[2].trim() : "";
      return { name, amount, category: "主料", note };
    })
    .filter((ing) => ing.name.length > 0);
}

function addIngredientRow(ingredient) {
  const ing = ingredient && typeof ingredient === "object"
    ? ingredient
    : { name: "", amount: "", category: "主料", note: "" };
  editingIngredients.push(ing);
  renderIngredientRows();
}

function renderIngredientRows() {
  ingredientRows.innerHTML = "";
  if (editingIngredients.length === 0) {
    ingredientRows.innerHTML = '<p class="ingredient-empty">还没有食材，点击"逐条添加"或"粘贴解析"。</p>';
    return;
  }

  editingIngredients.forEach((ing, index) => {
    const row = document.createElement("div");
    row.className = "ingredient-row";
    row.innerHTML = `
      <input class="ing-name" type="text" placeholder="食材名" value="${escapeAttr(ing.name)}">
      <input class="ing-amount" type="text" placeholder="用量" value="${escapeAttr(ing.amount)}">
      <select class="ing-category">
        ${INGREDIENT_CATEGORIES.map((cat) => `<option value="${cat}"${ing.category === cat ? " selected" : ""}>${cat}</option>`).join("")}
      </select>
      <input class="ing-note" type="text" placeholder="小白备注（选填）" value="${escapeAttr(ing.note)}">
      <button class="ing-remove text-button" type="button" data-index="${index}" aria-label="删除">✕</button>
    `;
    row.querySelector(".ing-name").addEventListener("input", (e) => { editingIngredients[index].name = e.target.value; });
    row.querySelector(".ing-amount").addEventListener("input", (e) => { editingIngredients[index].amount = e.target.value; });
    row.querySelector(".ing-category").addEventListener("change", (e) => { editingIngredients[index].category = e.target.value; });
    row.querySelector(".ing-note").addEventListener("input", (e) => { editingIngredients[index].note = e.target.value; });
    row.querySelector(".ing-remove").addEventListener("click", () => {
      editingIngredients.splice(index, 1);
      renderIngredientRows();
    });
    ingredientRows.appendChild(row);
  });
}

function openVideoHelper() {
  editorPanel.classList.add("is-open");
  editorTitle.textContent = "新增菜谱";
  deleteRecipeButton.style.display = "none";
  document.querySelector("#videoHelperTitle").scrollIntoView({ behavior: "smooth", block: "start" });
  helperFields.videoUrl.focus();
}

function resetIngredientEditor(ingredients) {
  editingIngredients = ingredients ? ingredients.map((ing) => ({ ...ing })) : [];
  ingredientParseArea.style.display = "none";
  if (ingredientPasteInput) ingredientPasteInput.value = "";
  renderIngredientRows();
}

function fillAppearanceForm() {
  appearanceFields.title.value = appearance.title;
  appearanceFields.eyebrow.value = appearance.eyebrow;
  appearanceFields.description.value = appearance.description;
  appearanceFields.brandColor.value = appearance.brandColor;
  appearanceFields.backgroundColor.value = appearance.backgroundColor;
  appearanceFields.panelRadius.value = appearance.panelRadius;
  appearanceFields.imageHeight.value = appearance.imageHeight;
  appearanceFields.listWidth.value = appearance.listWidth;
  updateAppearanceRangeText();
}

function updateAppearanceFromForm() {
  appearance = normalizeAppearance({
    title: appearanceFields.title.value,
    eyebrow: appearanceFields.eyebrow.value,
    description: appearanceFields.description.value,
    brandColor: appearanceFields.brandColor.value,
    backgroundColor: appearanceFields.backgroundColor.value,
    panelRadius: appearanceFields.panelRadius.value,
    imageHeight: appearanceFields.imageHeight.value,
    listWidth: appearanceFields.listWidth.value
  });
  saveAppearance();
  applyAppearance();
  updateAppearanceRangeText();
}

function applyAppearance() {
  siteTitle.textContent = appearance.title;
  siteEyebrow.textContent = appearance.eyebrow;
  siteDescription.textContent = appearance.description;
  document.title = appearance.title;
  document.documentElement.style.setProperty("--brand", appearance.brandColor);
  document.documentElement.style.setProperty("--brand-dark", darkenHexColor(appearance.brandColor, 0.24));
  document.documentElement.style.setProperty("--soft", mixHexColor(appearance.brandColor, "#ffffff", 0.86));
  document.documentElement.style.setProperty("--page-bg", appearance.backgroundColor);
  document.documentElement.style.setProperty("--panel-radius", `${appearance.panelRadius}px`);
  document.documentElement.style.setProperty("--image-height", `${appearance.imageHeight}px`);
  document.documentElement.style.setProperty("--list-width", `${appearance.listWidth}px`);
}

function updateAppearanceRangeText() {
  appearanceFields.panelRadiusValue.textContent = appearance.panelRadius;
  appearanceFields.imageHeightValue.textContent = appearance.imageHeight;
  appearanceFields.listWidthValue.textContent = appearance.listWidth;
}

function resetAppearance() {
  if (!confirm("确定恢复默认外观吗？菜谱内容不会被删除。")) return;
  appearance = { ...DEFAULT_APPEARANCE };
  saveAppearance();
  applyAppearance();
  fillAppearanceForm();
}

function loadAppearance() {
  const stored = localStorage.getItem(APPEARANCE_KEY);
  if (!stored) return { ...DEFAULT_APPEARANCE };

  try {
    return normalizeAppearance(JSON.parse(stored));
  } catch (error) {
    return { ...DEFAULT_APPEARANCE };
  }
}

function saveAppearance() {
  localStorage.setItem(APPEARANCE_KEY, JSON.stringify(appearance));
}

function normalizeAppearance(rawAppearance) {
  const source = rawAppearance && typeof rawAppearance === "object" ? rawAppearance : {};
  return {
    title: String(source.title || DEFAULT_APPEARANCE.title),
    eyebrow: String(source.eyebrow || DEFAULT_APPEARANCE.eyebrow),
    description: String(source.description || DEFAULT_APPEARANCE.description),
    brandColor: normalizeHexColor(source.brandColor, DEFAULT_APPEARANCE.brandColor),
    backgroundColor: normalizeHexColor(source.backgroundColor, DEFAULT_APPEARANCE.backgroundColor),
    panelRadius: clampNumber(source.panelRadius, 8, 40, DEFAULT_APPEARANCE.panelRadius),
    imageHeight: clampNumber(source.imageHeight, 160, 440, DEFAULT_APPEARANCE.imageHeight),
    listWidth: clampNumber(source.listWidth, 260, 480, DEFAULT_APPEARANCE.listWidth)
  };
}

function render() {
  renderList();
  renderDetail();
}

function generateDraftFromHelper() {
  const transcript = helperFields.transcript.value.trim();
  const title = helperFields.videoTitle.value.trim();

  if (!transcript && !title) {
    alert("请先粘贴视频标题或视频文案/字幕。");
    return;
  }

  const steps = extractSteps(transcript);
  helperDraft = {
    name: guessRecipeName(title, transcript),
    source: helperFields.source.value.trim() || "视频教学",
    variant: helperFields.variant.value.trim() || "视频总结版",
    image: "",
    description: guessDescription(title, transcript),
    cost: guessCost(transcript),
    occasion: guessOccasion(transcript),
    time: guessTime(transcript),
    video: helperFields.videoUrl.value.trim(),
    steps
  };

  renderDraftPreview();
}

function renderDraftPreview() {
  if (!helperDraft) {
    draftPreview.textContent = "还没有生成草稿。粘贴文字后点击“生成菜谱草稿”。";
    return;
  }

  draftPreview.innerHTML = `
    <h4>菜谱草稿预览</h4>
    <dl>
      <dt>菜名</dt><dd>${escapeHtml(helperDraft.name)}</dd>
      <dt>厨师/来源</dt><dd>${escapeHtml(helperDraft.source)}</dd>
      <dt>做法版本</dt><dd>${escapeHtml(helperDraft.variant)}</dd>
      <dt>大概成本</dt><dd>${escapeHtml(helperDraft.cost)}</dd>
      <dt>适合时间</dt><dd>${escapeHtml(helperDraft.occasion)}</dd>
      <dt>大概耗时</dt><dd>${escapeHtml(helperDraft.time)}</dd>
      <dt>做法步骤</dt><dd>${helperDraft.steps.map((step) => escapeHtml(step)).join("<br>")}</dd>
    </dl>
    <p>这是本地整理出的草稿，保存前建议你按实际情况再检查成本、耗时和步骤。</p>
  `;
}

function fillDraftToForm() {
  if (!helperDraft) {
    generateDraftFromHelper();
  }
  if (!helperDraft) return;

  fields.id.value = "";
  editorTitle.textContent = "新增菜谱";
  deleteRecipeButton.style.display = "none";
  fields.name.value = helperDraft.name;
  fields.source.value = helperDraft.source;
  fields.variant.value = helperDraft.variant;
  fields.image.value = helperDraft.image;
  fields.description.value = helperDraft.description;
  fields.cost.value = helperDraft.cost;
  fields.occasion.value = helperDraft.occasion;
  fields.time.value = helperDraft.time;
  fields.video.value = helperDraft.video;
  fields.steps.value = helperDraft.steps.join("\n");
  editorPanel.classList.add("is-open");
  fields.name.focus();
}

async function copyAiPrompt() {
  const prompt = buildAiPrompt();
  aiPromptOutput.value = prompt;

  try {
    await navigator.clipboard.writeText(prompt);
    alert("AI 提示词已复制。你可以粘贴给 ChatGPT 或其他 AI 继续精修。");
  } catch (error) {
    aiPromptOutput.focus();
    aiPromptOutput.select();
    alert("当前浏览器不允许自动复制，已把提示词放到下方文本框，请手动复制。");
  }
}

function buildAiPrompt() {
  return `请把下面的教学视频信息整理成一个适合自用食谱网站保存的菜谱版本。\n\n要求：\n1. 输出菜名、厨师/来源、做法版本/特点、菜品介绍、大概成本、适合什么时候吃、大概耗时、具体做法步骤。\n2. 成本和耗时无法确定时，请给保守估计并标注“约”。\n3. 步骤要适合新手照着做，不要遗漏关键火候和顺序。\n4. 不要编造视频里没有出现的特殊食材。\n\n教学视频链接：${helperFields.videoUrl.value.trim() || "未填写"}\n视频标题：${helperFields.videoTitle.value.trim() || "未填写"}\n厨师/来源：${helperFields.source.value.trim() || "未填写"}\n做法版本/特点：${helperFields.variant.value.trim() || "未填写"}\n\n视频文案/字幕/教程文字：\n${helperFields.transcript.value.trim() || "未填写"}`;
}

function guessRecipeName(title, transcript) {
  const text = title || transcript.split(/[。！？\n]/)[0] || "未命名菜谱";
  return text
    .replace(/这样做|怎么做|教程|做法|家常|真的|太香了|好吃|下饭/g, "")
    .replace(/[，。！？!?,、]/g, " ")
    .trim()
    .slice(0, 18) || "未命名菜谱";
}

function guessDescription(title, transcript) {
  const summary = (title || transcript).replace(/\s+/g, " ").trim();
  if (!summary) return "根据视频文案整理出的菜谱草稿，保存前建议再按实际口味调整。";
  return `${summary.slice(0, 80)}${summary.length > 80 ? "……" : ""}`;
}

function guessCost(text) {
  const match = text.match(/(?:成本|花费|大概|约)?\s*(\d+(?:\.\d+)?)\s*(?:-|到|~|—)?\s*(\d+(?:\.\d+)?)?\s*元/);
  if (!match) return "约 10-30 元";
  return match[2] ? `约 ${match[1]}-${match[2]} 元` : `约 ${match[1]} 元`;
}

function guessTime(text) {
  const match = text.match(/(\d+)\s*(分钟|小时)/);
  if (!match) return "约 20-40 分钟";
  return `约 ${match[1]} ${match[2]}`;
}

function guessOccasion(text) {
  if (/早餐|早上|早饭/.test(text)) return "早餐";
  if (/宵夜|夜宵|晚上饿/.test(text)) return "宵夜";
  if (/减脂|健身|低脂|少油/.test(text)) return "减脂餐 / 健身餐";
  if (/下饭|米饭|晚餐|晚饭/.test(text)) return "工作日晚餐 / 米饭配菜";
  if (/聚餐|朋友|宴客/.test(text)) return "周末聚餐 / 宴客菜";
  return "日常正餐";
}

function extractSteps(text) {
  const cleanedText = text.trim();
  if (!cleanedText) return ["请根据视频文案补充具体做法。"];

  const rawParts = cleanedText.includes("\n")
    ? cleanedText.split("\n")
    : cleanedText.split(/[。；;]/);

  const steps = rawParts
    .map((part) => part.replace(/^\s*\d+[.、，)]?\s*/, "").trim())
    .filter((part) => part.length >= 4)
    .slice(0, 12);

  return steps.length ? steps : [cleanedText.slice(0, 120)];
}

function getRecipeGroups(sourceRecipes) {
  const groups = new Map();

  sourceRecipes.forEach((recipe) => {
    const key = recipe.name.trim().toLowerCase();
    if (!groups.has(key)) {
      groups.set(key, {
        name: recipe.name,
        recipes: []
      });
    }
    groups.get(key).recipes.push(recipe);
  });

  return Array.from(groups.values());
}

function getSameDishRecipes(recipe) {
  return recipes.filter((item) => item.name.trim().toLowerCase() === recipe.name.trim().toLowerCase());
}

function renderList() {
  const keyword = searchInput.value.trim().toLowerCase();
  const visibleRecipes = recipes.filter((recipe) => {
    return `${recipe.name} ${recipe.source} ${recipe.variant} ${recipe.occasion} ${recipe.description}`.toLowerCase().includes(keyword);
  });
  const groups = getRecipeGroups(visibleRecipes);

  recipeCount.textContent = `${getRecipeGroups(recipes).length} 道菜 / ${recipes.length} 个做法`;
  recipeList.innerHTML = "";

  if (groups.length === 0) {
    recipeList.innerHTML = '<p class="empty-list">没有找到匹配的菜谱。</p>';
    return;
  }

  groups.forEach((group) => {
    const card = document.createElement("article");
    const isActiveGroup = group.recipes.some((recipe) => recipe.id === selectedId);
    card.className = `recipe-group-card${isActiveGroup ? " is-active" : ""}`;
    card.innerHTML = `
      <button class="recipe-group-main" type="button">
        <span>${escapeHtml(group.name)}</span>
        <small>${group.recipes.length} 个做法版本</small>
      </button>
      <div class="version-list">
        ${group.recipes.map((recipe) => `
          <button class="version-pill${recipe.id === selectedId ? " is-active" : ""}" type="button" data-id="${escapeAttr(recipe.id)}">
            ${escapeHtml(recipe.source)} · ${escapeHtml(recipe.variant)}
          </button>
        `).join("")}
      </div>
    `;

    card.querySelector(".recipe-group-main").addEventListener("click", () => {
      selectedId = group.recipes[0].id;
      closeEditor();
      render();
    });

    card.querySelectorAll(".version-pill").forEach((button) => {
      button.addEventListener("click", () => {
        selectedId = button.dataset.id;
        closeEditor();
        render();
      });
    });

    recipeList.appendChild(card);
  });
}

function renderDetail() {
  const recipe = recipes.find((item) => item.id === selectedId);

  if (!recipe) {
    const template = document.querySelector("#emptyDetailTemplate");
    recipeDetail.innerHTML = template.innerHTML;
    return;
  }

  const safeVideo = safeUrl(recipe.video);
  const sameDishRecipes = getSameDishRecipes(recipe);
  const imageMarkup = recipe.image
    ? `<img class="recipe-image" src="${escapeAttr(recipe.image)}" alt="${escapeAttr(recipe.name)}">`
    : '<div class="image-placeholder">暂无配图</div>';

  // 食材清单 HTML
  const ingredients = recipe.ingredients || [];
  let ingredientsHtml = "";
  if (ingredients.length > 0) {
    const byCategory = {};
    INGREDIENT_CATEGORIES.forEach((cat) => { byCategory[cat] = []; });
    ingredients.forEach((ing) => {
      const cat = INGREDIENT_CATEGORIES.includes(ing.category) ? ing.category : "主料";
      byCategory[cat].push(ing);
    });

    ingredientsHtml = `<div class="detail-section">
      <h3>食材清单</h3>
      <div class="ingredients-list">
        ${INGREDIENT_CATEGORIES.map((cat) => {
          const items = byCategory[cat];
          if (items.length === 0) return "";
          return `<div class="ingredients-category">
            <span class="ingredients-cat-label">${escapeHtml(cat)}</span>
            <ul class="ingredients-items">
              ${items.map((ing) => `
                <li class="ingredient-item">
                  <label>
                    <input type="checkbox" class="ingredient-check">
                    <span class="ingredient-name">${escapeHtml(ing.name)}</span>
                    <span class="ingredient-amount">${escapeHtml(ing.amount)}</span>
                    ${ing.note ? `<span class="ingredient-note">${escapeHtml(ing.note)}</span>` : ""}
                  </label>
                </li>
              `).join("")}
            </ul>
          </div>`;
        }).join("")}
      </div>
    </div>`;
  }

  // 步骤区：有视频时默认折叠
  const hasSteps = recipe.steps && recipe.steps.length > 0;
  const stepsHtml = hasSteps ? `
    <div class="detail-section">
      <button class="steps-toggle${safeVideo ? "" : " is-open"}" type="button" aria-expanded="${safeVideo ? "false" : "true"}">
        具体做法${safeVideo ? "<span class='steps-toggle-hint'>（点击展开）</span>" : ""}
        <span class="steps-toggle-icon">${safeVideo ? "▶" : "▼"}</span>
      </button>
      <ol class="steps${safeVideo ? " is-collapsed" : ""}">
        ${recipe.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
      </ol>
    </div>
  ` : "";

  recipeDetail.innerHTML = `
    ${imageMarkup}
    <div class="detail-header">
      <div>
        <p class="eyebrow">Recipe</p>
        <h2 id="detailTitle">${escapeHtml(recipe.name)}</h2>
        <p>${escapeHtml(recipe.description)}</p>
      </div>
      <button class="secondary-button" type="button" id="editRecipeButton">编辑当前做法</button>
    </div>

    ${safeVideo ? `<div class="detail-section detail-video-prominent">
      <a class="video-link-prominent" href="${escapeAttr(safeVideo)}" target="_blank" rel="noopener noreferrer">▶ 打开教学视频（${escapeHtml(recipe.source)}）</a>
    </div>` : ""}

    <div class="version-tabs" aria-label="同一道菜的不同做法">
      ${sameDishRecipes.map((item) => `
        <button class="version-card${item.id === recipe.id ? " is-active" : ""}" type="button" data-id="${escapeAttr(item.id)}">
          <span>${escapeHtml(item.source)}</span>
          <strong>${escapeHtml(item.variant)}</strong>
          <small>${escapeHtml(item.time)} · ${escapeHtml(item.cost)}</small>
        </button>
      `).join("")}
    </div>

    <div class="meta-grid">
      <div class="meta-item"><span>厨师/来源</span><strong>${escapeHtml(recipe.source)}</strong></div>
      <div class="meta-item"><span>做法版本</span><strong>${escapeHtml(recipe.variant)}</strong></div>
      <div class="meta-item"><span>大概成本</span><strong>${escapeHtml(recipe.cost)}</strong></div>
      <div class="meta-item"><span>适合时间</span><strong>${escapeHtml(recipe.occasion)}</strong></div>
      <div class="meta-item"><span>大概耗时</span><strong>${escapeHtml(recipe.time)}</strong></div>
    </div>

    ${ingredientsHtml}
    ${stepsHtml}

    ${!safeVideo ? `<div class="detail-section"><h3>教学视频</h3><p>暂未填写视频链接。</p></div>` : ""}
  `;

  document.querySelector("#editRecipeButton").addEventListener("click", () => openEditEditor(recipe.id));
  document.querySelectorAll(".version-card").forEach((button) => {
    button.addEventListener("click", () => {
      selectedId = button.dataset.id;
      render();
    });
  });

  // 步骤折叠切换
  const stepsToggle = recipeDetail.querySelector(".steps-toggle");
  if (stepsToggle) {
    stepsToggle.addEventListener("click", () => {
      const stepsList = recipeDetail.querySelector(".steps");
      const isCollapsed = stepsList.classList.toggle("is-collapsed");
      stepsToggle.setAttribute("aria-expanded", String(!isCollapsed));
      stepsToggle.classList.toggle("is-open", !isCollapsed);
      const icon = stepsToggle.querySelector(".steps-toggle-icon");
      if (icon) icon.textContent = isCollapsed ? "▶" : "▼";
      const hint = stepsToggle.querySelector(".steps-toggle-hint");
      if (hint) hint.textContent = isCollapsed ? "（点击展开）" : "";
    });
  }
}

function openNewEditor() {
  selectedId = "";
  recipeForm.reset();
  fields.id.value = "";
  editorTitle.textContent = "新增菜谱";
  deleteRecipeButton.style.display = "none";
  editorPanel.classList.add("is-open");
  resetIngredientEditor([]);
  fields.name.focus();
  render();
}

function openEditEditor(id) {
  const recipe = recipes.find((item) => item.id === id);
  if (!recipe) return;

  fields.id.value = recipe.id;
  fields.name.value = recipe.name;
  fields.image.value = recipe.image;
  fields.source.value = recipe.source;
  fields.variant.value = recipe.variant;
  fields.description.value = recipe.description;
  fields.cost.value = recipe.cost;
  fields.occasion.value = recipe.occasion;
  fields.time.value = recipe.time;
  fields.video.value = recipe.video;
  fields.steps.value = recipe.steps.join("\n");

  resetIngredientEditor(recipe.ingredients || []);

  editorTitle.textContent = "编辑菜谱";
  deleteRecipeButton.style.display = "inline-flex";
  editorPanel.classList.add("is-open");
  fields.name.focus();
}

function closeEditor() {
  editorPanel.classList.remove("is-open");
}

function saveRecipe(event) {
  event.preventDefault();

  const stepsRaw = fields.steps.value.split("\n").map((step) => step.trim()).filter(Boolean);
  const hasVideo = safeUrl(fields.video.value.trim());

  if (stepsRaw.length === 0 && !hasVideo) {
    alert("请至少填写一个做法步骤，或填写教学视频链接。");
    return;
  }

  const recipe = {
    id: fields.id.value || createId(),
    name: fields.name.value.trim(),
    image: fields.image.value.trim(),
    source: fields.source.value.trim() || "自用做法",
    variant: fields.variant.value.trim() || "默认版本",
    description: fields.description.value.trim(),
    cost: fields.cost.value.trim(),
    occasion: fields.occasion.value.trim(),
    time: fields.time.value.trim(),
    video: fields.video.value.trim(),
    ingredients: editingIngredients.filter((ing) => ing.name.trim()),
    steps: stepsRaw
  };

  const index = recipes.findIndex((item) => item.id === recipe.id);
  if (index >= 0) {
    recipes[index] = recipe;
  } else {
    recipes.unshift(recipe);
  }

  selectedId = recipe.id;
  saveToLocalStorage();
  closeEditor();
  render();
}

function deleteCurrentRecipe() {
  const id = fields.id.value;
  const recipe = recipes.find((item) => item.id === id);
  if (!recipe) return;

  if (!confirm(`确定删除「${recipe.name}」吗？`)) return;

  recipes = recipes.filter((item) => item.id !== id);
  selectedId = recipes[0]?.id || "";
  saveToLocalStorage();
  closeEditor();
  render();
}

function exportRecipes() {
  const blob = new Blob([JSON.stringify(recipes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `my-recipes-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function importRecipes(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const nextRecipes = normalizeRecipes(JSON.parse(reader.result));
      recipes = nextRecipes;
      selectedId = recipes[0]?.id || "";
      saveToLocalStorage();
      closeEditor();
      render();
      alert("导入成功。当前浏览器中的菜谱已更新。");
    } catch (error) {
      alert("导入失败，请确认文件是从本站导出的 JSON 菜谱备份。");
    } finally {
      importInput.value = "";
    }
  };
  reader.readAsText(file, "UTF-8");
}

function normalizeRecipes(rawRecipes) {
  if (!Array.isArray(rawRecipes)) return [];

  return rawRecipes.map((recipe) => ({
    id: String(recipe.id || createId()),
    name: String(recipe.name || "未命名菜谱"),
    image: String(recipe.image || ""),
    source: String(recipe.source || "自用做法"),
    variant: String(recipe.variant || "默认版本"),
    description: String(recipe.description || ""),
    cost: String(recipe.cost || ""),
    occasion: String(recipe.occasion || ""),
    time: String(recipe.time || ""),
    video: String(recipe.video || ""),
    ingredients: Array.isArray(recipe.ingredients)
      ? recipe.ingredients.map((ing) => ({
          name: String(ing.name || ""),
          amount: String(ing.amount || ""),
          category: INGREDIENT_CATEGORIES.includes(ing.category) ? ing.category : "主料",
          note: String(ing.note || "")
        })).filter((ing) => ing.name.trim())
      : [],
    steps: Array.isArray(recipe.steps) ? recipe.steps.map(String) : String(recipe.steps || "").split("\n").filter(Boolean)
  }));
}

function createId() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  return `recipe-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function safeUrl(value) {
  if (!value) return "";
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? value : "";
  } catch (error) {
    return "";
  }
}

function normalizeHexColor(value, fallback) {
  const color = String(value || "").trim();
  return /^#[0-9a-fA-F]{6}$/.test(color) ? color : fallback;
}

function clampNumber(value, min, max, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(max, Math.max(min, Math.round(number)));
}

function darkenHexColor(hexColor, amount) {
  const rgb = hexToRgb(hexColor);
  const darkened = rgb.map((value) => Math.round(value * (1 - amount)));
  return rgbToHex(darkened);
}

function mixHexColor(hexColor, otherHexColor, amount) {
  const rgb = hexToRgb(hexColor);
  const otherRgb = hexToRgb(otherHexColor);
  const mixed = rgb.map((value, index) => Math.round(value * (1 - amount) + otherRgb[index] * amount));
  return rgbToHex(mixed);
}

function hexToRgb(hexColor) {
  return [1, 3, 5].map((start) => parseInt(hexColor.slice(start, start + 2), 16));
}

function rgbToHex(rgb) {
  return `#${rgb.map((value) => value.toString(16).padStart(2, "0")).join("")}`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}

// ===== 悬浮 AI 助手 =====
const FLOAT_AI_CONFIG_KEY = "my-recipe-float-ai-config";

let floatAiHistory = [];
let floatAiDraft = null;
let floatAiSettingsVisible = false;

const FLOAT_AI_SYSTEM_PROMPT = `你是一个菜谱网站的 AI 助手，能够：
1. 帮用户记录新菜谱（通过问答或解析用户粘贴的字幕/描述，最终输出结构化 JSON）
2. 回答烹饪相关问题
3. 根据用户描述推荐菜谱

当用户想记录菜谱时，通过逐步问答收集以下字段：菜名、来源/厨师、版本/特点、介绍、食材清单（名称+用量+分类+备注）、成本、适合时间、耗时、视频链接、做法步骤。
每次只问 1-2 个问题。若用户粘贴了大段文字或字幕，直接提取所有能识别的字段，再询问缺失部分。

当菜谱信息足够完整时，输出以下格式的 JSON 代码块（不输出其他格式）：
\`\`\`json
{
  "name": "菜名",
  "source": "来源",
  "variant": "版本",
  "description": "介绍",
  "ingredients": [
    { "name": "食材名", "amount": "用量", "category": "主料", "note": "备注" }
  ],
  "cost": "约 XX 元",
  "occasion": "适合时间",
  "time": "约 XX 分钟",
  "video": "",
  "steps": ["步骤1", "步骤2"]
}
\`\`\`
输出 JSON 后说：「菜谱信息已整理好，点击"一键填入表单"即可保存。」`;

function initFloatAi() {
  const widget   = document.querySelector("#floatAiWidget");
  const toggle   = document.querySelector("#floatAiToggle");
  const panel    = document.querySelector("#floatAiPanel");
  const closeBtn = document.querySelector("#floatAiCloseBtn");
  const newBtn   = document.querySelector("#floatAiNewBtn");
  const settingsBtn = document.querySelector("#floatAiSettingsBtn");
  const settingsEl  = document.querySelector("#floatAiSettings");
  const saveBtn  = document.querySelector("#floatSaveConfigBtn");
  const sendBtn  = document.querySelector("#floatAiSendBtn");
  const input    = document.querySelector("#floatAiInput");
  const fillBtn  = document.querySelector("#floatAiFillBtn");

  function openPanel() {
    widget.classList.add("is-open");
    panel.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    if (floatAiHistory.length === 0) floatAiStart();
    document.querySelector("#floatAiMessages").scrollTop = 99999;
    input.focus();
  }

  function closePanel() {
    widget.classList.remove("is-open");
    panel.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", () => {
    panel.hidden ? openPanel() : closePanel();
  });
  closeBtn.addEventListener("click", closePanel);

  newBtn.addEventListener("click", () => {
    floatAiStart();
    // 重新开始时隐藏设置区
    floatAiSettingsVisible = false;
    settingsEl.hidden = true;
  });

  settingsBtn.addEventListener("click", () => {
    floatAiSettingsVisible = !floatAiSettingsVisible;
    settingsEl.hidden = !floatAiSettingsVisible;
    if (floatAiSettingsVisible) floatAiFillConfig();
  });

  saveBtn.addEventListener("click", floatAiSaveConfig);

  sendBtn.addEventListener("click", () => floatAiSend());
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); floatAiSend(); }
  });

  fillBtn.addEventListener("click", floatAiFillToForm);
}

function floatAiLoadConfig() {
  try { return JSON.parse(localStorage.getItem(FLOAT_AI_CONFIG_KEY) || "{}"); }
  catch { return {}; }
}

function floatAiFillConfig() {
  const cfg = floatAiLoadConfig();
  if (cfg.key)     document.querySelector("#floatApiKey").value = cfg.key;
  if (cfg.baseUrl) document.querySelector("#floatApiBaseUrl").value = cfg.baseUrl;
  if (cfg.model)   document.querySelector("#floatApiModel").value = cfg.model;
}

function floatAiSaveConfig() {
  const key     = document.querySelector("#floatApiKey").value.trim();
  const baseUrl = document.querySelector("#floatApiBaseUrl").value.trim();
  const model   = document.querySelector("#floatApiModel").value.trim();
  if (!key) { alert("请填写 API Key。"); return; }
  localStorage.setItem(FLOAT_AI_CONFIG_KEY, JSON.stringify({ key, baseUrl, model }));
  document.querySelector("#floatAiSettings").hidden = true;
  floatAiSettingsVisible = false;
  floatAiAppend("assistant", "✅ 配置已保存，可以开始对话了！");
}

function floatAiStart() {
  floatAiHistory = [];
  floatAiDraft = null;
  document.querySelector("#floatAiFillBar").hidden = true;
  document.querySelector("#floatAiMessages").innerHTML = "";
  floatAiAppend("assistant", "你好！我是这个菜谱网站的 AI 助手 ✦\n\n你可以：\n• **记录菜谱** — 告诉我菜名，或粘贴视频字幕让我整理\n• **问烹饪问题** — 比如"茄子怎么炒不吸油"\n• **推荐菜** — 比如"给我推荐一道 15 分钟能做好的菜"");
}

function floatAiAppend(role, content) {
  const messages = document.querySelector("#floatAiMessages");
  const div = document.createElement("div");
  div.className = `float-msg float-msg--${role}`;

  // 检测 JSON 代码块，提取 draft
  const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
  if (jsonMatch) {
    try {
      floatAiDraft = JSON.parse(jsonMatch[1]);
      document.querySelector("#floatAiFillBar").hidden = false;
    } catch { /* 解析失败忽略 */ }
  }

  // 简单渲染：代码块、粗体、换行
  div.innerHTML = escapeHtml(content)
    .replace(/```json\n([\s\S]*?)\n```/g, '<pre>$1</pre>')
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/•/g, "•")
    .replace(/\n/g, "<br>");

  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;

  if (role === "assistant") {
    floatAiHistory.push({ role, content });
  }
}

async function floatAiSend() {
  const input = document.querySelector("#floatAiInput");
  const text = input.value.trim();
  if (!text) return;

  const cfg = floatAiLoadConfig();
  if (!cfg.key) {
    document.querySelector("#floatAiSettings").hidden = false;
    floatAiSettingsVisible = true;
    floatAiFillConfig();
    floatAiAppend("assistant", "⚙️ 请先填写 API Key 并点击"保存配置"。");
    return;
  }

  input.value = "";
  floatAiAppend("user", text);

  // 检测 B站链接，尝试获取视频信息
  const biliUrl = floatAiDetectBiliUrl(text);
  let enrichedText = text;
  if (biliUrl) {
    enrichedText = await floatAiFetchBiliInfo(biliUrl, text);
  }

  floatAiHistory.push({ role: "user", content: enrichedText });

  const sendBtn = document.querySelector("#floatAiSendBtn");
  sendBtn.disabled = true;

  const messages = document.querySelector("#floatAiMessages");
  const thinking = document.createElement("div");
  thinking.className = "float-msg float-msg--thinking";
  thinking.textContent = "AI 正在思考…";
  messages.appendChild(thinking);
  messages.scrollTop = messages.scrollHeight;

  try {
    const baseUrl = (cfg.baseUrl || "https://api.openai.com/v1").replace(/\/$/, "");
    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cfg.key}`
      },
      body: JSON.stringify({
        model: cfg.model || "gpt-4o",
        messages: [
          { role: "system", content: FLOAT_AI_SYSTEM_PROMPT },
          ...floatAiHistory
        ],
        temperature: 0.5
      })
    });

    thinking.remove();

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      floatAiAppend("assistant", `⚠️ 请求失败：${err?.error?.message || "HTTP " + res.status}\n请检查 API Key 和接口地址。`);
      return;
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "（AI 无回复）";
    floatAiAppend("assistant", reply);

  } catch (err) {
    thinking.remove();
    floatAiAppend("assistant", `⚠️ 网络错误：${err.message}`);
  } finally {
    sendBtn.disabled = false;
    document.querySelector("#floatAiInput").focus();
  }
}

/** 从用户输入中识别 B站链接，返回第一个匹配的 URL 或 null */
function floatAiDetectBiliUrl(text) {
  const match = text.match(/https?:\/\/(?:www\.|m\.)?bilibili\.com\/video\/[^\s]+|https?:\/\/b23\.tv\/[^\s]+/);
  return match ? match[0] : null;
}

/** 解析 BV/av id */
function floatAiParseBiliId(url) {
  const bv = url.match(/BV([A-Za-z0-9]+)/);
  if (bv) return { type: "bvid", value: "BV" + bv[1] };
  const av = url.match(/av(\d+)/i);
  if (av) return { type: "aid", value: av[1] };
  return null;
}

/**
 * 尝试通过 B站公开 API 获取视频标题和简介。
 * 成功：返回附加了视频信息的增强文本。
 * 失败（CORS / 网络）：在对话中给出字幕获取引导，返回原始文本。
 */
async function floatAiFetchBiliInfo(url, originalText) {
  const id = floatAiParseBiliId(url);
  if (!id) {
    floatAiShowBiliGuide(url);
    return originalText;
  }

  const messages = document.querySelector("#floatAiMessages");

  function showStatus(text) {
    let el = messages.querySelector(".bili-status");
    if (!el) {
      el = document.createElement("div");
      el.className = "float-msg float-msg--thinking bili-status";
      messages.appendChild(el);
    }
    el.textContent = text;
    messages.scrollTop = messages.scrollHeight;
    return el;
  }

  const statusEl = showStatus("🔍 正在获取 B站视频信息…");

  // 通过 CORS 代理发请求，依次尝试两个免费代理
  async function proxyFetch(targetUrl) {
    const proxies = [
      `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`,
      `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`
    ];
    for (const proxy of proxies) {
      try {
        const res = await fetch(proxy, { credentials: "omit" });
        if (res.ok) return res;
      } catch { /* 继续尝试下一个 */ }
    }
    throw new Error("所有代理均不可用");
  }

  try {
    // Step 1: 拿视频基础信息（cid、标题、UP主）
    const infoUrl = id.type === "bvid"
      ? `https://api.bilibili.com/x/web-interface/view?bvid=${id.value}`
      : `https://api.bilibili.com/x/web-interface/view?aid=${id.value}`;

    statusEl.textContent = "🔍 正在获取视频基础信息…";
    const infoRes = await proxyFetch(infoUrl);
    const infoJson = await infoRes.json();
    if (infoJson.code !== 0) throw new Error(infoJson.message || "视频信息获取失败");

    const d = infoJson.data;
    const cid = d.cid;
    const bvid = d.bvid;
    const title = d.title || "";
    const upName = d.owner?.name || "";
    const desc = (d.desc || "").slice(0, 300);

    // Step 2: 拉字幕列表
    statusEl.textContent = "🔍 正在查找字幕…";
    const subtitleListUrl =
      `https://api.bilibili.com/x/player/v2?cid=${cid}&bvid=${bvid}`;
    const subListRes = await proxyFetch(subtitleListUrl);
    const subListJson = await subListRes.json();

    const subtitleList = subListJson?.data?.subtitle?.subtitles || [];
    // 优先中文字幕
    const preferred = subtitleList.find(s => /zh|cn|ai/i.test(s.lan)) || subtitleList[0];

    let subtitleText = "";

    if (preferred?.subtitle_url) {
      // Step 3: 下载字幕 JSON
      statusEl.textContent = "📥 正在下载字幕内容…";
      let subtitleUrl = preferred.subtitle_url;
      if (subtitleUrl.startsWith("//")) subtitleUrl = "https:" + subtitleUrl;

      const subRes = await proxyFetch(subtitleUrl);
      const subJson = await subRes.json();

      subtitleText = (subJson.body || [])
        .map(item => item.content || "")
        .filter(Boolean)
        .join("\n");
    }

    statusEl.remove();

    if (subtitleText.length > 0) {
      // 字幕超长时截断，避免超出模型 token 限制
      const truncated = subtitleText.length > 4000
        ? subtitleText.slice(0, 4000) + "\n…（字幕较长，已截取前部分）"
        : subtitleText;

      floatAiAppend("assistant",
        `✅ 已抓取到字幕（${subtitleText.split("\n").length} 行）\n` +
        `视频：**${title}**（UP：${upName}）\n\n` +
        `正在让 AI 整理菜谱，稍等…`
      );

      return [
        `[B站视频字幕已自动抓取]`,
        `标题：${title}`,
        `UP主：${upName}`,
        `简介：${desc}`,
        `视频链接：${url}`,
        `---字幕内容---`,
        truncated,
        `---`,
        `用户原始消息：${originalText}`
      ].join("\n");

    } else {
      // 有视频信息但无字幕
      floatAiAppend("assistant",
        `ℹ️ 已获取到视频信息：**${title}**（UP：${upName}）\n\n` +
        `该视频暂无可用字幕。\n\n` +
        `**你可以：**\n` +
        `1. 把视频里的菜谱描述手动输入/粘贴进来\n` +
        `2. 若视频有 CC 字幕，在 B站页面复制后粘贴到这里\n\n` +
        `我已用视频标题和简介开始整理，信息不足会逐步问你。`
      );

      return [
        `[B站视频信息]`,
        `标题：${title}`,
        `UP主：${upName}`,
        `简介：${desc}`,
        `视频链接：${url}`,
        `---`,
        `用户原始消息：${originalText}`
      ].join("\n");
    }

  } catch (e) {
    if (statusEl.parentNode) statusEl.remove();
    floatAiShowBiliGuide(url);
    return originalText;
  }
}

/** 所有自动方式均失败时，给用户手动操作引导 */
function floatAiShowBiliGuide(url) {
  floatAiAppend("assistant",
    `🔗 检测到 B站链接，但自动抓取字幕失败（可能是代理限速或视频无字幕）。\n\n` +
    `**手动获取字幕的方法：**\n` +
    `1. 打开视频，点右下角 **CC** 按钮开启字幕\n` +
    `2. 右键字幕文字 → 复制（部分浏览器支持）\n` +
    `3. 或用油猴脚本"[B站字幕列表助手](https://greasyfork.org/zh-CN/scripts/378513)"一键导出\n\n` +
    `把字幕文字粘贴到这里，我帮你整理成菜谱 👇`
  );
}

function floatAiFillToForm() {
  if (!floatAiDraft) return;
  const d = floatAiDraft;

  // 打开编辑器（新增模式）
  openNewEditor();

  fields.name.value        = d.name        || "";
  fields.source.value      = d.source      || "";
  fields.variant.value     = d.variant     || "";
  fields.image.value       = d.image       || "";
  fields.description.value = d.description || "";
  fields.cost.value        = d.cost        || "";
  fields.occasion.value    = d.occasion    || "";
  fields.time.value        = d.time        || "";
  fields.video.value       = d.video       || "";
  fields.steps.value       = Array.isArray(d.steps) ? d.steps.join("\n") : (d.steps || "");

  resetIngredientEditor(
    Array.isArray(d.ingredients)
      ? d.ingredients.map((ing) => ({
          name:     String(ing.name     || ""),
          amount:   String(ing.amount   || ""),
          category: INGREDIENT_CATEGORIES.includes(ing.category) ? ing.category : "主料",
          note:     String(ing.note     || "")
        }))
      : []
  );

  // 关闭悬浮窗，让用户专注检查表单
  const widget = document.querySelector("#floatAiWidget");
  const panel  = document.querySelector("#floatAiPanel");
  widget.classList.remove("is-open");
  panel.hidden = true;
  document.querySelector("#floatAiToggle").setAttribute("aria-expanded", "false");

  fields.name.focus();
}
