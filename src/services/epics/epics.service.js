// Initializes the `epics` service on path `/epics`
const createService = require('feathers-sequelize');
const createModel = require('../../models/epics.model');
const hooks = require('./epics.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/epics', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('epics');

  service.hooks(hooks);
};
