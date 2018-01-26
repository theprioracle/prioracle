const Sequelize = require('sequelize');
const db = require('../db');

const Listing = db.define('listing', {
  name: {
    type: Sequelize.STRING,
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
    type: Sequelize.ENUM('active', 'inactive')
  },
  brand: {
    type: Sequelize.STRING
  },
  listedAt: {
    type: Sequelize.DATE,
    defaultValue: Date.now()
  },
  sellerShips: {
    type: Sequelize.BOOLEAN
  }
});

module.exports = Listing;
