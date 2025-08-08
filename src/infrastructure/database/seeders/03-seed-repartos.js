'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('repartos', [
      { id: 1, tercerizado: '0', nombre: 'Reparto Basavilbaso', estado: '1'},
      { id: 2, tercerizado: '0', nombre: 'Reparto Concepción', estado: '1'},
      { id: 3, tercerizado: '1', nombre: 'Reparto Baus', estado: '1'},
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('repartos', null, {});
  }
};