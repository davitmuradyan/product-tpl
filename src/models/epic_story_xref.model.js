// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const epicStoryXref = sequelizeClient.define('epic_story_xref', {
    epic_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    story_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  epicStoryXref.associate = function (models) {
    epicStoryXref.belongsTo(models.epics, {
      foreignKey: 'epic_id',
      targetKey: 'epic_id'
    });
    epicStoryXref.belongsTo(models.stories, {
      foreignKey: 'story_id',
      targetKey: 'story_id'
    });
  };

  return epicStoryXref;
};
