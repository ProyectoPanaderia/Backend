const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize-config');

const PrecioProducto = sequelize.define('PrecioProducto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: 'Tipo de precio: reventa, consumidor final, mayorista, etc.'
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: 'Precio del producto'
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    comment: 'Fecha de vigencia del precio'
  },
  productoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'productos',
      key: 'id'
    }
  }
}, {
  tableName: 'precio_producto',
  timestamps: false
});

module.exports = PrecioProducto;