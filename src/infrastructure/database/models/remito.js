const DataTypes = require('sequelize');
const sequelize = require('../sequelize-config');

const Remito = sequelize.define('Remito', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    clienteId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'clientes',
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
}, {
    tableName: 'remitos',
    timestamps: false,
});

module.exports = Remito;