"use strict";
const { Model } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // relasi one to many User memiliki banyak Post
      User.hasMany(models.Post, { foreignKey: "user_id", as: "post" });
      // relasi one to many User memiliki banyak PostLikes
      User.hasMany(models.post_likes, {
        foreignKey: "user_id",
        as: "post_likes",
      });
      // relasi one to many User memiliki banyak PostComments
      User.hasMany(models.post_comments, {
        foreignKey: "user_id",
        as: "post_comments",
      });
    }

    checkPassword = (password) => {
      return bcrypt.compareSync(password, this.password);
    };

    generateToken = () => {
      const payload = {
        id: this.id,
        name: this.name,
        email: this.email,
        role: this.role,
      };

      const secretKey = process.env.JWT_SECRET_KEY;

      // prosess encoded jwt
      const token = jwt.sign(payload, secretKey);
      return token;
    };

    static authenticate = async ({ email, password }) => {
      try {
        const user = await this.findOne({
          where: {
            email: email,
          },
        });
        if (!user) return Promise.reject(new Error("user not found!"));

        const isPasswordValid = user.checkPassword(password);
        if (!isPasswordValid)
          return Promise.reject(new Error("wrong password!"));

        return Promise.resolve(user);
      } catch (err) {
        return Promise.reject(err);
      }
    };
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
