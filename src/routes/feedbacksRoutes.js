import { Router } from "express";
import VerifyController from "../controllers/verify";
import Authentication from "../middlewares/authenticate";

const router = Router();
const { verifyToken } = Authentication;
const {
  getFeedbacks, getUserInteractions,
  saveAnswer, getQuestions, createFeedback, getFeedbackById, getQuestionsss
} = VerifyController;

router.get("/interactions", getUserInteractions);
router.get("/questions", getQuestionsss);
router.get("/", verifyToken, getFeedbacks);
router.get("/:feedbackId", verifyToken, getFeedbackById);
router.get("/questions/:feedbackId", getQuestions);

router.post("/:postId", createFeedback);

router.patch("/answers/:feedbackId", saveAnswer);

export default router;
