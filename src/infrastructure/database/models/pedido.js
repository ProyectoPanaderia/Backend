const DataTypes = require('sequelize');
const sequelize = require('../sequelize-config');

const Pedido = sequelize.define('Pedido', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fechaEmision: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fechaEntrega: {
    type: DataTypes.DATE,
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
}, {
  tableName: 'pedidos',
  timestamps: false,
});

module.exports = Pedido;