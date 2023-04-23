import { Router } from "express";
import * as controllers from "../../../controllers/orderProducts.controllers";
import authMiddleware from "../../../middleware/authentication";

const routes = Router();

routes.get("/", authMiddleware, controllers.getOrderProducts);
routes.get("/:id", authMiddleware, controllers.getOrderProduct);
routes.post("/", authMiddleware, controllers.createOrderProduct);
routes.delete("/:id", authMiddleware, controllers.deleteOrderProduct);
routes.put("/:id", authMiddleware, controllers.deleteOrderProduct);

export default routes;
