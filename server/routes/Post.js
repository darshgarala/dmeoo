import express from "express";
import {
  createPost,
  datelePost,
  getPost,
  like,
  timeline,
  updatePost,
  getAllPost,
  createImgStory,
  Comments,
} from "../controller/PostController.js";
const router = express.Router();

router.post("/", createPost);
router.post("/story", createImgStory);
router.put("/:id/comment", Comments);
router.get("/allpost", getAllPost);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.delete("/:id", datelePost);
router.put("/:id/like", like);
router.get("/:id/timeline", timeline);
export default router;
