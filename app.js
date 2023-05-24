const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3000;

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
