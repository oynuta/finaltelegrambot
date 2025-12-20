import { bot } from "../bot.js";

function onStart(msg) {
  const chatId = msg.chat.id;
  const firstname = msg.chat.first_name;

  bot.sendMessage(
    chatId,
    `
👋 Assalomu alaykum, ${firstname}!

📚 100x o‘quv markazining rasmiy botiga xush kelibsiz!

Bu bot orqali siz:
• Kurslar haqida ma’lumot olasiz  
• Kurslarga onlayn ro‘yxatdan o‘tasiz  
• Jadval va to‘lovlarni bilib olasiz  

Kerakli bo‘limni tanlang 👇
    `,
    {
      reply_markup: {
        keyboard: [
          [{ text: "📚 Kurslar" }],
          [{ text: "✍️ Ro‘yxatdan o‘tish" }],
          [{ text: "ℹ️ Markaz haqida" }, { text: "❓ Yordam" }],
        ],
        resize_keyboard: true,
      },
    }
  );
}

export default onStart;
