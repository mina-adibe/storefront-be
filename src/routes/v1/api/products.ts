import { Request, Response, Router } from "express";
import * as controllers from "../../../controllers/products.controllers";
import authMiddleware from "../../../middleware/authentication";

const routes = Router();

// add all products routes here
routes.post("/", authMiddleware, controllers.createProduct);
routes.get("/", controllers.getProducts);
routes.get("/:id", controllers.getProduct);
routes.put("/:id", authMiddleware, controllers.updateProduct);
routes.delete("/:id", authMiddleware, controllers.deleteProduct);

// add all users routes here

export default routes;
