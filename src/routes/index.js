import { Router } from "express";
import userRoutes from "./userRoutes";
import postRoutes from "./postRoutes";
import commentRoutes from "./commentRoutes";

const router = new Router();

router.use("/", userRoutes);
router.use("/", postRoutes);
router.use("/", commentRoutes);

export default router;
