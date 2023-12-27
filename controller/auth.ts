import { Request, Response, NextFunction } from "express";
import { User } from "../entity/User.js";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../utils/config.js";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const { username, password } = body;

    const user = await User.findOne({
      where: {
        username: username,
      },
      relations: {
        role: true,
      },
      select: {
        role: {
          role: true,
        },
      },
    });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(500).json({ error: "Incorrect password" });
    }

    const userForToken = {
      id: user.id,
      username: user.username,
      role: user.role.role,
    };

    const token = jwt.sign(userForToken, TOKEN_SECRET);

    return res.json({
      message: "Successfully logged in",
      user: { ...userForToken, token: token },
    });
  } catch (error) {
    next(error);
  }
};
