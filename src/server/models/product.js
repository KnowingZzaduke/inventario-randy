// En el archivo models/product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Product = sequelize.define('Product', {
  idproducto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombreproducto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fechacompra: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fechaingresoalmacen: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  almacen: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fechaexpiracion: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  valorcompra: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Product;
