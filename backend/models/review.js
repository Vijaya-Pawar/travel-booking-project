const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["bus", "train", "metro", "flight"],
      required: true,
    },
    transportId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate review (One user can review one transport only once)
reviewSchema.index({ user: 1, transportId: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);
