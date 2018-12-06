function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) next();
  else next({ status: 403, message: "Please login." });
}

module.exports = {
  isLoggedIn
};
