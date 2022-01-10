const { UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define("Feedbacks",{  
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      unique: true,
      },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    input: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    input1: {
      type: DataTypes.STRING,
      allowNull: true,
      },
    input2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    input3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    input3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  
  return Feedback;
};
