import { Router } from "express";
import PostController from "../controllers/post";
import VerifyController from "../controllers/verify";
import Authentication from "../middlewares/authenticate";
import parser from "../middlewares/uploads";

const router = Router();
const { verifyToken } = Authentication;
const {
  addPost, likedPost, getPostById, getPosts, deletePost, verifyPost, getNonVerifiedPosts
} = PostController;
const { verifyPostAi } = VerifyController;

router.get("/", getPosts);
router.get("/nonverified", getNonVerifiedPosts);
router.get("/:id", getPostById);

router.post("/", parser.array("media", 3), addPost);

router.patch("/like-post/:id", likedPost);
router.patch("/:id", verifyToken, verifyPost);
router.patch("/verify/:id", verifyPostAi);

router.delete("/post/:id", verifyToken, deletePost);

export default router;
