const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    trainNumber: {
      type: String,
      required: true,
      unique: true,
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    departureTime: {
      type: String,
      required: true,
    },
    arrivalTime: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    classType: {
      type: String,
      required: true, // Sleeper, 3AC, 2AC, General
    },
    price: {
      type: Number,
      required: true,
    },
    totalSeats: {
      type: Number,
      required: true,
    },
    availableSeats: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Train", trainSchema);
