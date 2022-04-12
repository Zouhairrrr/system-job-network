const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const reservationSchema = new mongoose.Schema({
    fromeDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    payment: { type: String, required: true, enum: ["stripe", "paypal"] },
    chambre: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    hotelId: { type: Schema.Types.ObjectId, ref: 'Hotel' },
}, { timestamps: true, });


const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;