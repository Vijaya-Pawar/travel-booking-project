const mongoose = require("mongoose");

const metroSchema = new mongoose.Schema(
  {
    routeName: {
      type: String,
      required: true,
    },
    stations: [
      {
        name: String,
        order: Number,
      },
    ],
    pricePerStation: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Metro", metroSchema);
