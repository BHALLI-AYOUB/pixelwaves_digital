// Contact brief pipeline, shared by server.js (local) and api/contact.js (Vercel).
//
// The rule that matters: the API only reports success when at least one delivery
// channel actually accepted the brief. If nothing is configured, or every channel
// fails, the visitor is told so and offered WhatsApp instead. A brief is never
// silently lost behind a "thank you".
//
// Channels, each enabled by its environment variables (see .env.example):
//   telegram  TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID      instant phone notification, free
//   resend    RESEND_API_KEY (+ RESEND_FROM)             email over HTTPS
//   smtp      SMTP_HOST + SMTP_USER + SMTP_PASS (+ ...)  email through any mailbox
//   webhook   CONTACT_WEBHOOK_URL                        Slack, Discord, Make, Zapier...
//   file      storeFile option (local server only)       appends to a JSONL file
const fs = require("fs/promises");
const path = require("path");
const nodemailer = require("nodemailer");

const LIMITS = { nom: 120, email: 200, telephone: 40, projet: 80, delai: 80, message: 5000, source: 60 };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// A human needs a few seconds to fill the form; bots post instantly.
const MIN_FILL_MS = 2500;
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
const recentByIp = new Map();

function env(name, fallback = "") {
  const value = process.env[name];
  return value === undefined || value === "" ? fallback : value;
}

function normalize(payload) {
  const data = {};
  for (const [field, max] of Object.entries(LIMITS)) {
    data[field] = String(payload[field] ?? "").trim().slice(0, max);
  }
  data.source = data.source || "website";
  data.locale = /-fr$/.test(data.source) ? "fr" : "en";
  return data;
}

function validate(data) {
  const missing = ["nom", "email", "projet", "message"].filter((field) => !data[field]);
  if (missing.length) return `Missing fields: ${missing.join(", ")}`;
  if (!EMAIL_PATTERN.test(data.email)) return "Invalid email";
  return null;
}

// Honeypot field or an impossibly fast submission. Bots get a normal-looking success.
function looksLikeSpam(payload) {
  if (payload.company) return true;
  const elapsed = Number(payload.elapsed);
  return Number.isFinite(elapsed) && elapsed > 0 && elapsed < MIN_FILL_MS;
}

function isRateLimited(ip) {
  if (!ip) return false;
  const now = Date.now();
  const recent = (recentByIp.get(ip) || []).filter((time) => now - time < RATE_LIMIT.windowMs);
  recent.push(now);
  recentByIp.set(ip, recent);
  return recent.length > RATE_LIMIT.max;
}

function briefText(data) {
  return [
    `Nouveau brief PixelWaves — ${data.projet}`,
    "",
    `Nom : ${data.nom}`,
    `Email : ${data.email}`,
    `Téléphone : ${data.telephone || "—"}`,
    `Type de projet : ${data.projet}`,
    `Délai souhaité : ${data.delai || "—"}`,
    `Langue : ${data.locale.toUpperCase()}`,
    `Source : ${data.source}`,
    "",
    "Message :",
    data.message,
  ].join("\n");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

function briefHtml(data) {
  const rows = [
    ["Nom", data.nom],
    ["Email", `<a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a>`, true],
    ["Téléphone", data.telephone || "—"],
    ["Projet", data.projet],
    ["Délai", data.delai || "—"],
    ["Langue", data.locale.toUpperCase()],
  ];
  const cells = rows
    .map(([label, value, raw]) => `<tr><td style="padding:6px 16px 6px 0;color:#6b6780">${label}</td><td style="padding:6px 0">${raw ? value : escapeHtml(value)}</td></tr>`)
    .join("");
  return `<div style="font-family:system-ui,sans-serif;font-size:15px;color:#0c0a13">
  <p style="margin:0 0 16px;font-size:18px;font-weight:600">Nouveau brief — ${escapeHtml(data.projet)}</p>
  <table style="border-collapse:collapse">${cells}</table>
  <p style="margin:20px 0 6px;color:#6b6780">Message</p>
  <p style="margin:0;white-space:pre-wrap">${escapeHtml(data.message)}</p>
</div>`;
}

const autoReplies = {
  en: {
    subject: "We received your project brief — PixelWaves Digital",
    text: (data) =>
      `Hello ${data.nom},\n\nThank you for your brief about your ${data.projet} project. We read every request personally and will reply within 24 hours with questions and next steps.\n\nNeed something sooner? WhatsApp: ${env("CONTACT_WHATSAPP", "https://wa.me/212776356930")}\n\n— Ayoub Bhalli, PixelWaves Digital`,
  },
  fr: {
    subject: "Nous avons bien reçu votre brief — PixelWaves Digital",
    text: (data) =>
      `Bonjour ${data.nom},\n\nMerci pour votre brief concernant votre projet ${data.projet}. Nous lisons chaque demande personnellement et revenons vers vous sous 24 h avec nos questions et les prochaines étapes.\n\nBesoin d'une réponse plus rapide ? WhatsApp : ${env("CONTACT_WHATSAPP", "https://wa.me/212776356930")}\n\n— Ayoub Bhalli, PixelWaves Digital`,
  },
};

function configuredChannels({ storeFile } = {}) {
  const channels = [];
  if (env("TELEGRAM_BOT_TOKEN") && env("TELEGRAM_CHAT_ID")) channels.push("telegram");
  if (env("RESEND_API_KEY")) channels.push("resend");
  if (env("SMTP_HOST") && env("SMTP_USER") && env("SMTP_PASS")) channels.push("smtp");
  if (env("CONTACT_WEBHOOK_URL")) channels.push("webhook");
  if (storeFile) channels.push("file");
  return channels;
}

async function postJson(url, body, headers = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`HTTP ${response.status} ${detail.slice(0, 200)}`);
  }
  return response;
}

let smtpTransport;
function smtp() {
  if (!smtpTransport) {
    const port = Number(env("SMTP_PORT", "587"));
    smtpTransport = nodemailer.createTransport({
      host: env("SMTP_HOST"),
      port,
      secure: env("SMTP_SECURE") === "true" || port === 465,
      auth: { user: env("SMTP_USER"), pass: env("SMTP_PASS") },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });
  }
  return smtpTransport;
}

const senders = {
  async telegram(data) {
    await postJson(`https://api.telegram.org/bot${env("TELEGRAM_BOT_TOKEN")}/sendMessage`, {
      chat_id: env("TELEGRAM_CHAT_ID"),
      text: briefText(data).slice(0, 4000),
      disable_web_page_preview: true,
    });
  },
  async resend(data) {
    await postJson(
      "https://api.resend.com/emails",
      {
        from: env("RESEND_FROM", "PixelWaves Website <onboarding@resend.dev>"),
        to: env("CONTACT_TO", "pixelwaves_digital@outlook.com").split(",").map((address) => address.trim()),
        reply_to: data.email,
        subject: `Nouveau brief — ${data.projet} — ${data.nom}`,
        text: briefText(data),
        html: briefHtml(data),
      },
      { Authorization: `Bearer ${env("RESEND_API_KEY")}` },
    );
  },
  async smtp(data) {
    await smtp().sendMail({
      from: env("SMTP_FROM", env("SMTP_USER")),
      to: env("CONTACT_TO", "pixelwaves_digital@outlook.com"),
      replyTo: data.email,
      subject: `Nouveau brief — ${data.projet} — ${data.nom}`,
      text: briefText(data),
      html: briefHtml(data),
    });
  },
  async webhook(data) {
    const text = briefText(data);
    // `text` suits Slack, `content` suits Discord; `brief` carries the raw fields.
    await postJson(env("CONTACT_WEBHOOK_URL"), { text, content: text.slice(0, 1900), brief: data });
  },
  async file(data, { storeFile, meta }) {
    await fs.mkdir(path.dirname(storeFile), { recursive: true });
    await fs.appendFile(storeFile, `${JSON.stringify({ ...data, ...meta, createdAt: new Date().toISOString() })}\n`, "utf8");
  },
};

// Confirmation to the visitor. Best effort: a failure here never fails the brief.
async function sendAutoReply(data) {
  if (env("CONTACT_AUTOREPLY") === "false") return null;
  const reply = autoReplies[data.locale];
  const message = { subject: reply.subject, text: reply.text(data) };
  try {
    if (env("RESEND_API_KEY") && env("RESEND_FROM")) {
      await postJson(
        "https://api.resend.com/emails",
        { from: env("RESEND_FROM"), to: [data.email], reply_to: env("CONTACT_TO", "pixelwaves_digital@outlook.com").split(",")[0].trim(), ...message },
        { Authorization: `Bearer ${env("RESEND_API_KEY")}` },
      );
      return "resend";
    }
    if (env("SMTP_HOST") && env("SMTP_USER") && env("SMTP_PASS")) {
      await smtp().sendMail({ from: env("SMTP_FROM", env("SMTP_USER")), to: data.email, ...message });
      return "smtp";
    }
  } catch (error) {
    console.error("[contact] auto-reply failed:", error.message);
  }
  return null;
}

async function deliver(data, options = {}) {
  const channels = configuredChannels(options);
  const results = await Promise.all(
    channels.map(async (channel) => {
      try {
        await senders[channel](data, options);
        return { channel, ok: true };
      } catch (error) {
        console.error(`[contact] ${channel} failed:`, error.message);
        return { channel, ok: false, error: error.message };
      }
    }),
  );
  const delivered = results.some((result) => result.ok);
  const autoReply = delivered ? await sendAutoReply(data) : null;
  return { delivered, configured: channels.length > 0, results, autoReply };
}

// Framework-neutral entry point: takes the parsed body and client IP, returns
// the HTTP status and JSON body to send.
async function handleBrief(payload, { ip, userAgent, storeFile } = {}) {
  if (!payload || typeof payload !== "object") return { status: 400, body: { ok: false, reason: "invalid" } };
  if (looksLikeSpam(payload)) return { status: 200, body: { ok: true } };
  if (isRateLimited(ip)) return { status: 429, body: { ok: false, reason: "rate-limited" } };

  const data = normalize(payload);
  const invalid = validate(data);
  if (invalid) return { status: 400, body: { ok: false, reason: "invalid", message: invalid } };

  const outcome = await deliver(data, { storeFile, meta: { ip: ip || "", userAgent: userAgent || "" } });
  if (!outcome.configured) {
    console.error("[contact] No delivery channel configured: the brief was NOT delivered. See .env.example.");
    return { status: 503, body: { ok: false, reason: "not-configured" } };
  }
  if (!outcome.delivered) return { status: 502, body: { ok: false, reason: "delivery-failed" } };
  return { status: 200, body: { ok: true } };
}

module.exports = { handleBrief, deliver, configuredChannels, normalize, validate, briefText };
