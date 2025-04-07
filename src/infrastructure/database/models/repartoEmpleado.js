const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize-config');

const RepartoEmpleado = sequelize.define('RepartoEmpleado', {
  empleadoId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'empleados',
      key: 'id',
    }
  },
  repartoId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'repartos',
      key: 'id',
    }
  }
}, {
  tableName: 'repartos_empleados',
  timestamps: false
});

module.exports = RepartoEmpleado;