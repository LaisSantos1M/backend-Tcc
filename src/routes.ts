import { authentication } from "./middlewares/authentication.js";
import { Router } from "express";
import escritoresController from "./controllers/escritores.js";

const routes = Router();
routes.get("/", (req, res) => 
    res.status(200).json({success: true})
);
//Rotas dos escritores

routes.get("/escritores",authentication, escritoresController.list) ;
routes.get("/escritores/:id", authentication, escritoresController.getById)
routes.post("/escritores", authentication,escritoresController.create);
routes.put("/escritores/:id",authentication, escritoresController.update)
routes.delete("/escritores/:id", authentication,escritoresController.delete)

export default routes;
