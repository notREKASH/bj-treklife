const Joi = require("joi");

const UserJoiSchema = Joi.object({
  username: Joi.string().min(3).max(40).required().messages({
    "string.empty": `Le champ nom d'utilisateur est obligatoire.`,
    "string.min": `Le nom d'utilisateur doit contenir au moins 3 caractères.`,
    "string.max": `Le nom d'utilisateur ne doit pas dépasser 40 caractères.`,
  }),
  password: Joi.string().min(6).max(100).required().messages({
    "string.empty": `Le champ mot de passe est obligatoire.`,
    "string.min": `Le mot de passe doit contenir au moins 6 caractères.`,
    "string.max": `Le mot de passe ne doit pas dépasser 100 caractères.`,
  }),
});

module.exports = UserJoiSchema;
