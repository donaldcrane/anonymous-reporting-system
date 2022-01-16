const { UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define("Feedbacks",{  
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      unique: true,
    },
    postId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    threatType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    questionId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    answer1: {
      type: DataTypes.STRING,
      },
    answer2: {
      type: DataTypes.STRING,
    },
    answer3: {
      type: DataTypes.STRING,
    },
    answer4: {
      type: DataTypes.STRING,
    },
  });
  Feedback.associate = models => {
  Feedback.belongsTo(models.Questions, {
      as: "questions",
      foreignKey: "questionId",
    });
  };
  return Feedback;
};
