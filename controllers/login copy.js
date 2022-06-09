const { User } = require("../models");
const bcrypt = require("bcrypt");

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
};

// login = async (req, res) => {
//   try {
//     let { username, password } = req.body;
//     const userData = await User.findOne({
//       where: {
//         username: username,
//         password: password,
//       },
//     });

//     if (userData) {
//       res.status(200).json({
//         status: "success",
//         message: "berhasil login",
//         data: null,
//       });
//     } else {
//       res.status(404).json({
//         status: "false",
//         message: "User tidak ditemukan",
//       });
//       return;
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       status: "error",
//       errors: err,
//     });
//   }
// };

// module.exports = {
//   login,
// };
