'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('vehiculos', [
      { matricula: 'ABC123' },
      { matricula: 'DEF456' },
      { matricula: 'GHI789' },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('vehiculos', null, {});
  }
};