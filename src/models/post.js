const { UUIDV4 } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Posts",{  
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      unique: true,
    },
    post: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    media: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  Post.associate = models => {
    Post.hasMany(models.Comments, {
      as: "comments",
      foreignKey: "postId",
      onDelete: "cascade",
      hooks: true,
    });
  };
  return Post;
};
