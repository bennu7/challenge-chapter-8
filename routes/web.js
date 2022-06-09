const express = require("express");
const router = express.Router();

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.get("/forgot-password", (req, res) => {
  res.render("auth/forgot-password");
});

router.get("/reset-password", (req, res) => {
  const token = req.query.token;

  // console.log(`token => ${token}`);

  res.render("auth/reset-password", { token });
});

module.exports = router;
