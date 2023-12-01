// sendEmail.js

"use strict";
const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();
const Joi = require("joi");

require("dotenv").config(); // Charger les variables d'environnement depuis le fichier .env

// Configuration de Nodemailer avec les variables d'environnement
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "74aa94a3dab7b9",
    pass: "2642be50f981ce",
  },
});

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

// Route pour envoyer un email

const MailSchema = Joi.object({
  lastName: Joi.string().required(),
  firstName: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().allow(""),
  company: Joi.string().allow(""),
  subject: Joi.string().required(),
  message: Joi.string().required(),
});

router.post("/contact", async (req, res) => {
  try {
    const { error } = MailSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const emailBody = `
      <p>Nom: ${req.body.lastName}</p>
      <p>Prénom: ${req.body.firstName}</p>
      <p>Email: ${req.body.email}</p>
      ${req.body.phone ? `<p>Téléphone: ${req.body.phone}</p>` : ""}
      ${req.body.company ? `<p>Société: ${req.body.company}</p>` : ""}
      <p>Message: ${req.body.message}</p>
    `;

    await sendMail({
      from: req.body.email, // L'adresse e-mail de l'expéditeur (la personne qui te contacte)
      to: "benmehal.joris@gmail.com", // Ton adresse e-mail
      subject: req.body.subject,
      text: req.body.message, // Version texte pour les clients e-mail qui ne supportent pas HTML
      html: emailBody, // Version HTML du message
    });

    res.status(200).json({
      message: "Votre message a bien été envoyé",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
