// src/infrastructure/database/seeders/15-seed-usuarios.js
const { Usuario, sequelize } = require('../models/models'); // Importamos también sequelize
const bcrypt = require('bcrypt');

async function seedUsuarios() {
  try {
    // 1. Sincronizamos el modelo (crea la tabla si no existe)
    // Usamos { alter: true } para que respete la estructura actual
    await Usuario.sync({ alter: true });
    console.log('✅ Tabla "usuarios" verificada/creada.');

    const hashed = await bcrypt.hash('123456', 10);
    
    // 2. Insertamos los datos
    await Usuario.bulkCreate([
      { id: 1, username: 'admin', password: hashed, rol: 'ADMINISTRADOR' },
      { id: 3, username: 'repartidor1', password: hashed, rol: 'REPARTIDOR' }
    ], { ignoreDuplicates: true }); // Evita errores si justo se creó alguno

    console.log('✅ Usuarios cargados correctamente.');
    process.exit(0);
  } catch (e) {
    console.error('❌ Error en seed de usuarios:', e.message);
    process.exit(1);
  }
}
seedUsuarios();