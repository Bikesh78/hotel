import { Request, Response, NextFunction } from "express";
import { Variations } from "../entity/Variations.js";

export const getVariation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const variations = await Variations.find();

    if (variations) {
      return res.json({ data: variations });
    }
  } catch (error) {
    next(error);
  }
};
