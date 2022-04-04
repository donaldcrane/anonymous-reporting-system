import { Router } from "express";
import userRoutes from "./userRoutes";
import postRoutes from "./postRoutes";
import commentRoutes from "./commentRoutes";
import feedbackRoutes from "./feedbacksRoutes";
import clickRoutes from "./clickRoutes";

const router = new Router();

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);
router.use("/feedbacks", feedbackRoutes);
router.use("/clicks", clickRoutes);

export default router;
