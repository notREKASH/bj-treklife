const Joi = require("joi");

const ContactJoiSchema = Joi.object({
  lastName: Joi.string().required().messages({
    "string.empty": `Le champ "Nom" est obligatoire`,
  }),
  firstName: Joi.string().required().messages({
    "string.empty": `Le champ "Prénom" est obligatoire`,
  }),
  email: Joi.string().email().required().messages({
    "string.empty": `Le champ "Email" est obligatoire`,
    "string.email": `Le champ "Email" doit être au format email`,
  }),
  phone: Joi.string().allow(""),
  company: Joi.string().allow(""),
  subject: Joi.string().required().messages({
    "string.empty": `Veuillez selectionnez un objet de contact`,
    "string.base": `Veuillez selectionnez un objet de contact`,
  }),
  message: Joi.string().required().min(10).messages({
    "string.empty": `Le champ "Message" est obligatoire`,
    "string.min": `Le champ "Message" doit avoir une longueur minimum de {#limit} caractères`,
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

module.exports = ContactJoiSchema;
