const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('cliente', 'administrador', 'cajero', 'despachador'),
    defaultValue: 'cliente',
  },
}, {
  tableName: 'users',
  timestamps: true, // Habilitado para usar createdAt y updatedAt
  createdAt: 'created_at', // Mapeo explícito
  updatedAt: 'updated_at', // Mapeo explícito
});

module.exports = User;
