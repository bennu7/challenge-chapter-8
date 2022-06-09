require("dotenv").config();
var express = require("express");
const app = express();
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const indexRouter = require("./routes");
const usersRouter = require("./routes/users");
const postRouter = require("./routes/posts");
const commentRouter = require("./routes/post_comment");
const likeRouter = require("./routes/post_like");
const authRouter = require("./routes/auth");
const mediaRouter = require("./routes/media");
const webRouter = require("./routes/web");

const passport = require("passport");
const session = require("express-session");

const { JWT_SECRET_KEY } = process.env;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));

app.use(passport.initialize());
app.set("trust proxy", 1);
app.set("view engine", "ejs");
app.use(
  session({
    secret: JWT_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
// bagian ini masih belum paham
passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

app.use("/", indexRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1", mediaRouter);
app.use("/auth", webRouter);

module.exports = app;
