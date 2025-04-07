const DataTypes = require('sequelize');
const sequelize = require('../sequelize-config');

const LineaRemito = sequelize.define('LineaRemito', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    subtotal: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    remitoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'remitos',
            key: 'id',
        },
    },
}, {
    tableName: 'lineas_remito',
    timestamps: false,
});

module.exports = LineaRemito;
