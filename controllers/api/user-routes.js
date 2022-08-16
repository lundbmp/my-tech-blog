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
      // log user in after they register
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json({ user: dbUserData, message: "You're now logged in..." });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Login to create session
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbUserData) => {
    // false if email address is not in database
    if (!dbUserData) {
      console.log("Email address not found...");
      return;
    }

    const passwordResult = dbUserData.checkPassword(req.body.password);
    // check if password is correct
    if (!passwordResult) {
      res.status(400).json({ message: "Incorrect password..." });
      return;
    }

    // create new session
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: "You're now logged in..." });
    });
  });
});

router.post("/logout", (req, res) => {
  // destroy session if it exists
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
