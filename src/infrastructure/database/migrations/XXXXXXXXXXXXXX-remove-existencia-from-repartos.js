'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('repartos', 'existencia');
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('repartos', 'existencia', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
  }
};
