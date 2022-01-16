import sequelize from "sequelize";
import database from "../models";

/**
 * @class Post
 * @description allows user create and check Post details
 * @exports Post
 */
export default class PostServices {
  /**
   * @param {string} newPost - The post details
   * @returns {object} An instance of the Posts model class
   */
  static async addPost(newPost) {
    try {
      return await database.Posts.create(newPost);
    } catch (err) {
      throw err;
    }
  }

  /**
   * @returns {object} An instance of the Posts model class
   */
  static async highestLikes() {
    try {
      return await database.Posts.findAll({
        order: [
          ["likes", "DESC"],
        ]
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @returns {object} An instance of the Posts model class
   */
  static async getAllPosts() {
    try {
      return await database.Posts.findAll({
        include: [
          { model: database.Comments, as: "comments" },
        ]
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @returns {object} An instance of the Posts model class
   */
  static async getNonVerifiedPosts() {
    try {
      return await database.Posts.findAll({
        where: { verified: false },
        include: [
          { model: database.Comments, as: "comments" },
        ]
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @returns {object} An instance of the Posts model class
   */
  static async getVerifiedPosts() {
    try {
      return await database.Posts.findAll({
        where: { verified: true },
        include: [
          { model: database.Comments, as: "comments" },
        ]
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {string} id - The Post id
   * @returns {object} An instance of the Posts model class
   */
  static async getPost(id) {
    try {
      return await database.Posts.findOne({
        where: {
          id
        },
        include: [
          { model: database.Comments, as: "comments" },
        ]
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {string} id - The Post name
   * @returns {object} An instance of the Posts model class
   */
  static async deletePost(id) {
    try {
      const Post = await database.Posts.findOne({ where: { id } });
      return await Post.destroy({ cascade: true });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {string} id - The post id
   * @returns {object} - An instance of the Users model class
   */
  static async updatePostVerification(id) {
    try {
      return await database.Posts.update({
        verified: true
      }, {
        where: {
          id
        },
        returning: true,
        plain: true
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param {string} id - The old state name
   * @returns {object} An instance of the Posts model class
   */
  static async likePost(id) {
    try {
      return await database.Posts.increment({
        likes: +1
      }, {
        where: {
          id
        },
        returning: true,
        plain: true
      });
    } catch (err) {
      throw err;
    }
  }
}
