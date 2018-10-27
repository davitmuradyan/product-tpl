const assert = require('assert');
const app = require('../../src/app');

describe('\'epics\' service', () => {
  it('registered the service', () => {
    const service = app.service('epics');

    assert.ok(service, 'Registered the service');
  });
});
