const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Sale = sequelize.define('Sale', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  receipt: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'sales',
  timestamps: true,
});

module.exports = Sale;
