const OSS = require("ali-oss");

const DEFAULT_OBJECT_KEY = "recipe-site/recipes.json";

exports.handler = function handler(event, context, callback) {
  const resultPromise = handleRequest(event, context);

  if (typeof callback === "function") {
    resultPromise
      .then((result) => callback(null, result))
      .catch((error) => callback(error));
    return;
  }

  return resultPromise;
};

async function handleRequest(event, context) {
  let headers = buildHeaders({});

  try {
    const request = parseRequest(event);
    headers = buildHeaders(request.headers);

    if (request.method === "OPTIONS") {
      return response(204, "", headers);
    }

    if (!isRecipesPath(request.path)) {
      return jsonResponse(404, { message: "Not found" }, headers);
    }

    if (request.method === "GET") {
      const data = await readRecipes(context);
      return jsonResponse(200, data, headers);
    }

    if (request.method === "PUT") {
      const payload = parseJsonBody(request.body);
      const list = Array.isArray(payload) ? payload : payload.list;
      if (!Array.isArray(list)) {
        return jsonResponse(400, { message: "请求体需要包含 list 数组。" }, headers);
      }

      const data = {
        list,
        updatedAt: new Date().toISOString()
      };
      await writeRecipes(context, data);
      return jsonResponse(200, data, headers);
    }

    return jsonResponse(405, { message: "Method not allowed" }, headers);
  } catch (error) {
    console.error("Recipe API error:", error);
    return jsonResponse(500, { message: error.message || "Internal server error" }, headers);
  }
}

function parseRequest(event) {
  const raw = Buffer.isBuffer(event) ? event.toString("utf8") : event;
  const data = typeof raw === "string" ? safeJsonParse(raw, {}) : (raw || {});
  const headers = lowerCaseHeaders(data.headers || {});
  const method = (data.requestContext?.http?.method || data.httpMethod || data.method || "GET").toUpperCase();
  const path = data.rawPath || data.path || data.requestContext?.http?.path || data.requestContext?.path || "/recipes";
  let body = data.body || "";

  if (data.isBase64Encoded && body) {
    body = Buffer.from(body, "base64").toString("utf8");
  }

  return { method, path, headers, body };
}

function lowerCaseHeaders(headers) {
  return Object.fromEntries(
    Object.entries(headers).map(([key, value]) => [key.toLowerCase(), value])
  );
}

function buildHeaders(requestHeaders) {
  const allowedOrigin = process.env.ALLOWED_ORIGIN || "*";
  const requestOrigin = requestHeaders.origin || "";
  const origin = pickAllowedOrigin(allowedOrigin, requestOrigin);

  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET,PUT,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,Accept",
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  };
}

function pickAllowedOrigin(allowedOrigin, requestOrigin) {
  if (allowedOrigin === "*") return "*";

  const allowed = allowedOrigin.split(",").map((item) => item.trim()).filter(Boolean);
  if (requestOrigin && allowed.includes(requestOrigin)) return requestOrigin;
  return allowed[0] || "*";
}

function isRecipesPath(path) {
  const cleanPath = path.replace(/\/+$/, "") || "/";
  return cleanPath === "/recipes" || cleanPath.endsWith("/recipes");
}

async function readRecipes(context) {
  const client = createOssClient(context);
  const objectKey = getObjectKey();

  try {
    const result = await client.get(objectKey);
    return safeJsonParse(result.content.toString("utf8"), { list: [], updatedAt: null });
  } catch (error) {
    if (error.code === "NoSuchKey" || error.status === 404) {
      return { list: [], updatedAt: null };
    }
    throw error;
  }
}

async function writeRecipes(context, data) {
  const client = createOssClient(context);
  await client.put(getObjectKey(), Buffer.from(JSON.stringify(data, null, 2)), {
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });
}

function createOssClient(context) {
  const credentials = context?.credentials || {};
  const region = requiredEnv("OSS_REGION");
  const bucket = requiredEnv("BUCKET_NAME");
  const accessKeyId = credentials.accessKeyId || process.env.ALIBABA_CLOUD_ACCESS_KEY_ID;
  const accessKeySecret = credentials.accessKeySecret || process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET;
  const stsToken = credentials.securityToken || process.env.ALIBABA_CLOUD_SECURITY_TOKEN;

  if (!accessKeyId || !accessKeySecret) {
    throw new Error("函数缺少 OSS 访问凭证，请给函数角色授予 OSS 读写权限。");
  }

  return new OSS({
    region,
    bucket,
    accessKeyId,
    accessKeySecret,
    stsToken,
    timeout: 8000
  });
}

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`缺少环境变量 ${name}`);
  return value;
}

function getObjectKey() {
  return process.env.OBJECT_KEY || DEFAULT_OBJECT_KEY;
}

function parseJsonBody(body) {
  if (!body) return {};
  return safeJsonParse(body, {});
}

function safeJsonParse(text, fallback) {
  try {
    return JSON.parse(text);
  } catch {
    return fallback;
  }
}

function jsonResponse(statusCode, body, headers) {
  return response(statusCode, JSON.stringify(body), headers);
}

function response(statusCode, body, headers) {
  return {
    statusCode,
    headers,
    isBase64Encoded: false,
    body
  };
}
