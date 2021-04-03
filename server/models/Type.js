const sequelize = require('../db');
const { DataTypes } = require('sequelize');
const { INTEGER, STRING } = DataTypes;

const Type = sequelize.define('type', {
  id: { type: INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: STRING, unique: true, allowNull: false },
});

module.exports = Type;
