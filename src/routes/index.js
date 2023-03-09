const dashboardRoutes = require('./dashboard.routes.js');
const express = require('express');
const router = express.Router();

router.use('/dashboard',dashboardRoutes);

module.exports = router;