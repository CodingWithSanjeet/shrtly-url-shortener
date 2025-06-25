const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema(
  {
    timestamp: {
      type: Date,
      default: Date.now(),
    },
    ip: String,
    userAgent: String,
    referrer: String,
  },
  { _id: false }
);
const urlSchema = new mongoose.Schema(
  {
    shortCode: {
      type: String,
      required: true,
      uniqure: true,
    },
    originalUrl: {
      type: String,
      required: true,
    },
    visitCount: {
      type: Number,
      default: 0,
    },
    visitHistory: [visitSchema],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const URL = mongoose.model("url", urlSchema);
module.exports = URL;
