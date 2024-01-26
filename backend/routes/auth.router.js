const express = require("express");
const router = express.Router();
const validateRequest = require("../middlewares/validateRequest");
const UserJoiSchema = require("../schemas/UserJoiSchema");
const authController = require("../controllers/auth.controller");
const verifyToken = require("../middlewares/verifyToken");

// Login user

router.post("/login", validateRequest(UserJoiSchema), authController.login);
router.get("/check-token", verifyToken, authController.checkToken);

module.exports = router;
