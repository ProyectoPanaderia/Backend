'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('repartos', [
      { id: 1, tercearizado: 'N', nombre: 'Reparto Mañana', estado: 'A', existencia: 0 },
      { id: 2, tercearizado: 'N', nombre: 'Reparto Tarde', estado: 'A', existencia: 0 },
      { id: 3, tercearizado: 'S', nombre: 'Reparto Tercerizado', estado: 'A', existencia: 0 },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('repartos', null, {});
  }
};