const Sequelize = require('sequelize');
const db = require('../db');

const Listing = db.define('listing', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
  },
  category: {
    type: Sequelize.STRING,
  },
  condition: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.STRING
  },
  brand: {
    type: Sequelize.STRING
  },
  sellerShips: {
    type: Sequelize.BOOLEAN
  }
});

module.exports = Listing;
