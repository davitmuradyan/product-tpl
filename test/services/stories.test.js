const assert = require('assert');
const app = require('../../src/app');

describe('\'stories\' service', () => {
  it('registered the service', () => {
    const service = app.service('stories');

    assert.ok(service, 'Registered the service');
  });
});
