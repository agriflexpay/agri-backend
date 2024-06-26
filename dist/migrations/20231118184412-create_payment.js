'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('payment', {
      code: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      amount: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      paymentMode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('payment');
  },
};