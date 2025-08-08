'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('lineas_devolucion', [
      {
        cantidad: 2,
        existenciaId: 1,
        devolucionId: 1
      },
      {
        cantidad: 1,
        existenciaId: 2,
        devolucionId: 2
      },
      {
        cantidad: 3,
        existenciaId: 3,
        devolucionId: 3
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('lineas_devolucion', null, {});
  }
};
