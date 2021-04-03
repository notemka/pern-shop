const sequelize = require('../db');
const { DataTypes } = require('sequelize');
const { INTEGER } = DataTypes;

const Rating = sequelize.define('rating', {
  id: { type: INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: INTEGER, allowNull: false },
});

module.exports = Rating;
