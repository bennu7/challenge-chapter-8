const { User, Post, post_comments, post_likes } = require("../models");

module.exports = {
  userData: () => {
    return User.destroy({ truncate: true, restartIdentity: true });
  },
  postData: () => {
    return Post.destroy({ truncate: true, restartIdentity: true });
  },
  commentData: () => {
    return post_comments.destroy({ truncate: true, restartIdentity: true });
  },
  likesData: () => {
    return post_likes.destroy({ truncate: true, restartIdentity: true });
  },
};
