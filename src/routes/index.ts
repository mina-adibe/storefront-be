import { Router } from "express";
import usersRoutes from "./v1/api/users";
import productsRoutes from "./v1/api/products";
import ordersRoutes from "./v1/api/orders";
import orderProductsRoutes from "./v1/api/orderProducts";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/products", productsRoutes);
routes.use("/orders", ordersRoutes);
routes.use("/order_products", orderProductsRoutes);

// orders route here

export default routes;
