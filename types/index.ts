import { Request } from "express";
import { User } from "../entity/User.js";

export interface TokenData {
  id: number;
  string: string;
  role: string;
  token: string;
}

export interface UserType {
  id: number;
  username: string;
  password: string;
  role: string;
}

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}

// export interface RequestWithUser extends Request {
//   user: User;
// }

// export interface RequestWithToken extends Request {
//   token: TokenData;
// }
