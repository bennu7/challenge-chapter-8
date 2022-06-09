const { imagekit } = require("../helpers/imageKit");
const { Image } = require("../models");

module.exports = {
  single: async (req, res) => {
    try {
      const imageUrl =
        req.protocol +
        "://" +
        req.get("host") +
        "/uploads/" +
        req.file.filename;

      const image = await Image.create({
        title: req.file.filename,
        url: imageUrl,
      });

      res.status(200).json({
        status: true,
        message: "success",
        data: image,
      });
    } catch (err) {
      return res.status(500).json({
        status: false,
        message: err.message,
        data: null,
      });
    }
  },

  multi: (req, res) => {
    try {
      res.json(req.files);
    } catch (err) {
      return res.status(500).json({
        status: false,
        message: err.message,
        data: null,
      });
    }
  },

  imagekit: async (req, res) => {
    try {
      const file = req.file.buffer.toString("base64");
      const namaFile = Date.now() + "-" + req.file.originalname;

      const upload = await imagekit.upload({
        file: file,
        fileName: namaFile,
      });

      const image = await Image.create({
        title: upload.name,
        url: upload.url,
      });

      res.status(200).json({
        status: true,
        message: "success",
        data: image,
      });
    } catch (err) {
      return res.status(500).json({
        status: false,
        message: err.message,
        data: null,
      });
    }
  },
};
