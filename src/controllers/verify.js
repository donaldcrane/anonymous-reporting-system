import database from "../models";
import PostServices from "../services/post";
import FeedbackServices from "../services/feedback";
import { validation, validateId } from "../validations/post";

// const { Copyleaks } = require("plagiarism-checker");
let Copyleaks;

// let CopyleaksURLSubmissionModel;

// const copyleaks = Copyleaks;
const { getPost } = PostServices;

const {
  createFeedback, getAllFeedbacks, getFeedback, getQuestion
} = FeedbackServices;
/**
 * @class VerifyController
 * @description verify
 * @exports PostController
 */
export default class VerifyController {
  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async verifyPostAi(req, res) {
    try {
      const { id } = req.params;
      let Post;
      let submission = (
        Post,
        {
          sandbox: true,
          webhooks: { status: "/submit-url-webhook/{STATUS}" }
        }
      );
      let loginResult;
      // await copyleaks("education", loginResult, Date.now() + 1, submission);
      // copyleaks.submitFileAsync("businesses", loginResult, Date.now() + 2, submission);

      res.status(200).json({
        status: 200,
        message: "Posts is being verified."
      });
    } catch (error) {
      return res.status(404).json({ status: 500, error: error.message, });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async getFeedbacks(req, res) {
    try {
      const feedbacks = await getAllFeedbacks();
      res.status(200).json({
        status: 200,
        message: "Successfully retrieved all Feedbacks.",
        data: feedbacks,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async createFeedback(req, res) {
    try {
      const { postId } = req.params;
      let type = "";
      const post = await await getPost(postId);
      console.log("post", post);
      const { description } = post;
      if (description.includes("rape") || description.includes("raping") || description.includes("force") || description.includes("raped") || description.includes("sex")) {
        type = "rape";
      }
      if (description.includes("robbery") || description.includes("stealing") || description.includes("theft") || description.includes("heist") || description.includes("rob") || description.includes("robing")) {
        type = "robbery";
      }
      if (description.includes("corruption") || description.includes("fraud") || description.includes("corrupt") || description.includes("looting") || description.includes("embezzlement")) {
        type = "corruption";
      }
      if (!type) {
        type = "others";
      }
      const question = await getQuestion(type);
      const { id } = question;
      const newPost = {
        postId, threatType: type, questionId: id
      };

      const feedback = await createFeedback(newPost);
      res.status(200).json({
        status: 200,
        message: "Successfully creted Feedback.",
        feedback
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async getQuestions(req, res) {
    try {
      const { feedbackId } = req.params;
      const { number } = req.query;
      const { error } = validateId({ id: feedbackId });
      if (error) return res.status(400).json({ status: 400, error: error.message });
      const feedback = await getFeedback(feedbackId);
      if (!feedback) return res.status(404).json({ status: 404, error: "feedback not found." });
      const { threatType } = feedback;
      const question = await getQuestion(threatType);
      let result = "";
      switch (number) {
        case "1":
          result = question.question1;
          break;
        case "2":
          result = question.question2;
          break;
        case "3":
          result = question.question3;
          break;
        case "4":
          result = question.question4;
          break;
        default:
          result = "only 4 questions are asked";
          break;
      }
      return res.status(200).json({
        status: 200,
        message: "Successfully retrieved questions",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message, });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async saveAnswer(req, res) {
    try {
      const { feedbackId } = req.params;
      const { answer } = req.body;
      const { number } = req.query;
      const { error } = validateId({ id: feedbackId });
      if (error) return res.status(400).json({ status: 400, error: error.message });
      const feedback = await getFeedback(feedbackId);
      if (!feedback) return res.status(404).json({ status: 404, error: "feedback not found." });
      let result = "";
      switch (number) {
        case "1":
          result = await database.Feedbacks.update({ answer1: answer },
            { where: { id: feedbackId }, returning: true, plain: true });
          break;
        case "2":
          result = await database.Feedbacks.update({ answer2: answer },
            { where: { id: feedbackId }, returning: true, plain: true });
          break;
        case "3":
          result = await database.Feedbacks.update({ answer3: answer },
            { where: { id: feedbackId }, returning: true, plain: true });
          break;
        case "4":
          result = await database.Feedbacks.update({ answer4: answer },
            { where: { id: feedbackId }, returning: true, plain: true });
          break;
        default:
          result = "only 4 answers are allowed";
          break;
      }
      return res.status(200).json({
        status: 200,
        message: "Successfully saved answers",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message, });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async getUserInteractions(req, res) {
    try {
      const rape = await database.Feedbacks.count(
        { where: { verified: true, threatType: "rape" }, }
      );
      const robbery = await database.Feedbacks.count(
        { where: { verified: true, threatType: "robbery" }, }
      );
      const corruption = await database.Feedbacks.count(
        { where: { verified: true, threatType: "corruption" }, }
      );
      return res.status(200).json({
        status: 200,
        message: "Successfully retrieved interactions.",
        data: {
          rape,
          robbery,
          corruption
        }
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message, });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async getFeedbackById(req, res) {
    try {
      const { feedbackId } = req.params;
      const { error } = validateId({ id: feedbackId });
      if (error) return res.status(400).json({ status: 400, error: error.message });
      const feedback = await getFeedback(feedbackId);
      if (!feedback) return res.status(404).json({ status: 404, error: "Feedback not found" });
      return res.status(200).json({
        status: 200,
        message: "Successfully retrieved Feedback.",
        data: feedback,
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        error: "Resource not found."
      });
    }
  }
}
