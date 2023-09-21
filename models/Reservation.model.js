const mongoose = require("mongoose");
const { Schema, model } = mongoose;
 
const reservationSchema = new Schema(
  {
    pickupTime: String,
    dropOffTime: String,
    address: String,
    phone: String
  },
  {
    timestamps: true
  }
);
 
module.exports = model("Reservation", reservationSchema);