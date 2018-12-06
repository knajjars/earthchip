const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

// ALL ROUTES PREFIXED WITH /api/auth

router.post("/signup", (req, res, next) => {
  const { name, password, email } = req.body;
  if (name === "" || password === "" || email === "") {
    res.status(400).json({ message: "Indicate all the fields" });
    return;
  }

  User.findOne({ email }, "email", (err, user) => {
    if (user !== null) {
      res.status(400).json({ message: "The email is already registered!" });
      return;
    }
    ß;

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    User.create({
      name,
      password: hashPass,
      email
    })
      .then(user => {
        req.login(user, function(err) {
          res.status(200).json(user);
          return;
        });
      })
      .catch(err => {
        next(err);
      });
  });
});

router.post("/change-password", (req, res, next) => {
  let { oldPassword, newPassword } = req.body;
  if (oldPassword !== "" && newPassword !== "") {
    bcrypt.compare(oldPassword, req.user.password, (err, result) => {
      if (err || !result) {
        res.status(400).json({ message: "Password is incorrect!" });
      } else {
        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPassNew = bcrypt.hashSync(newPassword, salt);
        User.findByIdAndUpdate(req.user.id, {
          password: hashPassNew
        }).then(() =>
          res.status(200).json({ message: "Password changed successfully!" })
        );
      }
    });
  } else {
    res.status(400).json({ message: "Please enter both fields!" });
  }
});

router.post("/change-email", (req, res, next) => {
  let { oldEmail, newEmail } = req.body;
  console.log(req.user.email, oldEmail);
  if (oldEmail !== req.user.email) {
    return res.status(400).json({ message: "Email is not correct!" });
  }

  User.findOne({ email: newEmail })
    .then(user => {
      if (user !== null) {
        res.status(400).json({ message: "E-mail already in use" });
      } else {
        User.findByIdAndUpdate(req.user._id, {
          email: newEmail
        }).then(user => {
          res.status(200).json({ message: "Email updated" });
        });
      }
    })
    .catch(err => console.log(err));
});

router.post("/change-password", (req, res, next) => {
  let { oldPassword, newPassword } = req.body;
  if (oldPassword !== "" && newPassword !== "") {
    bcrypt.compare(oldPassword, req.user.password, (err, result) => {
      if (err || !result) {
        res.status(400).json({ message: "Password is incorrect!" });
      } else {
        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPassNew = bcrypt.hashSync(newPassword, salt);
        User.findByIdAndUpdate(req.user.id, {
          password: hashPassNew
        }).then(() =>
          res.status(200).json({ message: "Password changed successfully!" })
        );
      }
    });
  } else {
    res.status(400).json({ message: "Please enter both fields!" });
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      res.status(500).json({ message: "An error ocurred." });
      return;
    }

    if (!theUser) {
      res.status(401).json(failureDetails);
      return;
    }

    req.login(theUser, err => {
      if (err) {
        res.status(500).json({ message: "An error ocurred." });
        return;
      }
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.json({ message: "Successfully logged out." });
});

module.exports = router;
