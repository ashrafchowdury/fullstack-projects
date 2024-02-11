import User from "../models/user.model.js";
import { Response, Request } from "express";
import cache from "../libs/cache/redis.js";
import bcrypt from "bcrypt";
import { createJwtToken } from "../libs/utils.js";

export const getUser = async (req: Request, res: Response) => {
  const { _id } = req.userId;
  try {
    if (!_id) {
      throw new Error("Invalid user id: Can't get user auth info");
      return;
    }
    const user = await User.findById({ _id });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).end("Encounter an error while trting to get user info");
  }
};

export const singup = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  try {
    const numberOfHashes = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, numberOfHashes);

    const user = await User.create({ email, username, password: hashPassword });

    const token = createJwtToken(user._id);

    res.status(201).json({ token });
  } catch (error) {
    res
      .status(500)
      .end("Encounter an error while trying to create user account");
  }
};

export const login = async (req: any, res: Response) => {
  // todo: remove the any
  try {
    const token = createJwtToken(req.userId);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).end("Encounter an error while trying to login user");
  }
};

export const forgetEmail = async (req: Request, res: Response) => {
  const { email } = req.body; // uOrE: username or email
  try {
    if (!email) {
      throw new Error("Invalid user info: Can't login user");
      return;
    }

    res.status(200).json("");
  } catch (error) {
    res.status(500).end("Encounter an error while trying to login user");
  }
};

export const logout = async (req: Request, res: Response) => {
  const { email } = req.body; // uOrE: username or email
  try {
    if (!email) {
      throw new Error("Invalid user info: Can't login user");
      return;
    }

    res.status(200).json("");
  } catch (error) {
    res.status(500).end("Encounter an error while trying to login user");
  }
};

// social auth return routes

export const failure = async (req: Request, res: Response) => {
  res.status(400).end("Failed to login through this, please try anoher way");
};

export const success = async (req: Request, res: Response) => {
  res.status(201).json("User logedin successfilly");
};
