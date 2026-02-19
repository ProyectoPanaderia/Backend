const DataTypes = require('sequelize');
const sequelize = require('../sequelize-config');

const Empleado = sequelize.define('Empleado', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    repartoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'repartos',
            key: 'id',
        },
    },
    usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'usuarios',
        key: 'id',
    },
    },
}, {
    tableName: 'empleados',
    timestamps: false,
});

module.exports = Empleado;