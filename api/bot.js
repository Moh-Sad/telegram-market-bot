require("dotenv").config();
const { Telegraf, Markup } = require("telegraf");
const { t } = require("../utils/lang");

const bot = new Telegraf(process.env.BOT_TOKEN);

const ADMINS = process.env.ADMINS ? process.env.ADMINS.split(",").map(Number) : [];
const GROUP_CHAT_ID = process.env.GROUP_CHAT_ID?.replace(/['"]/g, "");

const userLangs = {};
const userSessions = {};

function getUserLang(telegramId) {
  return userLangs[telegramId] || "en";
}

async function showMainMenu(ctx, lang) {
  await ctx.reply(t(lang, "mainMenu"), {
    ...Markup.inlineKeyboard([
      [Markup.button.callback(t(lang, "btnPost"), "post_product")],
      [Markup.button.callback(t(lang, "btnContact"), "contact_us")],
    ]),
  });
}

function cancelKeyboard(lang) {
  return Markup.inlineKeyboard([
    [Markup.button.callback(t(lang, "btnCancel"), "cancel_post")],
  ]);
}

bot.start(async (ctx) => {
  const lang = getUserLang(ctx.from.id);
  const welcome = t(lang, "welcome");
  const chooseLang = t(lang, "chooseLang");
  ctx.reply(`${welcome}\n\n${chooseLang}`, {
    ...Markup.keyboard([["English", "አማርኛ", "العربية"]]).resize(),
  });
});

bot.command("menu", async (ctx) => {
  const lang = getUserLang(ctx.from.id);
  await showMainMenu(ctx, lang);
});

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

  await showMainMenu(ctx, lang);
});

bot.action("post_product", async (ctx) => {
  try { await ctx.answerCbQuery(); } catch (e) {}
  const lang = getUserLang(ctx.from.id);

  userSessions[ctx.from.id] = { step: "photo" };

  await ctx.reply(t(lang, "postInstructions"));
  await ctx.reply(t(lang, "promptPhoto"), cancelKeyboard(lang));
});

bot.action("cancel_post", async (ctx) => {
  try { await ctx.answerCbQuery(); } catch (e) {}
  const lang = getUserLang(ctx.from.id);

  delete userSessions[ctx.from.id];

  await ctx.reply("❌ Canceled.");
  await showMainMenu(ctx, lang);
});

bot.action("contact_us", async (ctx) => {
  try { await ctx.answerCbQuery(); } catch (e) {}
  const lang = getUserLang(ctx.from.id);
  await ctx.reply(t(lang, "contactInfo"));
});

bot.on("photo", async (ctx) => {
  const session = userSessions[ctx.from.id];
  const lang = getUserLang(ctx.from.id);

  if (session && session.step === "photo") {
    session.photo = ctx.message.photo.pop().file_id;
    session.step = "name";
    return ctx.reply(t(lang, "promptName"), cancelKeyboard(lang));
  }
});

bot.on("message", async (ctx) => {
  const session = userSessions[ctx.from.id];
  const lang = getUserLang(ctx.from.id);

  if (
    ctx.chat.id.toString() === GROUP_CHAT_ID?.toString() &&
    ctx.message.reply_to_message
  ) {
    const repliedText = ctx.message.reply_to_message.text || ctx.message.reply_to_message.caption || "";
    const match = repliedText.match(/🆔 ID:\s*(\d+)/);

    if (match) {
      const userId = Number(match[1]);
      try {
        await ctx.copyMessage(userId);
      } catch (err) {
        console.error("Error relaying message to user:", err.message);
        ctx.reply("Could not send message to the user.");
      }
    }
    return;
  }

  if (ctx.chat.type === "private" && session && session.step !== "photo") {
    const text = ctx.message.text;
    if (!text) return;

    switch (session.step) {
      case "name":
        session.name = text;
        session.step = "price";
        return ctx.reply(t(lang, "promptPrice"), cancelKeyboard(lang));

      case "price":
        session.price = text;
        session.step = "location";
        return ctx.reply(t(lang, "promptLocation"), cancelKeyboard(lang));

      case "location":
        session.location = text;
        session.step = "condition";
        return ctx.reply(t(lang, "promptCondition"), cancelKeyboard(lang));

      case "condition":
        session.condition = text;
        session.step = "size";
        return ctx.reply(t(lang, "promptSize"), cancelKeyboard(lang));

      case "size":
        session.size = text;
        session.step = "description";
        return ctx.reply(t(lang, "promptDescription"), cancelKeyboard(lang));

      case "description":
        session.description = text;
        session.step = "phone";
        return ctx.reply(t(lang, "promptPhone"), cancelKeyboard(lang));

      case "phone":
        session.phone = text;
        await submitProduct(ctx, session, lang);
        delete userSessions[ctx.from.id];
        return;
    }
  }
});

async function submitProduct(ctx, session, lang) {
  if (!GROUP_CHAT_ID) {
    console.error("GROUP_CHAT_ID is not configured.");
    return;
  }

  const user = ctx.from;
  const username = user.username ? `@${user.username}` : "N/A";
  const name = [user.first_name, user.last_name].filter(Boolean).join(" ");

  const caption = [
    `━━━━━━━━━━━━━━━━━━━━`,
    `📦  NEW PRODUCT POST  📦`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `${t(lang, "labelName")}: ${session.name}`,
    `${t(lang, "labelPrice")}: ${session.price}`,
    `${t(lang, "labelLocation")}: ${session.location}`,
    `${t(lang, "labelCondition")}: ${session.condition}`,
    `${t(lang, "labelSize")}: ${session.size}`,
    `${t(lang, "labelDescription")}: ${session.description}`,
    `${t(lang, "labelPhone")}: ${session.phone}`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `${t(lang, "labelUser")}: ${name} (${username})`,
    `🆔 ID: ${user.id}`,
    `🌍 Language: ${lang}`,
    `━━━━━━━━━━━━━━━━━━━━`,
  ].join("\n");

  try {
    await ctx.telegram.sendPhoto(GROUP_CHAT_ID, session.photo, { caption });
    await ctx.reply(t(lang, "postSuccess"));
    await showMainMenu(ctx, lang);
  } catch (err) {
    console.error("Error submitting product to group:", err.message);
    ctx.reply("❌ Error sending your post to admins. Please try again later.");
  }
}

module.exports = bot;