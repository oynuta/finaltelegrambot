import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";
config();

import onStart from "./handlers/Onstart.js";

export const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
const CHANNEL_ID = "@academy_100x_uz"; // Bot must be admin here if private

// ===== Check subscription =====
const checkIfUserSubscribed = async (chatId) => {
  try {
    const chatMember = await bot.getChatMember(CHANNEL_ID, chatId);
    const status = chatMember.status;

    if (status === "left" || status === "kicked") return false;
    return true;
  } catch (err) {
    console.log("Subscription check error:", err);
    return false; // prevent crash
  }
};

// ===== Message handler =====
bot.on("message", async (msg) => {
  try {
    const chatId = msg.chat.id;
    const firstname = msg.chat.first_name || "Foydalanuvchi";
    const text = msg.text;

    const subscription = await checkIfUserSubscribed(chatId);
    console.log("Subscribed?", subscription);

    if (!subscription) {
      return bot.sendMessage(
        chatId,
        `Hurmatli ${firstname}, siz botdan foydalanish uchun kanalga obuna bo‘lishingiz kerak 👇`,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "100x Academy Xiva", url: "https://t.me/academy_100x_uz" }],
              [{ text: "Obunani tekshirish ✅", callback_data: "confirm_subscription" }],
            ],
          },
        }
      );
    }

    if (text === "/start") return onStart(msg);

    bot.sendMessage(chatId, `Assalomu alaykum, ${firstname}!`);
    bot.sendMessage(chatId, `Siz yozdingiz: ${text}`);
  } catch (err) {
    console.log("Message handler error:", err);
  }
});

// ===== Callback handler =====
bot.on("callback_query", async (query) => {
  try {
    const msg = query.message;
    const data = query.data;
    const id = query.id;
    const chatId = msg.chat.id;

    if (data === "confirm_subscription") {
      const subscription = await checkIfUserSubscribed(chatId);

      if (!subscription) {
        return bot.answerCallbackQuery(id, { text: "Siz hali obuna bo‘lmagansiz ❌" });
      } else {
        await bot.deleteMessage(chatId, msg.message_id);
        return onStart(msg);
      }
    }
  } catch (err) {
    console.log("Callback handler error:", err);
  }
});

console.log("🚀 Bot ishga tushdi va ready!");
