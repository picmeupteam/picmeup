const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('videos', {
  token: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  kind: {
    type: Sequelize.ENUM("affirm", "advise")
  }
});
