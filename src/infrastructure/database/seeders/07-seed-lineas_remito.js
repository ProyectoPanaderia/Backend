'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('lineas_remito', [
      { id: 1, cantidad: 1 },  
      { id: 2, cantidad: 1 },
      { id: 3, cantidad: 1 },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('lineas_remito', null, {});
  }
};