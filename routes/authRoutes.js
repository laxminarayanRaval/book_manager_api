const express = require("express");
const { register, login } = require("../controllers/authController");
const {
  validateUserInput,
  validate,
} = require("../middlewares/validationMiddleware");

const router = express.Router();

router.post("/register", validateUserInput, validate, register);
router.post("/login", validateUserInput, validate, login);

module.exports = router;
