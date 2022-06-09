require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { JWT_SECRET_KEY } = process.env;

router.get("/register", (req, res) => {
  res.render("auth/register");
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.get("/forgot-password", (req, res) => {
  res.render("auth/forgot-password");
});

router.get("/reset-password/:userId", async (req, res) => {
  const token = req.query.token;
  const user_id = req.params.userId;

  console.log("render user id =>", user_id);

  const user = await User.findOne({
    where: {
      id: user_id,
    },
  });

  const secret = JWT_SECRET_KEY + user.password;
  const data = jwt.verify(token, secret);
  // console.log(`token => ${token}`);

  res.render("auth/reset-password", { token, user_id });
});

module.exports = router;
