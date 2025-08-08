module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('repartos', 'tercearizado');
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('repartos', 'tercerizado', {
      type: Sequelize.CHAR(1),
      allowNull: false,
      defaultValue: '0',
    });
  }
};