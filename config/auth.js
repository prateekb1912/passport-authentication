module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) return next();

    req.flash("error_msg", "Login required to access the resource");
    res.redirect("/users/login");
  },
};
