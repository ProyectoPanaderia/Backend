'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('repartos_vehiculos', [
      { repartoId: 1, vehiculoId: 1 },
      { repartoId: 2, vehiculoId: 2 },
      { repartoId: 3, vehiculoId: 3 },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('repartos_vehiculos', null, {});
  }
};