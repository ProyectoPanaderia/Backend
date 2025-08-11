'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('lineas_pedido', [
      {
        productoId: 1,
        cantidad: 5,
        pedidoId: 1
      },
      {
        productoId: 2,
        cantidad: 3,
        pedidoId: 2
      },
      {
        productoId: 3,
        cantidad: 10,
        pedidoId: 3
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('lineas_pedido', null, {});
  }
};
