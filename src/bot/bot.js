import mongoose from "mongoose";


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`db IS CONNECTED!`);
  })
  .catch(() => {
    console.log(`DB DISCONNNECTED!`);
  });

console.log("working!");