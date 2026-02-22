import express from "express";
import multer from "multer";
import { chatHandler } from "../controllers/chat.js";

const router = express.Router();
const upload = multer();

router.post("/", upload.single("file"), chatHandler);

export default router;
