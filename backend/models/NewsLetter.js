const mongoose = require("mongoose");

const newsLetterSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  privacyPolicy: { type: Boolean, required: true },
  cgu: { type: Boolean, required: true },
  mentionsLegales: { type: Boolean, required: true },
  date: { type: Date, default: Date.now },
});

const NewsLetter = mongoose.model("NewsLetter", newsLetterSchema);

module.exports = NewsLetter;
