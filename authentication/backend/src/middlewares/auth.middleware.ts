import User from "../models/user.models.js";
import validator from "validator";
import { ApiError, async_handler } from "../libs/handlers.js";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

declare global {
  namespace Express {
    interface Request {
      userId?: ObjectId; // adjust this according to your User model
    }
  }
}

export const authorization_middleware = async_handler(
  async (req, res, next) => {
    try {
      const token =
        req.cookies?.accessToken ||
        req.headers.authorization?.replace("Bearer ", "");

      if (!token) {
        throw new ApiError(401, "Authorization required");
      }

      const decodedToken: any = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
      ); // verifyng the token

      const user = await User.findById(decodedToken._id).select("_id");

      if (!user) {
        throw new ApiError(401, "Invalid access token");
      }

      req.userId = user._id;

      next();
    } catch (error) {
      throw new ApiError(400, "Authorization failed!");
    }
  }
);

export const signup_middleware = async_handler(async (req, res, next) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    throw new ApiError(400, "Invalid user info: Please fill all the fileds");
  }

  const isUserExist = await User.findOne({ $or: [{ username }, { email }] });

  if (isUserExist) {
    throw new ApiError(400, "This username & email already exist");
  }

  if (!validator.isEmail(email)) {
    throw new ApiError(400, "Invalid email: please provide a valid email");
  }

  // if (!validator.isStrongPassword(password)) {
  //   return end_response(res, 400, "Invalid password: please a strong password");
  // }
  console.log("finished sing middleware");
  next();
});
