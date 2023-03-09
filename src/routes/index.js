const dashboardRoutes = require('./dashboard.routes.js');
const collectionRoutes = require('./collection.routes.js');
const express = require('express');
const router = express.Router();
const {validateToken} = require('../middlewares');

router.use('/dashboard',validateToken,dashboardRoutes);
router.use('/collection',validateToken,collectionRoutes);

module.exports = router;