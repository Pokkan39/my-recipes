# 阿里云同步配置说明

本项目已从 Firebase 改为阿里云同步。前端仍然是静态网页，阿里云只负责保存和读取共享菜谱数据。

## 当前架构

```text
浏览器 / GitHub Pages
    ↓ GET /recipes、PUT /recipes
阿里云函数计算
    ↓ 读写 JSON 文件
阿里云 OSS
```

## 需要准备的阿里云资源

### 1. 创建 OSS Bucket

1. 进入阿里云 OSS 控制台。
2. 新建一个 Bucket，例如 `my-recipe-site-data`。
3. 区域建议选择国内访问更合适的地域，例如华东、华北或华南。
4. 读写权限建议保持私有，不要把 Bucket 改成公开读写。

菜谱数据会保存成一个 JSON 文件，默认路径是：

```text
recipe-site/recipes.json
```

### 2. 创建函数计算函数

1. 进入阿里云函数计算控制台。
2. 创建一个 Node.js 函数，建议使用 Node.js 18 或更新运行时。
3. 代码目录使用本仓库的：

```text
aliyun/recipe-api
```

4. 函数入口配置为：

```text
index.handler
```

5. 部署前需要安装依赖，函数目录里已经提供 `package.json`，依赖是：

```text
ali-oss
```

### 3. 给函数授予 OSS 权限

函数代码不需要写 AccessKey。推荐给函数绑定有 OSS 读写权限的执行角色，让函数计算运行时提供临时凭证。

最小权限需要覆盖：

- 读取目标 JSON 文件
- 写入目标 JSON 文件
- 如果对象不存在，允许创建该对象

### 4. 配置环境变量

在函数配置里增加这些环境变量：

| 变量名 | 示例 | 说明 |
|---|---|---|
| `BUCKET_NAME` | `my-recipe-site-data` | OSS Bucket 名称 |
| `OSS_REGION` | `oss-cn-shanghai` | Bucket 所在地域 |
| `OBJECT_KEY` | `recipe-site/recipes.json` | 菜谱 JSON 文件路径，可不填，默认就是这个 |
| `ALLOWED_ORIGIN` | `https://pokkan39.github.io` | 允许访问 API 的前端域名；内测排查问题时可先用 `*` |

### 5. 配置 HTTP 触发器

给函数添加 HTTP 触发器，允许这些方法：

```text
GET
PUT
OPTIONS
```

接口路径：

```text
/recipes
```

函数代码已经会返回 CORS 响应头，`OPTIONS` 预检请求也会直接返回。

如果浏览器打开 `/recipes` 时出现 `ERR_INVALID_RESPONSE` 或请求一直转圈，优先检查函数是否创建成“事件函数 + HTTP 触发器”，不要创建成需要自己监听端口的 Web 函数；同时确认入口仍是 `index.handler`。当前代码同时兼容新版 Node.js Promise 返回和旧版 callback 返回，避免运行时等待不到响应。

### 6. 把 API 地址填回前端

部署完成后，复制函数计算 HTTP 触发器的公网地址，填到 `app.js` 顶部：

```js
const ALIYUN_API_BASE_URL = "https://你的函数公网地址";
```

前端会自动请求：

```text
GET https://你的函数公网地址/recipes
PUT https://你的函数公网地址/recipes
```

如果你的触发器地址本身已经包含路径前缀，只要保证最终拼出的 `/recipes` 能命中函数即可。

## 如何验证

### 1. 本地语法检查

```bash
node --check E:/recipe-site/app.js
node --check E:/recipe-site/aliyun/recipe-api/index.js
```

### 2. 浏览器验证

1. 打开网站。
2. 观察页面顶部同步状态。
3. 如果显示“阿里云共享库已连接”，说明读取成功。
4. 新增一道测试菜并保存。
5. 用另一个浏览器或手机打开同一网站，确认能看到新增内容。

### 3. OSS 验证

进入 OSS 控制台，查看对象：

```text
recipe-site/recipes.json
```

如果里面出现 `list` 数组和 `updatedAt`，说明函数写入成功。

## 当前限制

- 这是内测版公开编辑接口，暂时没有登录和权限控制。
- 多人同时编辑时，后保存的人可能覆盖先保存的人。
- OSS 里只有一个 JSON 文件，适合当前小规模菜谱库；如果后续用户增多，建议迁移到数据库并增加版本冲突处理。
- 正式公开前建议增加鉴权、操作日志、自动备份和恢复机制。

## 回滚方式

如果阿里云 API 暂时不可用，可以把 `app.js` 顶部的 `ALIYUN_API_BASE_URL` 改回空字符串：

```js
const ALIYUN_API_BASE_URL = "";
```

这样网站会回到本地存储模式，用户仍然可以导入、导出和本地编辑菜谱。
