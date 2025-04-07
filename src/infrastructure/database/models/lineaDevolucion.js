const DataTypes = require('sequelize');
const sequelize = require('../sequelize-config');

const LineaDevolucion = sequelize.define('LineaDevolucion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    existenciaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'existencias',
            key: 'id',
        },
    },
    devolucionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'devoluciones',
            key: 'id',
        },
    },
}, {
    tableName: 'lineas_devolucion',
    timestamps: false,
});

module.exports = LineaDevolucion;
