const sequelize = require('../db');
const { DataTypes } = require('sequelize');
const { INTEGER } = DataTypes;

const Basket = sequelize.define('basket', {
  id: { type: INTEGER, primaryKey: true, autoIncrement: true },
});

module.exports = Basket;
