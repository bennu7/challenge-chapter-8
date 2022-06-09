"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class post_comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // relasi one to one, post_comments memiliki satu User
      post_comments.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      // relasi one to one, post_comments memiliki satu Post
      post_comments.belongsTo(models.Post, {
        foreignKey: "post_id",
        as: "post",
      });
    }
  }
  post_comments.init(
    {
      post_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "post_comments",
    }
  );
  return post_comments;
};
