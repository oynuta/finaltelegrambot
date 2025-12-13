import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  telegramId: { type: Number, required: true, unique: true },
  name: String,
  username: String,
  phone: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", UserSchema);