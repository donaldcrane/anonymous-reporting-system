/* eslint-disable no-inner-declarations */
/* eslint-disable no-shadow */
import diff from "dialogflow-fulfillment";
import PostServices from "../services/post";

// const { Copyleaks } = require("plagiarism-checker");
let Copyleaks;

// let CopyleaksURLSubmissionModel;

// const copyleaks = Copyleaks;
const { verifyPost, getAllFeedbacks } = PostServices;
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
      const Posts = await getAllFeedbacks();
      res.status(200).json({
        status: 200,
        message: "Successfully retrieved all Feedbacks.",
        data: Posts,
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
  static async webhook(req, res) {
    try {
      const agent = new diff.WebhookClient({
        request: req,
        response: res
      });
      let newPost = {};
      function rapeConfirmation(agent) {
        let answer = agent.context.get("awaiting_type").parameters.awaiting_type;
        let { answer1 } = agent.context.get("awaiting_type").parameters;
        let { answer2 } = agent.context.get("awaiting_type").parameters;
        let { answer3 } = agent.context.get("awaiting_type").parameters;
        let { answer4 } = agent.context.get("awaiting_type").parameters;

        newPost = {
          type: answer, input: answer1, input1: answer1, input2: answer2, input3: answer3, input4: answer4
        };
      }

      function robberyConfirmation(agent) {
        let answer = agent.context.get("awaiting_type").parameters.awaiting_type;
        let { robbery1 } = agent.context.get("awaiting_type").parameters;
        let { robbery2 } = agent.context.get("awaiting_type").parameters;
        newPost = {
          type: answer, input: robbery1, input1: robbery2,
        };
      }

      await verifyPost(newPost);
      let intentMap = new Map();

      intentMap.set("rapeConfirmation", finalConfirmation);
      intentMap.set("robberyConfirmation", rapeConfirmation);
      // intentMap.set("rape", rape);
      // intentMap.set("robbery", robbery);

      agent.handleRequest(intentMap);
      agent.add("Thank you!");
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: 500, error: error.message });
    }
  }
}
