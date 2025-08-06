'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('clientes', [
      { nombre: 'Panadería Don Pepe', ciudadId: 1 },
      { nombre: 'Almacén San Cayetano', ciudadId: 2 },
      { nombre: 'Despensa Lo de Marta', ciudadId: 1 },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('clientes', null, {});
  }
};