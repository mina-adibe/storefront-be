import { Router } from "express";
import usersRoutes from "./v1/api/users";
import productsRoutes from "./v1/api/products";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/products", productsRoutes);

export default routes;
