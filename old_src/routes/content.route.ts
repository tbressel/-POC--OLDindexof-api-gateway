import express from "express";
import { getContent } from "../controllers/contentController";

const router = express.Router();

router.get('/content/:slug', getContent);

export default router;