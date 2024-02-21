import express from "express";
import { register_user } from "../../controllers/auth.controller.js";
import { signup_middleware } from "../../middlewares/auth.middleware.js";
import { upload } from "../../middlewares/multer.middleware.js";

//intilization
const router = express.Router();

router.post(
  "/v1/register",
  signup_middleware,
  upload.single("avatar"),
  register_user
);

export default router;
