import { NextFunction, Response, Request } from "express";
import { UserRole } from "../entity/UserRole.js";
import bcrypt from "bcrypt";
import { User } from "../entity/User.js";
import { validate } from "class-validator";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../utils/config.js";

interface UserType {
  id: number;
  string: string;
  role: string;
  token: string;
}

export const createRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body;

    const authorization = req.get("Authorization");

    const token = authorization?.startsWith("Bearer ")
      ? authorization?.replace("Bearer ", "")
      : "";

    const decodedToken: UserType = jwt.verify(token, TOKEN_SECRET) as UserType;

    if (!decodedToken.id) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const userRole = new UserRole();
    if (!body.role) {
      return res.status(400).json("Role field is required");
    }
    userRole.role = body.role;
    await userRole.save();
    return res.json({ userRole });
  } catch (error: any) {
    next(error);
  }
};

export const getRoles = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const roles = await UserRole.find();
    if (roles) {
      return res.json({ data: roles });
    }
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log("body", req.body);
    const body = req.body;
    const { username, password, confirmPassword, role } = body;

    if (!(username && password)) {
      return res
        .status(400)
        .json({ error: "Username and password field is empty" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    let user = new User();
    user.username = username;
    user.password = passwordHash;
    user.role = role;

    const errors = await validate(user);

    if (errors.length > 0) {
      next(errors);
      throw new Error("Validation failed");
    }
    await user.save();

    const userCopy = { ...user };
    return res.json({ user: userCopy });
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await User.find({
      relations: {
        role: true,
      },
      select: {
        role: {
          role: true,
        },
      },
      // relations: ["role"],
      // select: ["id", "username", "password", "role"],
    });
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};
