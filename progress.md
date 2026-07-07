## 2026-07-05 - Task: 创建本地自用食谱网站
### What was done
- 创建了一个可本地打开的自用食谱网站，支持展示菜名、配图、菜品介绍、成本、适合食用时间、制作耗时、具体做法和教学视频链接。
- 实现了页面内新增、编辑、删除菜谱，并将内容保存在当前浏览器本地。
- 实现了菜谱 JSON 导入和导出，方便后续备份、迁移和上线前整理数据。
- 补充了本地使用说明，说明打开、编辑、备份和后续上线方式。

### Testing
- 待执行：检查项目文件是否完整。
- 待执行：使用 Node 对 `app.js` 做语法检查。

### Notes
- `index.html`：新增网站页面结构，包含列表、详情、编辑表单和导入导出入口。
- `styles.css`：新增网站视觉样式和响应式布局。
- `app.js`：新增菜谱展示、编辑、本地保存、导入和导出逻辑。
- `recipes.json`：新增示例菜谱数据和数据结构模板。
- `docs/usage.md`：新增本地使用、编辑、备份和后续上线说明。
- `progress.md`：记录本轮任务、验证项和回滚方式。
- 回滚方式：删除 `E:\recipe-site` 目录即可回到本轮施工前状态。

## 2026-07-05 - Task: 创建本地自用食谱网站验证
### What was done
- 完成本地静态网站文件完整性和基础可访问性验证。
- 确认 JavaScript 语法、示例 JSON 格式、HTML 资源引用和本地 HTTP 访问均可用。

### Testing
- `node --check recipe-site/app.js`：通过，JavaScript 无语法错误。
- `python -m json.tool recipe-site/recipes.json > /dev/null`：通过，示例菜谱 JSON 格式有效。
- `python -c urllib.request.urlopen(...)`：通过，本地 HTTP 服务可访问首页并返回包含网站标题和脚本引用的页面。
- `Grep` 检查 `index.html`：通过，页面引用了 `styles.css` 和 `app.js`。
- 浏览器自动化验证未执行：当前环境缺少 Chrome/Chromium。

### Notes
- `progress.md`：追加本轮验证结果。
- 回滚方式：删除 `E:\recipe-site` 目录即可回到本轮施工前状态。

## 2026-07-05 - Task: 增加小白可用的可视化网页调整功能
### What was done
- 增加“调整网站”入口，让用户可以在页面内直观调整网站外观。
- 支持即时预览并自动保存网站标题、英文小标签、顶部说明、主色、背景色、卡片圆角、图片高度和左侧列表宽度。
- 增加“恢复默认外观”，可一键回到初始样式且不删除菜谱内容。
- 更新使用说明，补充无需改代码的网页调整步骤。

### Testing
- `node --check recipe-site/app.js`：通过，JavaScript 无语法错误。
- `Grep` 检查 `index.html`：通过，页面引用了 `styles.css`、`app.js`，并包含可视化设置面板入口。
- `curl -fsS http://127.0.0.1:4173 >/dev/null`：通过，本地 HTTP 首页可访问。
- 浏览器自动化验证未执行：当前环境缺少 Chrome/Chromium；可在本机浏览器手动点击“调整网站”确认即时预览效果。

### Notes
- `index.html`：新增可视化调整入口和外观设置面板。
- `styles.css`：新增设置面板样式，并开放外观变量供页面设置实时控制。
- `app.js`：新增外观设置读取、即时预览、本地保存和恢复默认逻辑。
- `docs/usage.md`：补充小白可视化调整网站的操作说明。
- `progress.md`：追加本轮改动、验证项和回滚方式。
- 回滚方式：恢复本轮修改前的 `index.html`、`styles.css`、`app.js`、`docs/usage.md` 和 `progress.md`；若只想清除本地外观设置，可在浏览器开发者工具中删除 `my-recipe-site-appearance` 本地存储项。

## 2026-07-05 - Task: 设计同一道菜不同厨师做法的分类排版
### What was done
- 将菜谱展示调整为“菜名分组 + 做法版本”结构，同一道菜会自动合并到一个菜名组下面。
- 新增“厨师/来源”和“做法版本/特点”字段，方便记录不同厨师或不同风格的做法。
- 右侧详情增加版本卡片，同一道菜的不同做法可以点击切换，并显示对应成本、耗时、视频和步骤。
- 更新示例数据，把“番茄炒蛋”扩展为两个不同做法版本，便于直观看到分类效果。
- 更新使用说明，补充同一道菜多版本的录入规则。

### Testing
- `node --check recipe-site/app.js`：通过，JavaScript 无语法错误。
- `python -m json.tool recipe-site/recipes.json > /dev/null`：通过，菜谱 JSON 格式有效。
- `Grep` 检查 `index.html`：通过，页面包含 `recipeSource`、`recipeVariant` 字段，并继续引用 `styles.css` 和 `app.js`。
- `curl -fsS http://127.0.0.1:4173 >/dev/null`：通过，本地 HTTP 首页可访问。
- 浏览器自动化验证未执行：当前环境缺少 Chrome/Chromium；可在本机浏览器手动点击版本卡片确认切换效果。

### Notes
- `index.html`：新增厨师/来源和做法版本输入项。
- `styles.css`：新增同菜分组卡片、版本按钮和详情版本卡片样式。
- `app.js`：新增同名菜分组、版本切换、字段保存和旧数据兼容逻辑。
- `recipes.json`：新增做法来源和版本字段，并补充番茄炒蛋的第二个版本。
- `docs/usage.md`：补充同一道菜不同做法的使用说明。
- `progress.md`：追加本轮改动、验证项和回滚方式。
- 回滚方式：恢复本轮修改前的 `index.html`、`styles.css`、`app.js`、`recipes.json`、`docs/usage.md` 和 `progress.md`；若浏览器里已有本轮新增字段数据，导出备份后可手动删除对应版本。

## 2026-07-05 - Task: 增加视频总结助手第一版
### What was done
- 在菜谱编辑区新增“视频总结助手”，支持粘贴教学视频链接、标题、厨师来源、做法版本和视频文案/字幕。
- 实现本地生成菜谱草稿，可整理出菜名、介绍、成本、适合时间、耗时和做法步骤。
- 增加“一键填入表单”，将草稿作为新增菜谱版本填入现有表单，避免误覆盖旧菜谱。
- 增加“复制 AI 提示词”，方便把链接和文案发给 ChatGPT 或其他 AI 精修。
- 更新使用说明，补充 HelloTik 手动辅助和视频总结助手的安全使用流程。

### Testing
- `node --check recipe-site/app.js`：通过，JavaScript 无语法错误。
- `Grep` 检查 `index.html`：通过，页面包含 `helperVideoUrl`、`helperTranscript`、`generateDraftButton`、`aiPromptOutput`，并继续引用 `styles.css` 和 `app.js`。
- `curl -fsS http://127.0.0.1:4173 >/dev/null`：通过，本地 HTTP 首页可访问。
- 浏览器自动化验证未执行：当前环境缺少 Chrome/Chromium；可在本机浏览器手动粘贴文案后点击“生成菜谱草稿”确认交互效果。

### Notes
- `index.html`：新增视频总结助手输入区、草稿预览区和 AI 提示词输出区。
- `styles.css`：新增视频助手、草稿预览和提示词输出样式。
- `app.js`：新增本地草稿生成、一键填入表单和复制 AI 提示词逻辑。
- `docs/usage.md`：补充视频总结助手使用步骤和安全边界说明。
- `progress.md`：追加本轮改动、验证项和回滚方式。
- 回滚方式：恢复本轮修改前的 `index.html`、`styles.css`、`app.js`、`docs/usage.md` 和 `progress.md`；本轮不会新增远程服务或 AI Key。

## 2026-07-05 - Task: 提升视频总结助手入口可见性
### What was done
- 在页面顶部新增“视频总结”按钮，避免用户必须先点击“新增菜谱”才能发现助手。
- 点击“视频总结”后会自动展开编辑区，并滚动定位到“视频总结助手”。
- 更新助手说明和使用文档，明确入口位置。

### Testing
- `node --check recipe-site/app.js`：通过，JavaScript 无语法错误。
- `Grep` 检查 `index.html`：通过，页面包含 `videoHelperButton`、`helperVideoUrl`、`helperTranscript`，并继续引用 `styles.css` 和 `app.js`。

### Notes
- `index.html`：新增顶部“视频总结”入口，并补充助手位置提示。
- `app.js`：新增 `openVideoHelper` 交互，点击入口后自动展开并定位助手。
- `docs/usage.md`：更新视频总结助手入口说明。
- `progress.md`：追加本轮改动、验证项和回滚方式。
- 回滚方式：恢复本轮修改前的 `index.html`、`app.js`、`docs/usage.md` 和 `progress.md`。

## 2026-07-06 - Task: 修复 GitHub Pages 交互失效
### What was done
- 修复 Firebase 改造时误删 `bindEvents` 函数定义导致脚本无法解析的问题。
- 修复 AI 悬浮助手欢迎语和配置提示中的未转义引号，消除 JavaScript 语法错误。
- 删除重复的 `recipeSteps` 表单字段，避免浏览器表单字段冲突。

### Testing
- `node --check E:/recipe-site/app.js`：通过，JavaScript 无语法错误。

### Notes
- `app.js`：补回事件绑定函数声明，并修复字符串引号导致的语法错误。
- `index.html`：删除重复的步骤输入框。
- `progress.md`：追加本轮修复、验证结果和回滚方式。
- 回滚方式：恢复本轮修改前的 `app.js`、`index.html` 和 `progress.md`；或回退到 Git 提交 `de14706` 前的状态。

## 2026-07-06 - Task: 编写产品计划书并优化 README
### What was done
- 新增完整产品计划书，覆盖 AI 视频生成菜谱、美食 UI 改版、多人协作、微信小程序和 App 化路线。
- 重写 README，使介绍更像真人说明，并增加邀请朋友参与填写菜谱的表达。
- 在 README 中补充内测参与方式、AI 使用边界和后续计划入口。

### Testing
- 未运行代码测试：本轮仅修改文档内容，不涉及页面脚本和样式逻辑。

### Notes
- `docs/product-plan.md`：新增产品计划书，明确阶段目标、功能规划和长期路线。
- `README.md`：重写项目介绍，增强对外传播和邀请内测参与的口吻。
- `progress.md`：追加本轮文档改动、验证说明和回滚方式。
- 回滚方式：删除 `docs/product-plan.md`，并恢复本轮修改前的 `README.md` 和 `progress.md`。

## 2026-07-06 - Task: 美食网站 UI 第一版改造
### What was done
- 将首页首屏改成更有食欲和邀请感的美食入口，突出“AI 生成菜谱”“朋友共同填写”“今天吃什么”和购物清单。
- 将菜谱列表升级为带缩略图、版本数量、耗时、成本和场景标签的卡片式展示。
- 优化菜谱详情页的大图、标题、说明、信息卡、食材分类和步骤视觉层次。
- 补充手机端布局适配，让首屏按钮、功能卡片、菜谱卡片和详情页在小屏幕上更易阅读和点击。

### Testing
- `node --check E:/recipe-site/app.js`：通过，JavaScript 无语法错误。
- 浏览器自动化未执行：当前环境缺少 Chrome/Chromium；需部署后在浏览器手动验证按钮点击和响应式布局。

### Notes
- `index.html`：重构首页 Hero 和功能亮点区，但保留原有按钮 id，避免破坏现有交互绑定。
- `styles.css`：新增美食主题视觉、首屏装饰、功能亮点、菜谱卡片、详情页和移动端样式。
- `app.js`：更新默认站点文案，并增强列表与详情渲染所需的卡片信息。
- `progress.md`：追加本轮 UI 改造、验证结果和回滚方式。
- 回滚方式：恢复本轮修改前的 `index.html`、`styles.css`、`app.js` 和 `progress.md`。

## 2026-07-06 - Task: 修复多人编辑云端同步提示
### What was done
- 将新增、删除和导入菜谱改为等待 Firebase 写入完成后再提示结果。
- 云端同步失败时会明确提示“只保存在当前浏览器”，避免用户误以为别人也能看到。
- 本地仍保留 localStorage 缓存，网络异常时不丢失当前浏览器的数据。

### Testing
- `node --check E:/recipe-site/app.js`：通过，JavaScript 无语法错误。
- 通过 Firestore REST 接口检查共享文档当前存在 3 条菜谱，说明朋友此前新增内容未写入云端。

### Notes
- `app.js`：增强 `saveToLocalStorage` 返回同步状态，并让保存、删除、导入流程等待云端写入结果。
- `progress.md`：追加本轮同步问题修复、验证结果和回滚方式。
- 回滚方式：恢复本轮修改前的 `app.js` 和 `progress.md`。

## 2026-07-06 - Task: 将共享同步迁移到阿里云
### What was done
- 移除前端 Firebase SDK 和 Firestore 读写逻辑，改为通过阿里云 API 读取、保存共享菜谱。
- 保留浏览器本地缓存降级；阿里云未配置或请求失败时，页面会明确提示当前仅本地保存。
- 增加阿里云函数计算后端示例，用 OSS 中的 JSON 文件保存共享菜谱数据。
- 更新使用文档和产品计划，补充阿里云部署、环境变量、跨域和回滚说明。

### Testing
- `node --check E:/recipe-site/app.js`：通过，前端 JavaScript 无语法错误。
- `node --check E:/recipe-site/aliyun/recipe-api/index.js`：通过，阿里云函数 JavaScript 无语法错误。
- 云端联调未执行：需要先在阿里云创建 OSS Bucket、函数计算 HTTP 触发器，并把公网 API 地址填入 `ALIYUN_API_BASE_URL`。

### Notes
- `app.js`：将云端同步从 Firebase Firestore 改为阿里云 HTTP API，并增加 15 秒轮询和同步状态提示。
- `index.html`：移除 Firebase SDK 引用，增加云端同步状态展示节点。
- `styles.css`：新增同步状态标签的云端/本地样式。
- `aliyun/recipe-api/index.js`：新增函数计算菜谱 API，支持 `GET /recipes`、`PUT /recipes` 和 `OPTIONS`。
- `aliyun/recipe-api/package.json`：新增阿里云函数依赖配置。
- `README.md`：更新当前能力、限制和技术栈，说明阿里云同步路线。
- `docs/product-plan.md`：将当前架构和阶段目标改为阿里云函数计算 + OSS。
- `docs/usage.md`：补充阿里云同步状态、本地降级和上线说明。
- `docs/aliyun-setup.md`：新增阿里云部署配置说明。
- `progress.md`：追加本轮迁移记录、验证结果和回滚方式。
- 回滚方式：恢复本轮修改前的 `app.js`、`index.html`、`styles.css`、`README.md`、`docs/product-plan.md`、`docs/usage.md` 和 `progress.md`，并删除 `aliyun/recipe-api/` 与 `docs/aliyun-setup.md`。

## 2026-07-06 - Task: 修复阿里云函数接口无响应
### What was done
- 将阿里云菜谱 API 的函数入口改为同时兼容 Promise 返回和 callback 返回，避免部分 Node.js 运行时等待不到响应导致页面显示 `ERR_INVALID_RESPONSE`。
- 在阿里云配置说明中补充 `ERR_INVALID_RESPONSE` 排查点，强调应使用事件函数 + HTTP 触发器，并保持入口为 `index.handler`。

### Testing
- `node --check E:/recipe-site/aliyun/recipe-api/index.js`：通过，阿里云函数 JavaScript 无语法错误。
- 本地模拟 `OPTIONS /recipes` 的 Promise 返回：通过，返回 `204`。
- `curl -vk --max-time 8 https://recipe-api-uymdkfbhbi.cn-hangzhou.fcapp.run/recipes`：当前线上地址仍超时且没有返回内容，说明线上函数尚未重新部署本轮修复代码，或函数类型/触发器配置仍需在阿里云控制台调整。

### Notes
- `aliyun/recipe-api/index.js`：调整函数入口兼容方式，保留原有 `GET /recipes`、`PUT /recipes` 和 `OPTIONS` 行为。
- `docs/aliyun-setup.md`：补充接口无响应时的部署配置排查说明。
- `progress.md`：追加本轮修复、验证结果和回滚方式。
- 回滚方式：恢复本轮修改前的 `aliyun/recipe-api/index.js`、`docs/aliyun-setup.md` 和 `progress.md`。

## 2026-07-07 - Task: AI 面板第二阶段改造
### What was done
- AI 面板打开后显示 4 个快捷入口按钮（视频链接、字幕文案、食材推荐、优化菜谱），不再只显示文字欢迎语。
- 点击入口后自动显示对应引导提示，输入框切换为对应占位符，对话区显示。
- AI 返回菜谱 JSON 时渲染为草稿卡片（菜名、耗时/成本/场景标签、介绍、食材分类清单、步骤列表），不再显示原始代码块。
- 用户发消息后快捷入口自动隐藏；点「新对话」重新出现。

### Testing
- `node --check E:/recipe-site/app.js`：通过，JavaScript 无语法错误。
- 浏览器自动化未执行：当前环境缺少 Chrome/Chromium；需在浏览器手动验证 AI 面板快捷入口点击和草稿卡片渲染效果。

### Notes
- `app.js`：重构 `initFloatAi`（增加快捷入口点击处理）、`floatAiStart`（重置时显示快捷入口）、`floatAiAppend`（草稿卡片渲染）、`floatAiSend`（发消息时隐藏快捷入口），新增 `buildDraftCard`。
- `index.html`：AI 面板消息列表上方新增快捷入口 HTML 结构。
- `styles.css`：新增快捷入口按钮和草稿卡片样式。
- `progress.md`：追加本轮改动记录。
- 回滚方式：恢复本轮修改前的 `app.js`、`index.html`、`styles.css` 和 `progress.md`。

## 2026-07-07 - Task: 分类标签过滤 + 修改人昵称 + 最近修改时间
### What was done
- 菜谱列表顶部新增场景分类标签（全部/早餐/午餐/晚餐/宵夜/快手菜/健身餐/下饭菜），点击后按 occasion 字段模糊过滤，可与搜索关键词叠加使用。
- 顶部新增「我的昵称」入口，用户可填写昵称并保存到浏览器本地；昵称会随新增或修改菜谱一起保存。
- 每道菜保存时自动记录 `updatedAt`（ISO 时间）和 `author`（当前昵称，默认"匿名"）。
- 菜谱详情页 meta 信息区新增「👤 添加者」和「🕐 最近更新」展示（有值时才显示）。

### Testing
- `node --check E:/recipe-site/app.js`：通过，JavaScript 无语法错误。
- 浏览器自动化未执行：需在浏览器手动验证标签切换过滤、昵称保存和详情页时间显示。

### Notes
- `app.js`：新增 `CATEGORY_TABS` 常量、`activeCategoryTab` 状态、`renderCategoryTabs` 函数；`renderList` 增加分类过滤；`saveRecipe` 增加 `updatedAt` 和 `author`；`normalizeRecipes` 补兼容默认值；`renderDetail` 增加作者和时间显示；新增 `formatDateTime` 工具函数；新增昵称面板初始化逻辑。
- `index.html`：新增分类标签容器、昵称按钮和昵称面板 HTML。
- `styles.css`：新增分类标签、昵称面板样式。
- `progress.md`：追加本轮改动记录。
- 回滚方式：恢复本轮修改前的 `app.js`、`index.html`、`styles.css` 和 `progress.md`。

## 2026-07-07 - Task: 新增菜谱世界大类系统（两层过滤 + 可增删改）
### What was done
- 在菜谱列表场景标签上方新增一排「世界大类」主导航，默认 4 个大类（现实中的饭、二次元中的饭、黑暗料理、存在于幻想中的饭），点击后与下方场景标签叠加过滤（先关键词、再世界大类、再场景标签）。
- 大类列表可由用户增删改，通过导航最右侧「＋管理」按钮以 prompt 交互完成，列表保存在浏览器本地；改名会同步更新内存中已有菜谱的所属世界，但不主动写回云端，避免批量覆盖风险。
- 每道菜新增所属世界字段，新增/编辑表单里以下拉选择，默认“现实中的饭”；老数据无该字段时按“现实中的饭”兜底。
- 菜谱详情页 meta 区新增「🌐 所属世界」展示。

### Testing
- `node --check E:/recipe-site/app.js`：通过，JavaScript 无语法错误。
- 浏览器自动化未执行：当前环境缺少 Chrome/Chromium；需在浏览器手动验证大类切换与场景标签的两层过滤、＋管理的增删改、表单下拉与详情页所属世界显示。

### Notes
- `app.js`：新增 `WORLD_CATEGORY_KEY`、`DEFAULT_WORLD_CATEGORIES` 常量与 `activeWorld`、`worldCategories` 状态；新增 `loadWorldCategories`、`saveWorldCategories`、`renderWorldTabs`、`openWorldManager`、`populateWorldSelect` 函数；`renderList` 增加世界大类过滤；`saveRecipe`、`normalizeRecipes` 增加 `world` 字段；`openNewEditor`、`openEditEditor` 填充并选中世界下拉；`init` 调用 `renderWorldTabs`；`renderDetail` meta 区显示所属世界。
- `index.html`：列表区 `#categoryTabs` 上方新增 `#worldTabs` 容器；编辑表单菜名下方新增「所属世界」`#recipeWorld` 下拉。
- `styles.css`：新增 `.world-tabs`、`.world-tab-btn`、`.world-tab-manage` 主导航样式（比场景标签更大更醒目，激活态品牌色实心，管理按钮虚线弱化）。
- `docs/usage.md`：记录内容清单补充“所属世界”，新增「世界大类导航」使用章节。
- `progress.md`：追加本轮改动记录。
- 回滚方式：恢复本轮修改前的 `app.js`、`index.html`、`styles.css`、`docs/usage.md` 和 `progress.md`（或 `git checkout -- app.js index.html styles.css docs/usage.md progress.md`）。

## 2026-07-07 - Task: 生成示例菜谱并安全追加到云端
### What was done
- 新增 8 道示例菜谱，覆盖 4 个世界大类：现实中的饭（蛋炒饭、番茄牛肉面）、二次元中的饭（黄金蛋包饭、海苔饭团）、黑暗料理（可乐泡面、彩虹芥末饺子）、存在于幻想中的饭（精灵行路面包、黄油啤酒布丁）。每道菜含完整食材分类、步骤、成本、耗时和场景标签，可直观展示大类导航与场景标签的两层过滤效果。
- 用安全合并脚本把示例追加到阿里云共享库：先拉取现有数据，按 id 去重后追加，再写回；操作前先完整备份云端数据。原有 6 道真实菜谱全部保留，追加后云端共 14 道。

### Testing
- `python -m json.tool aliyun/sample-recipes.json`：通过，示例 JSON 格式有效，8 道菜。
- `node aliyun/merge-samples.mjs`：执行成功，云端由 6 道变为 14 道，去重逻辑正常。
- 追加前后各拉取一次云端数据核对数量，确认真实菜谱未被覆盖。

### Notes
- `aliyun/sample-recipes.json`：新增示例菜谱数据文件。
- `aliyun/merge-samples.mjs`：新增安全合并脚本（拉取→去重追加→写回→核对）。
- `.gitignore`：新增，排除 `backups/`（云端快照，仅本地保留）和 `node_modules/`。
- `backups/`：本地保存了追加前的云端数据快照，未入库。
- 回滚方式：如需移除示例，可用 `backups/` 里追加前的快照文件通过 PUT 写回云端（`curl -X PUT ... --data-binary @备份文件`）；本地文件删除 `aliyun/sample-recipes.json` 和 `aliyun/merge-samples.mjs` 即可。

## 2026-07-07 - Task: 抓取 HowToCook 开源菜谱并解析为本站格式(仅本地)
### What was done
- 从开源项目 HowToCook（The Unlicense / 公共领域）抓取菜谱并解析成本站菜谱对象，覆盖早餐、主食、素菜、荤菜、汤、甜品、水产、饮品 8 个分类，每类 6 道，共 48 道，全部写入本地 JSON 文件。
- 仅产出本地脚本和数据文件，未写云端、未做任何 git 操作。
- 抓取列表走 GitHub contents API，单文件正文优先 jsdelivr CDN 并回退 raw.githubusercontent，带超时与重试；对子目录类型的菜自动进目录取同名 .md。
- 解析做了三处针对真实数据的适配：原料列表兼容 `-`/`*`/`+` 三种符号并跨 `### 原料` 子段收集（跳过纯“工具”子段）；步骤只取“操作”段的顶层有序项，忽略缩进子项；耗时只从介绍段提取总时长，避免误抓正文分步时长（如戚风蛋糕曾被误填 10 分钟，修复后不再出现）。

### Testing
- `node --check aliyun/fetch-howtocook.mjs`：通过，脚本无语法错误。
- `node aliyun/fetch-howtocook.mjs`：执行成功，8 分类各 6 道共 48 道全部解析成功，无抓取失败，逐道打印进度。
- `python -m json.tool aliyun/howtocook-recipes.json`：通过，JSON 格式有效。
- 字段完整性校验：48 道均含 13 个字段，world 统一为“现实中的饭”，原料数与步骤数均非空，介绍均 ≤120 字；抽查太阳蛋（原料5/步骤9/约3分钟）、戚风蛋糕（子目录+`### 原料`子段，原料6/步骤37）、可乐鸡翅解析正确。
- time 字段 26 道非空，逐一核对疑似项确认均来自介绍段总时长（此前的“疑似”是简介截断到120字导致的假阳性，非误提取）。

### Notes
- `aliyun/fetch-howtocook.mjs`：新增抓取+解析脚本，含 jsdelivr/raw 双源回退、重试、子目录处理、markdown 分段解析。
- `aliyun/howtocook-recipes.json`：新增产出数据，48 道菜，约 122KB。
- 未改动云端、未 git 提交；未新增行为/配置/依赖，故未改 `docs/`。
- 回滚方式：删除 `aliyun/fetch-howtocook.mjs` 和 `aliyun/howtocook-recipes.json` 两个新增文件即可，无其他改动。

## 2026-07-07 - Task: 清理 HowToCook 数据并导入云端
### What was done
- 清理抓取到的 HowToCook 菜谱：把误当成食材的厨具（面包机、微波炉、高压锅、平底锅、漏勺等）从食材清单里剔除，共剔除 32 个厨具条目，涉及 20 道菜，菜谱总数不变（48 道）。
- 用安全合并脚本把 48 道 HowToCook 菜谱按 id 去重追加到阿里云共享库；操作前完整备份云端数据。原有 14 道（含真实菜谱和示例）全部保留，追加后云端共 62 道。
- HowToCook 采用 The Unlicense（公共领域）许可，数据可自由使用，来源已在 source 字段标注为"HowToCook 程序员做饭指南"。

### Testing
- `node aliyun/clean-howtocook.mjs`：执行成功，剔除 32 个厨具条目。
- `python -m json.tool aliyun/howtocook-recipes.json`：清理后 JSON 仍有效。
- `Grep` 复查厨具残留：仅剩菜名"B52轰炸机"（饮品名，非食材），食材清单已无厨具。
- `node aliyun/merge-howtocook.mjs`：云端由 14 道变为 62 道，去重逻辑正常。

### Notes
- `aliyun/clean-howtocook.mjs`：新增厨具清理脚本，仅改 ingredients 数组，不动菜名和步骤，含食材白名单防误删。
- `aliyun/merge-howtocook.mjs`：新增安全合并脚本（拉取→去重追加→写回→核对）。
- `aliyun/howtocook-recipes.json`：清理后就地更新。
- `backups/`：导入前的云端快照，仅本地保留。
- 回滚方式：用 `backups/cloud-backup-before-htc-*.json` 通过 PUT 写回云端即可移除这批 HowToCook 菜谱。

## 2026-07-07 - Task: 新增"配一桌菜"和"我有什么食材"两个做饭决策功能
### What was done
- 模仿 HowToCook 招牌玩法，新增两个功能面板并在顶部加入口按钮。
- 「配一桌菜」：输入荤菜、素菜、主食/汤的数量，系统按荤素主食自动分类并随机凑出一桌菜，支持"换一桌"，点菜名进详情；菜谱不够时提示。
- 「我有什么食材」：输入手边食材（空格/逗号分隔），按主料双向包含匹配，按命中数排序展示能做的菜，显示命中食材、还差什么和匹配度，点菜名进详情。

### Testing
- `node --check E:/recipe-site/app.js`：通过，JavaScript 无语法错误。
- `Grep` 核对：两个面板的 DOM 引用、事件绑定、5 个核心函数均已接好。
- 浏览器自动化未执行：当前环境缺少 Chrome/Chromium；需在浏览器手动验证凑一桌、换一桌、食材反查和点击进详情。

### Notes
- `app.js`：新增 `toggleMealPlanPanel`、`classifyDish`、`pickRandom`、`generateMealPlan`、`toggleByIngredientPanel`、`searchByIngredient` 函数及相关 DOM 引用和事件绑定；复用 `getRecipeGroups`、`clampNumber`、`render` 等现有函数。
- `index.html`：顶部新增「配一桌菜」「我有什么食材」入口按钮，新增两个面板 section。
- `styles.css`：新增两个面板及结果卡片样式。
- `progress.md`：追加本轮改动记录。
- 回滚方式：恢复本轮修改前的 `app.js`、`index.html`、`styles.css` 和 `progress.md`。

## 2026-07-07 - Task: 新增"外国菜"大类并导入首批外国菜谱
### What was done
- 世界大类新增"外国菜"，并让大类加载逻辑自动为老用户补齐新增的默认大类（保留用户自定义大类），避免老浏览器看不到新分类。
- 从开源项目 json-cookbook（CC / 公共领域授权，作者已做版权甄别）下载 100 道外国菜谱原始数据。
- 亲自翻译首批 12 道（11 道经典鸡尾酒 + 1 道美式焗饭）为中文，含单位换算（盎司→ml、华氏度→摄氏度）、保留英文原名、标注来源链接，归到"外国菜"大类，安全去重追加到云端。
- 云端菜谱由 62 道增加到 74 道。
- 更新 README 和产品计划书：补充世界大类、场景标签、配一桌菜、食材反查、昵称、开源数据来源等已完成能力，并在阶段排期标注各阶段完成状态。

### Testing
- `node --check E:/recipe-site/app.js`：通过，JavaScript 无语法错误。
- `python -m json.tool aliyun/foreign-part1.json`：通过，翻译数据 JSON 有效，12 道。
- 导入脚本执行：云端由 62 道变为 74 道，去重正常。
- 导入前已备份云端数据到 `backups/`。

### Notes
- `app.js`：`DEFAULT_WORLD_CATEGORIES` 增加"外国菜"；`loadWorldCategories` 增加默认大类补齐逻辑。
- `aliyun/foreign-raw.json`：新增，json-cookbook 100 道原始英文数据。
- `aliyun/foreign-part1.json`：新增，首批 12 道中文翻译成品。
- `README.md`、`docs/product-plan.md`：更新已完成能力和阶段状态。
- `backups/`：导入前云端快照，仅本地保留。
- 回滚方式：用 `backups/cloud-backup-before-foreign-*.json` 通过 PUT 写回云端可移除这批外国菜；本地恢复 `app.js`、`README.md`、`docs/product-plan.md` 修改前版本，删除 `aliyun/foreign-raw.json` 和 `aliyun/foreign-part1.json`。
- 待办：外国菜剩余 88 道分批翻译导入。

## 2026-07-07 - Task: AI 批量整理菜谱功能
### What was done
- 在 AI 悬浮助手里新增「批量整理菜谱」快捷入口：用户粘贴一大段含多道菜的文字，AI 一次性拆分整理成多道结构化菜谱。
- 拆分结果以可勾选的预览卡片列表展示（默认全选，显示菜名、场景、耗时、食材数、步骤数，可点开看详情），底部支持全选/全不选与实时统计的保存按钮。
- 用户确认后，选中的菜按当前世界大类、本地昵称、当前时间补全字段并归一化，一次性加入菜谱库并触发本地保存与云端同步、刷新列表。
- 复用现有 AI 配置、AI 调用模式、normalizeRecipes、saveToLocalStorage、render、escapeHtml 等既有能力，未改动云端接口和其它功能。

### Testing
- `node --check E:/recipe-site/app.js`：通过，JavaScript 无语法错误（改动全程共校验 3 次，均通过）。
- 未做浏览器端联调与真实 AI 接口调用验证：缺少可用 API Key 与运行环境，属本次验证缺口；逻辑正确性以代码审阅与语法检查为准。

### Notes
- `index.html`：在 `#floatAiShortcuts` 快捷入口区新增第 5 个按钮 `data-action="batch"`（批量整理菜谱入口）。
- `app.js`：新增批量整理系统提示词常量 `BATCH_AI_SYSTEM_PROMPT`；新增全局变量 `floatAiBatchMode`、`batchDraftList`；新增函数 `openBatchMode`、`handleBatchParse`、`parseBatchReply`、`renderBatchPreview`、`saveBatchSelected`；改造 `floatAiSend` 开头加入批量模式分支；快捷入口监听增加 batch 分支并在切换/新对话时复位批量状态。
- `styles.css`：新增 `.batch-preview` 及其子元素样式（预览卡片列表、复选框、meta、详情、底部操作条），风格与既有 `.draft-card`、`.float-ai-shortcut-btn` 一致。
- 回滚方式：`git revert 08592d1` 或 `git reset --hard dd530b2`（dd530b2 为本轮改动前提交）可回到施工前状态。

## 2026-07-07 - Task: 图片上传方案写入计划书
### What was done
- 应用户要求，将"图片上传"功能的方案设计和取舍写入产品计划书，暂不实现代码。
- 新增「9.5 图片上传方案」章节：说明当前架构存不了大图的难点，对比三种方案（A：Base64 存进数据零成本但会拖慢同步；B：阿里云 OSS 上传，正规稳定但需配置且有小额费用；C：第三方免费图床，不稳定），给出建议路线和待实现清单。
- 阶段排期新增「图片上传（规划中）」条目，与新章节呼应。

### Testing
- 纯文档改动，无代码变更，无需运行测试。

### Notes
- `docs/product-plan.md`：新增 9.5 图片上传方案章节；阶段排期新增图片上传规划条目。
- `progress.md`：追加本轮记录。
- 回滚方式：恢复本轮修改前的 `docs/product-plan.md` 和 `progress.md`。

## 2026-07-07 - Task: 按工具筛选菜谱（勾选手头工具看能做什么）
### What was done
- 新增「我有什么工具」功能：用户勾选自己厨房里有的设备类工具，一键筛出当前能做的菜。
- 筛选结果分两档展示：所需工具齐全（或无需特殊工具）的标「可以做」，只差 1 到 2 件的标「差一点」并高亮缺失工具；缺 3 件及以上的自动隐藏，减少干扰。能做的菜整卡点击进详情，差一点的菜「进详情」与「问 AI 怎么替代」分开互不干扰。
- 「问 AI 怎么替代」复用右下角 AI 助手：自动打开面板并就缺失工具向 AI 询问替代方案，未配置 API Key 时给出提示。
- 编辑表单新增「所需工具」输入（空格分隔），菜谱详情页在基础信息下方展示「所需工具」标签；用户勾选的工具清单存本地浏览器。
- 同步更新使用说明，新增「按工具筛选菜谱」章节并在记录内容里补充所需工具字段。

### Testing
- `node --check E:/recipe-site/app.js`：通过，JavaScript 无语法错误（改动全程校验 2 次均通过）。
- CSS 花括号配平检查：通过（开合各 372）。
- HTML 新增元素 ID 与 app.js `querySelector` 引用一致性核对：通过（myToolsButton/closeMyToolsButton/applyToolsFilterButton/clearToolsButton/myToolsPanel/myToolsChips/myToolsResult/recipeTools 均一一对应）。
- 新增 6 个函数定义存在性核对：通过（toggleMyToolsPanel、renderMyToolsChips、renderMyToolsResult、askToolAlternative、loadMyTools、saveMyTools）。
- 未做浏览器端联调与真实 AI 接口调用验证：缺少可用运行环境与 API Key，属本次验证缺口；逻辑正确性以代码审阅与语法/一致性检查为准。

### Notes
- `index.html`：顶部操作区在「我有什么食材」后新增「我有什么工具」按钮；`#byIngredientPanel` 后新增 `#myToolsPanel` 面板；编辑表单在「具体做法」后新增「所需工具」输入框 `#recipeTools`。
- `app.js`：新增常量 `ALL_TOOLS`、`MY_TOOLS_KEY` 与全局变量 `myTools`；新增函数 `loadMyTools`、`saveMyTools`、`toggleMyToolsPanel`、`renderMyToolsChips`、`renderMyToolsResult`、`askToolAlternative`；`bindEvents` 新增 4 处工具面板事件绑定；`openNewEditor`/`openEditEditor` 增加对 `#recipeTools` 的清空/回填；`renderDetail` 在 meta-grid 后增加所需工具标签区。数据读取（saveRecipe、normalizeRecipes 的 tools 字段）为既有能力，未改动。
- `styles.css`：`.my-tools-panel` 纳入面板显隐规则；新增 `.my-tools-chips`、`.tool-chip`、`.my-tools-actions`、`.my-tools-grid`、`.my-tools-card` 及结果卡片子元素、`.tool-tags`/`.tool-tag` 等样式，风格与既有 `.by-ingredient-*`、`.filter-chip` 一致。
- `docs/usage.md`：记录内容补充「所需工具」字段；新增「按工具筛选菜谱」章节。
- 未改动云端接口和其它功能。
- 回滚方式：`git reset --hard d873793`（d873793 为本轮改动前提交）可回到施工前状态。

## 2026-07-07 - Task: 工具字段数据层与老菜工具推断回填
### What was done
- 为菜谱新增"所需工具"（tools）字段的数据层支持：normalizeRecipes 和 saveRecipe 已兼容 tools 字段。
- 编写工具推断脚本，用规则从每道菜的步骤/菜名/描述自动推断所需设备类工具（炒→炒锅、烤→烤箱、炸→油炸锅、蒸→蒸锅等），只标有区分度的设备，不标家家都有的案板菜刀。
- 对云端 74 道菜运行推断并回填 tools 字段，64 道成功标注；回填前已备份云端。
- 界面层（编辑表单工具输入、详情页工具标签、"我有什么工具"筛选面板、缺工具问 AI 替代）由配套提交完成。
- 更新 README 和产品计划书，补充工具筛选能力和字段。

### Testing
- `node aliyun/infer-tools.mjs --dry`：预览推断质量，优化规则去掉案板菜刀噪声后，番茄炒蛋→仅炒锅、糖醋里脊→炒锅+汤锅+油炸锅，合理。
- 正式回填：云端 74 道全部写入 tools 字段，验证通过。
- `node --check E:/recipe-site/app.js`：通过。

### Notes
- `aliyun/infer-tools.mjs`：新增工具推断回填脚本，支持 --dry 预览，不覆盖已有非空 tools。
- `app.js`：normalizeRecipes、saveRecipe 增加 tools 字段（界面层函数由配套提交完成）。
- `README.md`、`docs/product-plan.md`：补充工具筛选能力。
- `backups/`：回填前云端快照。
- 回滚方式：用 `backups/cloud-backup-before-tools-*.json` 通过 PUT 写回云端可清除 tools 字段；本地 git reset 到本轮前提交。

## 2026-07-07 - Task: 点菜看做法改为全屏做法页 + 返回按钮
### What was done
- 把"点菜看做法"从右侧栏常驻详情改成全屏覆盖做法页：点任意菜从整屏盖上一个 fixed 覆盖层，展示该菜完整详情（图、标题、版本切换、meta、工具、食材、步骤、视频、编辑按钮），左上角"← 返回"按钮或 ESC 键关闭回到列表，手机电脑统一体验。
- 复用现有详情 HTML 生成逻辑：renderDetail 增加可选 target 参数，默认渲染到原 #recipeDetail，打开全屏页时渲染到 #recipeModalBody，并把编辑/版本切换/步骤折叠等事件绑定统一指向 target，确保全屏页内交互正常。
- 全屏页内版本切换保持停留在全屏页（重新 openRecipeModal 切换）；点编辑按钮先关闭全屏页再打开编辑器，避免被覆盖层遮挡。
- 列表点菜（菜卡主体、版本 pill）和 5 处结果跳转（今天吃什么结果与"去看做法"、配一桌菜、食材反查、工具筛选）统一改为调用 openRecipeModal。
- 列表改为单栏铺满宽度，原右侧 detail-panel 隐藏；render() 精简为只渲染列表，详情仅在打开全屏页时渲染。

### Testing
- `node --check E:/recipe-site/app.js`：通过（SYNTAX_OK）。
- 自查：全文已无 `#recipeDetail` 的 scrollIntoView 调用；8 处 openRecipeModal 调用点 id 来源与原代码一致（btn.dataset.id / picked.id / group.recipes[0].id / button.dataset.id / 形参 id）。
- 说明：未做浏览器手动交互验证（无自动化 UI 测试入口），仅静态语法与调用点核对。

### Notes
- `index.html`：在 </main> 后新增 #recipeModal 全屏做法页容器（返回按钮条 + #recipeModalBody）。
- `app.js`：顶部新增 recipeModal/recipeModalBody 引用；renderDetail 增加 target 参数并把事件绑定指向 target；新增 openRecipeModal/closeRecipeModal；render() 去掉 renderDetail 调用；renderList 两处点击与 5 处结果跳转改为 openRecipeModal；bindEvents 绑定返回按钮与 ESC 关闭。
- `styles.css`：.layout 改单栏；.detail-panel 改为 display:none；新增 .recipe-modal / .recipe-modal-bar / .recipe-modal-back / .recipe-modal-body 样式（z-index:900，低于 AI 悬浮助手 9999）。
- 回滚方式：git reset 到本轮提交前，或还原上述三文件到 HEAD~1。

## 2026-07-07 - Task: 全站 UI 改造为深色 Apple 风 + 滚动联动动效
### What was done
- 以同目录 showcase.html 为设计基准，把正式站整套视觉从奶油白风改成深色美食杂志风（深色底 + 暖橙金渐变 + 毛玻璃 + Apple 缓动），这是纯换皮，不改任何业务功能。
- styles.css 全量重写：统一深色配色变量、按钮组、hero 首屏（光晕呼吸 + 标题渐变进场）、功能亮点条、主布局与面板、世界/场景 tab、菜谱列表卡片、全屏做法页与详情各区块、编辑器与所有表单控件、10 个功能面板及其结果卡片、AI 悬浮助手整套、同步状态、各类 chip/badge，并覆盖平板/手机/超小屏三档响应式。
- 深色表单适配：输入框/文本域/下拉一律深色半透明底 + 浅色字 + 聚焦品牌色描边，placeholder 用弱化色，select 选项深色，复选框与滑块用品牌 accent-color，无图占位改深色渐变不露白。
- index.html 只加视觉标记：hero 内新增光晕层、给功能亮点条与列表面板加 data-reveal 滚动渐显（含 d1/d2/d3 延迟），未改动任何 id/name/按钮。
- app.js 末尾新增独立 initScrollFx()：滚动渐显、hero 视差、列表卡片景深联动、全屏做法页步骤逐条进入；通过 MutationObserver 监听动态渲染的列表与做法页，无需改 renderList/openRecipeModal 即可对动态元素生效；手机与 prefers-reduced-motion 自动降级。

### Testing
- `node --check E:/recipe-site/app.js`：通过。
- 关键 id 核查：recipeList、recipeModal、editorPanel、floatAiPanel、worldTabs、categoryTabs、recipeForm、whatToEatPanel、mealPlanPanel、byIngredientPanel、myToolsPanel、shoppingListPanel、customizePanel、nicknamePanel 全部存在。
- 结构完整性：index.html 的 id 总数 148→148 无增删、name 属性无变化、button 标签 53→53 无删除；git diff 确认只新增 hero-glow 与 data-reveal 标记。
- CSS 花括号配平 419/419；styles.css 无残留浅色硬编码背景块。
- 兼容性核查：applyAppearance() 会用内联样式覆盖 --brand/--brand-dark/--soft/--page-bg 等 7 个变量，故新 CSS 主视觉背景改用固定的 --bg/--card/--brand-soft，完全不引用会被覆盖成浅色的 --soft 与 --page-bg（grep 确认零引用），可视化调整功能所依赖的 7 个变量名均保留定义。
- app.js 为纯末尾追加（130 insertions / 0 deletions），零侵入现有业务函数。
- 说明：无自动化 UI 测试入口，未做浏览器像素级渲染验证，仅静态语法、结构、变量依赖与选择器覆盖核对。

### Notes
- `styles.css`：全量重写为深色 Apple 风（本轮唯一主体改动，覆盖全部现有组件选择器）。
- `index.html`：hero 内新增 `<div class="hero-glow">`；功能亮点条 4 张卡片与 list-panel 加 data-reveal（部分带 d1/d2/d3）；未触碰任何 id/name/按钮/表单结构。
- `app.js`：仅在文件末尾追加 initScrollFx() 独立 IIFE（滚动渐显 + hero 视差 + 卡片景深 + 步骤进入 + 双端降级），未改动任何已有函数。
- 回滚方式：git reset 到本轮提交前，或将 styles.css、index.html、app.js 三个文件还原到 HEAD~1。

## 2026-07-07 - Task: 全站 UI 改造为深色 Apple 风（文档更新）
### What was done
- 配合全站 UI 深色 Apple 风改造，更新 README 和产品计划书。
- README 新增「界面风格」章节，说明深色视觉和滚动联动动效、三档响应式、无障碍降级。
- 产品计划书阶段排期新增「第 3.5 阶段：深色 Apple 风 UI 二次改版 ✅ 已完成」。
- UI 改造本体（styles.css 全量重写、index.html 加动效标记、app.js 追加 initScrollFx 滚动联动）由前一提交完成，纯换皮，保留全部功能 DOM 钩子。

### Testing
- `node --check E:/recipe-site/app.js`：通过。
- 关键 id 核查：14 个功能面板/容器 id 全部保留，各 1 处；id 总数、button 数量无增删。
- app.js 相对回滚点为 130 insertions / 0 deletions（纯追加，IIFE 隔离，零侵入业务逻辑）。
- CSS 花括号 419/419 配平。
- 滚动动效选择器（hero-copy、recipe-group-card、steps li、data-reveal、step-in）均与真实 DOM 和 CSS 对应。
- 未做真机像素级渲染验证：当前环境无浏览器截图能力，需在浏览器手动确认视觉效果。

### Notes
- `README.md`：新增界面风格章节。
- `docs/product-plan.md`：阶段排期新增第 3.5 阶段。
- `progress.md`：追加本轮记录。
- `showcase.html`：Apple 风样板预览页（回滚点提交），可保留作设计参考。
- 已知取舍：深色风下"调整网站"改主色时，纯色块跟随变化，但大字/光晕橙金渐变固定不跟随，改背景色对深色底不生效——为保深色不被冲垮的合理权衡。
- 回滚方式：`git reset --hard f12244e`（UI 改造前的样板回滚点），或 `git revert` 对应提交。

## 2026-07-07 - Task: 首页改为世界大类横向滚动展示，解决手机超长列表

### What was done
- 解决"手机首页被 74 道菜撑成无限长纵向列表"的问题，首页默认态改为 Netflix 式：每个世界大类一排横向滚动卡片，页面高度受控。
- renderList 拆成两种模式：首页默认态（无搜索、无世界筛选、无场景筛选）走横向分组；用户一旦搜索或筛选则回落到原纵向列表，空状态文案保留。
- 抽出 createRecipeCard 复用函数生成单张分组卡片（含封面、做法数、标签、版本切换及点击事件），两种模式共用，卡片交互与原逻辑完全一致。
- 新增 renderHomeRows：按 worldCategories 顺序为每个有菜的大类渲染一行，每行最多前 12 道，超出时末尾放"查看全部 N 道"卡片（点击切到该大类纵向完整列表并高亮世界标签）；world 指向已删除大类的菜归入末尾"其它"行。
- 滚动景深联动兼容：initScrollFx 卡片景深循环内跳过 .home-row-track 内的卡片，避免 transform 干扰横向滚动。
- 补充深色 Apple 风横向行样式：行标题+计数、横向滚动容器（scroll-snap、细滚动条）、行内竖版固定宽度卡片、查看全部卡片，并在手机端缩小卡片宽度、适配标题字号。

### Testing
- `node --check E:/recipe-site/app.js`：通过（SYNTAX_OK）。
- grep 核查：#recipeList、recipe-group-card、openRecipeModal、createRecipeCard、renderHomeRows、home-row-track 均在位，卡片事件绑定（recipe-group-main / version-pill → closeEditor + openRecipeModal）完整保留。
- 人工核对新增两段 CSS 花括号配平、媒体查询归属 max-width:600px 段（与 JS 768px 逻辑各自独立，手机端卡片景深本就被现有 !important 关闭）。
- 未做真机像素级渲染验证：当前环境无浏览器，横滑手感、snap 效果、查看全部跳转需浏览器手动确认。

### Notes
- `app.js`：renderList 拆分为模式判断 + 复用 createRecipeCard + 新增 renderHomeRows；initScrollFx 景深循环加一行 .home-row-track 跳过判断。业务接口（getRecipeGroups、openRecipeModal、closeEditor、renderWorldTabs、activeWorld/activeCategoryTab）均复用未改逻辑。
- `styles.css`：新增首页横向行样式块（.home-row / .home-row-head / .home-row-track / 行内卡片竖版覆盖 / .home-row-more），移动端媒体查询追加横向行卡片缩宽与标题字号适配。
- `index.html`：未改动（#recipeList 容器已存在，直接复用）。
- 回滚方式：`git checkout 06dffe9 -- app.js styles.css` 恢复本轮改动前版本，或 `git revert` 本次提交。

## 2026-07-07 - Task: 修复手机首页超长列表 + 首页横向滚动展示
### What was done
- 定位并修复"手机首页能无限下滑、底部像有空白"的问题：根因是首页把 74 道菜全部纵向铺开，列表单块高达 12907px。用无头浏览器（Edge headless + DevTools 协议）在 390×844 手机视口实测确认。
- 首页默认态改为 Netflix 式：按世界大类分排，每排横向滚动卡片，每排最多 12 道，超出放"查看全部"卡片跳到该大类完整列表。
- 搜索或筛选（世界/场景）时自动回落到原纵向完整列表，交互不变。
- 卡片生成抽成 createRecipeCard 复用，点卡进做法页、版本切换等事件完全保留。
- 修复横向滚动容器 min-width/max-width 约束，确保在视口内横滑不撑破布局。
- 滚动景深联动跳过横向行内卡片，避免 transform 干扰横滑。

### Testing
- `node --check E:/recipe-site/app.js`：通过。
- 无头浏览器实测（手机视口 390px）：页面高度 14302px → 约 3700px，5 个大类行正常，横向 track clientWidth 574px 受控、scrollWidth 2772px 可横滑。
- 关键接口 grep 核查：#recipeList、createRecipeCard、renderHomeRows、openRecipeModal 均在，逻辑完整。
- CSS 花括号配平。

### Notes
- `app.js`：renderList 拆分为首页横向模式（renderHomeRows）+ 筛选纵向模式，共用 createRecipeCard；initScrollFx 景深循环跳过 .home-row-track 内卡片。
- `styles.css`：新增 .home-row/.home-row-head/.home-row-track/.home-row-more 样式和移动端适配，横向容器加宽度约束。
- `README.md`、`docs/product-plan.md`：补充首页横向滚动展示说明。
- `progress.md`：追加本轮记录。
- 回滚方式：`git checkout 06dffe9 -- app.js styles.css` 回到首页改造前，或整体 `git reset --hard f12244e`。

## 2026-07-07 - Task: 按主流机型精准适配手机与平板
### What was done
- 参考 2024-2025 主流机型真实 CSS 逻辑宽度重新划分响应式断点：桌面 >1024、平板竖屏 768-1024、大屏手机 601-767、主流手机 ≤600（覆盖 iPhone 15/16≈393、Pro Max≈430、含 6.28 寸的安卓旗舰 393-430）、小屏手机 ≤375。
- 新增平板竖屏专属适配：功能亮点 4 列、首页横向卡片放大到 300px、搜索/筛选纵向列表改双列、做法页正文限宽、AI 面板加宽。
- 修复一个真实 bug：手机端整页横向溢出（会左右晃动）——根因是 .layout/.list-panel/.home-row 容器链缺 min-width:0，横向滚动卡片把整页撑宽。补齐容器收缩约束后消除。
- 修复 768px 同时命中两个媒体查询导致功能条列数冲突（改 601-767 避开重叠）。
- 首页列表按态加 is-home-view/is-list-view 标记，让平板双列样式只作用于纵向列表态，不破坏首页横向行。

### Testing
- `node --check E:/recipe-site/app.js`：通过；CSS 花括号配平。
- 无头浏览器（Edge）在 4 个真实机型尺寸实测：
  - iPhone15/16 (393)：无横向溢出，功能条 1 列，横向卡片 260px，track 约束在 319px
  - Pro Max/安卓旗舰 (430)：无横向溢出，track 356px
  - iPad 竖屏 (768)：无横向溢出，功能条 4 列，卡片 300px
  - iPad Pro (1024)：无横向溢出，功能条 4 列
- 修复前实测确认过手机端存在横向溢出，修复后复测消除。

### Notes
- `styles.css`：重构响应式断点分档，新增平板档，补 .layout/.list-panel/.recipe-list/.home-row/.home-row-track 宽度收缩约束。
- `app.js`：renderList 按态给 recipeList 加 is-home-view/is-list-view 类。
- `README.md`：更新适配机型说明。
- `progress.md`：追加本轮记录。
- 回滚方式：`git checkout 7236855 -- app.js styles.css README.md`。

## 2026-07-07 - Task: 修复顶部功能按钮点击后不滚动到面板
### What was done
- 修复用户反馈：点顶部"今天吃什么/配一桌菜/我有什么食材/我有什么工具/购物清单/调整网站"，面板其实已打开但页面不滚动过去，停在首屏看着像"没反应"。
- 新增 scrollPanelIntoView() 工具函数，6 个功能面板打开时平滑滚动到面板位置；新增菜谱编辑器同样加上，体验统一。关闭时不滚动。

### Testing
- `node --check E:/recipe-site/app.js`：通过。
- 无头浏览器实测（430px 手机视口）：点"今天吃什么"后 scrollY 0 → 1069，面板打开且顶部定位到视口顶部，确认滚动生效。

### Notes
- `app.js`：新增 scrollPanelIntoView；toggleWhatToEatPanel/toggleMealPlanPanel/toggleByIngredientPanel/toggleMyToolsPanel/toggleShoppingListPanel/toggleCustomizePanel 及 openNewEditor 打开时调用。
- `progress.md`：追加本轮记录。
- 回滚方式：`git checkout 4164383 -- app.js`。
