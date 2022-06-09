"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class post_likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // relasi one to one, post_likes memiliki satu Post
      post_likes.belongsTo(models.Post, {
        foreignKey: "post_id",
        as: "post",
      });
      // relasi one to one, post_likes memiliki satu User
      post_likes.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  post_likes.init(
    {
      post_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "post_likes",
    }
  );
  return post_likes;
};
