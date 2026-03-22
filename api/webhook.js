const bot = require("../bot");

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "telegram-market-bot-secret";

module.exports = async (req, res) => {
  try {
    if (req.method === "POST") {
      await bot.handleUpdate(req.body);
      return res.status(200).json({ ok: true });
    }

    if (req.method === "GET") {
      const host = req.headers["x-forwarded-host"] || req.headers.host;
      const protocol = req.headers["x-forwarded-proto"] || "https";
      const webhookUrl = `${protocol}://${host}/api/webhook`;

      await bot.telegram.setWebhook(webhookUrl, {
        secret_token: WEBHOOK_SECRET,
      });

      return res.status(200).json({
        ok: true,
        message: "Webhook set successfully",
        url: webhookUrl,
      });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Webhook error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
