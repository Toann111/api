const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../../controllers/AuthController");
const {
  validateRegister,
  validateLogin,
} = require("../../middlewares/AuthMiddleware");

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);

module.exports = router;
