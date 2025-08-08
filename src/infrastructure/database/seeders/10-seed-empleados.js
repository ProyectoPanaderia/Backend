'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('empleados', [
      {
        nombre: 'Carlos López',
        cargo: 'Chofer',
        repartoId: 1
      },
      {
        nombre: 'María Gómez',
        cargo: 'Ayudante',
        repartoId: 2
      },
      {
        nombre: 'Luciano Barrios',
        cargo: 'Encargado de ruta',
        repartoId: 3
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('empleados', null, {});
  }
};
