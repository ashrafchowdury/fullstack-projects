import User from "../models/user.models.js";
import validator from "validator";
import { ApiError, async_handler, ApiResponse } from "../libs/handlers.js";


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

  next();
});
