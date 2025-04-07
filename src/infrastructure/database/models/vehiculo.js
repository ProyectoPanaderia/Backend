const DataTypes = require('sequelize');
const sequelize = require('../sequelize-config');

const Vehiculo = sequelize.define('Vehiculo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    matricula: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'vehiculos',
    timestamps: false,
});

moedule.exports = Vehiculo;