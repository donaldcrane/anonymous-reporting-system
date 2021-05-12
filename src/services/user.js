import database from "../models";

/**
 * @class User
 * @description User services
 * @exports User
 */
export default class User {
  /**
   * @returns {object} An instance of the comment class
   */
  static async getAllUsers() {
    try {
      //
      return await database.Users.findAll();
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {string} email  - The user email
   * @returns {object} - An instance of the Users model class
   */
  static async emailExist(email) {
    try {
      return await database.Users.findOne({
        where: {
          email
        }
      });
    } catch (error) {
      throw error;
    }
  }
}
