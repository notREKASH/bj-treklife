const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (!error) {
    return next();
  } else {
    res.status(422).json({ message: error.details[0].message });
  }
};

module.exports = validateRequest;
