const Sequelize = require('sequelize');
const db = require('../db');

const algoPriceWeight = 0.5;

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
      return Math.round(
        algoPriceWeight * this.getDataValue('algoPrice') 
        + (1 - algoPriceWeight) * this.getDataValue('scraperPrice')
      );
    }
  }
});

module.exports = Valuation;
