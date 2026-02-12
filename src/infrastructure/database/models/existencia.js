const DataTypes = require('sequelize');
const sequelize = require('../sequelize-config');

const Existencia = sequelize.define('Existencia', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'productos',
            key: 'id',
        },
    },
    repartoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'repartos',
            key: 'id',
        },
    },
    fechaE: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    fechaV: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'existencias',
    timestamps: false,
});

module.exports = Existencia;