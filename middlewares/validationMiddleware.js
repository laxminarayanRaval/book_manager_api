const { body, validationResult } = require("express-validator");

const validateBookInput = [
  body("title").notEmpty().trim().escape().withMessage("Title is required"),
  body("author").notEmpty().trim().escape().withMessage("Author is required"),
];

const validateUserInput = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  validateBookInput,
  validateUserInput,
  validate,
};
