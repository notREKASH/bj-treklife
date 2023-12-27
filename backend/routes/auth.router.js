const express = require("express");
const router = express.Router();
const validateRequest = require("../middlewares/validateRequest");
const UserJoiSchema = require("../schemas/UserJoiSchema");
const authController = require("../controllers/auth.controller");

// Login user

router.post("/login", validateRequest(UserJoiSchema), authController.login);

module.exports = router;
