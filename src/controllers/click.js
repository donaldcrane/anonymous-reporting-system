import ClickServices from "../services/click";

const {
  getClick, addClick, deleteClick, getAllClicks
} = ClickServices;
/**
 * @class ClickController
 * @description create click, get all clickd, get a click, delete a click
 * @exports PostController
 */
export default class ClickController {
  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async addNewClick(req, res) {
    try {
      const { linkName } = req.body;
      let result = linkName.toLowerCase();
      const newClick = {
        result
      };
      await addClick(newClick);
      return res.status(201).json({ status: 201, message: "Success" });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async getClicks(req, res) {
    try {
      const Clicks = await getAllClicks();
      res.status(200).json({
        status: 200,
        message: "Successfully retrieved all Clicks.",
        data: Clicks,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Server error." });
    }
  }

  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async getClicksBylinkname(req, res) {
    try {
      const { linkName } = req.body;
      const Click = await getClick(linkName.toLowerCase());
      if (!Click) return res.status(404).json({ status: 404, error: "Click not found" });
      return res.status(200).json({
        status: 200,
        message: "Successfully retrieved Post.",
        data: Click,
      });
    } catch (error) {
      return res.status(404).json({
        status: 404,
        error: "Resource not found."
      });
    }
  }

  static async deleteClick(req, res) {
    try {
      const { linkName } = req.body;
      const Click = await getClick(id);
      if (!Click) return res.status(404).json({ status: 404, error: "Click not found." });
      await deleteClick(linkName);
      return res.status(200).json({
        status: 200,
        message: "Successfully Deleted Click.",
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: "Resource not found.",
      });
    }
  }
}
