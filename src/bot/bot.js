import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";
config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstname = msg.chat.first_name;

  bot.sendMessage(chatId, `Assalamu Alaikum, ${firstname}! `, {
    reply_markup: {
      keyboard: [
        ["💡 About bot", "📚 Help"],
        ["😎 My profile"]  
      ],
      resize_keyboard: true
    }
  });
});

// Handle buttons except quotes
bot.on("message", (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;

  });

console.log("working!");
