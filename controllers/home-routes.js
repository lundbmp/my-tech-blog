const router = require("express").Router();
const { User, Post } = require("../models/index");

// homepage
router.get("/", (req, res) => {
  Post.findAll({
    include: {
      model: User,
      attributes: ["username"],
    },
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("homepage", { posts, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// login page
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login", { loggedIn: req.session.loggedIn });
});

// signup page
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup", { loggedIn: req.session.loggedIn });
});

// dashboard page
router.get("/dashboard", (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("login");
    return;
  }

  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    include: {
      model: User,
      attributes: ["username"],
    },
  }).then((dbPostData) => {
    const posts = dbPostData.map((post) => post.get({ plain: true }));

    res.render("dashboard", { posts, loggedIn: req.session.loggedIn });
  });
});

// get single blog post
router.get("/blog/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: User,
      attributes: ["username"],
    },
  })
    .then((dbPostData) => {
      const post = dbPostData.get({ plain: true });

      res.render("single-post", { post, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
});

module.exports = router;
