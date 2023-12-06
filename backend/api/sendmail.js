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

    const lastName = req.body.lastName;
    const firstName = req.body.firstName;
    const email = req.body.email;
    const phone = req.body.phone;
    const company = req.body.company;
    const subject = req.body.subject;
    const message = req.body.message;
    const privacyPolicy = req.body.privacyPolicy;
    const cgu = req.body.cgu;
    const mentionsLegales = req.body.mentionsLegales;

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
        <table
          width="100%"
          border="0"
          cellspacing="0"
          cellpadding="0"
          bgcolor="#e5e5e5"
        >
          <tr>
            <td align="center">
              <table
                class="container"
                width="80%"
                border="0"
                cellspacing="0"
                cellpadding="20"
                bgcolor="#ffffff"
              >
                <tr>
                  <td>
                    <h1>BJ-Treklife.fr</h1>
                  </td>
                </tr>
                  <tr style="background-color: #4c83ee; color: #ffffff">
                    <td>
                      <strong>📬 Coordonnées</strong>
                      <table border="0" cellspacing="0" cellpadding="0" style="font-size: 0.9em; margin-top: 1em;">
                        <tr>
                          <td>
                            <strong
                          style="text-decoration: underline; margin-right: 0.5em"
                          >Nom :</strong
                        >
                        ${lastName}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong style="text-decoration: underline; margin-right: 0.5em"">Prénom :</strong>
                        ${firstName}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong style="text-decoration: underline; margin-right: 0.5em"">Email :</strong>
                        ${email}
                          </td>
                        </tr>
                        ${
                          phone
                            ? `<tr>
                          <td>
                            <strong style="text-decoration: underline; margin-right: 0.5em"">Téléphone :</strong>
                        06 00 00 00 00
                          </td>
                        </tr>
                        `
                            : ""
                        }
                        ${
                          company
                            ? `<tr>
                          <td>
                            <strong style="text-decoration: underline; margin-right: 0.5em"">Société :</strong>
                        BJ-Treklife
                          </td>
                        </tr>
                        `
                            : ""
                        }
                      </table>
                    </td>
                  </tr>
                </tr>
                <tr>
                  <td>
                    <strong>📃 Raison du contact</strong>
                    <table border="0" cellspacing="0" cellpadding="0" style="font-size: 0.9em; margin-top: 1em;">
                      <tr >
                        <td>
                          <strong style="text-decoration: underline; margin-right: 0.5em;">Objet :</strong>
                        ${subject}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong style="text-decoration: underline; margin-right: 0.5em">Message :</strong>
                        ${message}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>🔒 Consentement</strong>
                    <table border="0" cellspacing="0" cellpadding="0" style="font-size: 0.9em; margin-top: 1em;">
                      <tr >
                        <td>
                          <strong style="text-decoration: underline; margin-right: 0.5em;">Politique de Confidentialité :</strong>
                        ${privacyPolicy}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong style="text-decoration: underline; margin-right: 0.5em">Conditions Générales d'Utilisation :</strong>
                        ${cgu}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong style="text-decoration: underline; margin-right: 0.5em">Mentions Légales :</strong>
                        ${mentionsLegales}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td class="signature">
                    Formulaire de contact du site www.bj-treklife.fr<br />
                    <strong
                      >Benmehal Joris<br /><i
                        >Fondateur de BJ-Treklife.fr</i
                      ></strong
                    >
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
    `;

    const emailText = `
                        BJ-Treklife.fr
                        =================
                        Formulaire de contact du site www.bj-treklife.fr

                        📬 Coordonnées
                        --------------
                        Nom : ${lastName}
                        Prénom : ${firstName}
                        Email : ${email}
                        ${phone ? `Téléphone : ${phone}` : ""}
                        ${company ? `Société : ${company}` : ""}

                        📃 Raison du contact
                        --------------------
                        Objet : ${subject}
                        Message : ${message}

                        🔒 Consentement
                        ---------------
                        Politique de Confidentialité : ${privacyPolicy}
                        Conditions Générales d'Utilisation : ${cgu}
                        Mentions Légales : ${mentionsLegales}

                        Formulaire de contact du site www.bj-treklife.fr
                        Benmehal Joris
                        Fondateur de BJ-Treklife.fr
                        `;

    await sendMail({
      from: "mailtrap@bj-treklife.fr",
      to: "benmehal.joris@gmail.com",
      subject: `BJ-Treklife.fr - Formulaire de contact - ${subject}`,
      text: emailText,
      html: emailBody,
    });

    res.status(200).json({
      message: "Votre message a bien été envoyé, je vous répondrai rapidement",
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
        <table
          width="100%"
          border="0"
          cellspacing="0"
          cellpadding="0"
          bgcolor="#e5e5e5"
        >
          <tr>
            <td align="center">
              <table
                class="container"
                width="80%"
                border="0"
                cellspacing="0"
                cellpadding="20"
                bgcolor="#ffffff"
              >
                <tr>
                  <td>
                    <h1>BJ-Treklife.fr</h1>
                  </td>
                </tr>
                <tr>
                  <td>Bonjour, ${firstName} ${lastName} !</td>
                </tr>
                <tr>
                  <td>
                    Merci de t'être inscrit à la newsletter de BJ-Treklife.fr. Je
                    suis enchantés de t'accueillir dans ma communauté de passionnés
                    de randonnée, de trekking, d'alpinisme et de ski.
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>🌟 À Savoir :</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    Dès maintenant et jusqu'à nouvelle notification de ma part, tu
                    recevras une alerte pour chaque nouvel article publié sur le
                    blog, soit environ une fois par semaine. Reste connecté pour ne
                    rien manquer de nos dernières aventures et conseils !
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>🔗 Liens Utiles :</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td>
                          <a
                            href="https://www.bj-treklife.fr/politique-de-confidentialite"
                            >Politique de Confidentialité</a
                          >
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <a
                            href="https://www.bj-treklife.fr/conditions-generales-utilisation"
                            >Conditions Générales d'Utilisation (CGU)</a
                          >
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <a href="https://www.bj-treklife.fr/mentions-legales"
                            >Mentions Légales</a
                          >
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>📩 Se désabonner :</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    Si tu souhaites ne plus recevoir nos newsletters, tu peux te
                    désabonner à tout moment en cliquant
                    <a href="https://www.bj-treklife.fr/contact">ici</a>. En prenant
                    soin de sélectionner l'objet de contact "Se désabonner".
                  </td>
                </tr>
                <tr>
                  <td>
                    Si tu as des questions ou des suggestions, n'hésite pas à me
                    contacter. Je suis toujours heureux de recevoir des retours de
                    ma communauté.
                  </td>
                </tr>
                <tr>
                  <td>Au plaisir de te retrouver sur BJ-Treklife.fr !</td>
                </tr>
                <tr>
                  <td class="signature">
                    Meilleures salutations, <br />
                    <strong
                      >Benmehal Joris<br /><i
                        >Fondateur de BJ-Treklife.fr</i
                      ></strong
                    >
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
    `;

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
