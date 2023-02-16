import { Router } from "express";
import usersRoutes from "./v1/api/users";

const routes = Router();

routes.use("/users", usersRoutes);

export default routes;
