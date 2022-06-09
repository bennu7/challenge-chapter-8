const { post_likes } = require("../models");

createPostLike = async (req, res) => {
  try {
    let { post_id, user_id } = req.body;

    const created = await post_likes.create({
      post_id,
      user_id
    });

    res.status(201).json({
      status: "success",
      message: "data post_like berhasil dibuat",
      data: created
    });
  } catch (err) {
    res.status(500).json({
      status: "errors",
      errors: err
    });
  }
};

getAllPostLike = async (req, res) => {
  try {
    const likes = await post_likes.findAll();

    //  MVC
    // res.status(200).render("like.ejs", { likes });

    // MCR
    res.status(200).json({
      status: "success",
      message: "sukses mengambil semua data post like",
      data: likes
    });
  } catch (err) {
    res.status(500).json({
      status: "errors",
      errors: err
    });
  }
};

getOnePostLike = async (req, res) => {
  try {
    let user_post_like = req.params.id;

    const getData = await post_likes.findOne({
      where: {
        id: user_post_like
      },
      include: ["post", "user"]
    });

    if (!getData) {
      res.status(404).json({
        status: "error",
        message: `id tidak ditemukan`
      });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "sukses mengambil detail data post like",
      data: getData
    });
  } catch (err) {
    res.status(500).json({
      status: "errors",
      errors: err
    });
  }
};

updatePostLike = async (req, res) => {
  try {
    let user_post_like = req.params.id;
    let { user_id, post_id } = req.body;

    const query = {
      where: {
        id: user_post_like
      },
    };

    const updated = await post_likes.update(
      {
        user_id,
        post_id
      },
      query
    );

    res.status(200).json({
      status: "success",
      message: "sukses update data post_like",
      data: updated
    });
  } catch (err) {
    res.status(500).json({
      status: "errors",
      errors: err
    });
  }
};

deletePostLike = async (req, res) => {
  try {
    let user_post_like = req.params.id;

    let deleted = await post_likes.destroy({
      where: {
        id: user_post_like
      },
    });

    res.status(200).json({
      status: "success",
      message: "sukses delete data",
      data: deleted
    });
  } catch (err) {
    res.status(500).json({
      status: "errors",
      errors: err
    });
  }
};

module.exports = {
  createPostLike,
  getAllPostLike,
  getOnePostLike,
  updatePostLike,
  deletePostLike
};
