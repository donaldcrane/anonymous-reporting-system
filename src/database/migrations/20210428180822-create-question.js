const { UUIDV4 } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Questions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: UUIDV4,
        },
      threatType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      question1: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      question2: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      question3: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      question4: {
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
    await queryInterface.dropTable('Questions');
  }
};