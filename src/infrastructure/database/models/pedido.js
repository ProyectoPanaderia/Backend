const {DataTypes} = require('sequelize');
const sequelize = require('../sequelize-config');

const Pedido = sequelize.define('Pedido', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fechaEmision: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  fechaEntrega: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  repartoId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'repartos', 
        key: 'id',
        },
  },
    clienteId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'clientes', 
        key: 'id',
        },
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
  },
  estado: {
    type: DataTypes.STRING,
    defaultValue: 'Pendiente',
  },
}, {
  tableName: 'pedidos',
  timestamps: false,
});

module.exports = Pedido;