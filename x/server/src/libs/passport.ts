import passport from "passport";
import GitHubStrategy from "passport-github";
import User from "../models/user.model.js";

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
