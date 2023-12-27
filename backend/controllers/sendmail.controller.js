const sendmailService = require("../services/sendmail.service");

// POST /contact for sending email

exports.sendmail = async (req, res) => {
  try {
    await sendmailService.sendContactEmail(req.body);

    res.json({
      message: "Votre message a bien été envoyé, nous vous répondrons bientôt",
    });
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de l'envoi de l'email. Veuillez réessayer plus tard.",
    });
  }
};

// POST /newsletter for sending email to newsletter subscribers

exports.sendmailToNewsletterSubscribers = async (req, res) => {
  try {
    await sendmailService.sendNewsletterConfirmation(req.body);

    res.status(200).json({
      message:
        "Inscription à la newsletter confirmée et e-mail de bienvenue envoyé",
    });
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de votre inscription à la newsletter. Veuillez réessayer plus tard.",
    });
  }
};
