import { Router } from "express";
import PostController from "../controllers/post";
import Authentication from "../middlewares/authenticate";
import parser from "../middlewares/uploads";

const router = Router();
const { verifyToken } = Authentication;
const {
  addPost, likedPost, getPostById, getPosts, deletePost, verifyPost, getNonVerifiedPosts
} = PostController;

router.get("/posts", getPosts);
router.get("/posts-nonverified", getNonVerifiedPosts);
router.get("/post/:id", getPostById);

router.post("/post", parser.array("media", 9), addPost);

router.patch("/like-post/:id", likedPost);
router.patch("/post/:id", verifyToken, verifyPost);

router.delete("/post/:id", verifyToken, deletePost);

export default router;
