const Sequelize = require('sequelize');
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://postgres:josh@localhost:5433/prioracle', {
    logging: false
  }
);
module.exports = db;
