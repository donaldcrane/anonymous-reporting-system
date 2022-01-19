import { Router } from "express";
import VerifyController from "../controllers/verify";
import Authentication from "../middlewares/authenticate";

const router = Router();
const { verifyToken } = Authentication;
const {
  getFeedbacks, getUserInteractions,
  saveAnswer, getQuestions, createFeedback, getFeedbackById
} = VerifyController;

router.get("/interactions", getUserInteractions);
router.get("/", getFeedbacks);
router.get("/:feedbackId", getFeedbackById);
router.get("/questions/:feedbackId", getQuestions);

router.post("/:postId", createFeedback);

router.patch("/answers/:feedbackId", saveAnswer);

export default router;
