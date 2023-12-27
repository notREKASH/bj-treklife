const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587 || 2525 || 25,
  secure: false,
  auth: {
    user: "api",
    pass: "5ea5f6184a4e38d5f65aa6a1d7c8e747",
  },
});

async function sendmail(mailOptions) {
  await transporter.sendMail(mailOptions);
}

// POST /contact for sending email

async function sendContactEmail(data) {
  const lastName = data.lastName;
  const firstName = data.firstName;
  const email = data.email;
  const phone = data.phone;
  const company = data.company;
  const subject = data.subject;
  const message = data.message;
  const privacyPolicy = data.privacyPolicy;
  const cgu = data.cgu;
  const mentionsLegales = data.mentionsLegales;

  const emailBody = `<!DOCTYPE html>
  <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <title>BJ-Treklife Newsletter</title>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body
      style="
        font-family: 'Open Sans', sans-serif;
        background: #e5e5e5;
        margin: 0;
        padding: 0;
      "
    >
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
              width="600px"
              border="0"
              cellspacing="0"
              cellpadding="20"
              bgcolor="#ffffff"
              style="margin: 0 auto; background-color: #ffffff; padding: 20px"
            >
              <tr>
                <td style="text-align: center">
                  <h1 style="color: #4c83ee">BJ-Treklife.fr</h1>
                </td>
              </tr>
              <tr style="background-color: #4c83ee; color: #ffffff">
                <td>
                  <strong>📬 Coordonnées</strong>
                  <table
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                    style="font-size: 0.9em; margin-top: 1em"
                  >
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
                        <strong
                          style="text-decoration: underline; margin-right: 0.5em"
                          >Prénom :</strong
                        >
                        ${firstName}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong
                          style="text-decoration: underline; margin-right: 0.5em"
                          >Email :</strong
                        >
                        ${email}
                      </td>
                    </tr>
                    ${
                      phone
                        ? `
                    <tr>
                      <td>
                        <strong
                          style="text-decoration: underline; margin-right: 0.5em"
                          >Téléphone :</strong
                        >
                        ${phone}
                      </td>
                    </tr>
                    `
                        : ""
                    } ${
    company
      ? `
                    <tr>
                      <td>
                        <strong
                          style="text-decoration: underline; margin-right: 0.5em"
                          >Société :</strong
                        >
                        ${company}
                      </td>
                    </tr>
                    `
      : ""
  }
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>📃 Raison du contact</strong>
                  <table
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                    style="font-size: 0.9em; margin-top: 1em"
                  >
                    <tr>
                      <td>
                        <strong
                          style="text-decoration: underline; margin-right: 0.5em"
                          >Objet :</strong
                        >
                        ${subject}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong
                          style="text-decoration: underline; margin-right: 0.5em"
                          >Message :</strong
                        >
                        ${message}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>🔒 Consentement</strong>
                  <table
                    border="0"
                    cellspacing="0"
                    cellpadding="0"
                    style="font-size: 0.9em; margin-top: 1em"
                  >
                    <tr>
                      <td>
                        <strong
                          style="text-decoration: underline; margin-right: 0.5em"
                          >Politique de Confidentialité :</strong
                        >
                        ${privacyPolicy}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong
                          style="text-decoration: underline; margin-right: 0.5em"
                          >Conditions Générales d'Utilisation :</strong
                        >
                        ${cgu}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong
                          style="text-decoration: underline; margin-right: 0.5em"
                          >Mentions Légales :</strong
                        >
                        ${mentionsLegales}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td
                  class="signature"
                  style="
                    text-align: center;
                    border-top: 1px solid #8b949f;
                    padding-top: 20px;
                  "
                >
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
  </html>`;

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

  const mailOptions = {
    from: "mailtrap@bj-treklife.fr",
    to: "benmehal.joris@gmail.com",
    subject: `BJ-Treklife.fr - Formulaire de contact - ${subject}`,
    text: emailText,
    html: emailBody,
  };

  await sendmail(mailOptions);
}

// POST /newsletter for sending email to newsletter subscribers

async function sendNewsletterConfirmation(data) {
  const lastName = data.lastName;
  const firstName = data.firstName;
  const email = data.email;

  const emailBody = `<!DOCTYPE html>
  <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <title>BJ-Treklife Newsletter</title>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body
      style="
        font-family: 'Open Sans', sans-serif;
        background: #e5e5e5;
        margin: 0;
        padding: 0;
      "
    >
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
              width="600px"
              border="0"
              cellspacing="0"
              cellpadding="20"
              bgcolor="#ffffff"
              style="margin: 0 auto; background-color: #ffffff; padding: 20px"
            >
              <tr>
                <td style="text-align: center">
                  <h1 style="color: #4c83ee">BJ-Treklife.fr</h1>
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
                  Si tu souhaites ne plus recevoir mes newsletters, tu peux te
                  désabonner à tout moment en cliquant
                  <a href="https://www.bj-treklife.fr/contact">ici</a>. En prenant
                  soin de sélectionner l'objet de contact "Se désabonner". Ou alors en cliquant sur le bouton "unsubscribe" situé en bas de cet email.
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
                <td
                  style="
                    text-align: center;
                    border-top: 1px solid #8b949f;
                    padding-top: 20px;
                  "
                >
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

  const mailOptions = {
    from: "mailtrap@bj-treklife.fr",
    to: email,
    subject: "BJ-Treklife.fr – Votre Inscription à la Newsletter Confirmée",
    text: emailText,
    html: emailBody,
  };

  await sendmail(mailOptions);
}

module.exports = {
  sendContactEmail,
  sendNewsletterConfirmation,
};
