const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('inventario', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
