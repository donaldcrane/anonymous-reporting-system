import { Router } from "express";
import UserController from "../controllers/user";
import Authentication from "../middlewares/authenticate";

const router = Router();
const { verifyToken } = Authentication;
const { loginUser, getUsers } = UserController;

router.post("/users/signin", loginUser);

router.get("/users", verifyToken, getUsers);

export default router;
