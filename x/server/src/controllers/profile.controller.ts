import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import { Response, Request } from "express";
import cache from "../libs/cache/redis.js";
import { end } from "../libs/functions/response.js";
import { ObjectId } from "mongodb";

declare global {
  namespace Express {
    interface Request {
      userId?: ObjectId; // adjust this according to your User model
    }
  }
}

export const interestedIn = async (req: Request, res: Response) => {
  const { topics } = req.body;
  const userId = req.userId;
  try {
    if (topics.length == 0) {
      end(res, 400, `Choose minimum 1 topic to go futher`);
    }

    const createTopic = await User.findByIdAndUpdate(userId, {
      topic: topics,
    });

    res.status(201).json(createTopic);
  } catch (error) {
    end(res, 500, `Something went wrong interestedIn: ${error.message}`);
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const { description, porfile_image, banner } = req.body;
  const userId = req.userId;
  try {
    if (!description && !porfile_image && !banner) {
      end(res, 400, `Update something to update the profile`);
    }

    let updateFields = {};

    // Construct the update object dynamically
    for (const field in req.body) {
      if (req.body[field]) {
        updateFields[field] = req.body[field];
      }
    }

    const updatedProfile = await User.findByIdAndUpdate(userId, updateFields);

    res.status(201).json(updatedProfile);
  } catch (error) {
    end(
      res,
      500,
      `Something went wrong can't update profile: ${error.message}`
    );
  }
};

export const followUser = async (req: Request, res: Response) => {
  const { followerId } = req.body;
  const { _id } = req.userId;
  try {
    if (!followerId) {
      end(res, 400, `Update something to update the profile`);
    }

    const followUser = await User.findById({ _id: followerId });
    const followingUser = await User.findById({ _id });

    const isExistFollowerUser = followUser.followers.findIndex(
      (item) => item.follower.toString() === _id.toString()
    );
    const isExistFollowingUser = followingUser.followings.findIndex(
      (item) => item.following.toString() === _id.toString()
    );

    if (isExistFollowerUser === -1 && isExistFollowingUser === -1) {
      followUser.followers.push({ follower: _id });
      followingUser.followings.push({ following: followerId });
    } else {
      followUser.followers.splice(isExistFollowerUser, 1);
      followingUser.followings.splice(isExistFollowingUser, 1);
    }

    // save data
    followUser.save();
    followingUser.save();

    res.status(201).json({ follower: followUser, following: followingUser });
  } catch (error) {
    end(res, 500, `Something went wrong on following: ${error.message}`);
  }
};

export const bookmark = async (req: Request, res: Response) => {
  const { postId } = req.body;
  const { _id } = req.userId;
  try {
    if (!postId) {
      end(res, 400, `Choose minimum 1 topic to go futher`);
    }

    const getPostData = await Post.findById(postId);

    if (getPostData === null) {
      end(res, 400, `Faile to bookmark the post`);
    }

    const userData = await User.findById({ _id });

    const isBookmarkExist = userData.bookmarks.findIndex(
      (item) => item.bookmark.toString() === postId.toString()
    );

    if (isBookmarkExist === -1) {
      userData.bookmarks.push({ bookmark: postId });
      getPostData.bookmarks += 1;
    } else {
      userData.bookmarks.splice(isBookmarkExist, 1);
      getPostData.bookmarks -= 1;
    }

    getPostData.save();
    userData.save();

    res.status(201).json(userData);
  } catch (error) {
    end(res, 500, `Something went wrong interestedIn: ${error.message}`);
  }
};

export const getAllbookmark = async (req: Request, res: Response) => {
  const { _id } = req.userId;
  try {
    const getPostData = await User.findById(_id)
      .select("bookmarks")
      .populate("bookmarks.bookmark");

    res.status(200).json(getPostData);
  } catch (error) {
    end(res, 500, `Something went wrong interestedIn: ${error.message}`);
  }
};

export const getAllFollowers = async (req: Request, res: Response) => {
  const { _id } = req.userId;
  try {
    const getPostData = await User.findById(_id).select("followsers").populate({
      path: "followers.follower",
      select: "email username _id",
    });

    res.status(200).json(getPostData);
  } catch (error) {
    end(res, 500, `Something went wrong interestedIn: ${error.message}`);
  }
};

export const getAllFollowings = async (req: Request, res: Response) => {
  const { _id } = req.userId;
  try {
    const getPostData = await User.findById(_id).select("followings").populate({
      path: "followings.following",
      select: "email username _id",
    });

    res.status(200).json(getPostData);
  } catch (error) {
    end(res, 500, `Something went wrong interestedIn: ${error.message}`);
  }
};