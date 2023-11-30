const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Joi = require("joi");

// VALIDATION

const UserJoiSchema = Joi.object({
  username: Joi.string().min(3).max(40).required().messages({
    "string.empty": `Le champ nom d'utilisateur est obligatoire.`,
    "string.min": `Le nom d'utilisateur doit contenir au moins 3 caractères.`,
    "string.max": `Le nom d'utilisateur ne doit pas dépasser 40 caractères.`,
  }),
  password: Joi.string().min(6).max(100).required().messages({
    "string.empty": `Le champ mot de passe est obligatoire.`,
    "string.min": `Le mot de passe doit contenir au moins 6 caractères.`,
    "string.max": `Le mot de passe ne doit pas dépasser 100 caractères.`,
  }),
});

// REGISTER USER

// router.post("/register", async (req, res) => {
//   try {
//     const { error } = UserJoiSchema.validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     const { username, password } = req.body;

//     const userExists = await User.findOne({ username });
//     if (userExists) return res.status(400).send("Utilisateur déjà existant.");

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const user = new User({
//       username,
//       password: hashedPassword,
//     });

//     const savedUser = await user.save();
//     res.send(savedUser);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// LOGIN USER

router.post("/login", async (req, res) => {
  try {
    const { error } = UserJoiSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(400)
        .send("Nom d'utilisateur ou mot de passe incorrect.");

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass)
      return res
        .status(400)
        .send("Nom d'utilisateur ou mot de passe incorrect.");

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send(token);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Nom d'utilisateur ou mot de passe incorrect." });
  }
});

// UPDATE PASSWORD

// router.post("/update-password", async (req, res) => {
//   try {
//     const { error } = UserJoiSchema.validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     const { username, currentPassword, newPassword } = req.body;

//     const user = await User.findOne({ username });
//     if (!user) return res.status(400).send("Utilisateur inexistant.");

//     const validPass = await bcrypt.compare(currentPassword, user.password);
//     if (!validPass) return res.status(400).send("Mot de passe incorrect.");

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(newPassword, salt);

//     user.password = hashedPassword;
//     await user.save();

//     res.send("Mot de passe mis à jour.");
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

module.exports = router;
