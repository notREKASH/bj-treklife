const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Accès refusé.");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    // No need to send a 400 status code here, because the token is not valid.
    // res.status(400).send("Token invalide.");
  }
};

module.exports = verifyToken;
