import express from "express";
import {
  authorizationMiddleware,
  signupDataValidator,
  loginDataValidator,
} from "../../middlewares/auth.middleware.js";
import {
  singup,
  getUser,
  login,
  failure,
  success,
} from "../../controllers/auth.controller.js";
import passport from "passport";
import "../../libs/passport.js";

//intilization
const router = express.Router();

// routes
router.post("/v1/signup", signupDataValidator, singup);
router.post("/v1/login", loginDataValidator, login);
router.get("/v1/get-user", authorizationMiddleware, getUser);

// social auth
router.get("/v1/github", passport.authenticate("github"));
router.get(
  "/v1/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api/auth/v1/callback/failure",
    successRedirect: "/api/auth/v1/callback/success",
  })
);

// google
router.get(
  "/v1/google/callback",
  passport.authenticate("google", {
    successRedirect: "/api/auth/v1/callback/success",
    failureRedirect: "/api/auth/v1/callback/failure",
  })
);

router.get("/v1/callback/success", success);
router.get("/v1/callback/failure", failure);

export default router;
