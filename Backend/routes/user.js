const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({ email: req.body.email, password: hash });

    user
      .save()
      .then((result) => {
        res.status(201).json({
          success: true,
          data: result,
        });
      })
      .catch((error) => {
        if (error == 11000) {
          res.status(500).json({
            success: false,
            data: "user already exists!",
          });
        } else {
          res.status(500).json({
            success: false,
            data: error,
          });
        }
      });
  });
});

router.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          success: false,
          data: "Could not find user",
        });
      }
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          success: false,
          data: "password not found",
        });
      }

      const token = jwt.sign(
        { email: req.body.email, userId: req.body.password },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        success: true,
        token: token,
        expiresIn: 3600, 
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
