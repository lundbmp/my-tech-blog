const router = require("express").Router();
const { User, Post } = require("../models/index");

router.get("/", (req, res) => {
  Post.findAll({
    include: {
      model: User,
      attributes: ["username"],
    },
  })
    .then((dbPostData) => {
      const post = dbPostData.map((post) => post.get({ plain: true }));
      console.log(post);
      res.render("homepage", post[0]);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
