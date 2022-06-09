require("dotenv").config();
const jwt = require("jsonwebtoken");
const Sentry = require("../lib/sentry");

module.exports = {
  login: async (req, res, next) => {
    try {
      const token = req.headers["authorization"];
      if (!token) {
        return res.status(401).json({
          status: false,
          message: `you're not authorizated`,
          data: null,
        });
      }

      const secretKey = process.env.JWT_SECRET_KEY;
      const decoded = jwt.verify(token, secretKey);

      req.user = decoded;
      console.log(req.user);
      next();
    } catch (err) {
      if (err.message == "jwt maflormed") {
        Sentry.captureException(err.message);
        return res.status(401).json({
          status: false,
          mesage: err.message,
          data: null,
        });
      }

      //   Sentry.captureException(err.message);
      return res.status(500).json({
        status: false,
        message: err.mesage,
        data: null,
      });
    }
  },

  admin: (req, res, next) => {
    try {
      console.log(req.user.role);
      if (!req.user || req.user.role != "admin") {
        return res.status(401).json({
          status: false,
          message: "only role admin can access this enpoint!",
          data: null,
        });
      }
      console.log(req.user.role);

      next();
    } catch (err) {
      return res.status(500).json({
        status: false,
        message: err.message,
        data: null,
      });
    }
  },
};
