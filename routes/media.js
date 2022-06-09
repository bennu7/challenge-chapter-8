const express = require("express");
const router = express.Router();
const mediaController = require("../controllers/mediaController");

const upload = require("../middlewares/upload");
const storage = require("../middlewares/storage");
const { login, admin } = require("../middlewares");

router.post("/upload/single", login, admin, storage.single("image"), mediaController.single);
router.post("/upload/multi", storage.array("image", 10), mediaController.multi);
router.post("/upload/imagekit", upload, mediaController.imagekit);

module.exports = router;
