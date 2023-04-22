import { Router } from "express";
import usersRoutes from "./v1/api/users";
import productsRoutes from "./v1/api/products";
import ordersRoutes from "./v1/api/orders";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/products", productsRoutes);
routes.use("/orders", ordersRoutes);

// orders route here

export default routes;
