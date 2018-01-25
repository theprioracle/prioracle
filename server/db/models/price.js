const Sequelize = require('sequelize');
const db = require('../db');

const Price = db.define('price', {
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
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Date.now()
  }
});

module.exports = Price;
