const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

const app = express();
const PORT = process.env.PORT || 3000;

// Passport configuration
require("./config/passport")(passport);

// DB configuration
const db = require("./config/keys").MongoURI;

mongoose
  .connect(db, { useNewURLParser: true })
  .then(() => console.log("Database connection success"))
  .catch((err) => console.log(err));

// EJS Layout
app.use(expressLayouts);
app.set("view engine", "ejs");

// Body Parser
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

// Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

app.listen(PORT, console.log(`Server started on http://localhost:${PORT}`));
