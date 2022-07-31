// import router and sequelize connection
const router = require("express").Router();
const sequelize = require("../../config/connection");

// import models
const { User, Post } = require("../../models/index");

// test
router.get("/", (req, res) => {
  res.send("hello world");
});

// create user
/*
{
    "username": "Mikey",
    "email": "mikey@mikey.com",
    "password": "secret"
}
*/
router.post("/register", (req, res) => {
  // req.body variables
  const { username, email, password } = req.body;

  User.create({
    username: username,
    email: email,
    password: password,
  })
    .then((dbUserData) => {
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Login to create session
router.post("/login", (req, res) => {
  const { username, email, password } = req.body;
});

module.exports = router;
