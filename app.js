require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const chalk = require("chalk");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const User = require("./models/User");
const upload = require("./utils/multer")


/**
 * Controllers (route handlers).
 */
const homeController = require("./controllers/home")
const userController = require("./controllers/user");
const photoController = require("./controllers/photo")
const tagController = require("./controllers/tag")
const photoApiController = require("./controllers/api/photo")

const app = express();
app.set("view engine", "ejs");


const { PORT, MONGODB_URI } = process.env;

/**
 * Database configuration
 */

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running.",
    chalk.red("✗")
  );
  process.exit();
});

/***
 * Middlewear configuration
 */
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressSession({ secret: 'foo barr', cookie: { expires: new Date(253402300000000) } }))


app.use("*", async (req, res, next) => {
  global.user = false;
  if (req.session.userID && !global.user) {
    const user = await User.findById(req.session.userID);
    global.user = user;
  }
  next();
})

const authMiddleware = async (req, res, next) => {
  const user = await User.findById(req.session.userID);
  if (!user) {
    return res.redirect('/');
  }
  next()
}

/**
 * Express routes
 */

app.get("/", homeController.list);

app.get("/logout", async (req, res) => {
  req.session.destroy();
  global.user = false;
  res.redirect('/');
})


app.get("/register", (req, res) => {
  res.render('register', { errors: {} })
});

app.post("/register", userController.register);


app.get("/login", (req, res) => {
  res.render('login', { errors: {} })
});

app.post("/login", userController.login);


app.get("/account", authMiddleware, userController.account);
app.post("/account/updatePassword", authMiddleware, userController.updatePassword);
app.post("/account/profilePicture", authMiddleware, upload.single("image"), photoController.profilePicture);

app.post("/add-tag", authMiddleware, tagController.create);

app.get("/add-photo", authMiddleware, photoController.get);
app.post("/add-photo", authMiddleware, upload.single("image"), photoController.create);


app.get("/gallery", authMiddleware, photoController.list);
app.get("/gallery/delete/:id", authMiddleware, photoController.delete);

app.get("/gallery/edit/:id", authMiddleware, photoController.edit);
app.post("/gallery/edit/:id", authMiddleware, photoController.update);

app.get("/search-photos", authMiddleware, photoApiController.get);

app.get("/api/search-photos", authMiddleware, photoApiController.list);

app.get("/display-photo/:id", authMiddleware, photoController.display)

app.listen(PORT, () => {
  console.log(
    `Example app listening at http://localhost:${PORT}`,
    chalk.green("✓")
  );
});
