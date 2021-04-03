const sequelize = require('../db');
const { DataTypes } = require('sequelize');
const { INTEGER, STRING } = DataTypes;

const GoodInfo = sequelize.define('good_info', {
  id: { type: INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: STRING, allowNull: false },
  description: { type: STRING, allowNull: false },
});

module.exports = GoodInfo;
