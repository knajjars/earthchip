function isLoggedIn(req, res, next) {
  console.log("here", req.user);
  if (req.user) next();
  else next({ status: 403, message: "Please login." });
}

module.exports = {
  isLoggedIn
};
