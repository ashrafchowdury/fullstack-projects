import Post from "../models/post.model.js";
import { Response, Request } from "express";
import cache from "../libs/cache/redis.js";
import { end } from "../libs/functions/response.js";

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    // const getCachePosts = await cache.call("JSON.SET", "all-posts");

    // const convertJsonIntoObject = JSON.parse(getCachePosts as string);

    // if (!convertJsonIntoObject) {
    //   return res.status(200).json(convertJsonIntoObject);
    // }

    const allPosts = await Post.find();

    // await cache
    //   .multi()
    //   .call("JSON.SET", "all-posts", "$", JSON.stringify(allPosts))
    //   .call("EXPIRE", "app-posts", 900)
    //   .exists();

    res.status(200).json({ posts: allPosts });
  } catch (error) {
    res.status(500).end("Encounter an error while getting all the posts");
  }
};

// Get Specific Posts

export const getSpecificUsersPosts = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    if (!userId) {
      throw new Error("Invalid user id: Can't get users post");
      return;
    }
    const getPosts = await Post.find({ userId });

    res.status(200).json(getPosts);
  } catch (error) {
    res.status(500).end("Encounter an error while getting all the posts");
  }
};

// Post Create & Delete

export const createNewPost = async (req: Request, res: Response) => {
  const { post_description } = req.body;
  const { _id } = req.userId;

  try {
    if (!post_description) {
      end(res, 400, "Invalid request: unable to create new post.");
    }

    const createNewPost = await Post.create({
      post_description,
      user: _id,
    });

    res.status(201).json(createNewPost);
  } catch (error) {
    end(res, 500, `Invalid request to create new post: ${error.message}`);
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const { postId } = req.body;

  try {
    if (!postId) {
      end(res, 400, "Invalid post id: Can't delete the post");
    }

    const post = await Post.findByIdAndDelete({ _id: postId });

    if (post === null) {
      end(res, 400, "Invalid post id: Can't delete the post");
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).end(`Delete Post: ${error.message}`);
  }
};

// Posts interactions

export const likeOnPost = async (req: Request, res: Response) => {
  const { postId } = req.body;
  const { _id } = req.userId;

  try {
    if (!postId) {
      end(res, 400, "Invalid post id: Can't delete the post");
    }
    const findPost = await Post.findById({ _id: postId });

    if (findPost === null) {
      end(res, 400, "Invalid post id: Can't delete the post");
    }

    const userLike = findPost.post_likes.findIndex(
      (like) => like.liker.toString() === _id.toString()
    );

    if (userLike === -1) {
      findPost.post_likes.push({ like: 1, liker: _id });
    } else {
      findPost.post_likes.splice(userLike, 1);
    }

    findPost.save();

    res.status(200).json(findPost);
  } catch (error) {
    res.status(500).end(`Delete Post: ${error.message}`);
  }
};

export const commentOnPost = async (req: Request, res: Response) => {
  const { postId, comment } = req.body;
  const { _id } = req.userId;

  try {
    if (!postId) {
      end(res, 400, "Invalid post id: Can't delete the post");
    }
    const findPost = await Post.findById({ _id: postId });
    if (findPost === null) {
      end(res, 400, "Invalid post id: Can't delete the post");
    }

    findPost.post_comments.push({ comment, commenter: _id });

    findPost.save();

    res.status(200).json(findPost);
  } catch (error) {
    res.status(500).end(`Delete Post: ${error.message}`);
  }
};

export const deleteCommentFromPost = async (req: Request, res: Response) => {
  const { postId, commentId } = req.body;
  const { _id } = req.userId;

  try {
    if (!postId || !commentId) {
      end(res, 400, "Invalid post id: Can't delete the post");
    }
    const findPost = await Post.findById({ _id: postId });

    if (findPost === null) {
      end(res, 400, "Invalid comment id: Can't delete the comment");
    }

    const findCommentPosition = findPost.post_comments.findIndex(
      (item) => item._id.toString() == commentId.toString()
    );

    if (findCommentPosition === -1) {
      end(res, 400, "Invalid comment id: this comment does not exist");
    }
    
    findPost.post_comments.splice(findCommentPosition, 1);

    findPost.save();

    res.status(200).json(findPost);
  } catch (error) {
    res.status(500).end(`Delete Post: ${error.message}`);
  }
};
