const axios = require('axios');
const { PIVOTAL_API_KEY } = require('../../../config/dev');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      /*
      Create a new epic in pivotal and save data to local database
      POST request http://localhost:3030/epics
      required fields [
        name -> string,
        project_id -> integer
      ]
      optional fields [
        label -> string,
        description -> string
      ]
      example request body
      {
        "name": "epic1",
        "description": "new description from node",
        "project_id": 2209509
      }
      example response body
      {
        "id": 1,
        "name": "epic1",
        "description": "new description from node",
        "project_id": 2209509,
        "epic_id": 4116431,
        "url": "https://www.pivotaltracker.com/epic/show/4116431",
        "updatedAt": "2018-10-27T10:38:32.492Z",
        "createdAt": "2018-10-27T10:38:32.492Z",
        "label": null
      }
      */
      async (req) => {
        try {
          const instance = axios.create({
            baseURL: 'https://www.pivotaltracker.com/services/v5',
            timeout: 1000,
            headers: {
              'Content-Type': 'application/json',
              'X-TrackerToken': PIVOTAL_API_KEY}
          });
          const res = await instance.post(`/projects/${req.data.project_id}/epics`, req.data);
          req.data.epic_id = res.data.id;
          req.data.url = res.data.url;
          return req;
        }
        catch(e) {
          console.log(e);
        }
      } 
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
