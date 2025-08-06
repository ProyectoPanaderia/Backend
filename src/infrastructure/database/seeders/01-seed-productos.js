'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('productos', [
  { id: 1, nombre: 'Pan flauta', peso: 500 },
  { id: 2, nombre: 'Pan francés', peso: 400 },
  { id: 3, nombre: 'Criollitos', peso: 300 },
  { id: 4, nombre: 'Chipá', peso: 250 },
  { id: 5, nombre: 'Medialunas', peso: 200 },
]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('productos', null, {});
  }
};