'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('clientes', [
      { id:1, nombre: 'Panadería Don Pepe', ciudadId: 1 },
      { id:2, nombre: 'Almacén San Cayetano', ciudadId: 2 },
      { id:3, nombre: 'Despensa Lo de Marta', ciudadId: 1 },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('clientes', null, {});
  }
};