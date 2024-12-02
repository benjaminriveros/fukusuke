const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define(
  'Product',
  {
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
  },
  {
    tableName: 'products', // Nombre de la tabla
    timestamps: false, // Desactiva createdAt y updatedAt
  }
);

module.exports = Product;
