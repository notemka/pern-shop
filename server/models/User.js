const sequelize = require('../db');
const { DataTypes } = require('sequelize');
const { INTEGER, STRING } = DataTypes;

const User = sequelize.define('user', {
  id: { type: INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: STRING, unique: true },
  password: { type: STRING },
  role: { type: STRING, defaultValue: 'USER' },
});

module.exports = User;
