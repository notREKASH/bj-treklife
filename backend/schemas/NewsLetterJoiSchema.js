const Joi = require("joi");

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

module.exports = NewsLetterJoiSchema;
