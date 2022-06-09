require("dotenv").config();
const { User } = require("../models");
const Sentry = require("../lib/sentry");
const passport = require("passport");
const Validator = require("fastest-validator");
const bcrypt = require("bcrypt");
const V = new Validator();
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
var userProfile;
const mailerHelper = require("../helpers/mailer");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/v1/users/google",
    },
    (accessToken, refreshToken, profile, done) => {
      userProfile = profile;
      return done(null, userProfile);
    }
  )
);

createUser = async (req, res) => {
  try {
    // let { name, username, email, password } = req.body;

    const schema = {
      name: "string|required",
      username: "string|required",
      email: "email|required",
      password: "string|required",
    };

    const validator = V.validate(req.body, schema);
    if (validator.length) {
      res.status(400).json({
        status: false,
        message: "bad request schema",
        data: validator,
      });
      return;
    }

    // if (!name || !username || !email || !password) {
    //   res.status(400).json({
    //     status: "false",
    //     message: "name or username or email or password is required!",
    //   });
    //   return;
    // }

    const isEmailExist = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    const isUserNameExist = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (isUserNameExist || isEmailExist) {
      res.status(400).json({
        status: "false",
        message:
          "username atau email sudah ada, silahkan menggunakan username atau email lainnya",
      });

      return;
    }

    // membuat bcrypt password
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      user_type: "basic",
      role: "user",
    });

    const html = `
            <h2>Hii ${req.body.name} selamat datang di instagram API</h2>
            <p>Semoga betah iya disini</p>
        `;

    console.log(`user email => ${req.body.email}`);
    mailerHelper.sendEmail(req.body.email, "Welcome", html);

    // jika berhasil
    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
      user_type: newUser.user_type,
      updatedAt: newUser.updatedAt,
      createdAt: newUser.createdAt,
    });
  } catch (err) {
    Sentry.captureException(err);
    console.log(err);
    res.status(500).json({
      status: "error",
      errors: err,
    });
  }
};

getAllUser = async (req, res) => {
  try {
    let users = await User.findAll({
      include: [
        "post",
        // "post_likes",
        // "post_comments"
      ],
    });

    // untuk MVC
    // res.status(200).render("user.ejs", { users });

    // MCR
    res.status(200).json({
      status: "success",
      message: "berhasil mengambil semua data user",
      data: users,
    });
  } catch (err) {
    Sentry.captureException(err);
    console.log(err);
    res.status(500).json({
      status: "error",
      errors: err,
    });
  }
};

getOneUser = async (req, res) => {
  try {
    const user_id = req.params.id;

    let user = await User.findOne({
      where: {
        id: user_id,
      },
      include: ["post", "post_likes", "post_comments"],
    });

    if (!user) {
      res.status(404).json({
        status: "error",
        message: `tidak ditemukan dengan id : ${user_id}`,
        data: null,
      });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "berhasil mengambil detail user",
      data: user,
    });
  } catch (err) {
    console.log(err);
    Sentry.captureException(err);
    res.status(500).json({
      status: "error",
      errors: err,
    });
  }
};

updateUser = async (req, res) => {
  try {
    let user_id = req.params.id;
    const { name, username, email, password } = req.body;

    const isIdExist = await User.findOne({
      where: {
        id: user_id,
      },
    });

    if (!isIdExist) {
      res.status(404).json({
        status: "false",
        message: "id tidak ditemukan",
      });
      return;
    }
    console.log(isIdExist);

    let query = {
      where: {
        id: user_id,
      },
    };

    let updated = await User.update(
      {
        name,
        username,
        email,
        password,
      },
      query
    );

    res.status(200).json({
      status: "success",
      message: "berhasil update user!",
      data: updated,
    });
  } catch (err) {
    Sentry.captureException(err);
    console.log(err);
    res.status(500).json({
      status: "error",
      errors: err,
    });
  }
};

deleteUser = async (req, res) => {
  try {
    let user_id = req.params.id;

    const isIdExist = await User.findOne({
      where: {
        id: user_id,
      },
    });

    if (!isIdExist) {
      res.status(404).json({
        status: "false",
        message: "id tidak ditemukan",
      });
      return;
    }

    let deleted = await User.destroy({
      where: {
        id: user_id,
      },
    });

    res.status(200).json({
      status: "success",
      message: "berhasil menghapus user",
      data: deleted,
    });
  } catch (err) {
    Sentry.captureException(err);
    console.log(err);
    res.status(500).json({
      status: "error",
      errors: err,
    });
  }
};

googleOAuthRegister = async (req, res, next) => {
  try {
    const user = userProfile;

    console.log("---");
    console.log(user);
    console.log("---");
    const googleEmail = user.emails[0].value;
    const isEmailExistInDb = await User.findOne({
      where: {
        email: googleEmail,
      },
    });

    // jika tidak ada email tersebut/lanjutkan untuk mendaftarkan ke database
    if (!isEmailExistInDb) {
      await User.create({
        name: user.displayName,
        email: googleEmail,
        user_type: user.provider,
      });
    }
    console.log("---");
    console.log(user.displayName);
    console.log("---");

    return res.status(201).json({
      status: true,
      message: `logged in with google`,
      data: {
        name: user.displayName,
        email: user.emails[0].value,
        user_type: user.provider,
      },
    });
  } catch (err) {
    Sentry.captureException(err);
    return next(err);
    // return res.status(500).json({
    //   status: false,
    //   message: err.message,
    //   data: null,
    // });
  }
};
module.exports = {
  createUser,
  getAllUser,
  getOneUser,
  updateUser,
  deleteUser,
  googleOAuthRegister,
};
