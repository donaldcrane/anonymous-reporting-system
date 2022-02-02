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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    media: {
      type: DataTypes.ARRAY(DataTypes.TEXT)
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    commentCount: {
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
    Post.hasOne(models.Feedbacks, {
      as: "posts",
      foreignKey: "postId",
      onDelete: "cascade",
      hooks: true,
    });
  };
  return Post;
};
