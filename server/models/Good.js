const sequelize = require('../db');
const { DataTypes } = require('sequelize');
const { INTEGER, STRING } = DataTypes;

const Good = sequelize.define('good', {
  id: { type: INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: STRING, unique: true, allowNull: false },
  price: { type: INTEGER, allowNull: false },
  rating: { type: INTEGER, defaultValue: 0 },
  img: { type: STRING, allowNull: false },
});

module.exports = Good;
