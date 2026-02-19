const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize-config'); // Asegúrate de que esta ruta apunte bien a tu config

const Usuario = sequelize.define('Usuario', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  username: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true 
  },
  password: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  rol: { 
    type: DataTypes.ENUM('SUPERADMIN', 'ADMINISTRADOR', 'REPARTIDOR'), 
    allowNull: false
  },
}, {
  tableName: 'usuarios',
  timestamps: true
});

module.exports = Usuario;