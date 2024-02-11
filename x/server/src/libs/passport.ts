import passport from "passport";
import GitHubStrategy from "passport-github";
import GoogleStrategy from "passport-google-oauth2";
import User from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/v1/github/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      const isUserExist = await User.findOne({
        providerId: profile.id,
        email: profile.emails,
      });

      if (!isUserExist) {
        await User.create({
          username: profile.username,
          email: profile.emails,
          profile_image: profile.photos,
          providerId: profile.id,
          provider: "github",
        });
        return cb(null, profile);
      } else {
        return cb(null, profile);
      }
    }
  )
);

passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/v1/google/callback",
      passReqToCallback: true,
      scope: ["profile"],
    },
    async (request, accessToken, refreshToken, profile, cb) => {
      const isUserExist = await User.findOne({
        providerId: profile.id,
        email: profile.emails,
      });

      if (!isUserExist) {
        await User.create({
          username: profile.displayName,
          email: profile.emails,
          profile_image: profile.picture,
          providerId: profile.id,
          provider: "google",
        });
        return cb(null, profile);
      } else {
        return cb(null, profile);
      }
    }
  )
);
