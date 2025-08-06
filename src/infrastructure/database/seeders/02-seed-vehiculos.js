'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('vehiculos', [
      { id:1, matricula: 'ABC123' },
      { id:2, matricula: 'DEF456' },
      { id:3, matricula: 'GHI789' },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('vehiculos', null, {});
  }
};