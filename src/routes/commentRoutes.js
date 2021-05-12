import { Router } from "express";
import CommentController from "../controllers/comment";
import Authentication from "../middlewares/authenticate";

const router = Router();
const { verifyToken } = Authentication;
const {
  addComment, getCommentById, deleteComment,
} = CommentController;

router.get("/comment/:id", getCommentById);

router.post("/comment/:id", addComment);

router.delete("/comment/:id", verifyToken, deleteComment);

export default router;
