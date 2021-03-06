const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.post("/login", authController.login);
router.post("/forgot-password", authController.forgot);
router.post("/reset-password/:userId", authController.reset);

module.exports = router;
