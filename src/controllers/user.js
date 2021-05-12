import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import loginValidation from "../validations/user";
import User from "../services/user";
import jwtHelper from "../utilities/jwt";

dotenv.config();

const { emailExist, getAllUsers, } = User;
const { generateToken } = jwtHelper;

/**
 * @class UserController
 * @description create, verify and log in user
 * @exports UserController
 */
export default class UserController {
  /**
   * @param {object} req - The user request object
   * @param {object} res - The user response object
   * @returns {object} Success message
   */
  static async loginUser(req, res) {
    try {
      const { error } = loginValidation(req.body);
      if (error) return res.status(400).json({ status: 400, error: error.message });
      const { email, password } = req.body;
      const Email = email.toLowerCase();
      const user = await emailExist(Email);
      if (!user) return res.status(404).json({ status: 404, error: "Email does not exist." });
      const validpass = await bcrypt.compare(password, user.password);
      if (!validpass) return res.status(404).json({ status: 400, error: "Password is not correct!." });
      const token = await generateToken({ user });
      return res.status(200).json({
        status: 200,
        message: "User Logged in Successfully.",
        data: token
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
  static async getUsers(req, res) {
    try {
      const users = await getAllUsers();
      return res.status(200).json({ status: 200, message: "Successfully retrieved all Users", data: users });
    } catch (error) {
      return res.status(500).json({ status: 500, error: "Resource not found." });
    }
  }
}
