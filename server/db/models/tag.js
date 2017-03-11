const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('tags', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  }
});
