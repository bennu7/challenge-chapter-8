const express = require("express");
const router = express.Router();

const likes = require("../controllers/post_like");

router.post("/", likes.createPostLike);
router.get("/", likes.getAllPostLike);
router.get("/:id", likes.getOnePostLike);
router.put("/:id", likes.updatePostLike);
router.delete("/:id", likes.deletePostLike);

module.exports = router;
