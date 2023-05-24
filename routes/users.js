const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

const User = require("../models/User");

router.get("/login", (req, res) => res.render("login"));
router.get("/register", (req, res) => res.render("register"));

// Register handler
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;

  let errors = [];

  // Check required fields
  if (!name || !email || !password || !password2)
    errors.push({ message: "Please fill the required fields" });
  if (password !== password2)
    errors.push({ message: "Passwords do not match" });

  if (errors.length) {
    res.render("register", { errors, name, email, password, password2 });
  } else {
    User.findOne({
      email: email,
    }).then((user) => {
      if (user) {
        errors.push({ message: "Email is already registered" });
        res.render("register", { errors, name, email, password, password2 });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        // Encrypt password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;

            newUser
              .save()
              .then((user) => {
                req.flash('success_msg', 'User successfully registered. Please login.');
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
});

module.exports = router;
