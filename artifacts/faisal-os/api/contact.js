// Vercel serverless function — handles contact form submissions
  // Sends email to both founder addresses via Resend API

  const TO_ADDRESSES = [
    "chairman@faisalorakzai.com",
    "faisal@orakzaibond.com",
  ];

  export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") return res.status(200).end();
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    const { name, email, type, message, organization } = req.body ?? {};

    if (!name || !email || !type || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (apiKey) {
      try {
        const orgRow = organization
          ? `<tr><td style="color:#ffffff44;font-size:11px;letter-spacing:0.2em;padding:8px 0;border-bottom:1px solid #ffffff0a;">ORG</td><td style="color:#fff;font-size:11px;padding:8px 0 8px 16px;border-bottom:1px solid #ffffff0a;">${organization}</td></tr>`
          : "";

        const emailPayload = {
          from: "Orakzai Gateway <onboarding@resend.dev>",
          to: TO_ADDRESSES,
          reply_to: email,
          subject: `[${type}] New Transmission from ${name}`,
          html: `<!DOCTYPE html>
  <html><head><meta charset="utf-8"></head>
  <body style="background:#000;color:#fff;font-family:monospace;padding:32px;max-width:600px;margin:0 auto;">
    <div style="border:1px solid #F3BA2F44;padding:24px;">
      <div style="border-bottom:1px solid #F3BA2F22;padding-bottom:16px;margin-bottom:24px;">
        <span style="color:#F3BA2F;font-size:10px;letter-spacing:0.3em;">SOVEREIGN GATEWAY · INCOMING TRANSMISSION</span>
      </div>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="color:#ffffff44;font-size:11px;letter-spacing:0.2em;padding:8px 0;border-bottom:1px solid #ffffff0a;">TYPE</td><td style="color:#F3BA2F;font-size:11px;padding:8px 0 8px 16px;border-bottom:1px solid #ffffff0a;">${type}</td></tr>
        <tr><td style="color:#ffffff44;font-size:11px;letter-spacing:0.2em;padding:8px 0;border-bottom:1px solid #ffffff0a;">SENDER</td><td style="color:#fff;font-size:11px;padding:8px 0 8px 16px;border-bottom:1px solid #ffffff0a;">${name}</td></tr>
        <tr><td style="color:#ffffff44;font-size:11px;letter-spacing:0.2em;padding:8px 0;border-bottom:1px solid #ffffff0a;">EMAIL</td><td style="font-size:11px;padding:8px 0 8px 16px;border-bottom:1px solid #ffffff0a;"><a href="mailto:${email}" style="color:#F3BA2F;">${email}</a></td></tr>
        ${orgRow}
      </table>
      <div style="margin-top:24px;border-top:1px solid #F3BA2F22;padding-top:20px;">
        <div style="color:#ffffff44;font-size:10px;letter-spacing:0.25em;margin-bottom:10px;">PAYLOAD</div>
        <div style="color:#ffffffcc;font-size:13px;line-height:1.6;white-space:pre-wrap;">${message}</div>
      </div>
      <div style="margin-top:24px;border-top:1px solid #ffffff0a;padding-top:16px;color:#ffffff22;font-size:10px;">
        Transmitted via faisalorakzai.com · ${new Date().toISOString()}
      </div>
    </div>
  </body></html>`,
        };

        const emailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(emailPayload),
        });

        if (!emailRes.ok) {
          console.error("Resend error:", await emailRes.text());
        }
      } catch (e) {
        console.error("Email send failed:", e.message);
      }
    } else {
      console.warn("RESEND_API_KEY not configured — email skipped");
    }

    return res.status(201).json({
      id: Date.now(),
      name,
      email,
      type,
      message,
      organization: organization ?? null,
      createdAt: new Date().toISOString(),
    });
  }
  