const dashboardControllers = require('./dashboard.controllers');
const collectionControllers = require('./collection.controllers');

module.exports = {...dashboardControllers, ...collectionControllers};
