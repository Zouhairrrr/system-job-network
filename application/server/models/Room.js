const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    number: { type: Number, unique: true },
    type: { type: String, required: true },
    numberOfPerson: { type: Number, required: true },
    price: { type: String, required: true },
    images: { type: Array, required: true, min: 8, max: 8 },
    isReserved: { type: Boolean, default: false },
    hotelId: {
      type: mongoose.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
