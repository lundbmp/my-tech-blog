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
      const post = dbPostData.map((post) => post.get({ plain: true }));
      res.render("homepage", post[0]);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// login page
router.get("/login", (req, res) => {
  if(req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// signup page
router.get("/signup", (req, res) => {
  if(req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
})

module.exports = router;
