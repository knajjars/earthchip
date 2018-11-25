const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

// ALL ROUTES PREFIXED WITH /api/auth

router.post("/signup", (req, res, next) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    res.status(400).json({ message: "Indicate username, password and email." });
    return;
  }
  User.findOne({ email })
    .then(userDoc => {
      if (userDoc !== null) {
        res.status(409).json({ message: "The email already exists" });
        return;
      }
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
      const newUser = new User({ username, password: hashPass, email });
      return newUser.save();
    })
    .then(userSaved => {
      req.logIn(userSaved, () => {
        userSaved.password = undefined;
        res.json({ userSaved });
      });
    })
    .catch(err => next(err));
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({ message: "Something went wrong" });
      return;
    }

    if (!theUser) {
      res.status(401).json(failureDetails);
      return;
    }

    req.login(theUser, err => {
      if (err) {
        res.status(500).json({ message: "Something went wrong" });
        return;
      }
      res.json({ message: "success" });
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.json({ message: "Successfully logged out." });
});

module.exports = router;
