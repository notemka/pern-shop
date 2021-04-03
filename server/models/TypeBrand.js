const sequelize = require('../db');
const { DataTypes } = require('sequelize');
const { INTEGER } = DataTypes;

const TypeBrand = sequelize.define('type_brand', {
  id: { type: INTEGER, primaryKey: true, autoIncrement: true },
});

module.exports = TypeBrand;
