// Vercel serverless entry point for the contact form. All logic lives in lib/contact.js.
const { handleBrief } = require("../lib/contact");

const MAX_BODY = 50_000;

function readJson(req) {
  // Vercel may already have parsed the body.
  if (req.body && typeof req.body === "object") return Promise.resolve(req.body);
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > MAX_BODY) {
        reject(new Error("Payload too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error("Invalid JSON payload"));
      }
    });
    req.on("error", reject);
  });
}

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    sendJson(res, 405, { ok: false, reason: "method-not-allowed" });
    return;
  }

  try {
    const payload = await readJson(req);
    const forwarded = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim();
    const { status, body } = await handleBrief(payload, {
      ip: forwarded || req.socket?.remoteAddress,
      userAgent: req.headers["user-agent"],
    });
    sendJson(res, status, body);
  } catch (error) {
    console.error("[contact] request failed:", error);
    sendJson(res, 400, { ok: false, reason: "invalid" });
  }
};
