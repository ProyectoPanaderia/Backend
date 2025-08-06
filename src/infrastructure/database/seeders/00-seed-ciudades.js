'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ciudades', [
      { id: 1, nombre: 'Santa Fe' },
      { id: 2, nombre: 'Rosario' },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ciudades', null, {});
  }
};