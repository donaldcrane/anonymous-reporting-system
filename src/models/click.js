const { UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Click = sequelize.define("Clicks",{
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            unique: true,
        },
        linkName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        NoOfClicks: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    });
    return Click;
};

