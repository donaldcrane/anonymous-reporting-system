import dotenv from "dotenv";
import PostServices from "../services/post";

let Copyleaks;
let CopyleaksURLSubmissionModel;

const {
  addPost, getAllPosts, getPost, deletePost, updatePostVerification, likePost, getNonVerifiedPosts
} = PostServices;
dotenv.config();

const EMAIL = process.env.copyleakEmail; // change this with your own copyleaks email.
const KEY = process.env.copyApiKey;
// const copyleaks = new Copyleaks();

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
      const { error } = validateId({ id });
      if (error) return res.status(400).json({ status: 400, error: error.message });
      const Post = await PostServices.getPost(id);
      if (!Post) return res.status(404).json({ status: 404, error: "Post not found." });

      let submission = new CopyleaksURLSubmissionModel(
        Post.media,
        {
          sandbox: true,
          webhooks: { status: `${WEBHOOK_URL}/submit-url-webhook/{STATUS}` }
        }
      );

      copyleaks.submitFileAsync("education", loginResult, Date.now() + 1, submission);
      copyleaks.submitFileAsync("businesses", loginResult, Date.now() + 2, submission);
      return res.status(200).json({
        status: 200,
        message: "Post is being verified...",
      });
    } catch (error) {
      return res.status(404).json({ status: 404, error: "Resource not found.", });
    }
  }
}
