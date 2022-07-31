// import router and sequelize connection
const router = require("express").Router();
const sequelize = require("../../config/connection");

// import models
const { User, Post } = require("../../models/index");

// get all posts
router.get("/", (req, res) => {
  Post.findAll({
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
    order: [["createdAt", "DESC"]],
  })
    .then((dbPostData) => {
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get all posts by user
router.get("/user", (req, res) => {
  const user_id = 1; // req.session.id

  Post.findAll({
    where: {
      user_id: user_id,
    },
    order: [["createdAt", "DESC"]],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this user id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one post
router.get("/:id", (req, res) => {
  const id = req.params.id;

  Post.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create post
router.post("/", (req, res) => {
  const { title, post_body } = req.body;
  // const user_id = req.session.id;

  Post.create({
    title: title,
    post_body: post_body,
    user_id: 1, // user_id
  })
    .then((dbPostData) => {
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete post

module.exports = router;
