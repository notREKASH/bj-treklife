const express = require("express");
const router = express.Router();
const NewsLetter = require("../models/NewsLetter");
const verifyToken = require("../middlewares/verifyToken");
const Joi = require("joi");

// VALIDATION

const NewsLetterJoiSchema = Joi.object({
  firstName: Joi.string().min(2).required().messages({
    "string.empty": `Le champ prénom est obligatoire.`,
    "string.min": `Le prénom doit contenir au moins 2 caractères.`,
  }),
  lastName: Joi.string().min(2).required().messages({
    "string.empty": `Le champ nom est obligatoire.`,
    "string.min": `Le nom doit contenir au moins 2 caractères.`,
  }),
  email: Joi.string().email().required().messages({
    "string.empty": `Le champ email est obligatoire.`,
    "string.email": `L'email n'est pas valide.`,
  }),
  privacyPolicy: Joi.boolean().truthy("on").required().messages({
    "boolean.base": `Vous devez accepter la politique de confidentialité.`,
  }),
  cgu: Joi.boolean().truthy("on").required().messages({
    "boolean.base": `Vous devez accepter les conditions générales d'utilisation.`,
  }),
  mentionsLegales: Joi.boolean().truthy("on").required().messages({
    "boolean.base": `Vous devez accepter les mentions légales.`,
  }),
});

// SUBMIT NEWSLETTER

router.post("/", async (req, res) => {
  const { error } = NewsLetterJoiSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { firstName, lastName, email, privacyPolicy, cgu, mentionsLegales } =
    req.body;

  const alreadySubscribe = await NewsLetter.findOne({ email });
  if (alreadySubscribe) return res.status(400).send("Vous êtes déjà inscrit.");

  const newsLetter = new NewsLetter({
    firstName,
    lastName,
    email,
    privacyPolicy,
    cgu,
    mentionsLegales,
  });

  try {
    const savedSubscriber = await newsLetter.save();
    res.status(200).json({
      message:
        "Félicitation " + firstName + ", vous êtes inscrit(e) à la newsletter.",
    });
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de votre inscription à la newsletter. Veuillez réessayer plus tard.",
    });
  }
});

// GET ALL NEWSLETTERS (ADMIN) (PROTECTED)

router.get("/", verifyToken, async (req, res) => {
  try {
    const newsLetters = await NewsLetter.find();
    res.json(newsLetters);
  } catch (err) {
    res.json({
      message:
        "Une erreur est survenue lors de la récupération des abonné(e)s. Veuillez réessayer plus tard.",
    });
  }
});

// DELETE NEWSLETTER (ADMIN) (PROTECTED)

router.delete("/:newsLetterId", verifyToken, async (req, res) => {
  try {
    const removedNewsLetter = await NewsLetter.deleteOne({
      _id: req.params.newsLetterId,
    });
    if (removedNewsLetter.deletedCount > 0) {
      res.status(200).json({
        message: "Abonné(e) n° " + req.params.newsLetterId + " supprimé.",
      });
    } else {
      res.status(404).json({ message: "Abonné(e) introuvable" });
    }
  } catch (err) {
    res.json({
      message:
        "Une erreur est survenue lors de la suppression de l'abonné(e). Veuillez réessayer plus tard.",
    });
  }
});

// FIND BY EMAIL (ADMIN) (PROTECTED)

router.get("/email/:email", verifyToken, async (req, res) => {
  try {
    const newsLetter = await NewsLetter.findOne({
      email: req.params.email,
    });
    res.json(newsLetter);
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération de l'abonné(e) via son adresse mail. Veuillez réessayer plus tard.",
    });
  }
});

module.exports = router;
