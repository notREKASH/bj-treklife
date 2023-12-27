const Joi = require("joi");

const RatingJoiSchema = Joi.object({
  rating: Joi.number().max(5).required().messages({
    "string.empty": `Le champ note est obligatoire.`,
    "string.max": `La note ne doit pas dépasser 5 étoiles.`,
  }),
});

module.exports = RatingJoiSchema;
