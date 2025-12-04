import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";
config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const firstname = msg.chat.first_name;
  const text = msg.text;

  bot.sendMessage(chatId, `Assalamu Alaikum,welcomeeee)), ${firstname}`);
  bot.sendMessage(chatId, `text: ${text}`);
});


console.log("working!");