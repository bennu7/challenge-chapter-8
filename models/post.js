"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //relasi one to one Post memiliki satu User
      Post.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      // relasi one to many Post memiliki banyak PostLikes
      Post.hasMany(models.post_likes, {
        foreignKey: "post_id",
        as: "post_like",
      });
      // relasi one to many Post memiliki banyak PostComments
      Post.hasMany(models.post_comments, {
        foreignKey: "post_id",
        as: "post_comment",
      });
    }
  }
  Post.init(
    {
      user_id: DataTypes.INTEGER,
      source_image: DataTypes.STRING,
      post_content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
