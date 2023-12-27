const NewsLetter = require("../models/NewsLetter");
const newsLetterService = require("../services/newsLetter.service");

// GET ALL NEWSLETTERS

exports.getAllNewsLetters = async (req, res) => {
  try {
    const newsLetters = await newsLetterService.findAllNewsLetters();

    res.json(newsLetters);
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération des abonné(e)s. Veuillez réessayer plus tard.",
    });
  }
};

// GET NEWSLETTER BY EMAIL

exports.getNewsLetterByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const newsLetter = await newsLetterService.findNewsLetterByEmail(email);

    res.json(newsLetter);
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération de l'abonné(e) via son adresse mail. Veuillez réessayer plus tard.",
    });
  }
};

// CREATE NEWSLETTER

exports.createNewsLetter = async (req, res) => {
  try {
    const alreadySubscribe = await NewsLetter.findOne({
      email: req.body.email,
    });

    if (alreadySubscribe) {
      res.status(400).json({
        message: "Vous êtes déjà inscrit(e) à la newsletter.",
      });
    } else {
      const newsLetter = await newsLetterService.createNewsLetter(req.body);

      res.json(newsLetter);
    }
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de votre inscription à la newsletter. Veuillez réessayer plus tard.",
    });
  }
};

// DELETE NEWSLETTER

exports.deleteNewsLetter = async (req, res) => {
  try {
    const { newsLetterId } = req.params;

    const deletedNewsLetter = await newsLetterService.deleteNewsLetter(
      newsLetterId
    );

    if (deletedNewsLetter.deletedCount > 0) {
      res.status(200).json({
        message: "Abonné(e) n° " + newsLetterId + " supprimé.",
      });
    } else {
      res.status(404).json({ message: "Abonné(e) introuvable" });
    }
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la suppression de l'abonné(e). Veuillez réessayer plus tard.",
    });
  }
};
