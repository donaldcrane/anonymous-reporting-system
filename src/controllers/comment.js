import CommentServices from "../services/comment";
import { validateComment, validateId } from "../validations/comment";

const {
  addComment, getComment, deleteComment
} = CommentServices;

/**
 * @class CommentController
 * @description create Comment, get all Comments, get a Comment, delete a Comment, update a Comment
 * @exports CommentController
 */
export default class CommentController {
  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async addComment(req, res) {
    try {
      const { comment } = req.body;
      const { id } = req.params;
      const { error } = validateComment(req.body);
      if (error) {
        return res.status(400).json({ status: 400, error: error.message });
      }
      const newComment = { comment, postId: id };
      const createdComment = await addComment(newComment);
      return res.status(201).json({ status: 201, message: "A Comment has been added.", data: createdComment, });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server error." });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async getCommentById(req, res) {
    try {
      const { id } = req.params;
      const { error } = validateId({ id });
      if (error) return res.status(400).json({ status: 400, error: error.message });
      const Comment = await getComment(id);
      if (!Comment) return res.status(404).json({ status: 404, error: "Comment not found" });
      return res.status(200).json({
        status: 200,
        message: "Successfully retrieved Comment.",
        data: Comment,
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        error: "Resource not found."
      });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async deleteComment(req, res) {
    try {
      const { id } = req.params;
      const { error } = validateId({ id });
      if (error) return res.status(400).json({ status: 400, error: error.message });
      const Comment = await getComment(id);
      if (!Comment) return res.status(404).json({ status: 404, error: "Comment not found." });
      await deleteComment(id);
      return res.status(200).json({
        status: 200,
        message: "Successfully Deleted Comment.",
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        error: "Resource not found.",
      });
    }
  }
}
