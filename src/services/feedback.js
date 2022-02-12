import database from "../models";

/**
 * @class Feedback
 * @description allows user create and check Feedback details
 * @exports Feedback
 */
export default class FeedbackServices {
  /**
   * @param {string} newPost - The post details
   * @returns {object} An instance of the Posts model class
   */
  static async createFeedback(newPost) {
    try {
      return await database.Feedbacks.create(newPost);
    } catch (err) {
      throw err;
    }
  }

  /**
   * @returns {object} An instance of the Posts model class
   */
  static async getAllFeedbacks() {
    try {
      return await database.Feedbacks.findAll({
        include: [
          { model: database.Questions, as: "questions" },
        ]
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @returns {object} An instance of the Posts model class
   */
  static async getAllQuestions() {
    try {
      return await database.Questions.findAll({
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {string} feedbackId - The Post id
   * @returns {object} An instance of the Posts model class
   */
  static async getFeedback(feedbackId) {
    try {
      return await database.Feedbacks.findOne({
        where: {
          id: feedbackId
        },
        include: [
          { model: database.Questions, as: "questions" },
        ]
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {string} type - The feedback type
   * @returns {object} An instance of the Posts model class
   */
  static async getQuestion(type) {
    try {
      return await database.Questions.findOne({
        where: {
          threatType: type
        }
      });
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {string} type - The feedback type
   * @returns {object} An instance of the Posts model class
   */
  static async getFeedbackByType(type) {
    try {
      return await database.Feedbacks.findAll({
        where: {
          threatType: type
        },
        include: [
          { model: database.Posts, as: "posts" },
        ]
      });
    } catch (err) {
      throw err;
    }
  }
}
