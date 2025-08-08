'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('repartos_empleados', [
      {
        empleadoId: 1,
        repartoId: 1
      },
      {
        empleadoId: 2,
        repartoId: 2
      },
      {
        empleadoId: 3,
        repartoId: 3
      },
      // Un mismo empleado en varios repartos
      {
        empleadoId: 1,
        repartoId: 2
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('repartos_empleados', null, {});
  }
};
