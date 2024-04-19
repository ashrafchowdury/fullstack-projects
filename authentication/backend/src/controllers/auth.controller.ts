import { ApiError, async_handler } from "../libs/handlers.js";
import { COOKIE_OPTIONS } from "../libs/constants.js";
import User from "../models/user.models.js";
import jwt from "jsonwebtoken";

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

export const signup = async_handler(async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const user = await User.create({
      username: username.toLowerCase(),
      email,
      password,
    });

    // generate tokens
    const { refreshToken, accessToken } =
      await generateAccessAndRefreshToken(user);

    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });

    const {
      password: loginPassowrd,
      refreshToken: ignoreToken,
      ...rest
    } = user;

    res
      .status(201)
      .cookie("accessToken", accessToken, COOKIE_OPTIONS)
      .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
      .json(rest);
  } catch (error) {
    res.status(500).end("encounter error while trying to register user");
  }
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

  res
    .status(200)
    .cookie("accessToken", accessToken, COOKIE_OPTIONS)
    .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
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

  res
    .status(200)
    .clearCookie("accessToken", COOKIE_OPTIONS)
    .clearCookie("refreshToken", COOKIE_OPTIONS)
    .json({ message: "user has been logged out successfully" });
});

export const generateRefreshToken = async_handler(async (req, res) => {
  try {
    const incommingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;

    if (!incommingRefreshToken) {
      throw new ApiError(401, "Invalid user with invalid refresh token");
    }

    const decodedUserId: any = jwt.verify(
      incommingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedUserId?._id);

    if (!user) {
      throw new ApiError(400, "Invalid user creadentials");
    }

    const { accessToken, refreshToken } =
      await generateAccessAndRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res
      .status(200)
      .cookie("accessToken", accessToken, COOKIE_OPTIONS)
      .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
      .json({ accessToken, refreshToken });
  } catch (error) {
    throw new ApiError(
      400,
      "Something went wrong while triyng to generate refresh token"
    );
  }
});
