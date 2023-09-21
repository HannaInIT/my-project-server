const mongoose = require("mongoose");
const { Schema, model } = mongoose;
 
const carSchema = new Schema(
  {
    name: String,
    imageUrl: String,
    maxSpeedInKm: Number,
    pricePerDay: Number,
    description: String
  },
  {
    timestamps: true
  }
);
 
module.exports = model("Car", carSchema);