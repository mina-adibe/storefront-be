import { Request, Response, Router } from "express";
import * as controllers from "../../../controllers/orders.controllers";
import authMiddleware from "../../../middleware/authentication";

const routes = Router();

// add all products routes here
routes.post("/", authMiddleware, controllers.createOrder);
routes.get("/", authMiddleware, controllers.getOrders);
routes.get("/:id", authMiddleware, controllers.getOrder);
routes.delete("/:id", authMiddleware, controllers.deleteOrder);

export default routes;
