import express from "express";
import { authorizationMiddleware } from "../../middlewares/auth.middleware.js";
import {
  createNewPost,
  deletePost,
  getAllPosts,
  likeOnPost,
  commentOnPost,
  deleteCommentFromPost,
} from "../../controllers/post.controller.js";

//intilization
const router = express.Router();

// middleware
router.use(authorizationMiddleware);

// routes
router.get("/v1/all-posts", getAllPosts);

router.post("/v1/new-post", createNewPost);
router.post("/v1/delete-post", deletePost);

router.post("/v1/like-post", likeOnPost);
router.post("/v1/comment-post", commentOnPost);
router.post("/v1/delete-post-comment", deleteCommentFromPost);

export default router;
