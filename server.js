const http = require("http");
const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");
const zlib = require("zlib");
const { configuredChannels, handleBrief } = require("./lib/contact");

const host = "127.0.0.1";
const port = Number(process.env.PORT) || 3000;
const rootDir = __dirname;
const dataDir = path.join(rootDir, "data");
const submissionsFile = path.join(dataDir, "contact-submissions.jsonl");

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".jfif": "image/jpeg",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

const compressibleTypes = [".css", ".html", ".js", ".json", ".svg", ".txt", ".webmanifest", ".xml"];

function sendResponse(res, statusCode, body, headers = {}) {
  res.writeHead(statusCode, headers);
  res.end(body);
}

function sendJson(res, statusCode, payload) {
  sendResponse(res, statusCode, JSON.stringify(payload), {
    "Content-Type": "application/json; charset=utf-8",
  });
}

function resolvePath(urlPath) {
  const decodedPath = decodeURIComponent((urlPath || "/").split("?")[0]);
  const safePath = path.normalize(decodedPath).replace(/^(\.\.[/\\])+/, "");
  const requestedPath = safePath === path.sep ? "index.html" : safePath.replace(/^[/\\]/, "");
  const absolutePath = path.resolve(rootDir, requestedPath);

  if (!absolutePath.startsWith(rootDir)) {
    return null;
  }

  return absolutePath;
}


function getCacheControl(filePath, url) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".html") return "no-cache";
  // app.js and styles.css are referenced with a content hash (?v=...) in production builds.
  if (/[?&]v=/.test(url)) return "public, max-age=31536000, immutable";
  if ([".css", ".js"].includes(ext)) return "no-cache";
  if ([".png", ".jpg", ".jpeg", ".jfif", ".svg", ".webp", ".avif", ".woff2", ".ico"].includes(ext)) {
    return "public, max-age=604800, stale-while-revalidate=2592000";
  }
  return "public, max-age=3600";
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";

    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 50_000) {
        reject(new Error("Payload too large"));
        req.destroy();
      }
    });

    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        reject(new Error("Invalid JSON payload"));
      }
    });

    req.on("error", reject);
  });
}

// Locally every brief is also kept in data/contact-submissions.jsonl, so development
// works without credentials. Production (Vercel) has no writable disk: it relies on
// the channels configured in the environment, and reports failure when none exist.
async function handleContactRequest(req, res) {
  try {
    const payload = await parseJsonBody(req);
    const { status, body } = await handleBrief(payload, {
      ip: req.socket.remoteAddress,
      userAgent: req.headers["user-agent"],
      storeFile: submissionsFile,
    });
    sendJson(res, status, body);
  } catch (error) {
    console.error("[contact] request failed:", error);
    sendJson(res, 400, { ok: false, reason: "invalid" });
  }
}

async function serveStaticFile(req, res) {
  const absolutePath = resolvePath(req.url || "/");

  if (!absolutePath) {
    sendResponse(res, 403, "Forbidden", {
      "Content-Type": "text/plain; charset=utf-8",
    });
    return;
  }

  try {
    const stats = await fsp.stat(absolutePath);
    const filePath = stats.isDirectory() ? path.join(absolutePath, "index.html") : absolutePath;
    const data = await fsp.readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const headers = {
      "Content-Type": contentTypes[ext] || "application/octet-stream",
      "Cache-Control": getCacheControl(filePath, req.url || ""),
      Vary: "Accept-Encoding",
    };
    const accepts = String(req.headers["accept-encoding"] || "");

    if (compressibleTypes.includes(ext) && data.length > 1024) {
      if (/\bbr\b/.test(accepts)) {
        sendResponse(res, 200, zlib.brotliCompressSync(data, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 5 } }), { ...headers, "Content-Encoding": "br" });
        return;
      }
      if (/\bgzip\b/.test(accepts)) {
        sendResponse(res, 200, zlib.gzipSync(data), { ...headers, "Content-Encoding": "gzip" });
        return;
      }
    }

    sendResponse(res, 200, data, headers);
  } catch (error) {
    const notFound = await fsp.readFile(path.join(rootDir, "404.html")).catch(() => null);
    sendResponse(res, 404, notFound || "Not found", {
      "Content-Type": notFound ? "text/html; charset=utf-8" : "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    });
  }
}

const server = http.createServer(async (req, res) => {
  const pathname = (req.url || "/").split("?")[0];

  if (req.method === "POST" && pathname === "/api/contact") {
    await handleContactRequest(req, res);
    return;
  }

  if (req.method === "GET" && pathname === "/fr") {
    sendResponse(res, 301, "", { Location: "/fr/" });
    return;
  }

  await serveStaticFile(req, res);
});

server.listen(port, host, () => {
  console.log(`PixelWaves Digital is running at http://${host}:${port}`);
  console.log(`Contact briefs go to: ${configuredChannels({ storeFile: submissionsFile }).join(", ")}`);
});
