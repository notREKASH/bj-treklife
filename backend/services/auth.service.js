const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Login user

exports.login = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error("Nom d'utilisateur ou mot de passe incorrect.");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    throw new Error("Nom d'utilisateur ou mot de passe incorrect.");

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  return token;
};
