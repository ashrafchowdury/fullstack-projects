import User from "../models/user.model.js";
import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { end } from "../libs/functions/response.js";

export const authorizationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      end(res, 400, "Authorization required");
    }
    const token = authorization.split(" ")[1]; // extracting token from the authorization

    const { _id }: any = jwt.verify(token, process.env.JWT_SECRET_KEY); // verifyng the token

    const user = await User.findById({ _id }).select("_id");

    req.userId = user._id; // assigning the userId into req.user object to access it from everywhere

    next();
  } catch (error) {
    res.status(500).end("authorization middleware:", error.message);
  }
};

export const signupDataValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // todo: add a way so that users can't send any other data
  const { email, username, password } = req.body;

  try {
    if (!email || !username || !password) {
      return end(res, 400, "Invalid user info: Can't create an account");
    }

    const isEmailExist = await User.findOne({ email });
    const isUsernameExist = await User.find({ username });

    if (isUsernameExist[0]?.username == username) {
      return end(res, 400, "Invalid username: this username is already taken");
    }

    if (isEmailExist?.email) {
      return end(res, 400, "Invalid email: this email already exist");
    }

    if (!validator.isEmail(email)) {
      return end(res, 400, "Invalid email: please provide a valid email");
    }

    // if (!validator.isStrongPassword(password)) {
    //   return end(res, 400, "Invalid password: please a strong password");
    // }

    next();
  } catch (error) {
    end(res, 500, `singup validator: ${error.message}`);
  }
};

export const loginDataValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // todo: add a way so that users can't send any other data
  const { email, username, password } = req.body;

  try {
    if ((!email || !username) && !password) {
      return end(res, 400, "Invalid user info: Can't login into the account");
    }

    let e_or_u: "email" | "username"; // email or username

    if (email && validator.isEmail(email)) {
      e_or_u = "email";
    } else {
      e_or_u = "username";
    }

    const isUserExist = await User.findOne({
      [e_or_u]: e_or_u == "email" ? email : username,
    });

    if (!isUserExist.email) {
      return end(res, 400, `Invalid ${e_or_u}`);
    }

    const matchPassword = await bcrypt.compare(password, isUserExist.password);

    if (!matchPassword) end(res, 400, "Invalid password");

    req.userId = isUserExist._id;

    next();
  } catch (error) {
    end(res, 500, `login validator: ${error.message}`);
  }
};
