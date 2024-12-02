const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  availability: {
    type: DataTypes.TINYINT,
    defaultValue: 1, // 1 para disponible, 0 para no disponible
  },
  image: {
    type: DataTypes.STRING, // Define el tipo como STRING para almacenar URLs
  },
  
  
}, {
  tableName: 'products', // Nombre de la tabla en la base de datos
  timestamps: true,
  createdAt: 'created_at', // Cambiar createdAt a created_at
  updatedAt: 'updated_at', // Cambiar updatedAt a updated_at
});

module.exports = Product;
