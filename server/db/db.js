const Sequelize = require('sequelize');

console.log('the other db file is running')

const db = new Sequelize(
  process.env.DATABASE_URL ||
  'postgres://localhost:5432/picmeup', {
  logging: false
});

module.exports = db;
