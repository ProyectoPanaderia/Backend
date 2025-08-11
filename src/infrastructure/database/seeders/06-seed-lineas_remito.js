
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('lineas_remito', [
      { id: 1, cantidad: 10, subtotal: 250, remitoId: 1 },
      { id: 2, cantidad: 20, subtotal: 250, remitoId: 1 },
      { id: 3, cantidad: 15, subtotal: 750, remitoId: 2 },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('lineas_remito', null, {});
  }
};