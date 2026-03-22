require("dotenv").config();
const fs = require("fs");
const axios = require("axios");
const connectDB = require("./db/db");
const { Telegraf, Markup } = require("telegraf");
const Product = require("./models/product");
const uploadFile = require("./services/google-drive");

const bot = new Telegraf(process.env.BOT_TOKEN);

// ✅ Connect DB
connectDB();

// ✅ Admins from ENV
const ADMINS = process.env.ADMINS.split(",").map(Number);

// ✅ User sessions
const users = {};

// 🌍 Start (Language selection)
bot.start((ctx) => {
  ctx.reply(
    "🌍 Choose Language / ቋንቋ / اللغة",
    Markup.keyboard([["English", "አማርኛ", "العربية"]]).resize()
  );
});

// 🌍 Save language
bot.hears(["English", "አማርኛ", "العربية"], (ctx) => {
  const langMap = {
    English: "en",
    "አማርኛ": "am",
    العربية: "ar",
  };

  users[ctx.from.id] = {
    lang: langMap[ctx.message.text],
  };

  ctx.reply("✅ Language saved! Use /products");
});

// 👀 Show products
bot.command("products", async (ctx) => {
  const products = await Product.find();

  if (!products.length) {
    return ctx.reply("No products available");
  }

  for (const p of products) {
    await ctx.replyWithPhoto(p.photo, {
      caption: `
🏷️ ${p.name}
💰 ${p.price}
📍 ${p.location}
📦 ${p.condition}
📏 ${p.size}
📝 ${p.description}

📞 ${p.phone}
      `,
      ...Markup.inlineKeyboard([
        [Markup.button.callback("🛒 Order", `order_${p._id}`)],
        [Markup.button.url("📞 Contact", `tel:${p.phone}`)],
      ]),
    });
  }
});

// 🛒 Order
bot.action(/order_(.+)/, (ctx) => {
  ctx.reply("Send your name & location to order.");
});

// 👑 Admin post
bot.command("post", (ctx) => {
  if (!ADMINS.includes(ctx.from.id)) {
    return ctx.reply("❌ Not authorized");
  }

  users[ctx.from.id] = { step: "photo" };
  ctx.reply("📸 Send product photo:");
});

// 📸 Handle photo
bot.on("photo", async (ctx) => {
  const user = users[ctx.from.id];
  if (!user || user.step !== "photo") return;

  const fileId = ctx.message.photo.pop().file_id;

  const fileLink = await ctx.telegram.getFileLink(fileId);

  // download image
  const response = await axios({
    url: fileLink.href,
    method: "GET",
    responseType: "stream",
  });

  const filePath = `./temp_${ctx.from.id}.jpg`;
  const writer = fs.createWriteStream(filePath);

  response.data.pipe(writer);

  writer.on("finish", async () => {
    // upload to Google Drive
    const driveUrl = await uploadFile(filePath);

    fs.unlinkSync(filePath);

    user.photo = driveUrl;
    user.step = "name";

    ctx.reply("🏷️ Item name:");
  });
});

// 🧠 Steps
bot.on("text", async (ctx) => {
  const user = users[ctx.from.id];
  if (!user || !user.step) return;

  const text = ctx.message.text;

  switch (user.step) {
    case "name":
      user.name = text;
      user.step = "price";
      return ctx.reply("💰 Price:");

    case "price":
      user.price = text;
      user.step = "location";
      return ctx.reply("📍 Location:");

    case "location":
      user.location = text;
      user.step = "condition";
      return ctx.reply("📦 Condition:");

    case "condition":
      user.condition = text;
      user.step = "size";
      return ctx.reply("📏 Size:");

    case "size":
      user.size = text;
      user.step = "description";
      return ctx.reply("📝 Description:");

    case "description":
      user.description = text;
      user.step = "phone";
      return ctx.reply("📞 Phone:");

    case "phone":
      user.phone = text;

      const newProduct = new Product(user);
      await newProduct.save();

      ctx.reply("✅ Product saved!");

      users[ctx.from.id] = {};
      break;
  }
});

// 🚀 Launch
bot.launch();
console.log("Bot running 🚀");