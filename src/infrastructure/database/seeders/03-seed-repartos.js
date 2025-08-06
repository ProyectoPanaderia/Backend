'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('repartos', [
      { id: 1, tercializado: 'N', nombre: 'Reparto Mañana', estado: 'A', existencia: 0 },
      { id: 2, tercializado: 'N', nombre: 'Reparto Tarde', estado: 'A', existencia: 0 },
      { id: 3, tercializado: 'S', nombre: 'Reparto Tercerizado', estado: 'A', existencia: 0 },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('repartos', null, {});
  }
};