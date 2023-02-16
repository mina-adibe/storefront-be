import { Request, Response, Router } from "express";
import * as controllers from "../../../controllers/user.controllers";

const routes = Router();

routes.post("/", controllers.createUser);
routes.get("/", controllers.getUsers);
routes.get("/:id", controllers.getUser);
routes.put("/:id", controllers.updateUser);
routes.delete("/:id", controllers.deleteUser);

export default routes;
