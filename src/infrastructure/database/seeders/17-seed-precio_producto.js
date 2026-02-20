'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    
    // 1. Buscamos TODOS los IDs que existen REALMENTE
    const productos = await queryInterface.sequelize.query(
      `SELECT id FROM productos;`
    );
    
    const filasProductos = productos[0];

    if (filasProductos.length === 0) {
      console.log("⚠️ No hay productos cargados.");
      return;
    }

    const precios = [];
    const fechaVigencia = '2026-01-01'; 

    for (let i = 0; i < filasProductos.length; i++) {
      const productoIdReal = filasProductos[i].id; 

      precios.push({
        nombre: 'reventa',
        valor: 1500 + (i * 150),
        fecha: fechaVigencia,
        productoId: productoIdReal
        // OJO: Borramos createdAt y updatedAt de acá
      });

      precios.push({
        nombre: 'consumidor final',
        valor: 2000 + (i * 150),
        fecha: fechaVigencia,
        productoId: productoIdReal
        // OJO: Borramos createdAt y updatedAt de acá
      });
    }

    await queryInterface.bulkInsert('precio_producto', precios, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('precio_producto', null, {});
  }
};