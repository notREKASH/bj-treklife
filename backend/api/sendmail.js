const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();
const Joi = require("joi");

// Création du transporteur avec Send Email testing - Pense à changer les identifiants pour la production
const transporter = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587 || 2525 || 25,
  secure: false,
  auth: {
    user: "api",
    pass: "5ea5f6184a4e38d5f65aa6a1d7c8e747",
  },
});

// Route pour envoyer un email

const MailSchema = Joi.object({
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

router.post("/contact", async (req, res) => {
  try {
    const { error } = MailSchema.validate(req.body);

    if (error) {
      return res.status(400).send({
        message: error.details[0].message,
      });
    }

    const emailBody = `
      <p>Nom: ${req.body.lastName}</p>
      <p>Prénom: ${req.body.firstName}</p>
      <p>Email: ${req.body.email}</p>
      ${req.body.phone ? `<p>Téléphone: ${req.body.phone}</p>` : ""}
      ${req.body.company ? `<p>Société: ${req.body.company}</p>` : ""}
      <p>Message: ${req.body.message}</p>
      <ul>
        <li>Politique de confidentialité: ${req.body.privacyPolicy}</li>
        <li>CGU: ${req.body.cgu}</li>
        <li>Mentions légales: ${req.body.mentionsLegales}</li>
      </ul>
    `;

    await sendMail({
      from: req.body.email,
      to: "benmehal.joris@gmail.com",
      subject: req.body.subject,
      text: req.body.message,
      html: emailBody,
    });

    res.status(200).json({
      message: "Votre message a bien été envoyé",
    });
  } catch (error) {
    res.status(500).send({
      message: "Une erreur est survenue lors de l'envoi de votre message",
    });
  }
});

module.exports = router;

// Fonction pour envoyer un email
async function sendMail({ from, to, subject, text, html }) {
  const mailOptions = {
    from,
    to,
    subject,
    text,
    html,
  };

  const info = await transporter.sendMail(mailOptions);
  return info.messageId;
}
