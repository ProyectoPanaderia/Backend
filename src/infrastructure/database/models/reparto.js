const DataTypes = require('sequelize');
const sequelize = require('../sequelize-config');

const Reparto = sequelize.define('Reparto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tercerizado: {
        type: DataTypes.CHAR(1),
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    estado: {
        type: DataTypes.CHAR(1),
        allowNull: false,
    }, 
}, {
    tableName: 'repartos',
    timestamps: false,
    });

module.exports = Reparto;