import express from "express";
import { tokenAuth } from "../middlewares/token.middleware.js";
import {
  chatCompletion,
  chatCreateImage,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/", tokenAuth, chatCompletion);
router.post("/image", tokenAuth, chatCreateImage);

export default router;
