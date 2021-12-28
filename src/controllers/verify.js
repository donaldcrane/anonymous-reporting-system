import dotenv from "dotenv";
import cors from "cors";
import admin from "firebase-admin";
import functions from "firebase-functions";
import { SessionClient } from "dialogflow";
import { response } from "express";
import serviceAccount from "../../crane.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fireship-lessons.firebaseio.com"
});

// exports.dialogflowGateway = functions.https.onRequest((req, res) => {
//   cors(req, res, async () => {
//     const { queryInput, sessionId } = req.body;
//     const sessionClient = new SessionClient({ credentials: serviceAccount });
//     const session = sessionClient.sessionPath("fireship-lessons", sessionId);

//     const responses = await sessionClient.detectIntent({ session, queryInput });
//     const result = responses[0].queryResult;

//     response.send(result);
//   });
// });

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
      const { queryInput, sessionId } = req.body;
      const sessionClient = new SessionClient({ credentials: serviceAccount });
      const session = sessionClient.sessionPath("fireship-lessons", sessionId);

      const responses = await sessionClient.detectIntent({ session, queryInput });
      const result = responses[0].queryResult;

      res.send(result);
    } catch (error) {
      return res.status(404).json({ status: 404, error: "Resource not found.", });
    }
  }
}
