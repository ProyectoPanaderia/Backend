const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize-config');

const LineaPedido = sequelize.define('LineaPedido', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  productoId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'productos', 
      key: 'id',
    },
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pedidoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'pedidos', 
      key: 'id',
    },
  },
}, {
  tableName: 'lineas_pedido',
  timestamps: false,
});

module.exports = LineaPedido;