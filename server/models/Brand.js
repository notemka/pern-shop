const sequelize = require('../db');
const { DataTypes } = require('sequelize');
const { INTEGER, STRING } = DataTypes;

const Brand = sequelize.define('brand', {
  id: { type: INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: STRING, unique: true, allowNull: false },
});

module.exports = Brand;
