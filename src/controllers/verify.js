import PostServices from "../services/post";

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
      const { input, input1, input2 } = req.body;
      const newPost = {
        postId: id, input, input1, input2
      };
      await verifyPost(newPost);

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
}
