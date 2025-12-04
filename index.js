import "./src/bot/bot.js";
import mongoose from "mongoose";
import { config } from "dotenv";
config()

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`db IS CONNECTED!`);
  })
  .catch(() => {
    console.log(`DB DISCONNNECTED!`);
  });


console.log("working!");