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
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      input: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      input1: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      input2: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      input3: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      input4: {
        type: Sequelize.STRING,
        allowNull: true,
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