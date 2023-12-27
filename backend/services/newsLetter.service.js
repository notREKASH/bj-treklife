const NewsLetter = require("../models/NewsLetter");

// GET /newsLetter

exports.findAllNewsLetters = async () => {
  const newsLetters = await NewsLetter.find();

  return newsLetters;
};

// GET /newsLetter/email/:email

exports.findNewsLetterByEmail = async (email) => {
  const newsLetter = await NewsLetter.findOne({ email });

  return newsLetter;
};

// POST /newsLetter

exports.createNewsLetter = async (newsLetter) => {
  const newNewsLetter = new NewsLetter(newsLetter);
  const savedNewsLetter = await newNewsLetter.save();
  return savedNewsLetter;
};

// DELETE /newsLetter/:newsLetterId

exports.deleteNewsLetter = async (newsLetterId) => {
  const deletedNewsLetter = await NewsLetter.deleteOne({
    _id: newsLetterId,
  });
  return deletedNewsLetter;
};
