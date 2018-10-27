const assert = require('assert');
const app = require('../../src/app');

describe('\'epic_story_xref\' service', () => {
  it('registered the service', () => {
    const service = app.service('epic-story-xref');

    assert.ok(service, 'Registered the service');
  });
});
