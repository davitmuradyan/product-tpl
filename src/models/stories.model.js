// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const stories = sequelizeClient.define('stories', {
    story_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    story_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    current_state: {
      type: DataTypes.STRING,
      allowNull: true
    },
    estimate: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    accepted_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: true
    },
    requested_by_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    owner_ids: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true
    },
    labels: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true
    },
    tasks: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  stories.associate = function (models) {

  };

  return stories;
};
