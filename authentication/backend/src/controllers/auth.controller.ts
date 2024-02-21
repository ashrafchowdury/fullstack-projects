import { ApiError, async_handler, ApiResponse } from "../libs/handlers.js";
import { uploadOnCloud } from "../libs/cloudinary.js";
import User from "../models/user.models.js";

export const register_user = async_handler(async (req, res) => {
  const { email, username, password } = req.body;
  const avatarLocalPath = req.files[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar required!");
  }
  const avatar_url = await uploadOnCloud(avatarLocalPath);

  if (!avatar_url) {
    throw new ApiError(400, "Failed to upload Avatar!");
  }
  const create_user = await User.create({
    avatar: avatar_url.url,
    username: username.toLowerCase(),
    email,
    password,
  });
  const { password: new_password, refreshToken, ...rest } = create_user;

  return res.status(201).json({ rest });
});
