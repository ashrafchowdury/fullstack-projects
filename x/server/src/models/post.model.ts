import mongoose from "mongoose";

const postModel = new mongoose.Schema({
  post_description: { type: String, required: true },
  post_media: { type: String, required: false },
  user: { type: mongoose.Types.ObjectId, ref: "User", required: false },
  created_at: { type: Date, default: Date.now },
  post_likes: [
    {
      like: { type: Number, default: 0 },
      liker: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    },
  ],
  post_comments: [
    {
      comment: { type: String, required: false },
      commenter: { type: mongoose.Types.ObjectId, ref: "User", required: true },
      commented_at: { type: Date, default: Date.now },
    },
  ],
  bookmarks: { type: Number, default: 0, required: false },
});

const Post = mongoose.model("Posts", postModel);

export default Post;
