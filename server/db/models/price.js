const Sequelize = require('sequelize');
const db = require('../db');

const Price = db.define('price', {
  algoPrice: {
    type: Sequelize.DECIMAL,
  },
  scraperPrice: {
    type: Sequelize.DECIMAL,
  },
  soldPrice: {
    type: Sequelize.DECIMAL,
  },
  metaPrice: {
    type: Sequelize.VIRTUAL,
    get() {
      return (this.getDataValue('scraperPrice') + this.getDataValue('algoPrice')) / 2;
    }
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Date.now()
  }
});

module.exports = Price;
