import express from "express";
import {
  register_user,
  login,
  logout,
  generateRefreshToken,
} from "../../controllers/auth.controller.js";
import {
  signup_middleware,
  authorization_middleware,
} from "../../middlewares/auth.middleware.js";
import { upload } from "../../middlewares/multer.middleware.js";

//intilization
const router = express.Router();

router.post(
  "/v1/register",
  signup_middleware,
  upload.single("avatar"),
  register_user
);
router.post("/v1/login", login);
router.post("/v1/refresh-token", generateRefreshToken);

// protected routes
router.use(authorization_middleware);
router.get("/v1/logout", logout);


export default router;
