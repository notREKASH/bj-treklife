const express = require("express");
const router = express.Router();
const sendmailController = require("../controllers/sendmail.controller");
const validateRequest = require("../middlewares/validateRequest");
const ContactJoiSchema = require("../schemas/ContactJoiSchema");
const NewsLetterJoiSchema = require("../schemas/NewsLetterJoiSchema");

// POST /contact for sending email

router.post(
  "/contact",
  validateRequest(ContactJoiSchema),
  sendmailController.sendmail
);

// POST /newsletter for sending email to newsletter subscribers

router.post(
  "/newsletter",
  validateRequest(NewsLetterJoiSchema),
  sendmailController.sendmailToNewsletterSubscribers
);

module.exports = router;
