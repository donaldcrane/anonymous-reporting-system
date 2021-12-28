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
      defaultValue: UUIDV4,
    },
    input: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    input1: {
      type: DataTypes.STRING,
      allowNull: false,
      },
    input2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  
  return Feedback;
};
