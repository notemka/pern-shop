const sequelize = require('../db');
const { DataTypes } = require('sequelize');
const { INTEGER } = DataTypes;

const BasketGood = sequelize.define('basket_good', {
  id: { type: INTEGER, primaryKey: true, autoIncrement: true },
});

module.exports = BasketGood;
