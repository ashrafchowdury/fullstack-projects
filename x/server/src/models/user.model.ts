import mongoose from "mongoose";

const userModel = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: false },
  description: { type: String, required: false },
  profile_image: { type: String, required: false },
  banner: { type: String, required: false },
  provider: { type: String, required: false, default: "local" },
  providerId: { type: String, required: false },
  followers: [
    {
      follower: { type: mongoose.Types.ObjectId, ref: "User" },
    },
  ],
  followings: [
    {
      following: { type: mongoose.Types.ObjectId, ref: "User" },
    },
  ],
  bookmarks: [
    {
      bookmark: { type: mongoose.Types.ObjectId, ref: "Posts" },
    },
  ],
});

const User = mongoose.model("User", userModel);

export default User;
