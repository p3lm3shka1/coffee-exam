import express from "express";
import {
  getAllArticles,
  getArticleById,
} from "../controllers/articleController.js";

const router = express.Router();

router.get("/", getAllArticles);
router.get("/:slug", getArticleById);

export default router;
