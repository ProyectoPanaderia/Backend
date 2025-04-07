const DataTypes = require('sequelize');
const sequelize = require('../sequelize-config');

const RepartoVehiculo = sequelize.define('RepartoVehiculo', {
    vehiculoId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'vehiculos',
            key: 'id',
        },
    },
    repartoId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'repartos',
            key: 'id',
        },
    },
}, {
    tableName: 'repartos_vehiculos',
    timestamps: false,
});

module.exports = RepartoVehiculo;