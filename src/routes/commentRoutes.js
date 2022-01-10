import { Router } from "express";
import CommentController from "../controllers/comment";
import Authentication from "../middlewares/authenticate";

const router = Router();
const { verifyToken } = Authentication;
const {
  addComment, getCommentById, deleteComment
} = CommentController;

router.get("/:id", getCommentById);

router.post("/:id", addComment);

router.delete("/:id", verifyToken, deleteComment);

export default router;
