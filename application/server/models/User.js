const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, min: 6 },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: ["admin", "client", "owner"] },
    password: { type: String, required: true, min: 8 },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
