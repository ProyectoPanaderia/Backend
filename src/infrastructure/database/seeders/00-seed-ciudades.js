'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ciudades', [
      { id: 1, nombre: 'Basavilbaso' },
      { id: 2, nombre: 'Concepción del Uruguay' }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ciudades', null, {});
  }
};