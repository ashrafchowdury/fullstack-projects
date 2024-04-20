import express from "express";
import {
  signup,
  login,
  logout,
  generateRefreshToken,
} from "../../controllers/auth.controller.js";

// middlewares
import {
  signup_middleware,
  authorization_middleware,
} from "../../middlewares/auth.middleware.js";
import { maxTry } from "../../middlewares/ratelimit.middleware.js";

//intilization
const router = express.Router();

router.post("/v1/signup", signup_middleware, signup);
router.post("/v1/login", login);
router.post("/v1/refresh-token", generateRefreshToken);

// protected routes
router.get("/v1/logout", authorization_middleware, logout);

export default router;
