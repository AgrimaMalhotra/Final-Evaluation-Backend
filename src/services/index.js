const dashboardServices = require('./dashboard.services');
const collectionServices = require('./collection.services');

module.exports = {
  ...dashboardServices,
  ...collectionServices
};
