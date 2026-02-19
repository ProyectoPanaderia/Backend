const { Empleado, sequelize } = require('../models/models');

async function seedEmpleados() {
  try {
    // 1. Sincronizamos para asegurar que la tabla existe
    await Empleado.sync({ alter: true });
    console.log('✅ Tabla "empleados" verificada/creada.');

    // 2. Insertamos los perfiles
    // IMPORTANTE: usuarioId 1 es el admin, usuarioId 3 es repartidor1
    // repartoId 1 debe existir en tu tabla de repartos
    await Empleado.bulkCreate([
      { 
        nombre: 'Administrador Sistema', 
        usuarioId: 1, 
        repartoId: 1 
      },
      { 
        nombre: 'Juan Repartidor', 
        usuarioId: 3, 
        repartoId: 1 
      }
    ], { updateOnDuplicate: ['nombre', 'repartoId', 'usuarioId'] });

    console.log('✅ Perfiles de Empleados vinculados con éxito.');
    process.exit(0);
  } catch (e) {
    console.error('❌ Error en seed de empleados:', e.message);
    process.exit(1);
  }
}

seedEmpleados();