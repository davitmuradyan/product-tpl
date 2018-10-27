// Initializes the `epic_story_xref` service on path `/epic-story-xref`
const createService = require('feathers-sequelize');
const createModel = require('../../models/epic_story_xref.model');
const hooks = require('./epic_story_xref.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/epic-story-xref', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('epic-story-xref');

  service.hooks(hooks);
};
