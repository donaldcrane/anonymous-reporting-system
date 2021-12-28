const { UUIDV4 } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Feedbacks', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: UUIDV4,
        },
      postId: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: UUIDV4,
      },
      input: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      input1: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      input2: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Feedbacks');
  }
};