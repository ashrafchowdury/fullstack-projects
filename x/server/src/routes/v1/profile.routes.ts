import express from "express";
import { authorizationMiddleware } from "../../middlewares/auth.middleware.js";
import {
  followUser,
  bookmark,
  getAllbookmark,
  getAllFollowers,
  getAllFollowings,
} from "../../controllers/profile.controller.js";

//intilization
const router = express.Router();

// middleware
router.use(authorizationMiddleware);


// routes
router.get("/v1/all-bookmarks", getAllbookmark);
router.get("/v1/all-followers", getAllFollowers);
router.get("/v1/all-followings", getAllFollowings);

router.post("/v1/follow", followUser);
router.post("/v1/bookmark", bookmark);

export default router;
