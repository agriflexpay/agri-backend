'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('permission', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      user_uuid: {
        type: Sequelize.UUID,
        references: {
          model: 'user',
          ref: 'id'
        }
      },
      rights: {
        type: Sequelize.JSONB
      },
      has_bypass_rights: {
        type: Sequelize.BOOLEAN
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('permission');
  }
};