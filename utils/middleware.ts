import { NextFunction, Request, Response, ErrorRequestHandler } from "express";

export const errorHandler = async (
  // err: ErrorRequestHandler,
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("err handler", err);
    if (err.name === "QueryFailedError") {
      return res.status(500).json({ error: err.message });
    } else if (err[0]?.constructor?.name === "ValidationError") {
      return res.status(500).json({ error: err[0].constraints });
    }
    return res.status(404).json({ error: "Endpoint not found" });
  } catch (err) {
    next(err);
  }
};
