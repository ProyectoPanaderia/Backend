'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('pedidos', [
      {
        fechaEmision: new Date('2025-08-01'),
        fechaEntrega: new Date('2025-08-02'),
        repartoId: 1
      },
      {
        fechaEmision: new Date('2025-08-03'),
        fechaEntrega: new Date('2025-08-04'),
        repartoId: 2
      },
      {
        fechaEmision: new Date('2025-08-05'),
        fechaEntrega: new Date('2025-08-06'),
        repartoId: 3
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('pedidos', null, {});
  }
};
