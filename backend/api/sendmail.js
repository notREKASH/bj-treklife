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

// Route pour envoyer un email

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
      from: "mailtrap@bj-treklife.fr",
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

// Route inscription à la newsletter avec réponses direct au client

router.post("/newsletter", async (req, res) => {
  try {
    const { error } = Joi.string().email().required().validate(req.body.email);

    if (error) {
      return res.status(400).send({
        message: error.details[0].message,
      });
    }

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const emailBody = `<!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>BJ-Treklife Newsletter</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body {
            font-family: "Open Sans", sans-serif;
            background: #e5e5e5;
            margin: 0;
            padding: 0;
          }
    
          .container {
            width: 80%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
    
          h1 {
            color: #4c83ee;
            text-align: center;
          }
    
          p,
          ul {
            font-size: 14px;
            line-height: 1.5;
            color: #000000;
          }
    
          ul {
            list-style-type: none;
            padding: 0;
          }
    
          ul li {
            margin-bottom: 10px;
          }
    
          a {
            color: #4c83ee;
            text-decoration: none;
          }
    
          .signature {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #8b949f;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>BJ-Treklife.fr</h1>
          <p>Bonjour, ${firstName} ${lastName} !</p>
          <p>
            Merci de t'être inscrit à la newsletter de BJ-Treklife.fr. Je suis
            enchantés de t'accueillir dans ma communauté de passionnés de randonnée,
            de trekking, d'alpinisme et de ski.
          </p>
          <p>
            <strong>🌟 À Savoir :</strong>
            <br />
            Dès maintenant et jusqu'à nouvelle notification de ma part, tu recevras
            une alerte pour chaque nouvel article publié sur le blog, soit environ
            une fois par semaine. Reste connecté pour ne rien manquer de nos
            dernières aventures et conseils !
          </p>
          <p>
            <strong>🔗 Liens Utiles :</strong>
            <br />
          </p>
          <ul>
            <li>
              <a href="https://www.bj-treklife.fr/politique-de-confidentialite"
                >Politique de Confidentialité</a
              >
            </li>
            <li>
              <a href="https://www.bj-treklife.fr/conditions-generales-utilisation"
                >Conditions Générales d'Utilisation (CGU)</a
              >
            </li>
            <li>
              <a href="https://www.bj-treklife.fr/mentions-legales"
                >Mentions Légales</a
              >
            </li>
          </ul>
          <p>
            <strong>📩 Se désabonner :</strong>
            <br />
            Si tu souhaites ne plus recevoir nos newsletters, tu peux te désabonner
            à tout moment en cliquant
            <a href="https://www.bj-treklife.fr/contact">ici</a>. En prenant soin de
            sélectionner l'objet de contact "Se désabonner".
          </p>
          <p>
            Si tu as des questions ou des suggestions, n'hésite pas à me contacter.
            Je suis toujours heureux de recevoir des retours de ma communauté.
            <br /><br />
            Au plaisir de te retrouver sur BJ-Treklife.fr !
          </p>
          <div class="signature">
            Meilleures salutations, <br />
            <strong>Benmehal Joris<br /><i>Fondateur de BJ-Treklife.fr</i></strong>
          </div>
        </div>
      </body>
    </html>`;

    const emailText = `Bonjour, ${firstName} ${lastName} !
    Merci de t'être inscrit à la newsletter de BJ-Treklife.fr. Je suis
    enchantés de t'accueillir dans ma communauté de passionnés de randonnée,
    de trekking, d'alpinisme et de ski.

    🌟 À Savoir :
    Dès maintenant et jusqu'à nouvelle notification de ma part, tu recevras
    une alerte pour chaque nouvel article publié sur le blog, soit environ
    une fois par semaine. Reste connecté pour ne rien manquer de nos
    dernières aventures et conseils !

    🔗 Liens Utiles :
    - Politique de Confidentialité: https://www.bj-treklife.fr/politique-de-confidentialite
    - Conditions Générales d'Utilisation (CGU): https://www.bj-treklife.fr/conditions-generales-utilisation
    - Mentions Légales: https://www.bj-treklife.fr/mentions-legales

    📩 Se désabonner :
    Si tu souhaites ne plus recevoir nos newsletters, tu peux te désabonner
    à tout moment en cliquant ici: https://www.bj-treklife.fr/contact. En prenant soin de
    sélectionner l'objet de contact "Se désabonner".

    Si tu as des questions ou des suggestions, n'hésite pas à me contacter.
    Je suis toujours heureux de recevoir des retours de ma communauté.

    Au plaisir de te retrouver sur BJ-Treklife.fr !

    Meilleures salutations,
    Benmehal Joris
    Fondateur de BJ-Treklife.fr`;

    await sendMail({
      from: "mailtrap@bj-treklife.fr",
      to: req.body.email,
      subject: "BJ-Treklife.fr – Votre Inscription à la Newsletter Confirmée",
      text: emailText,
      html: emailBody,
    });

    res.status(200).json({
      message:
        "Inscription à la newsletter confirmée et e-mail de bienvenue envoyé",
    });
  } catch (error) {
    res.status(500).send({
      message: "Une erreur est survenue lors de l'inscription à la newsletter",
    });
  }
});

module.exports = router;
