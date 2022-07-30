// import router and sequelize connection
const router = require("express").Router();
const sequelize = require("../../config/connection");

// import models
const { User, Post } = require("../../models/index");

router.get('/', (req, res) => {
    res.send("hello world");
});

module.exports = router;
