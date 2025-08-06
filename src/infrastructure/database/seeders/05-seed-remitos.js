'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('remitos', [
      {
        id: 1,
        repartoId: 1,
        clienteId: 1,
        total: 500,
        fecha: new Date('2025-08-06T10:00:00')
      },
      {
        id: 2,
        repartoId: 2,
        clienteId: 2,
        total: 750,
        fecha: new Date('2025-08-06T15:30:00')
      }
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('remitos', null, {});
  }
};
