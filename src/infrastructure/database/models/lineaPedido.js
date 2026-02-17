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
  precioUnitario: {
  type: DataTypes.DECIMAL(10, 2),
  defaultValue: 0.00,
},
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
  },
  descripcion: { 
    type: DataTypes.STRING,
    allowNull: false 
  }
}, {
  tableName: 'lineas_pedido',
  timestamps: false,
});

module.exports = LineaPedido;