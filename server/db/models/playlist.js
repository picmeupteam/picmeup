const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('playlists', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});
