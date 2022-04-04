import database from "../models";

/**
 * @class Click
 * @description manages the number of clicks a post has
 * @exports Click
 */
export default class ClickServices {
  /**
   * @param {string} newClick - The click details
   * @returns {object} An instance of the click model class
   */
  static async addClick(newClick) {
    try {
      const clickExists = await database.Clicks.findOne({
        where: {
          linkName: newClick.linkName
        }
      });
      if (clickExists) {
        return await database.Clicks.increment({
          NoOfClicks: +1
        }, {
          where: {
            linkName: newClick.linkName
          },
          returning: true,
          plain: true
        });
      }
      return await database.Clicks.create(newClick);
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {string} linkName - The Click link name
   * @returns {object} An instance of the Clicks model class
   */
  static async getClick(linkName) {
    try {
      return await database.Comments.findOne({
        where: {
          linkName
        }
      });
    } catch (err) {
      throw err;
    }
  }

  static async getAllClicks() {
    try {
      return await database.Clicks.findAll();
    } catch (err) {
      throw err;
    }
  }

  /**
   * @param {string} linkName - The link name
   * @returns {object} An instance of the Clicks model class
   */
  static async deleteClick(linkName) {
    try {
      const Click = await database.Clicks.findOne({ where: { linkName } });
      return await Click.destroy({ cascade: true });
    } catch (err) {
      throw err;
    }
  }
}
