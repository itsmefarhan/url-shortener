const mongoose = require("mongoose");
const shortid = require("shortid");

const urlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    default: shortid.generate,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("URL", urlSchema);
