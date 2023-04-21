import { Request, Response, Router } from "express";
import * as controllers from "../../../controllers/user.controllers";
import authMiddleware from "../../../middleware/authentication";

const routes = Router();

//TODO: use put or patch ?

routes.post("/", authMiddleware, controllers.createUser);
routes.get("/", authMiddleware, controllers.getUsers);
routes.get("/:id", authMiddleware, controllers.getUser);
routes.put("/:id", authMiddleware, controllers.updateUser);
routes.delete("/:id", authMiddleware, controllers.deleteUser);

// authentification
routes.post("/login", controllers.loginUser);

export default routes;
