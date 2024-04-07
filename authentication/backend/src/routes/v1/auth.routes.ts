import express from "express";
import {
  register_user,
  login,
  logout,
  generateRefreshToken,
  uploadFile,
} from "../../controllers/auth.controller.js";
import {
  signup_middleware,
  authorization_middleware,
} from "../../middlewares/auth.middleware.js";
import { upload } from "../../middlewares/multer.middleware.js";

//intilization
const router = express.Router();

router.post("/v1/register", signup_middleware, register_user);
router.post("/v1/upload-file", upload.single("file"), uploadFile);
router.post("/v1/login", login);
router.post("/v1/refresh-token", generateRefreshToken);

// protected routes
router.get("/v1/logout", authorization_middleware, logout);

export default router;
