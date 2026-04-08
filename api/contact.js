const nodemailer = require("nodemailer");

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

function readJson(req) {
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
      if (!raw) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
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
    `Telephone: ${data.telephone || "Non renseigne"}`,
    `Type de projet: ${data.projet}`,
    `Budget indicatif: ${data.budget || "A definir"}`,
    `Delai souhaite: ${data.delai || "A definir"}`,
    `Source: ${data.source || "website"}`,
    "",
    "Message:",
    data.message,
  ].join("\n");
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
    subject: `Nouveau brief PixelWave - ${data.projet}`,
    text: buildContactText(data),
  });

  return { delivered: true };
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    sendJson(res, 405, { ok: false, message: "Method not allowed" });
    return;
  }

  try {
    const payload = await readJson(req);
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
      sendJson(res, 400, { ok: false, message: "Required fields missing." });
      return;
    }

    const mailResult = await sendSubmissionEmail(data);
    sendJson(res, 200, {
      ok: true,
      delivered: mailResult.delivered,
      message: mailResult.delivered
        ? "Votre demande a bien ete envoyee. Nous revenons vers vous rapidement."
        : "Votre demande a bien ete enregistree. Nous revenons vers vous rapidement.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    sendJson(res, 500, {
      ok: false,
      message: "Une erreur est survenue pendant l'envoi de votre demande.",
    });
  }
};
