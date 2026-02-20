const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../sequelize-config");

// Importar modelos
const Producto = require("./producto");
const Existencia = require("./existencia");
const LineaRemito = require("./lineaRemito");
const Remito = require("./remito");
const Cliente = require("./cliente");
const Ciudad = require("./ciudad");
const LineaPedido = require("./lineaPedido");
const Pedido = require("./pedido");
const Reparto = require("./reparto");
const Vehiculo = require("./vehiculo");
const Empleado = require("./empleado");
const LineaDevolucion = require("./lineaDevolucion");
const Devolucion = require("./devolucion");
const RepartoVehiculo = require("./repartoVehiculo");
const PrecioProducto = require("./precioProducto");
const Usuario = require("./usuario");

// Relación 1:1 entre Usuario y Empleado
Usuario.hasOne(Empleado, { foreignKey: 'usuarioId'});
Empleado.belongsTo(Usuario, { foreignKey: 'usuarioId'});

// Relación 1:1 entre Reparto y Empleado
Reparto.hasOne(Empleado, { foreignKey: 'repartoId'});
Empleado.belongsTo(Reparto, { foreignKey: 'repartoId'});

// Producto 1 -> * Existencia
Producto.hasMany(Existencia, { foreignKey: "productoId" });
Existencia.belongsTo(Producto, { foreignKey: "productoId" });

// Reparto 1 -> * Existencia
Reparto.hasMany(Existencia, { foreignKey: "repartoId" });
Existencia.belongsTo(Reparto, { foreignKey: "repartoId" });

// Existencia 1 -> * LineaRemito
Existencia.hasMany(LineaRemito, { foreignKey: "existenciaId" });
LineaRemito.belongsTo(Existencia, { foreignKey: "existenciaId" });

// Existencia 1 -> * LineaDevolucion
Producto.hasMany(LineaDevolucion, { foreignKey: "productoId" });
LineaDevolucion.belongsTo(Producto, { foreignKey: "productoId" });

// Producto 1 -> * LineaPedido
Producto.hasMany(LineaPedido, { foreignKey: "productoId" });
LineaPedido.belongsTo(Producto, { foreignKey: "productoId" });

// Pedido 1 -> * LineaPedido
Pedido.hasMany(LineaPedido, { foreignKey: "pedidoId" });
LineaPedido.belongsTo(Pedido, { foreignKey: "pedidoId" });

// Reparto 1 -> * Pedido
Reparto.hasMany(Pedido, { foreignKey: "repartoId" });
Pedido.belongsTo(Reparto, { foreignKey: "repartoId" });

// Cliente 1 -> * Pedido
Cliente.hasMany(Pedido, { foreignKey: "clienteId" });
Pedido.belongsTo(Cliente, { foreignKey: "clienteId" });

// Reparto 1 -> * Remito
Reparto.hasMany(Remito, { foreignKey: "repartoId" });
Remito.belongsTo(Reparto, { foreignKey: "repartoId" });

// Cliente 1 -> * Remito
Cliente.hasMany(Remito, { foreignKey: "clienteId" });
Remito.belongsTo(Cliente, { foreignKey: "clienteId" });

// Ciudad 1 -> * Cliente
Ciudad.hasMany(Cliente, { foreignKey: "ciudadId" });
Cliente.belongsTo(Ciudad, { foreignKey: "ciudadId" });

// Reparto * -> * Vehiculo (con clase intermedia)
Reparto.hasMany(RepartoVehiculo, { foreignKey: "repartoId" });
Vehiculo.hasMany(RepartoVehiculo, { foreignKey: "vehiculoId" });
RepartoVehiculo.belongsTo(Reparto, { foreignKey: "repartoId" });
RepartoVehiculo.belongsTo(Vehiculo, { foreignKey: "vehiculoId" });

// Reparto 1 -> * Devolucion
Reparto.hasMany(Devolucion, { foreignKey: "repartoId" });
Devolucion.belongsTo(Reparto, { foreignKey: "repartoId" });

// Cliente 1 -> * Devolucion
Cliente.hasMany(Devolucion, { foreignKey: "clienteId" });
Devolucion.belongsTo(Cliente, { foreignKey: "clienteId" });

// Devolucion 1 -> * LineaDevolucion
Devolucion.hasMany(LineaDevolucion, { foreignKey: "devolucionId" });
LineaDevolucion.belongsTo(Devolucion, { foreignKey: "devolucionId" });

// Remito 1 -> * LineaRemito
Remito.hasMany(LineaRemito, { foreignKey: "remitoId" });
LineaRemito.belongsTo(Remito, { foreignKey: "remitoId" });

// Producto 1 -> * PrecioProducto
Producto.hasMany(PrecioProducto, { foreignKey: "productoId" });
PrecioProducto.belongsTo(Producto, { foreignKey: "productoId" });

// Exportar modelos y sequelize ya configurado
module.exports = {
    sequelize,
    Existencia,
    Producto,
    PrecioProducto,
    LineaRemito,
    Remito,
    Cliente,    
    Ciudad,
    LineaPedido,
    Pedido,
    Reparto,
    Vehiculo,
    Empleado,
    LineaDevolucion,
    Devolucion,
    RepartoVehiculo,
    Usuario
};

