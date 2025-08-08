'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('devoluciones', [
      {
        fecha: new Date('2025-08-01'),
        razon: 'Falta de cliente en domicilio',
        repartoId: 1
      },
      {
        fecha: new Date('2025-08-02'),
        razon: 'Producto dañado',
        repartoId: 2
      },
      {
        fecha: new Date('2025-08-03'),
        razon: 'Pedido cancelado',
        repartoId: 3
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('devoluciones', null, {});
  }
};