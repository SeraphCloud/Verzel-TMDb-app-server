import { Router } from "express";
import * as favoriteController from "./controllers/favorite.controller";
import { search } from "./controllers/search.controller";

const routes = Router();

// Rota de busca (GET /api/search)
routes.get("/search", search);

// Rotas de favoritos
routes.get("/favorites", favoriteController.list);
routes.post("/favorites", favoriteController.create);
routes.delete("/favorites/:id", favoriteController.remove);
export { routes };
