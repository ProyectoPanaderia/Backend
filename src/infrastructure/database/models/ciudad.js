const DataTypes = require('sequelize');
const sequelize = require('../sequelize-config');

const Ciudad = sequelize.define('Ciudad', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'ciudades',
    timestamps: false,
});

moedules.exports = Ciudad;