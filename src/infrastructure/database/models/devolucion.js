const DataTypes = require('sequelize');
const sequelize = require('../sequelize-config');

const Devolucion = sequelize.define('Devolucion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    razon: {
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
}, {
    tableName: 'devoluciones',
    timestamps: false,
});


module.exports = Devolucion;    