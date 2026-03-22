require("dotenv").config();
const { Telegraf, Markup } = require("telegraf");
const { t } = require("./utils/lang");

const bot = new Telegraf(process.env.BOT_TOKEN);

const ADMINS = process.env.ADMINS ? process.env.ADMINS.split(",").map(Number) : [];
const GROUP_CHAT_ID = process.env.GROUP_CHAT_ID?.replace(/['"]/g, "");

const userLangs = {};

// ─── Helper: get user language ───
function getUserLang(telegramId) {
  return userLangs[telegramId] || "en";
}

// ─── Helper: show main menu with inline buttons ───
async function showMainMenu(ctx, lang) {
  await ctx.reply(t(lang, "mainMenu"), {
    ...Markup.inlineKeyboard([
      [Markup.button.callback(t(lang, "btnPost"), "post_product")],
      [Markup.button.callback(t(lang, "btnContact"), "contact_us")],
    ]),
  });
}

// ═══════════════════════════════════════════
// 🌍 /start — Welcome intro + language select
// ═══════════════════════════════════════════
bot.start(async (ctx) => {
  const lang = getUserLang(ctx.from.id);
  const welcome = t(lang, "welcome");
  const chooseLang = t(lang, "chooseLang");
  ctx.reply(`${welcome}\n\n${chooseLang}`, {
    ...Markup.keyboard([["English", "አማርኛ", "العربية"]]).resize(),
  });
});

// ═══════════════════════════════════════════
// 📋 /menu — Re-access main menu anytime
// ═══════════════════════════════════════════
bot.command("menu", async (ctx) => {
  const lang = getUserLang(ctx.from.id);
  await showMainMenu(ctx, lang);
});

// ═══════════════════════════════════════════
// 🌍 Language selection → save + show menu
// ═══════════════════════════════════════════
bot.hears(["English", "አማርኛ", "العربية"], async (ctx) => {
  const langMap = {
    English: "en",
    "አማርኛ": "am",
    العربية: "ar",
  };

  const lang = langMap[ctx.message.text];
  userLangs[ctx.from.id] = lang;

  await ctx.reply(t(lang, "langSaved"), {
    reply_markup: { remove_keyboard: true },
  });

  // Show main menu after language is set
  await showMainMenu(ctx, lang);
});

// ═══════════════════════════════════════════
// 📦 Post Product — Send posting instructions
// ═══════════════════════════════════════════
bot.action("post_product", async (ctx) => {
  try {
    await ctx.answerCbQuery();
  } catch (e) {}
  const lang = getUserLang(ctx.from.id);
  await ctx.reply(t(lang, "postInstructions"));
});

// ═══════════════════════════════════════════
// 📞 Contact Us — Send beautified contact info
// ═══════════════════════════════════════════
bot.action("contact_us", async (ctx) => {
  try {
    await ctx.answerCbQuery();
  } catch (e) {}
  const lang = getUserLang(ctx.from.id);
  await ctx.reply(t(lang, "contactInfo"));
});

// ═══════════════════════════════════════════
// 💬 Admin reply in group → relay to user
// ═══════════════════════════════════════════
bot.on("message", async (ctx) => {
  // ── Handle admin replies in the group ──
  if (
    ctx.chat.id.toString() === GROUP_CHAT_ID?.toString() &&
    ctx.message.reply_to_message
  ) {
    const repliedText = ctx.message.reply_to_message.text || ctx.message.reply_to_message.caption || "";
    
    // Extract user ID from the forwarded header
    const match = repliedText.match(/🆔 ID:\s*(\d+)/);
    if (match) {
      const userId = Number(match[1]);
      try {
        // Forward admin's reply to the user
        if (ctx.message.text) {
          await ctx.telegram.sendMessage(userId, ctx.message.text);
        } else if (ctx.message.photo) {
          const photo = ctx.message.photo.pop().file_id;
          await ctx.telegram.sendPhoto(userId, photo, {
            caption: ctx.message.caption || "",
          });
        } else if (ctx.message.document) {
          await ctx.telegram.sendDocument(userId, ctx.message.document.file_id, {
            caption: ctx.message.caption || "",
          });
        } else if (ctx.message.video) {
          await ctx.telegram.sendVideo(userId, ctx.message.video.file_id, {
            caption: ctx.message.caption || "",
          });
        } else if (ctx.message.voice) {
          await ctx.telegram.sendVoice(userId, ctx.message.voice.file_id);
        } else if (ctx.message.sticker) {
          await ctx.telegram.sendSticker(userId, ctx.message.sticker.file_id);
        }
      } catch (err) {
        console.error("Error relaying message to user:", err.message);
        ctx.reply("❌ Could not send message to the user. They may have blocked the bot.");
      }
    }
    return;
  }

  // ── Regular user: forward messages to admin group ──
  if (ctx.chat.type === "private" && !ADMINS.includes(ctx.from.id)) {
    await forwardToGroup(ctx);
  }
});

// ═══════════════════════════════════════════
// 📤 Forward user message to admin group
// ═══════════════════════════════════════════
async function forwardToGroup(ctx) {
  if (!GROUP_CHAT_ID || GROUP_CHAT_ID === "YOUR_GROUP_CHAT_ID_HERE") {
    console.error("GROUP_CHAT_ID is not configured.");
    return;
  }

  const user = ctx.from;
  const username = user.username ? `@${user.username}` : "N/A";
  const name = [user.first_name, user.last_name].filter(Boolean).join(" ");
  const lang = getUserLang(user.id);

  const header =
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `📩 New message from user\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `👤 Name: ${name}\n` +
    `🆔 ID: ${user.id}\n` +
    `📎 Username: ${username}\n` +
    `🌍 Language: ${lang}\n` +
    `━━━━━━━━━━━━━━━━━━━━`;

  try {
    // Send user info header
    await ctx.telegram.sendMessage(GROUP_CHAT_ID, header);

    // Forward the actual message instead of copying to preserve media groups/etc if possible
    // Use copyMessage for better reliability with different types
    await ctx.copyMessage(GROUP_CHAT_ID);

    // Confirm to the user
    await ctx.reply(t(lang, "msgForwarded"));
  } catch (err) {
    console.error("Error forwarding to group:", err.message);
    if (err.description?.includes("chat not found")) {
      console.error("TIP: Make sure the bot is a member of the group and GROUP_CHAT_ID is correct.");
    }
  }
}

// 🚀 Launch
bot.launch().then(() => {
  console.log("Bot running 🚀");
}).catch(err => {
  console.error("Bot launch error:", err.message);
});

// Graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));