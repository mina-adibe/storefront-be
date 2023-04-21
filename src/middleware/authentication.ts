import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import Error from "../types/error.interface";

function handleUnauthorized(next: NextFunction) {
  const error: Error = new Error("not authorized , login error ");
  error.status = 401;
  next(error);
}

function authMiddleware(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  try {
    if (!authHeader || !token || !authHeader.startsWith("Bearer")) {
      handleUnauthorized(next);
    } else {
      jwt.verify(token, config.tokenSecret as string, (err, _user) => {
        if (err) {
          handleUnauthorized(next);
        }
        //   req.user = user;
        next();
      });
    }
  } catch (err) {
    handleUnauthorized(next);
  }
}

export default authMiddleware;
