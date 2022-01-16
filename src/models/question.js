const { UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define("Questions",{  
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      unique: true,
    },
    threatType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    question1: {
      type: DataTypes.STRING,
      allowNull: false,
      },
    question2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    question3: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    question4: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Question.associate = models => {
    Question.hasMany(models.Feedbacks, {
      as: "questions",
      foreignKey: "questionId",
      onDelete: "cascade",
      hooks: true,
    });
  };
  return Question;
};
