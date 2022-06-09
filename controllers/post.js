const { Post } = require("../models");

createPost = async (req, res) => {
  try {
    let { user_id, source_image, post_content } = req.body;

    if (!user_id || !source_image) {
      res.status(400).json({
        status: "false",
        message: "user_id or source_image or post_content is required",
        data: null,
      });
      return;
    }

    let newPost = await Post.create({
      user_id,
      source_image,
      post_content,
    });

    res.status(201).json({
      status: "success",
      message: "berhasil membuat postingan baru",
      data: newPost,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      errors: err,
    });
  }
};

getAllPosts = async (req, res) => {
  try {
    let posts = await Post.findAll({ include: "post_like" });

    // MVC
    // res.status(200).render("post.ejs", { posts });

    // MCR
    res.status(200).json({
      status: "success",
      message: "sukses mengambil semua data post",
      data: posts,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      errors: err,
    });
  }
};

getOnePost = async (req, res) => {
  try {
    let post_id = req.params.id;

    let post = await Post.findOne({
      where: {
        id: post_id,
      },
      include: ["user", "post_like", "post_comment"],
    });

    if (!post) {
      res.status(404).json({
        status: "error",
        message: `data dengan id : ${post_id} tidak ditemukan`,
        data: null,
      });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "berhasil mengambil detail data post",
      data: post,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      errors: err,
    });
  }
};

updatePost = async (req, res) => {
  try {
    let post_id = req.params.id;

    const { user_id, source_image, post_content } = req.body;

    const checkIdPost = await Post.findOne({
      where: {
        id: post_id,
      },
    });

    if (!checkIdPost) {
      res.status(404).json({
        status: "false",
        message: `id tidak ditemukan`,
        data: null,
      });
      return;
    }

    let query = {
      where: {
        id: post_id,
      },
    };

    let updated = await Post.update(
      {
        user_id,
        source_image,
        post_content,
      },
      query
    );

    res.status(200).json({
      status: "success",
      message: "berhasil update post",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({
      status: "errors",
      errors: err,
    });
  }
};

deletePost = async (req, res) => {
  try {
    let post_id = req.params.id;

    const checkIdPost = await Post.findOne({
      where: {
        id: post_id,
      },
    });

    if (!checkIdPost) {
      res.status(404).json({
        status: "false",
        message: `id tidak ditemukan`,
        data: null,
      });
      return;
    }

    let deleted = await Post.destroy({
      where: {
        id: post_id,
      },
    });

    res.status(200).json({
      status: "success",
      message: "data post berhasil hapus",
      data: deleted,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      errors: err,
    });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getOnePost,
  updatePost,
  deletePost,
};
