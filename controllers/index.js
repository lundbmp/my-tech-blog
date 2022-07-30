// importing router
const router = require('express').Router();

// importing routes
const apiRoutes = require('./api/index');

// router middleware
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;