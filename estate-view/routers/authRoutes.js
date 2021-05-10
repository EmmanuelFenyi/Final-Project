const express = require("express");
const router = express.Router();
const {
  developerRegister,
  buyerRegister,
  login,
} = require("../controllers/authController");

router.post("/buyer", buyerRegister);
router.post("/developer", developerRegister);
router.post("/login", login);

module.exports = router;
