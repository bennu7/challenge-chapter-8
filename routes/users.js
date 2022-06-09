const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const middleware = require("../middlewares");
const passport = require("passport");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
  userController.googleOAuthRegister
);
router.post("/", userController.createUser);
router.get("/", userController.getAllUser);
router.get("/:id", userController.getOneUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
