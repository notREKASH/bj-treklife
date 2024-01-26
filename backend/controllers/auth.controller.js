const authServices = require("../services/auth.service");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await authServices.login(username, password);
    res.json(user);
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la connexion. Veuillez réessayer plus tard.",
    });
  }
};

exports.checkToken = async (req, res) => {
  try {
    const isAuth = await authServices.checkToken();
    res.json(isAuth);
  } catch (err) {
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la vérification du token. Veuillez réessayer plus tard.",
    });
  }
};
