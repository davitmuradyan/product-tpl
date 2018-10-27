const epics = require('./epics/epics.service.js');
const stories = require('./stories/stories.service.js');
const epicStoryXref = require('./epic_story_xref/epic_story_xref.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(epics);
  app.configure(stories);
  app.configure(epicStoryXref);
};
