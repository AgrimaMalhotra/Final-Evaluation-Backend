const dashboardRoutes = require('./dashboard.routes.js');
const collectionRoutes = require('./collection.routes.js');
const express = require('express');
const router = express.Router();

router.use('/dashboard',dashboardRoutes);
router.use('/collection',collectionRoutes);

module.exports = router;