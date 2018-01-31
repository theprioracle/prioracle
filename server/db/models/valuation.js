const Sequelize = require('sequelize');
const db = require('../db');

const Valuation = db.define('valuation', {
  algoPrice: {
    type: Sequelize.INTEGER,
  },
  scraperPrice: {
    type: Sequelize.INTEGER,
  },
  soldPrice: {
    type: Sequelize.INTEGER,
  },
  metaPrice: {
    type: Sequelize.VIRTUAL,
    get() {
      return (this.getDataValue('scraperPrice') + this.getDataValue('algoPrice')) / 2;
    }
  }
});

module.exports = Valuation;
