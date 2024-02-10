import express from "express";
import {
  authorizationMiddleware,
  signupDataValidator,
  loginDataValidator,
} from "../../middlewares/auth.middleware.js";
import { singup, getUser, login } from "../../controllers/auth.controller.js";
import passport from "passport";
import "../../libs/passport.js";

//intilization
const router = express.Router();

// routes
router.post("/v1/signup", signupDataValidator, singup);
router.post("/v1/login", loginDataValidator, login);
router.get("/v1/get-user", authorizationMiddleware, getUser);


// social auth
router.get(
  "/v1/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
router.get(
  "/v1/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api/auth/v1/github/error",
  }),
  function (req, res) {
    res.status(200).json("user login successfully");
  }
);
router.get("/v1/github/error", async (req, res) => {
  res.status(400).end("Failed to login through Github");
});

export default router;
