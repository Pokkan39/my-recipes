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

## 2026-07-07 - Task: 面板打开改为直接跳转（去掉滑动过程）
### What was done
- 用户反馈上一版是"点击后向下滑动"而非直接跳过去。根因是全局 CSS `html { scroll-behavior: smooth }`（第 55 行）让所有滚动都变平滑，JS 的 behavior:auto 被其覆盖。
- 将全局 scroll-behavior 改为 auto，scrollPanelIntoView 也用 behavior:auto，实现打开面板瞬间定位、无滑动过程。
- 保留 AI 助手消息区内部的 smooth（聊天滚到底），与页面定位无关。

### Testing
- `node --check E:/recipe-site/app.js`：通过；CSS 花括号配平。
- 无头浏览器实测：点"配一桌菜"后 60ms 即到位（scrollY 1069，与最终值一致），确认瞬间跳转而非平滑滑动，面板定位到视口顶部。

### Notes
- `styles.css`：第 55 行 html scroll-behavior smooth → auto。
- `app.js`：scrollPanelIntoView 用 behavior auto。
- 回滚方式：`git checkout 40c60eb -- app.js styles.css`。

## 2026-07-07 - Task: 第4阶段备份恢复 - 新增云端备份与云端恢复功能
### What was done
- 计划书第4阶段"备份恢复"已实现：新增"☁️ 云端备份"（直接从阿里云拉取当前数据下载为带时间戳 JSON 文件）和"☁️ 云端恢复"（选一个备份文件直接写回阿里云并刷新页面），与现有"导出备份/导入备份"（本地浏览器）并列。
- 云端恢复支持两种文件格式（{list:[...]} 或直接数组），有二次确认弹窗防误操作，恢复失败时给出明确提示。

### Testing
- `node --check E:/recipe-site/app.js`：通过，JavaScript 无语法错误。
- 功能逻辑核查：cloudBackup 调用已有 fetchCloudRecipes、cloudRestore 走 PUT 接口并 normalizeRecipes 归一化，与现有架构一致。
- 未做真机端对端验证：需配好阿里云 API 后手动测试备份下载和恢复上传流程。

### Notes
- `app.js`：bindEvents 新增两个事件绑定；新增 cloudBackup、cloudRestore 两个 async 函数（在 exportRecipes 之前）。
- `index.html`：顶部按钮区新增"☁️ 云端备份"按钮和"☁️ 云端恢复"文件选择标签。
- `progress.md`：追加本轮记录。
- 回滚方式：`git checkout a9798df -- app.js index.html`。

## 2026-07-07 - Task: 第4阶段操作日志 - 新增操作日志面板

### What was done
- 计划书第4阶段最后一项"操作日志"已实现，第4阶段全部完成。
- 顶部新增「📋 操作日志」按钮，点击展开日志面板，显示本浏览器内所有新增/修改/删除操作，最多保留最近 100 条。
- 日志条目在保存菜谱（新增/修改）和删除菜谱时自动写入 localStorage；操作类型用颜色标签区分（绿=新增、橙=修改、红=删除）。

### Testing
- `node --check E:/recipe-site/app.js`：通过（SYNTAX_OK）。
- CSS 花括号配平：464 open / 464 close。
- 关键标识符核查：activityLogButton、closeActivityLogButton、activityLogPanel、activityLogList、toggleLogPanel、renderLogPanel、appendLog、APP_LOG_KEY 引用一致，无悬空。
- 未做浏览器端联调：缺少 Chrome/Chromium；需手动验证日志面板展开、条目渲染和颜色标签。

### Notes
- `app.js`：新增 APP_LOG_KEY、APP_LOG_MAX 常量；新增 appendLog 工具函数；saveRecipe 增加 isEdit 判断并调用 appendLog；deleteCurrentRecipe 调用 appendLog；bindEvents 新增两处事件绑定；新增 toggleLogPanel、renderLogPanel 两个函数。
- `index.html`：顶部按钮区新增「📋 操作日志」按钮；editorPanel 前新增 #activityLogPanel 面板 section。
- `styles.css`：末尾新增操作日志面板各元素样式（log-entry、log-action 三色变体、log-name、log-meta、log-empty）。
- 回滚方式：`git checkout e455344^ -- app.js index.html styles.css`，或 `git revert e455344`。

## 2026-07-07 - Task: 自查bug修复 + UI动画升级

### What was done
- **Bug修复（6项）**：
  1. `#activityLogPanel` 位置错误（在 `<main>` grid 内会挤成一列）→ 移到 `<main>` 之前，与其他面板同级。
  2. CSS 变量 `--text-main`/`--text-dim` 未定义 → 改为已有的 `var(--text)`/`var(--muted)`；日志条目背景改为暖色调 `rgba(255,220,180,0.05)`；三色标签改用 `var(--leaf)`/`var(--brand-2)`/`var(--danger)`。
  3. `link.click()` 未挂载到 DOM 导致 Firefox 下载失败 → cloudBackup 和 exportRecipes 均补 `appendChild` + `removeChild`。
  4. `importRecipes` 和 `saveBatchSelected` 批量操作未记录操作日志 → 补调 `appendLog`。
  5. `openVideoHelper()` 缺 `populateWorldSelect()` → 补调，AI生成菜谱入口打开时世界大类下拉不再为空。
- **UI/动画升级（3项）**：
  1. hero-actions 按钮按"主操作 / 工具功能 / 设置"三组分层，中间组改用新 `.tool-button` 样式（圆角胶囊，带边框，有 hover 上浮微交互），设置组默认半透明悬停恢复。
  2. 新增 `@keyframes panelSlideIn` 和 `@keyframes logEntryIn`，所有 `.is-open` 面板和编辑器打开时触发滑入动效，操作日志条目逐条错落出现（30ms 步进）。
  3. 移动端适配：`.activity-log-panel` 纳入边距规则，`.tool-button` 手机端按 50% 宽自动换行。

### Testing
- `node --check app.js`：SYNTAX_OK。
- CSS 花括号配平：482 open / 482 close。
- 未做浏览器联调：按钮分组视觉、面板动效、日志条目动画需手动验证。

### Notes
- `app.js`：openVideoHelper 补 populateWorldSelect；importRecipes/saveBatchSelected 补 appendLog；cloudBackup/exportRecipes link.click 补 DOM 挂载；renderLogPanel 加 animation-delay 错落。
- `index.html`：#activityLogPanel 移到 `<main>` 之前；hero-actions 改为三分组（action-group--primary/tools/settings），工具按钮改 tool-button。
- `styles.css`：修正日志面板 CSS 变量和颜色；新增 panelSlideIn/logEntryIn keyframe；.is-open 面板和 editor-panel.is-open 加 panelSlideIn 动画；.log-entry 加 logEntryIn 动画；新增 action-group/tool-button 样式和手机端响应式。
- 回滚方式：`git checkout 815a970 -- app.js index.html styles.css`，或 `git revert 1898658`。

## 2026-07-08 - Task: 返回顶部按钮 + 手机端动画与UI精修

### What was done
- **新增返回顶部按钮**：固定在右下角的 `#backToTop` 悬浮按钮，滚动超过 400px 时淡入浮现，点击平滑回到页面顶部；按钮圆形设计、带毛玻璃效果，与 AI 助手按钮上下叠放不冲突。
- **修复手机端卡片动画**：原 `initScrollFx` 中手机端直接跳过卡片效果，现改为用 IntersectionObserver 在卡片进入视口时触发 `mobileCardIn` 淡入上浮动画，提升手机端浏览体验。
- **手机端UI精修（5处）**：卡片阴影与圆角更细腻、:active 状态按下缩放反馈；面板进入改为从底部上滑（`panelSlideInMobile`）；modal bar 和返回按钮触摸面积加大、按下反馈更流畅；所有主按钮、工具按钮加 :active 缩放；返回顶部按钮在手机端稍小并下移。

### Testing
- `node --check app.js`：SYNTAX_OK。
- CSS 花括号配平：502 open / 502 close。
- 未做浏览器联调：返回顶部按钮显隐阈值、手机端卡片入场动画、面板上滑动效、触摸反馈需手动验证。

### Notes
- `app.js`：initScrollFx 末尾补 IntersectionObserver 给手机端卡片加入场动画；bindEvents 末尾新增返回顶部按钮的滚动监听与点击回顶逻辑。
- `index.html`：AI 助手按钮之前插入 `#backToTop` 按钮（↑ 箭头，默认 hidden）。
- `styles.css`：末尾追加 `.back-to-top` 样式（圆形、毛玻璃、淡入上浮）、`.back-to-top.is-visible` 显示态、`@keyframes mobileCardIn` 卡片入场动画、`@media (max-width: 768px)` 内追加卡片阴影圆角精修、面板上滑动画 `panelSlideInMobile`、modal bar 和按钮触感增强、按钮 :active 缩放、返回顶部尺寸位置调整。
- 回滚方式：`git checkout 1898658 -- app.js index.html styles.css`，或 `git revert HEAD`。

## 2026-07-08 - Task: 本地图片上传（方案 A：Base64 压缩，零成本过渡）

### What was done
- **新增本地选图上传**：编辑菜谱时除了原有"填图片网址"，现在可以点"📷 从本地选图（自动压缩）"从本机（含手机拍照/相册）选图，前端用 Canvas 压缩后转成 Base64 直接存进菜谱数据，无需任何后端和费用。
- **自动压缩控制体积**：图片最大边限制 1280px 等比缩小，JPEG 质量从 0.82 逐级下调直到单图 ≤300KB；透明 PNG 转 JPEG 时铺白底避免黑背景。
- **图片预览与移除**：选图或手填网址后即时显示缩略图，可一键移除；新建、编辑、AI 填充（两个入口）等所有打开编辑器的场景都会正确刷新预览状态。
- **数量软提示**：当菜谱库里本地图片已达 12 张时，再选图会提醒"本地图片较多会拖慢多人同步，建议后续升级云端上传"，但仍允许继续（过渡方案不强制阻断）。
- 说明：这是计划书 §9.5 的方案 A 过渡实现；图片存进共享 JSON 会随数量增多变大、拖慢同步，需求变多后按计划升级方案 B（阿里云 OSS 上传）。

### Testing
- `node --check app.js`：SYNTAX_OK。
- CSS 花括号配平：516 open / 516 close，balanced。
- `estimateDataUrlBytes` 字节换算算法用 Node 独立验证：1/2/3 字节 padding 边界及 300KB 用例全部精确匹配。
- DOM id 双向核对：HTML 新增 6 个 id 与 app.js 引用完全一一对应，无遗漏无多余。
- 函数与调用链核对：4 个新函数定义就位，7 处 renderImagePreview() 覆盖全部编辑器入口，事件绑定齐全。
- **浏览器联调缺口**：本机未安装 Chrome/Chromium，且不宜为一次性验证拉取数百 MB 二进制改变环境，故未做真实浏览器端到端联调。以下需在浏览器手动验证：真机选图后 Canvas 压缩是否成功、预览缩略图显示、保存后卡片/详情页图片渲染、移除按钮、手填 URL 预览、手机端拍照选图。核心存储/渲染链路（escapeAttr 不影响 data URI、image 字段直存不过 safeUrl）已静态确认无需改造。

### Notes
- `index.html`：`#recipeImage` 网址输入框下方新增 `.image-upload-block`（选图按钮 `#recipeImageFileButton` + 隐藏 `#recipeImageFile` + 提示 + 预览区 `#recipeImagePreview`/`#recipeImagePreviewImg` + 移除按钮 `#recipeImageRemove`）；原 URL 输入方式保留并存。
- `app.js`：closeEditor 后新增图片工具区（常量 IMAGE_MAX_EDGE/IMAGE_TARGET_BYTES/IMAGE_QUALITY_STEPS/BASE64_IMAGE_WARN_COUNT + 函数 estimateDataUrlBytes/compressImageFile/handleImageFileSelect/renderImagePreview）；bindEvents 内新增选图按钮/文件框/移除按钮/URL 输入的事件绑定；openNewEditor、openEditEditor、aiFillForm、悬浮 AI fillForm 四处赋值 image 后各补一次 renderImagePreview()。渲染/存储链路未改动。
- `styles.css`：末尾追加 `.image-upload-block`/`.image-upload-btn`/`.image-upload-hint`/`.image-preview`/`.image-preview-remove` 及手机端响应式样式。
- `docs/product-plan.md`：§9.5 与 §10 图片上传状态更新为"方案 A 已实现"。
- 回滚方式：`git checkout 927fbac -- app.js index.html styles.css docs/product-plan.md`，或 `git revert` 本轮提交。

## 2026-07-08 - Task: AI 生成菜品配图（占位框架 + 方案A存储）

### What was done
- **否决网络爬图**：用户最初希望"网上搜集爬取图片放上网站"，明确不采纳——绝大多数美食图片有版权，爬取并公开挂站有侵权风险，且违背项目"只用开放授权、不用爬虫数据"原则。经确认改走 AI 文生图合规路线。
- **新增"AI 生成配图"入口**：编辑菜谱页图片区新增"🎨 AI 生成配图"按钮和可选的画面描述输入框，点击后按菜名 + 所属世界大类生成配图，填入预览，复用方案A的 Base64 存储和现有预览/移除逻辑。
- **占位即完整可用**：本次按用户要求"先不接真服务、做占位"，但做的是一条真实完整的链路——用 Canvas 本地画一张按世界大类配色（现实=暖橙、二次元=粉紫、黑暗料理=暗红、幻想=青蓝、外国菜=橄榄金）的美化图，含餐具图标、菜名大字（超长自动缩字号）、世界大类小字，产出 1024×768 的 JPEG data URI。现在点按钮立刻能得到一张像样的配图，不是空白。
- **预留接真服务的口子**：`IMAGE_GEN_ENABLED` 开关 + `generateImageViaApi` 空壳 + `buildImagePrompt` 提示词拼接已就绪，后续接 OpenAI 兼容 `/images/generations` 时把开关改 true、补全空壳即可，UI/存储/预览全部复用。

### Testing
- `node --check app.js`：SYNTAX_OK。
- CSS 花括号配平：526 open / 526 close，balanced；确认 `--accent` 变量存在。
- DOM id 双向核对：HTML 新增 `#recipeImageGenButton`/`#recipeImageGenPrompt` 与 app.js 引用一一对应。
- Node 静态验证纯字符串逻辑：`buildImagePrompt` 三种情况（有菜名/带世界大类和额外描述/无菜名）拼接正确；`WORLD_IMAGE_THEMES` 5 个大类命中、未知大类回退默认主题。
- **浏览器联调缺口**：`drawPlaceholderImage` 依赖浏览器 Canvas，Node 无法执行；本机无 Chrome 且不宜为一次性验证拉取数百 MB 二进制，故未做端到端联调。需浏览器手动验证：填菜名 → 点"AI 生成配图" → 出现按世界大类配色的占位图 → 填入预览 → 保存后卡片/详情页正常显示；未填菜名时应提示先填菜名。

### Notes
- `index.html`：`.image-upload-block` 内选图按钮旁新增 `.image-action-row` 包裹的"🎨 AI 生成配图"按钮 `#recipeImageGenButton` + 描述输入框 `#recipeImageGenPrompt`；提示文案补充 AI 配图说明。
- `app.js`：renderImagePreview 后新增 AI 配图区——常量 `IMAGE_GEN_ENABLED`(false)、`WORLD_IMAGE_THEMES`/`DEFAULT_IMAGE_THEME`，函数 `buildImagePrompt`/`drawPlaceholderImage`/`generateImageViaApi`(空壳)/`handleImageGenerate`；bindEvents 内绑定 `#recipeImageGenButton` → handleImageGenerate。
- `styles.css`：末尾追加 `.image-action-row`/`.image-gen-btn`(品牌金渐变)/`.image-gen-prompt` 及手机端响应式。
- `docs/product-plan.md`：§9.5 与 §10 记录 AI 配图占位框架已就绪、否决网络爬图的原因。
- 回滚方式：`git checkout e612cbd -- app.js index.html styles.css docs/product-plan.md`，或 `git revert` 本轮提交。

## 2026-07-08 - Task: 免费图库配图（Pixabay，支持中文搜索）

### What was done
- **决策过程**：用户先要"网上爬图"（已否决，版权风险）→ 改 AI 文生图（占位已做）→ 用户指出 AI 文生图慢又贵，要用免费图库 → 再指出"试试中国的图库"。调研后国内商业图库多为付费/需授权、缺开放免费 API，最终选 **Pixabay**：有中文站、API 支持中文搜索（lang=zh）、CC0 免费可商用且无需署名、图库含大量中国美食图。
- **新增"🔍 从图库找图"入口**：编辑菜谱页图片区新增按钮，作为主推的真实照片来源；原"从本地选图""AI 生成配图"保留，三来源并存（AI 占位图退为兜底）。
- **候选图挑选弹层**：点按钮弹出搜索弹层，用当前菜名自动搜一次，结果以缩略图网格展示，点任意一张即选用——不自动填第一张，避免通用图库搜不准时配错图。可手动改关键词重搜。
- **中文搜索 + 英文兜底**：优先用中文原名搜（lang=zh）；搜不到时自动用内置"中→英菜名映射表"（约 50 条常见菜）的英文词再搜一次。
- **选中即压缩存储**：选中图走方案A的 Canvas 压缩转 Base64 存进菜谱（离线可用）；跨域压缩失败时兜底存 largeImageURL 外链并提示。
- **Key 管理**：Pixabay API Key 存 localStorage，首次使用弹窗引导填写（附获取方式），只存本机。
- **错误处理**：Key 错(401/403)、超额(429)、网络失败、无结果，各给明确中文提示，不静默失败。

### Testing
- `node --check app.js`：SYNTAX_OK。
- CSS 花括号配平：550 open / 550 close，balanced。
- DOM id 双向核对：HTML 8 个 stock 相关 id（recipeImageStockButton/stockPickerModal/stockModalMask/stockSearchInput/stockSearchButton/stockCloseButton/stockStatus/stockResultGrid）与 app.js 引用一一对应。
- Node 静态验证纯逻辑：`buildStockQuery` 映射命中（红烧肉→braised pork belly）/未命中（原样中文）/空串正确；Pixabay 搜索 URL 拼接正确，中文 q 正确 encodeURIComponent（红烧肉→%E7%BA%A2%E7%83%A7%E8%82%89）。
- **浏览器联调缺口 + 国内直连实测待办**：searchPixabay（fetch）、compressImageFromUrl（Canvas 跨域导出）依赖浏览器和真实 Key+网络，Node 无法测；本机无 Chrome 未做端到端。**需用户填真实 Pixabay Key 后在浏览器验证**：① 搜索（含中文关键词）能否返回结果 ② 候选图缩略图显示 ③ 选图后压缩填入预览 ④ 保存后卡片/详情页显示 ⑤ **国内网络能否直连 pixabay.com/api/**（服务器在海外，连通性未知，若不通需另议后端代理方案）⑥ Pixabay 图跨域 canvas 导出是否成功（失败会走外链兜底）。

### Notes
- `index.html`：`.image-action-row` 内新增"🔍 从图库找图"按钮 `#recipeImageStockButton`（放本地选图与 AI 生成之间）；backToTop 按钮后新增图库弹层 `#stockPickerModal`（遮罩 + 搜索栏 + 结果网格 + 状态区 + 来源说明）。
- `app.js`：handleImageGenerate 后新增 Pixabay 区——常量 `PIXABAY_KEY_STORAGE`/`PIXABAY_SEARCH_URL`、`DISH_KEYWORD_MAP`（约 50 条中→英菜名）、函数 `getPixabayKey`/`promptForPixabayKey`/`buildStockQuery`/`searchPixabay`/`compressImageFromUrl`/`openStockPicker`/`closeStockPicker`/`runStockSearch`/`renderStockResults`/`selectStockPhoto` + 变量 stockLastLargeUrl/setStockStatus；bindEvents 内绑定图库按钮、搜索按钮、搜索框回车、关闭按钮、遮罩点击、结果网格事件委托。复用方案A的压缩常量（IMAGE_MAX_EDGE/IMAGE_TARGET_BYTES/IMAGE_QUALITY_STEPS/estimateDataUrlBytes）。
- `styles.css`：末尾追加 `.image-stock-btn`(青色系) + `.stock-modal` 系列弹层样式（遮罩、卡片、搜索栏、结果网格自适应列、缩略图 4:3、hover 高亮）+ 手机端全屏适配。
- `docs/product-plan.md`：§9.5 与 §10 记录 Pixabay 图库已接入、中文搜索、局限与国内直连实测待办。
- 回滚方式：`git checkout 8a8d11f -- app.js index.html styles.css docs/product-plan.md`，或 `git revert` 本轮提交。

## 2026-07-08 - Task: 产品计划书大重构

### What was done
- **重排章节结构**：应用户要求把所有待办集中、优化文档、补齐不足与建议。将原 12 章重排为 9 章，把用户最关心的三件事提到正文前部——§3 统一待办清单、§4 当前不足与风险、§5 合理建议，历史完成项下沉到附录 §9.1 表格。
- **新增 §3 统一待办总表**：把原先散落在 §9.5「待实现清单」、§10 各阶段、数据扩充、Pixabay 实测等至少 5 处的待办，收拢成一张按优先级排列的总表（立即做/近期/中期/长期），每条注明谁来做。立即项突出：Pixabay 国内直连实测、直连不通的后端代理应对、Key 安全决策。
- **新增 §4 当前不足与风险**：基于核查的代码事实如实写——密钥明文存 localStorage、数据全量覆盖无并发锁、无登录无追责、Base64 拖慢同步、外部依赖不可控、无自动化测试。
- **新增 §5 合理建议**：按投入产出比排 6 条，每条给「做什么+为什么+代价」，用业务语言。
- **消除重复与过时**：图片方案原本在 §9.5 和 §10 各写一遍，现合并到 §6.1 一处（三种存储方案对比表 + 三种配图来源）；删掉过时的「AI 体验/美食氛围待改进」（早已完成）；统一状态标记为 ✅/🔄/⬜/💡，去掉「✅占位」等混用。
- **保留全部高价值内容**：AI 输出 JSON 结构、权限表格、架构图、UI/详情页草图、内测邀请语均无丢失，各归其位（草图归附录 §9.2、邀请语归 §9.3）。

### Testing
- grep 校验关键信息点全部保留：Pixabay(14)、方案 B(2)、88 道(1)、管理员权限(2)、小程序(10)、IMAGE_GEN_ENABLED(1)、lang=zh(1)、HowToCook(2)、localStorage(1)、乐观锁(1)、PWA(1)。
- 章节层级校验：标题编号连续 1-9，子章节完整无断层，markdown 层级正确。
- 通读确认无内容矛盾、无重复章节。
- 纯文档任务，无代码改动，无需语法检查。

### Notes
- `docs/product-plan.md`：整篇重写。新结构——1 愿景/2 已上线能力/3 统一待办/4 不足与风险/5 建议/6 关键功能方案(图片/AI视频/协作权限)/7 架构/8 平台演进/9 附录(已完成存档表/UI草图/邀请语)。
- 回滚方式：`git checkout 147b206 -- docs/product-plan.md`，或 `git revert` 本轮提交。

## 2026-07-08 - Task: 全站浅色苹果风换肤（去 AI 味）

### What was done
- **动因**：用户反馈网站"AI 味太重，一看就是 codex 这种 AI 做的"——根源是深色底 + 高饱和霓虹橙 + 满屏渐变/发光/文字渐变。经两轮样板（showcase-light 杂志风、showcase-apple 苹果风）确认，用户选定"苹果排版 + 苹果动画 + 番茄红暖色点缀"，锁死浅色主视觉（可视化调色不放开，几何调整保留）。
- **纯 CSS 换肤**：只改 styles.css。经核查 app.js 的 initScrollFx 已含完整苹果式动画（滚动渐显/hero 视差/卡片景深/步骤逐条/手机入场），HTML 的 data-reveal 标记与 .panel 结构齐备，故 JS 和 HTML 一行未动，动画骨架完整保留。
- **:root 变量体系深色→浅色**：--bg 改苹果浅灰 #f5f5f7、--card 纯白、--text 苹果近黑 #1d1d1f、--muted #6e6e73、--line 淡灰、--accent 番茄红 #e8543f；--shadow 系列改苹果极淡投影；--glow 由发光改为极淡投影（保变量名避免引用失效）；字体系统字体优先（-apple-system/SF）；color-scheme 改 light。
- **消灭三大 AI 味来源**：linear-gradient 从 40+ 处清到 0（主按钮橙金渐变 ×15、卡片/面板渐变 ×6、danger/hero/图库按钮等逐个改纯色）；文字渐变 background-clip:text 从 2 处清到 0（站点大标题、随机结果菜名改纯色）；大范围发光 box-shadow(0 0 40-60px) 全部改为苹果式向下柔和投影。
- **配套浅色化**：暖白半透明底 rgba(255,220,180,0.0x) 共 31 处按深浅映射为 #f5f5f7/#ececf0/#e6e6ea；番茄红按钮上的深色文字 #1a0d00 ×14 + #1a120a ×1 改白色；输入框焦点环、hero 光晕、蒸汽装饰、做法页顶栏毛玻璃、图库弹层等深色残留全部改浅色。
- **保留项**：圆角体系（--panel-radius 等几何变量）、全部滚动动画、苹果缓动曲线（--ease 调为 cubic-bezier(0.28,0.11,0.32,1)）、遮罩层半透明黑、图片浮层深底（合理）。

### Testing
- CSS 花括号配平：547 / 547，balanced。
- 残留清零核查：linear-gradient=0、background-clip:text=0、rgba(255,220,180)=0、#1a0d00=0、大发光(0 0 40/50/60px)=0。
- app.js / index.html：git status 确认零改动，动画逻辑与 DOM 钩子完好；data-reveal/hero-copy 的 CSS class 仍匹配。
- 本地 http server：index.html 与 styles.css 均 HTTP 200。
- **浏览器联调缺口**：本机无 Chrome，未做真机视觉验证。需用户在浏览器实测：① 首页/卡片/详情/各功能面板整体浅色协调 ② 滚动动画（渐显、hero 视差、卡片景深）是否顺滑 ③ 番茄红按钮文字对比度 ④ 可视化调整的几何项（圆角/图高/列宽）仍生效、调色不影响主视觉 ⑤ 手机端。

### Notes
- `styles.css`：:root 变量体系整体换浅色苹果风；全文件消灭渐变/发光/文字渐变；暖白底与深色文字批量浅色化；hero 光晕、蒸汽、做法页顶栏、图库弹层等深色残留改浅色。app.js、index.html 未改动。
- `showcase-light.html` / `showcase-apple.html`：样板页保留供日后参考，未删。
- 回滚方式：`git checkout 340ac81 -- styles.css`，或 `git revert` 本轮提交。换肤只动 styles.css，回滚干净。

## 2026-07-08 - Task: 卡片跳转体验优化（返回位置 + 返回键 + 放大入场动画）

### What was done
- **修返回后要往上滑的 bug**：详情页用全屏 fixed 层覆盖首页，但原 closeRecipeModal 只隐藏层、没恢复首页滚动位置，导致返回后停在别处。现在 openRecipeModal 进入前记录 `modalReturnScrollY = window.scrollY`，closeRecipeModal 关闭后 `window.scrollTo(0, modalReturnScrollY)`（instant 无滚动过程），返回即回到点卡片时的位置。
- **卡片放大铺满入场动画（FLIP）**：点卡片时抓取该卡片的位置尺寸（getBoundingClientRect），详情层从"卡片的位置和大小"用 transform scale+translate 起步，rAF 后过渡到铺满全屏（0.42s 苹果缓动）+ 淡入，视觉上是"这张卡片放大成了详情页"。返回用稳妥的缩小淡出（scale 0.92 + 淡出），不强求精准缩回原卡片以避免翻车。
- **FLIP 定位修正**：卡片 `.recipe-group-card` 本身原来没有可定位的 id（data-id 只在内部 version-pill 上，且卡片按菜品分组），故新增 `data-group-id`（= 分组首个版本 id，正是封面点击打开详情用的 id）；computeCardFlipTransform 先按 data-group-id 找卡片，找不到再用 version-pill 的 data-id 往上 closest 到卡片。
- **返回键加强**：从灰底胶囊（hover 才变色）改为默认番茄红填充白字 + 柔和阴影 + 更大点击区（padding 12×26、字号 16），像 iOS 主色返回键，常驻 sticky 顶栏；hover 变深、active 缩放反馈。
- **降级**：prefers-reduced-motion 时 open/close 直接显示/隐藏并恢复位置，不跑放大动画；CSS 里也对 .recipe-modal 关闭过渡。找不到卡片位置时回退纯淡入。

### Testing
- `node --check app.js`：SYNTAX_OK。
- CSS 花括号配平：551 / 551，balanced。
- 静态核对：modalReturnScrollY 记录/恢复链路、computeCardFlipTransform 双重定位（data-group-id + version-pill 兜底）、modal-anim-in/out 类、reduced-motion 分支均就位；确认卡片渲染处已加 data-group-id。
- 本地 http server：index.html / app.js 均 200。
- **浏览器联调缺口**：本机无 Chrome，未做真机验证。需浏览器实测：① 点卡片是否从卡片位置放大铺满、顺不顺 ② 返回是否回到点击前位置、视线不跳 ③ 返回键是否醒目好点 ④ 横向滚动行里的卡片点击定位是否正确 ⑤ 手机端 ⑥ reduced-motion 降级。

### Notes
- `app.js`：新增全局 `modalReturnScrollY` 与 `computeCardFlipTransform(id)`；重写 openRecipeModal（记录滚动位置 + 设 FLIP 起始 transform + rAF 过渡铺满）与 closeRecipeModal（缩小淡出 + transitionend/超时兜底关闭 + 恢复滚动位置）；createRecipeCard 给卡片加 `card.dataset.groupId`。
- `styles.css`：.recipe-modal 由 modalFade 动画改为 transform+opacity 过渡驱动，新增 .modal-anim-in（铺满态）/.modal-anim-out（缩小淡出）；reduced-motion 段关闭 .recipe-modal 过渡；.recipe-modal-back 改番茄红填充醒目样式 + active 反馈。
- 回滚方式：`git checkout 208ab34 -- app.js styles.css`，或 `git revert` 本轮提交。

## 2026-07-09 - Task: 修复详情页跳转 bug + 重做入场动画（稳健版）

### What was done
- **修复上一提交(24882c8)引入的严重 bug**：用户反馈"除编辑菜谱外其他都无法跳转，且手机/电脑现象不同"。定位根因是上次给 openRecipeModal 加的 FLIP 入场动画实现脆弱——JS 给 fixed 全屏详情层设内联 `transform: scale(极小)+translate` 与 `opacity:0` 起步，靠 requestAnimationFrame 清空恢复；一旦 rAF 时机/transition 触发不顺，详情层就卡在"缩小+透明"的中间态，看起来像没打开/无反应。transform 作用在 fixed 层改变包含块 + will-change，跨设备表现不一致，正是手机电脑现象不同的原因。
- **换成纯 CSS keyframes 动画（零风险）**：核心原则改为"JS 只切 class 和 hidden，绝不设内联 transform/opacity"。入场加 .modal-opening（modalZoomIn：92% 缩放 + 轻微上移 淡入放大到铺满），退场加 .modal-closing（modalZoomOut 缩小淡出）。keyframes + animation-fill-mode:both 保证动画结束一定停在正常全屏态，绝不卡中间；即使动画被禁/失败，modal 也是干净的 hidden=false 全屏显示，跳转永远可靠。
- **退场收尾改用 animationend**（keyframes 必触发，比 transitionend 稳）+ 380ms setTimeout 兜底双保险。
- **保留**：返回滚动位置修复（modalReturnScrollY 记录/恢复）、番茄红醒目返回键样式。
- **清理脆弱代码**：删除 computeCardFlipTransform 函数、createRecipeCard 的 card.dataset.groupId、旧的 .modal-anim-in/.modal-anim-out/modalFade（已 grep 确认无其它引用）。放弃"从卡片精确位置放大"的 FLIP（脆弱、跨设备不一致），改从屏幕中心缩放放大（观感接近、稳定）。

### Testing
- `node --check app.js`：SYNTAX_OK。
- CSS 花括号配平：556 / 556，balanced。
- 旧符号残留核查全为 0：computeCardFlipTransform / modal-anim-in / modal-anim-out / modalFade / dataset.groupId / data-group-id。
- 新符号在位：modal-opening / modal-closing / modalZoomIn / modalZoomOut。
- 核心保证核对：open/close 函数内确认无任何 style.transform / style.opacity 内联赋值（bug 根源已根除）；animationend + 380ms 兜底在位。
- **浏览器联调缺口**：本机无 Chrome/浏览器，未做真机验证。需在**手机和电脑各实测**：① 点卡片/今天吃什么/配一桌菜能否正常打开详情页（核心，之前坏的就是这个）② 返回是否回到点击前位置 ③ 放大入场/缩小退场动画是否顺 ④ reduced-motion 降级。

### Notes
- `app.js`：openRecipeModal 去掉全部 FLIP 内联样式与 computeCardFlipTransform 调用，改为 remove(closing/opening)→offsetWidth 重排→add(modal-opening)；closeRecipeModal 改用 animationend + 380ms 兜底，保留 window.scrollTo 恢复位置；删除 computeCardFlipTransform 函数与 createRecipeCard 的 dataset.groupId。
- `styles.css`：.recipe-modal 去掉 transition/will-change；新增 @keyframes modalZoomIn/modalZoomOut 与 .modal-opening/.modal-closing；reduced-motion 下 animation:none；删除旧 .modal-anim-in/out 与 modalFade。返回键样式不动。
- 回滚方式：`git checkout 24882c8 -- app.js styles.css`，或 `git revert` 本轮提交。

## 2026-07-09 - Task: 建立统一全屏视图导航、返回与浏览器历史

### What was done
- 将今天吃什么、配一桌菜、按食材查菜、厨具筛选、购物清单、外观调整、操作日志和菜谱编辑统一纳入全屏站内视图。
- 所有站内视图自动生成一致的顶部返回栏；原入口和关闭按钮继续沿用原有 DOM 钩子与业务处理函数。
- 建立统一历史状态：首页、功能视图和菜谱详情均写入浏览器历史；页面返回键、浏览器后退和手机系统返回走同一套关闭链路。
- 进入全屏视图时锁定首页滚动并记录位置，返回首页后恢复；从功能视图进入菜谱详情时保留底层视图和滚动状态。
- 保留详情页纯 CSS keyframes 入退场方案，没有重新引入内联 transform/opacity 起步逻辑。

### Testing
- `node --check app.js`：通过，JavaScript 无语法错误。
- `git diff --check`：通过，无空白错误；仅出现仓库既有的 LF/CRLF 提示。
- 静态核对：8 个主要功能区均包含 `.app-view[data-view]`；统一返回键、`pushState/replaceState/popstate/history.back` 链路均已接入。
- 本地 `python -m http.server 4173` 已启动，静态服务可运行。
- 浏览器自动化验证未执行：当前环境缺少 Chrome/Chromium。仍需在桌面和手机实测入口打开、顶部返回、浏览器后退、手机系统返回及“功能视图 → 菜谱详情 → 返回”的历史层级。

### Notes
- `index.html`：为 8 个主要功能面板补充统一视图标记，保留原 id/class 钩子。
- `app.js`：新增统一视图注册、打开、关闭、返回和历史状态管理；各功能入口及详情页接入统一导航。
- `styles.css`：新增全屏视图、粘性返回栏、移动端与 reduced-motion 降级样式。
- `progress.md`：追加本轮实现与验证记录。
- 回滚方式：恢复本轮修改前的 `index.html`、`app.js`、`styles.css` 与 `progress.md`；若按提交回滚，可在提交后执行 `git revert <本轮提交>`。

## 2026-07-09 - Task: 替换 Hero 为本地浮世绘 SVG 并强化竞争力文案

### What was done
- 将首屏内联装饰图替换为独立本地 SVG，不再依赖外部图片；插画以旭日、富士山、海浪和“家传食谱”卷册表达产品定位。
- 重写首屏标题与说明，明确“视频成谱、食材厨具反查、选菜到采购闭环”三项差异化能力。
- 新增三条可快速扫读的竞争力证据，并保留原有 AI 生成、新增菜谱和工具入口。
- 同步更新默认外观文案，确保首次访问与恢复默认外观后仍显示新版定位。
- 补充桌面、平板和手机尺寸适配，浮世绘主视觉在各断点均保留展示。

### Testing
- `node --check app.js`：通过，JavaScript 无语法错误。
- `git diff --check`：通过，无空白错误；仅出现仓库既有的 LF/CRLF 提示。
- 静态核对：`index.html` 已引用 `assets/ukiyo-recipe-hero.svg`，本地 SVG 含 title/desc，Hero 新文案与三项优势标记均存在。
- 浏览器视觉联调未执行：当前环境缺少 Chrome/Chromium；仍需人工确认不同屏宽下插画比例、文案换行和按钮首屏占用。

### Notes
- `assets/ukiyo-recipe-hero.svg`：新增本地浮世绘 Hero 插画。
- `index.html`：替换首屏插画引用，重写定位文案并新增三项竞争力证据。
- `app.js`：更新默认外观标题、小标签和说明文案。
- `styles.css`：新增竞争力证据与本地插画的桌面、平板、手机样式。
- `progress.md`：追加本轮实现与验证记录。
- 回滚方式：恢复本轮修改前的 `index.html`、`app.js`、`styles.css`、`progress.md`，并删除 `assets/ukiyo-recipe-hero.svg`；若按提交回滚，可在提交后执行 `git revert <本轮提交>`。

## 2026-07-09 - Task: 全站换成日系和纸、藏青、朱红、宋体主题

### What was done
- 将全站基础色从浅灰苹果风改为和纸米白，正文使用墨色，结构与链接使用藏青，主要操作使用朱红。
- 为页面加入纯 CSS 和纸纤维纹理和青海波分隔带，不依赖图片资源。
- 标题、眉题和关键菜名统一采用宋体/明朝体字体栈，正文继续使用易读黑体字体栈。
- 将圆润胶囊式控件整体收敛为版画式小圆角硬边，并给主要面板加入藏青顶边，强化视觉层级。
- 将全站残留的苹果灰输入区、卡片底和毛玻璃顶栏替换为和纸色阶；同步更新外观设置的默认主色、背景色和面板圆角。

### Testing
- `node --check app.js`：通过，JavaScript 无语法错误。
- `git diff --check`：通过，无空白错误；仅出现仓库既有的 LF/CRLF 提示。
- 静态核对：主题变量已切换为 `#f4ede0` 和纸、`#1b3a5b` 藏青、`#c1440e` 朱红；宋体字体栈、青海波分隔带和藏青面板顶边均存在。
- 残留核对：旧苹果灰 `#f5f5f7/#ececf0/#e6e6ea`、SF Pro 字体和苹果风注释已清除。
- 浏览器视觉联调未执行：当前环境缺少 Chrome/Chromium；仍需人工确认长表单、弹层、手机端控件及用户已有自定义外观数据下的整体协调性。

### Notes
- `styles.css`：重构全站主题变量、字体、和纸纹理、青海波纹样、按钮圆角、面板边框及各类浅色控件背景。
- `app.js`：更新默认主色、背景色和面板圆角，使恢复默认外观与新主题一致。
- `progress.md`：追加本轮实现与验证记录。
- 回滚方式：恢复本轮修改前的 `styles.css`、`app.js` 与 `progress.md`；若按提交回滚，可在提交后执行 `git revert <本轮提交>`。

## 2026-07-09 - Task: 增强卡片与页面转场动画并修复移动端观察器

### What was done
- 将菜谱卡片入场改为轻微上移淡入，并为手机端动态卡片加入最多六级的短暂错峰，使列表出现更有层次且不过度拖延。
- 修复手机端观察器只处理初始化卡片的问题：列表每次动态重绘后都会收集并观察新卡片，桌面与手机断点切换时也会同步处理。
- 增加旧版媒体查询监听兼容路径；不支持 IntersectionObserver 时直接显示卡片，避免内容停留在入场前状态。
- 将详情页缩放转场收敛为轻微纵向滑入/滑出，减少和纸版画主题下不协调的弹性缩放感。
- 将卡片桌面与手机圆角统一为 3px，并将手机阴影调整为墨色与藏青色阶，保持新主题一致。

### Testing
- `node --check app.js`：通过，JavaScript 无语法错误。
- `git diff --check`：通过，无空白错误；仅出现仓库既有的 LF/CRLF 提示。
- 静态核对：动态列表 MutationObserver 会在每次重绘后调用卡片收集与手机观察同步；新增卡片使用 `data-mobile-observed` 防止重复观察。
- 静态核对：移动端错峰变量 `--card-enter-delay` 已接入动画，断点切换同时兼容 `addEventListener` 与旧版 `addListener`。
- 浏览器视觉联调未执行：当前环境缺少 Chrome/Chromium；仍需真机确认快速筛选重绘、横向卡片行、桌面与手机旋转切换时的动画观感。

### Notes
- `app.js`：修复动态卡片的移动端观察逻辑、断点切换清理与旧浏览器监听兼容。
- `styles.css`：调整卡片入场、错峰延迟、详情页转场、圆角和手机阴影。
- `progress.md`：追加本轮实现与验证记录。
- 回滚方式：恢复本轮修改前的 `app.js`、`styles.css` 与 `progress.md`；若按提交回滚，可在提交后执行 `git revert <本轮提交>`。

## 2026-07-09 - Task: 验证语法、结构、响应式静态约束并更新记录

### What was done
- 对本轮统一导航、浮世绘 Hero、和纸主题及动效改造执行最终静态验收。
- 核对 JavaScript 语法、CSS 结构、HTML 标签闭合与 id 唯一性，确认关键业务 DOM 钩子和八个统一全屏视图均保留。
- 核对手机、超小屏和平板断点，以及减弱动效规则和本地 Hero 资源引用均存在。
- 检查工作区差异与遗留主题关键字；正式页面文件未发现旧苹果灰或 SF Pro 残留，命中项仅位于未参与本轮改造的独立 Apple 样板页。

### Testing
- `node --check app.js`：通过，JavaScript 无语法错误。
- `git diff --check`：通过，无空白错误；仅出现仓库既有的 LF/CRLF 提示。
- CSS 花括号核对：582 个左花括号 / 582 个右花括号，结构配平。
- HTML 静态解析：171 个 id，无重复 id、无标签闭合错误、无未闭合标签。
- 关键钩子核对：菜谱列表、详情、编辑器、AI 面板、世界与场景标签、表单及主要功能面板均存在。
- 统一视图核对：今天吃什么、配一桌菜、食材反查、厨具筛选、购物清单、外观调整、操作日志和编辑器八个 `data-view` 均存在。
- 响应式核对：375px、600px、768px、1024px 相关规则以及 `prefers-reduced-motion` 降级规则均存在；本地浮世绘 SVG 文件与引用均存在。
- 浏览器端到端验证未执行：当前环境缺少 Chrome/Chromium；返回历史栈、真机断点布局和动画观感仍需人工浏览器验收。

### Notes
- `progress.md`：追加最终静态验收范围、结果与浏览器验证缺口。
- 本轮验证未修改业务代码、页面结构或样式。
- 工作区另有未跟踪的 `showcase-japanese.html`，本轮未创建、未修改、未纳入验收结论；`showcase-apple.html` 中的旧主题关键字属于独立样板页，不影响正式站点。
- 回滚方式：删除 `progress.md` 末尾本条验收记录；本轮无其他文件需要回滚。

## 2026-07-11 - Task: 提升菜谱编辑器小白易用性
### What was done
- 将新增和编辑菜谱改为默认四步小白引导，并保留可随时切换的完整编辑模式，切换时共用同一份表单数据。
- 增加分步校验、食材和步骤计数、保存前确认摘要、浏览器本地草稿恢复以及未保存离开提醒。
- 将 AI 和视频导入收纳为快捷导入区，降低首次填写时的信息干扰，并优化手机端步骤导航和食材编辑布局。
- 更新使用说明，明确必填内容、草稿边界和简单/完整模式用法。

### Testing
- `node --check app.js`：通过，JavaScript 无语法错误。
- Node 静态检查 `index.html`：通过，共 183 个 ID、无重复 ID，`section` 标签开闭平衡。
- `git diff --check`：通过，无空白错误；仅提示 Windows 行尾转换信息。
- 浏览器自动化未执行：当前环境没有 Chrome/Chromium；四步点击、草稿恢复、模式切换和手机端视觉仍需在部署后的真实浏览器人工验收。

### Notes
- `index.html`：将菜谱编辑器重组为双模式四步向导、快捷导入折叠区和确认摘要。
- `app.js`：增加向导导航、分步校验、草稿、脏状态、完成摘要和保存流程适配。
- `styles.css`：增加向导进度、校验、确认卡片、固定操作栏及手机端样式。
- `docs/usage.md`：补充小白引导和完整编辑模式使用说明。
- `progress.md`：追加本轮改动和验证记录。
- 回滚方式：恢复本轮修改前的 `index.html`、`app.js`、`styles.css`、`docs/usage.md` 和 `progress.md`；如需清除已暂存草稿，在浏览器本地存储中删除 `my-recipe-editor-draft`。

## 2026-07-11 - Task: 优化 AI 视频成谱智能工作台
### What was done
- 将编辑器内重复的 AI 对话助手和视频总结助手合并为三阶段智能工作台，统一视频获取、模型整理、结果预览和填表入口。
- 增加 B 站公开视频标题、UP 主、简介及公开字幕自动获取，并在无字幕、非 B 站链接或接口失败时保留内容并引导手动粘贴。
- 保持 OpenAI 兼容接口配置，支持用户填写 DeepSeek 等服务商实际提供的接口地址和模型 ID；优化结构化菜谱提示词、错误反馈和结果摘要。
- 更新移动端布局、隐私提示和使用说明，明确 AI 不会直接观看视频，也不会下载视频或绕过平台权限。

### Testing
- `node --check app.js`：通过，JavaScript 无语法错误。
- Python 静态检查 `index.html`：通过，共 181 个 ID、无重复 ID，`section`、`details`、`div` 标签开闭平衡。
- 静态残留检查：旧视频助手 DOM 钩子和已移除本地草稿函数均无引用。
- `git diff --check`：通过，无空白错误；仅提示 Windows 行尾转换信息。
- 真实 B 站字幕请求和 DeepSeek 兼容接口调用未执行：需要用户自己的公开视频链接、API Key 和实际模型 ID；移动端视觉也仍需真实浏览器人工验收。

### Notes
- `index.html`：合并 AI 与视频助手为统一智能工作台，增加状态步骤、字幕区、模型设置和结果卡片。
- `app.js`：增加 B 站公开视频信息/字幕获取、AI 结构化整理、结果预览和填表状态同步，并移除旧重复入口逻辑。
- `styles.css`：增加智能工作台高级卡片、状态、结果和移动端响应式样式。
- `docs/usage.md`：更新支持范围、DeepSeek 兼容配置、隐私边界及失败降级说明。
- `progress.md`：追加本轮改动和验证记录。
- 回滚方式：恢复本轮修改前的 `index.html`、`app.js`、`styles.css`、`docs/usage.md` 和 `progress.md`；本轮未改变菜谱数据结构或云端数据。

## 2026-07-11 - Task: 里程碑 1：统一 UI 信息架构与移动端体验
### What was done
- 增加桌面端轻量主导航，将主要方向收敛为菜谱库、实用工具和 AI 成谱。
- 重组首页操作层级，以 AI 生成菜谱作为唯一主操作，将今晚决策、更多工具及设置数据分层收纳，同时保留全部原业务入口。
- 增加手机底部快捷导航，连接首页、菜谱库、AI 成谱、工具和我的设置，并同步当前站内视图状态。
- 增加触摸目标、键盘焦点、手机安全区、下拉菜单和移动端按钮布局样式，更新导航使用说明。

### Testing
- `node --check app.js`：通过，JavaScript 无语法错误。
- Python 静态检查 `index.html`：通过，共 185 个 ID、无重复 ID，`section`、`details`、`div`、`nav` 标签开闭平衡。
- CSS 静态检查：通过，共 701 个规则块，花括号配平。
- 关键业务入口核对：AI、新增、随机选菜、配餐、食材、厨具、购物清单、设置、备份、昵称、日志、菜谱列表、详情与编辑器钩子均保留。
- `git diff --check`：通过，无空白错误；仅提示 Windows 行尾转换信息。
- 真实浏览器视觉验收未执行：桌面下拉菜单、320/375/430px 手机底栏遮挡、触摸反馈及 Safari 安全区仍需人工浏览器验收。

### Notes
- `index.html`：增加桌面主导航、分层工具与设置菜单、菜谱库锚点和手机底部导航。
- `app.js`：增加手机导航动作与现有站内视图状态同步。
- `styles.css`：增加导航、菜单、焦点、手机底栏和安全区响应式样式。
- `docs/usage.md`：补充首页层级和桌面/手机导航说明。
- `progress.md`：追加本里程碑改动和验证记录。
- 本阶段未修改作者或云端数据结构，未触碰未跟踪的菜谱批处理文件和展示页。
- 回滚方式：恢复本轮修改前的 `index.html`、`app.js`、`styles.css`、`docs/usage.md` 和 `progress.md`；本阶段不涉及数据迁移。

## 2026-07-11 - Task: 备份云端并安全追加 50 道菜谱
### What was done
- 在写入前只读检查阿里云共享库，确认原有 75 道菜谱、75 个唯一 ID。
- 发现待导入批次中的“糖醋里脊”与云端真实菜谱同名但 ID 不同，阻止仅按 ID 去重的写入；更新生成规则排除该项并重新生成 25 道 HowToCook 与 25 道 json-cookbook 菜谱。
- 重新核对 50 道批次与云端无 ID 或菜名冲突，随后完整备份云端数据，再执行追加写入。
- 写入后回读阿里云核验：原有 75 道全部保留，新增 50 道全部存在，云端共 125 道且 ID 全部唯一。

### Testing
- 批次完整性：50 道、50 个唯一 ID、50 个唯一菜名，25 道 HowToCook 与 25 道外国菜，食材和步骤均非空。
- 追加前云端只读检查：75 道、75 个唯一 ID，更新时间 `2026-07-07T15:03:27.753Z`。
- 重新生成后云端冲突检查：ID 冲突 0、菜名冲突 0、无效菜谱 0。
- 云端追加回读：追加前 75 道，原有保留 75 道，新增命中 50 道，追加后 125 道、125 个唯一 ID。
- 云端更新时间：`2026-07-11T10:54:24.711Z`。
- 备份文件：`backups/cloud-backup-before-batch2-2026-07-11T10-54-18-153Z.json`，338368 字节，SHA-256 `a7eec7e88e47a395387f560fd9d6047489c018b06fd5e037f150192459b23ae1`。

### Notes
- `aliyun/build-open-source-batch2.mjs`：增加云端已存在同名菜“糖醋里脊”的排除规则，避免重复内容进入批次。
- `aliyun/open-source-recipes-batch2.json`：重新生成 50 道无云端 ID/菜名冲突的开源菜谱批次。
- `progress.md`：追加云端备份、冲突拦截、写入和回读验收记录。
- `backups/cloud-backup-before-batch2-2026-07-11T10-54-18-153Z.json`：写入前完整云端快照，仅本地保留且受 `.gitignore` 排除。
- 回滚方式：将上述备份文件中的 `list` 通过阿里云 `/recipes` PUT 接口写回，可将云端恢复至追加前的 75 道菜谱；回滚后必须再次 GET 核验总数和唯一 ID。

## 2026-07-11 - Task: 增加精致动态 UI 与操作微交互
### What was done
- 建立统一动效时长、缓动、悬浮阴影设计令牌，统一按钮、导航、菜单、表单、分类页签和移动底栏的状态过渡。
- 为主要按钮增加克制扫光与点击波纹，为菜谱卡片、功能卡片和 AI 工作台增加鼠标位置驱动的局部柔光，图片悬浮时小幅放大。
- 通过事件委托和 requestAnimationFrame 实现动态内容兼容和指针更新节流；仅在桌面精细指针设备启用鼠标跟随效果。
- 完善减少动态效果支持，系统开启该选项时关闭波纹、鼠标光影及持续动画，并更新使用说明。

### Testing
- `node --check app.js`：通过，JavaScript 无语法错误。
- HTML 静态检查：185 个 ID、无重复 ID；`div`、`section`、`details`、`nav` 标签开闭平衡。
- CSS 静态检查：737 个规则块，花括号配平；`git diff --check` 通过，仅有 Windows 行尾转换提示。
- 本地 HTTP 浏览器验收：页面成功加载，主按钮 hover 计算样式为向上 2px，统一动效变量 `--motion-base` 正确生效；控制台无业务 JavaScript 错误，仅有既存密码框提示与 favicon 404。
- 浏览器当前环境模拟了 `prefers-reduced-motion: reduce`，确认波纹与鼠标跟随光影按设计关闭；普通动态偏好下的波纹、卡片光影和手机触摸反馈仍需在用户实际浏览器复核。

### Notes
- `styles.css`：增加统一动效令牌、按钮扫光、导航底线、表单焦点、菜单展开、卡片光影、图片缩放、点击波纹和 reduced-motion 降级样式。
- `app.js`：增加独立微交互初始化模块，使用事件委托处理动态卡片指针光影与按钮波纹。
- `docs/usage.md`：补充桌面动态 UI、触屏降级和减少动态效果说明。
- `progress.md`：追加本轮改动、验证入口与回滚说明。
- 回滚方式：恢复本轮修改前的 `styles.css`、`app.js`、`docs/usage.md` 和 `progress.md`；本轮未修改业务数据或云端接口。
