import { Router } from "express";
import * as favoriteController from "./controllers/favorite.controller";
import { search } from "./controllers/search.controller";

const routes = Router();

routes.get("/search", search);
routes.post("/favorites", favoriteController.list);
routes.post("/favorites", favoriteController.create);
routes.get("./favorites", favoriteController.remove);

export { routes };
