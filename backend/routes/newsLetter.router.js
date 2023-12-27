const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const validateRequest = require("../middlewares/validateRequest");
const NewsLetterJoiSchema = require("../schemas/NewsLetterJoiSchema");
const newsLetterController = require("../controllers/newsLetter.controller");

// GET /newsLetter

router.get("/", verifyToken, newsLetterController.getAllNewsLetters);
router.get(
  "/email/:email",
  verifyToken,
  newsLetterController.getNewsLetterByEmail
);

// POST /newsLetter

router.post(
  "/",
  validateRequest(NewsLetterJoiSchema),
  newsLetterController.createNewsLetter
);

// DELETE /newsLetter

router.delete(
  "/:newsLetterId",
  verifyToken,
  newsLetterController.deleteNewsLetter
);

module.exports = router;
