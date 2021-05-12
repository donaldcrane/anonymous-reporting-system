import database from "../models";

/**
 * @class Comment
 * @description allows user create and check Comment details
 * @exports Comment
 */
export default class CommentServices {
  /**
   * @param {string} newComment - The Comment details
   * @returns {object} An instance of the Comments model class
   */
  static async addComment(newComment) {
    try {
      return await database.Comments.create(newComment);
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {string} id - The Comment id
   * @returns {object} An instance of the Comments model class
   */
  static async getComment(id) {
    try {
      return await database.Comments.findOne({
        where: {
          id
        }
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {string} id - The Comment name
   * @returns {object} An instance of the Comments model class
   */
  static async deleteComment(id) {
    try {
      const Comment = await database.Comments.findOne({ where: { id } });
      return await Comment.destroy({ cascade: true });
    } catch (err) {
      throw err;
    }
  }
}
