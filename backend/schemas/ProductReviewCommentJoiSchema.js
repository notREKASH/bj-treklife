const Joi = require("joi");

const ProductReviewComentJoiSchema = Joi.object({
  name: Joi.string().min(3).max(40).required().messages({
    "string.empty": `Le champ nom est obligatoire.`,
    "string.min": `Le nom doit contenir au moins 3 caractères.`,
    "string.max": `Le nom ne doit pas dépasser 40 caractères.`,
  }),
  email: Joi.string().email().required().messages({
    "string.empty": `Le champ email est obligatoire.`,
    "string.email": `L'email n'est pas valide.`,
  }),
  message: Joi.string().min(3).max(1000).required().messages({
    "string.empty": `Le champ message est obligatoire.`,
    "string.min": `Le message doit contenir au moins 3 caractères.`,
    "string.max": `Le message ne doit pas dépasser 1000 caractères.`,
  }),
  privacyPolicy: Joi.boolean().truthy("true").required().messages({
    "boolean.base": `Vous devez accepter la politique de confidentialité.`,
  }),
  cgu: Joi.boolean().truthy("true").required().messages({
    "boolean.base": `Vous devez accepter les conditions générales d'utilisation.`,
  }),
  mentionsLegales: Joi.boolean().truthy("true").required().messages({
    "boolean.base": `Vous devez accepter les mentions légales.`,
  }),
});

module.exports = ProductReviewComentJoiSchema;
