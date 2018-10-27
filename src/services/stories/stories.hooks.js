const axios = require('axios');
const { PIVOTAL_API_KEY } = require('../../../config/dev');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      /*
      Create a new story in pivotal and save data to local database
      POST request http://localhost:3030/stories
      required fields [
        name -> string,
        project_id -> integer
      ]
      optional fields [
        description -> string,
        story_type -> string,
        current_state -> string,
        estimate -> string,
        accepted_at -> timestamp,
        deadline -> timestamp,
        requested_by_id -> integer,
        owner_ids -> array,
        labels -> array,
        tasks -> array
      ]
      example request body
      {
        "estimate": 3,
	      "name": "Story 1",
        "description": "Description to story",
        "current_state": "started",
        "project_id": 2209509,
        "story_type": "feature",
        "labels": [
        {
          "name": "epic2"
        },
        {
           "name": "epic1"
        }]
      }
      example response body
      {
        "id": 2,
        "estimate": 3,
        "name": "Story 1",
        "description": "Description to story",
        "current_state": "started",
        "project_id": 2209509,
        "story_type": "feature",
        "labels": [
          {
            "kind": "label",
            "id": 20634123,
            "project_id": 2209509,
            "name": "epic1",
            "created_at": "2018-10-26T20:57:12Z",
            "updated_at": "2018-10-26T20:57:12Z"
          },
          {
            "kind": "label",
            "id": 20633902,
            "project_id": 2209509,
            "name": "gnewa1dasds bnepica from node",
            "created_at": "2018-10-26T19:47:37Z",
            "updated_at": "2018-10-26T19:47:37Z"
          }
        ],
        "story_id": 161525242,
        "updatedAt": "2018-10-27T10:41:20.623Z",
        "createdAt": "2018-10-27T10:41:20.623Z",
        "accepted_at": null,
        "deadline": null,
        "requested_by_id": null,
        "owner_ids": null,
        "tasks": null
      }
      */
      async (req) => {
        try {
          const instance = axios.create({
            baseURL: 'https://www.pivotaltracker.com/services/v5',
            timeout: 1000,
            headers: {
              'Content-Type': 'application/json',
              'X-TrackerToken': PIVOTAL_API_KEY
            }
          });
          const res = await instance.post(`/projects/${req.data.project_id}/stories`, req.data);
          req.data.story_id = res.data.id;
          req.data.labels = res.data.labels;
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
    create: [
      async(req) => {
        const sequelizeClient = req.app.get('sequelizeClient');
        const EpicStoryXref = sequelizeClient.models.epic_story_xref;
        const Epics = sequelizeClient.models.epics;
        try {
          if (req.data.labels.length === 0)
            return req;
          else {
            let arr = [];
            const epics = await Epics.findAll();
            epics.map( item => {
              arr.push(item.dataValues.name.toLowerCase());
            });
            const epic = await Epics.findOne({
              where: {
                name: {
                  $in: arr
                }
              }
            });
            const { epic_id } = epic.dataValues;
            await EpicStoryXref.create({
              story_id: req.data.story_id,
              epic_id: epic_id
            });
            return req;
          }
        } catch(e) {
          console.log(e);
        }
      }
    ],
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
