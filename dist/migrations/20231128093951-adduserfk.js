'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn('user', 'address_id', {
      type: Sequelize.UUID,
      references: {
        model: "address",
        key: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });
  


  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('user', 'address_id');

  }
};
