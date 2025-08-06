module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('existencias', [
      {
        cantidad: 100,
        productoId: 1,
        repartoId: 1,
        lineaRemitoId: 1,
        fechaE: new Date('2025-08-01'),
        fechaV: new Date('2025-08-10')
      },
      {
        cantidad: 80,
        productoId: 2,
        repartoId: 1,
        lineaRemitoId: 1,
        fechaE: new Date('2025-08-01'),
        fechaV: new Date('2025-08-10')
      },
      {
        cantidad: 60,
        productoId: 3,
        repartoId: 2,
        lineaRemitoId: 2,
        fechaE: new Date('2025-08-01'),
        fechaV: new Date('2025-08-10')
      },
      {
        cantidad: 50,
        productoId: 4,
        repartoId: 3,
        lineaRemitoId: 3,
        fechaE: new Date('2025-08-01'),
        fechaV: new Date('2025-08-10')
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('existencias', null, {});
  }
};