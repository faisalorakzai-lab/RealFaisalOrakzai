// Root Vercel Serverless Function: POST /api/standwithjensen
// Validates each campaign entry and sends it to the owner's moderation inbox.
// This email-backed endpoint does not expose or invent a public supporter count.
const allowedHosts = new Set(["faisalorakzai.com", "www.faisalorakzai.com"]);
const rateWindowMs = 60_000;
const maxPerWindow = 5;
const attempts = new Map();

function clean(value, limit) {
  return typeof value === "string"
    ? value.trim().replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").slice(0, limit)
    : "";
}
function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
}
function validOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return true;
  try { return allowedHosts.has(new URL(origin).hostname); } catch { return false; }
}
function isRateLimited(req) {
  const ip = String(req.headers["x-forwarded-for"] || "unknown").split(",")[0].trim().slice(0, 64);
  const now = Date.now();
  const entry = attempts.get(ip) || { count: 0, started: now };
  if (now - entry.started >= rateWindowMs) {
    attempts.set(ip, { count: 1, started: now });
    return false;
  }
  entry.count += 1;
  attempts.set(ip, entry);
  if (attempts.size > 2000) {
    for (const [key, value] of attempts) if (now - value.started >= rateWindowMs) attempts.delete(key);
  }
  return entry.count > maxPerWindow;
}

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "same-origin");
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!validOrigin(req)) return res.status(403).json({ error: "Request origin is not allowed." });
  if (isRateLimited(req)) return res.status(429).json({ error: "Too many attempts. Please wait a minute and try again." });

  const body = req.body && typeof req.body === "object" ? req.body : {};
  if (clean(body.website, 200)) return res.status(400).json({ error: "Submission could not be accepted." });
  if (body.consent !== true) return res.status(400).json({ error: "Please confirm the submission terms." });
  if (typeof body.name !== "string" || typeof body.country !== "string" || typeof body.role !== "string" || typeof body.message !== "string") {
    return res.status(400).json({ error: "Please review the form fields." });
  }
  const name = clean(body.name, 80);
  const country = clean(body.country, 80);
  const role = clean(body.role, 100);
  const message = clean(body.message, 500);
  if (name.length < 2 || country.length < 2 || role.length < 2) {
    return res.status(400).json({ error: "Name, country and role are required." });
  }
  if (body.name.trim().length > 80 || body.country.trim().length > 80 || body.role.trim().length > 100 || body.message.trim().length > 500) {
    return res.status(400).json({ error: "One or more fields exceed their maximum length." });
  }
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return res.status(503).json({ error: "The campaign submission service is not configured yet. Please try again later." });

  const safeName = escapeHtml(name);
  const safeCountry = escapeHtml(country);
  const safeRole = escapeHtml(role);
  const safeMessage = escapeHtml(message || "(No message provided)");
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        from: "Stand With Jensen <onboarding@resend.dev>",
        to: ["chairman@faisalorakzai.com"],
        subject: "New Stand With Jensen participation submission",
        html: `<div style="font:14px/1.6 Arial,sans-serif;max-width:620px;margin:auto;color:#151515"><h2>Campaign participation submission</h2><p><b>Name:</b> ${safeName}</p><p><b>Country:</b> ${safeCountry}</p><p><b>Profession / role:</b> ${safeRole}</p><p><b>Message:</b><br>${safeMessage.replace(/\n/g, "<br>")}</p><hr><p style="color:#555;font-size:12px">Received through faisalorakzai.com/standwithjensen. Review before any public use. This message does not create a public supporter count.</p></div>`,
      }),
    });
    if (!response.ok) return res.status(502).json({ error: "We could not deliver your submission right now. Please try again later." });
    return res.status(201).json({ ok: true, message: "Your submission was received for moderation." });
  } catch {
    return res.status(502).json({ error: "We could not deliver your submission right now. Please try again later." });
  }
};
