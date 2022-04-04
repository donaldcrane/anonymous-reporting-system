import { Router } from "express";
import ClickController from "../controllers/click";

const router = Router();
const {
  getClicks, getClicksBylinkname, deleteClick, addNewClick
} = ClickController;

router.get("/", getClicks);
router.get("/linkName", getClicksBylinkname);

router.post("/", addNewClick);

router.delete("/", deleteClick);

export default router;
