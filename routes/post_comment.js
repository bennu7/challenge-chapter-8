const express = require("express");
const router = express.Router();

const commentController = require("../controllers/post_comment");

router.post("/", commentController.createPostComment);
router.get("/", commentController.getAllPostComment);
router.get("/:id", commentController.getOnePostComment);
router.put("/:id", commentController.updatePostComment);
router.delete("/:id", commentController.deletPostComment);

module.exports = router;
