import { ApiError, async_handler } from "../libs/handlers.js";
import { uploadOnCloud } from "../libs/cloudinary.js";
import User from "../models/user.models.js";

const generateAccessAndRefreshToken = async (user: any) => {
  try {
    const refreshToken = await user.generateRefreshToken();
    const accessToken = await user.generateAccessToken();

    return { refreshToken, accessToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something goes wrong while triyng to generate token"
    );
  }
};

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

export const login = async_handler(async (req, res) => {
  const { email, username, password } = req.body;

  if ((!email && !username) || !password) {
    throw new ApiError(400, "Invalid user info: Please fill all the fileds");
  }

  const user: any = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(400, "Invalid user creadintials");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid password!");
  }

  // generate tokens
  const { refreshToken, accessToken } =
    await generateAccessAndRefreshToken(user);

  user.refreshToken = refreshToken;
  user.save({ validateBeforeSave: false });

  const { password: loginPassowrd, refreshToken: ignoreToken, ...rest } = user;

  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(rest);
});

export const logout = async_handler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.userId,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    { new: true }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ message: "user has been logged out successfully" });
});
