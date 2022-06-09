const { post_comments } = require("../models");

createPostComment = async (req, res) => {
  try {
    let { post_id, user_id, comment } = req.body;

    let newPostComment = await post_comments.create({
      post_id,
      user_id,
      comment,
    });

    res.status(201).json({
      status: "success",
      message: "data post comment berhasil dibuat",
      data: newPostComment,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      errors: err,
    });
  }
};

getAllPostComment = async (req, res) => {
  try {
    const comments = await post_comments.findAll();

    // MVC
    // res.status(200).render("comment.ejs", { comments });

    // MCR
    res.status(200).json({
      status: "success",
      message: "berhasil mengambil detail data post comment",
      data: comments,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      errors: err,
    });
  }
};

getOnePostComment = async (req, res) => {
  try {
    let id_post_comment = req.params.id;

    const getPostComment = await post_comments.findOne({
      where: {
        id: id_post_comment,
      },
      include: ["user", "post"],
    });

    if (!getPostComment) {
      res.status(404).json({
        status: "errors",
        message: "id tidak ditemukan",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "berhasil mengambil detail data post comment",
      data: getPostComment,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      errors: err,
    });
  }
};

updatePostComment = async (req, res) => {
  try {
    let id_post_comment = req.params.id;
    let { post_id, user_id, comment } = req.body;

    const query = {
      where: {
        id: id_post_comment,
      },
    };

    let updated = await post_comments.update(
      {
        post_id,
        user_id,
        comment,
      },
      query
    );

    res.status(200).json({
      status: "success",
      message: "post comment berhasil di update",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      errors: err,
    });
  }
};

deletPostComment = async (req, res) => {
  try {
    let id_post_comment = req.params.id;

    const deleted = await post_comments.destroy({
      where: {
        id: id_post_comment,
      },
    });

    res.status(200).json({
      status: "success",
      message: "post comment berhasil di hapus",
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
  createPostComment,
  getAllPostComment,
  getOnePostComment,
  updatePostComment,
  deletPostComment,
};
