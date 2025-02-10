import express from "express";
import {createPost, deletePost, getAllPosts, getOnePost, updatePost} from "../controllers/postController.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getAllPosts).post(protect, createPost)
router.route("/:id")
    .get(getOnePost)
    .delete(protect, deletePost)
    .patch(protect, updatePost)

export default router
