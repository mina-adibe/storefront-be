import { Request, Response, NextFunction } from "express";
import Error from "../types/error.interface";

// global error handler middleware  (operational error)
export default function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = error.statusCode || 500;
  const status = error.status || "error";
  const message = error.message || "something went wrong";

  res.status(statusCode).json({
    status,
    message,
  });
  next();
}
