import express, { Application, Request, Response } from "express";

const app: Application = express();

const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
