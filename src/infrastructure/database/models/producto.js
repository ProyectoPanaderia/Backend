const {DataTypes} = require('sequelize');
const sequelize = require('../sequelize-config');

const Producto = sequelize.define('Producto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    peso: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
}, {
  tableName: 'productos',
  timestamps: false,
});

module.exports = Producto;

