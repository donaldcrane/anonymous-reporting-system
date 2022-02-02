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
        type: Sequelize.UUID,
        allowNull: false,
      },
      questionId: {
        type: Sequelize.UUID,
        allowNull: false,
      },  
      threatType: {
        type: Sequelize.STRING,
      },
      answer1: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      answer2: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      answer3: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      answer4: {
        type: Sequelize.TEXT,
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