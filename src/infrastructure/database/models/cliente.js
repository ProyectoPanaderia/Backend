const DataTypes = require('sequelize');
const sequelize = require('../sequelize-config');

const Cliente = sequelize.define('Cliente', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ciudadId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ciudades',
            key: 'id',
        },
    },
}, {
    tableName: 'clientes',
    timestamps: false,
});

module.exports = Cliente;