// importing router
const router = require('express').Router();

// importing routes
const apiRoutes = require('./api/index');
const homeRoutes = require('./home-routes');

// router middleware
router.use('/api', apiRoutes);
router.use('/', homeRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;