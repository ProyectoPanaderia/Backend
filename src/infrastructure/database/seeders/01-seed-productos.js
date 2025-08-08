'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('productos', [
  { id: 1, nombre: 'Panchos', peso: 500 },
  { id: 2, nombre: 'Viena', peso: 500 },
  { id: 3, nombre: 'Lactal integral', peso: 260 },
  { id: 4, nombre: 'Miga', peso: 250 },
  { id: 5, nombre: 'Lactal chico', peso: 200 },
]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('productos', null, {});
  }
};