import dotenv from "dotenv";
import cors from "cors";
import admin from "firebase-admin";
import functions from "firebase-functions";
import serviceAccount from "../../crane.json";

import PostServices from "../services/post";

let Copyleaks;
let CopyleaksURLSubmissionModel;

const {
  addPost, getAllPosts, getPost, deletePost, updatePostVerification, likePost, getNonVerifiedPosts
} = PostServices;

export default class VerifyController {
  static async verifyPostAi(req, res) {
    try {
      const { id } = req.params;
      return res.status(200).json({
        status: 200,
        message: "Post is being verified...",
      });
    } catch (error) {
      return res.status(404).json({ status: 404, error: "Resource not found.", });
    }
  }
}
