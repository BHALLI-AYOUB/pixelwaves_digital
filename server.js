const http = require("http");
const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");
const nodemailer = require("nodemailer");

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
  ".xml": "application/xml; charset=utf-8",
};

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

function getBaseUrl(req) {
  const forwardedProto = req.headers["x-forwarded-proto"];
  const protocol = Array.isArray(forwardedProto) ? forwardedProto[0] : forwardedProto || "http";
  const forwardedHost = req.headers["x-forwarded-host"];
  const hostHeader = Array.isArray(forwardedHost) ? forwardedHost[0] : forwardedHost || req.headers.host || `${host}:${port}`;
  return `${protocol}://${hostHeader}`;
}

function getCacheControl(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".html") return "no-store";
  if ([".css", ".js", ".png", ".jpg", ".jpeg", ".jfif", ".svg", ".webp", ".ico", ".webmanifest"].includes(ext)) {
    return "public, max-age=86400, stale-while-revalidate=604800";
  }
  return "public, max-age=3600";
}

async function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";

    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 1_000_000) {
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

function buildContactText(data) {
  return [
    "Nouveau brief PixelWave",
    "",
    `Nom: ${data.nom}`,
    `Email: ${data.email}`,
    `Téléphone: ${data.telephone || "Non renseigné"}`,
    `Type de projet: ${data.projet}`,
    `Budget indicatif: ${data.budget || "À définir"}`,
    `Délai souhaité: ${data.delai || "À définir"}`,
    `Source: ${data.source || "website"}`,
    "",
    "Message:",
    data.message,
  ].join("\n");
}

async function storeSubmission(data, req) {
  await fsp.mkdir(dataDir, { recursive: true });
  const record = {
    ...data,
    createdAt: new Date().toISOString(),
    ip: req.socket.remoteAddress || "",
    userAgent: req.headers["user-agent"] || "",
  };
  await fsp.appendFile(submissionsFile, `${JSON.stringify(record)}\n`, "utf8");
}

async function sendSubmissionEmail(data) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM || smtpUser;
  const contactTo = process.env.CONTACT_TO || "pixelwaves_digital@outlook.com";

  if (!smtpHost || !smtpUser || !smtpPass || !smtpFrom) {
    return { delivered: false };
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: process.env.SMTP_SECURE === "true" || smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  await transporter.sendMail({
    from: smtpFrom,
    to: contactTo,
    replyTo: data.email,
    subject: `Nouveau brief PixelWave — ${data.projet}`,
    text: buildContactText(data),
  });

  return { delivered: true };
}

async function handleContactRequest(req, res) {
  try {
    const payload = await parseJsonBody(req);
    const data = {
      nom: String(payload.nom || "").trim(),
      email: String(payload.email || "").trim(),
      telephone: String(payload.telephone || "").trim(),
      projet: String(payload.projet || "").trim(),
      budget: String(payload.budget || "").trim(),
      delai: String(payload.delai || "").trim(),
      message: String(payload.message || "").trim(),
      source: String(payload.source || "website").trim(),
    };

    if (!data.nom || !data.email || !data.projet || !data.message) {
      sendJson(res, 400, {
        ok: false,
        message: "Certains champs obligatoires sont manquants.",
      });
      return;
    }

    await storeSubmission(data, req);
    const mailResult = await sendSubmissionEmail(data);

    sendJson(res, 200, {
      ok: true,
      delivered: mailResult.delivered,
      message: mailResult.delivered
        ? "Votre demande a bien été envoyée. Nous revenons vers vous rapidement."
        : "Votre demande a bien été enregistrée côté serveur. Nous revenons vers vous rapidement.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    sendJson(res, 500, {
      ok: false,
      message: "Une erreur est survenue pendant l'envoi de votre demande.",
    });
  }
}

function handleRobots(req, res) {
  const baseUrl = getBaseUrl(req);
  const body = `User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml\n`;
  sendResponse(res, 200, body, {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "public, max-age=3600",
  });
}

function handleSitemap(req, res) {
  const baseUrl = getBaseUrl(req);
  const urls = ["", "#services", "#projets", "#equipe", "#a-propos", "#contact", "/mentions-legales.html", "/confidentialite.html"];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((item) => `  <url><loc>${baseUrl}${item}</loc></url>`).join("\n")}
</urlset>`;

  sendResponse(res, 200, body, {
    "Content-Type": "application/xml; charset=utf-8",
    "Cache-Control": "public, max-age=3600",
  });
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
    const contentType = contentTypes[ext] || "application/octet-stream";

    sendResponse(res, 200, data, {
      "Content-Type": contentType,
      "Cache-Control": getCacheControl(filePath),
    });
  } catch (error) {
    sendResponse(res, 404, "Not found", {
      "Content-Type": "text/plain; charset=utf-8",
    });
  }
}

const server = http.createServer(async (req, res) => {
  const pathname = (req.url || "/").split("?")[0];

  if (req.method === "POST" && pathname === "/api/contact") {
    await handleContactRequest(req, res);
    return;
  }

  if (req.method === "GET" && pathname === "/robots.txt") {
    handleRobots(req, res);
    return;
  }

  if (req.method === "GET" && pathname === "/sitemap.xml") {
    handleSitemap(req, res);
    return;
  }

  await serveStaticFile(req, res);
});

server.listen(port, host, () => {
  console.log(`PixelWaves is running at http://${host}:${port}`);
});
