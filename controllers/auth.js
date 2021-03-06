require("dotenv").config();

const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;
const mailerHelper = require("../helpers/mailer");

module.exports = {
  login: async (req, res) => {
    try {
      const user = await User.authenticate(req.body);
      const accesstoken = user.generateToken();

      res.status(200).json({
        status: true,
        message: "success login",
        data: {
          login_type: "basic",
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          token: accesstoken,
        },
      });
    } catch (err) {
      res.status(500).json({
        status: false,
        message: err.message,
        data: null,
      });
    }
  },

  whoami: async (req, res) => {
    const currentUser = req.user;

    res.status(200).json({
      status: true,
      message: "ok",
      data: currentUser,
    });
  },

  forgot: async (req, res) => {
    try {
      const { email } = req.body;

      const userExist = await User.findOne({
        where: {
          email,
        },
      });

      if (userExist) {
        const data = {
          id: userExist.id,
          name: userExist.name,
          email: userExist.email,
        };

        const secret = JWT_SECRET_KEY + userExist.password;

        // tambahkan waktu expire
        const token = await jwt.sign(data, secret, { expiresIn: "5m" });

        const link = `${req.protocol}://${req.get(
          "host"
        )}/auth/reset-password/${userExist.id}?token=${token}`;

        const html = `
          <h2>hii ${userExist.name} </h2>
            <p>Silahkan klik link di bawah ini untuk mereset password</p>
            <p> link => ${link} </p>
        `;

        mailerHelper.sendEmail(userExist.email, "reset password", html);

        return res.json({
          status: true,
          message:
            "email reset password akan dikirimkan jika email tersedia di dalam database",
          data: null,
        });
      }
    } catch (err) {
      return res.status(500).json({
        status: false,
        message: err.message,
        data: null,
      });
    }
  },

  reset: async (req, res) => {
    try {
      const token = req.query.token;
      const user_id = req.params.userId;

      console.log("user id => ", user_id);

      const { new_password, new_password_confirm } = req.body;

      console.log(new_password);
      console.log(new_password_confirm);

      if (new_password != new_password_confirm) {
        res.status(400).json({
          status: false,
          message: "password harus sama",
          data: null,
        });
      }

      const user = await User.findOne({
        where: {
          id: user_id,
        },
      });

      const secret = JWT_SECRET_KEY + user.password;

      const data = await jwt.verify(token, secret);

      const encrypedNewPassword = await bcrypt.hash(new_password, 10);

      const query = {
        where: {
          email: data.email,
        },
      };

      const updatedPassword = await User.update(
        {
          password: encrypedNewPassword,
        },
        query
      );

      console.log(updatedPassword);

      return res.json({
        status: true,
        message: "success update password",
        data: updatedPassword,
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
