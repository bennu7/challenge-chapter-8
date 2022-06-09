const express = require("express");
const router = express.Router();
// const userController = require("../controllers/user");

/* GET home page. */
router.get("/", (req, res) => {
  // res.status(200).json({
  //   status: true,
  //   message: "Hello World!",
  // });
  res.render("index", { title: "Express" });
});

module.exports = router;
