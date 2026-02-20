const DataTypes = require('sequelize');
const sequelize = require('../sequelize-config');

const Devolucion = sequelize.define('Devolucion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    razon: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
    },
    repartoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'repartos',
            key: 'id',
        },
    },
    clienteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'clientes',
            key: 'id',
        },
    },
}, {
    tableName: 'devoluciones',
    timestamps: false,
});


module.exports = Devolucion;    