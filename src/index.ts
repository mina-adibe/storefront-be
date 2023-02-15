import express, { Application, NextFunction, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import errorMiddleware from "./middleware/error";
import Error from "./types/error.interface";

import config from "./config";

const app: Application = express();

const PORT = config.PORT || 3000;

// add helmet to the app to protect against well-known vulnerabilities
app.use(helmet());

// Add morgan to the app to log HTTP requests to the console
app.use(morgan("combined"));

// middleware to parse the body of the request
app.use(express.json());

// middleware to limit request rate
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "Too many requests from this IP, please try again later",
});

app.use(limiter);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

//  handel all invalids routes (operational error)
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err: Error = new Error(`can't find ${req.originalUrl}on this server!`);
  err.status = "fail";
  err.statusCode = 404;

  next(err);
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
