// import router
const router = require('express').Router();

// /api paths
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');

// assigning api paths to router
router.use('/user', userRoutes);
router.use('/post', postRoutes);

module.exports = router;