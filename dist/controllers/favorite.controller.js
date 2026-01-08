"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.create = exports.list = void 0;
const favorite_service_1 = require("../services/favorite.service");
const schemas_1 = require("../utils/schemas");
const list = async (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
        return res.status(400).json({ error: "userId é obrigatório" });
    }
    try {
        const favorites = await (0, favorite_service_1.getFavorites)(userId);
        return res.json(favorites);
    }
    catch {
        return res.status(500).json({ error: "Erro ao buscar favoritos" });
    }
};
exports.list = list;
const create = async (req, res) => {
    try {
        const data = schemas_1.addFavoriteSchema.parse(req.body);
        const newFavorite = await (0, favorite_service_1.addFavorite)(data);
        return res.status(201).json(newFavorite);
    }
    catch (error) {
        if (error.issues) {
            return res.status(400).json({ error: error.issues });
        }
        if (error.message === "Filme já adicionado aos favoritos.") {
            return res.status(409).json({ error: error.message });
        }
        console.error(error);
        return res
            .status(500)
            .json({ error: "Error interno ao adicionar favorito" });
    }
};
exports.create = create;
const remove = async (req, res) => {
    try {
        const { tmdbId, userId } = schemas_1.removeFavoriteSchema.parse(req.body);
        await (0, favorite_service_1.removeFavorite)(tmdbId, userId);
        return res.status(204).send();
    }
    catch (error) {
        if (error.message === "Favorito não encontrado.") {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: "Erro ao remover favorito" });
    }
};
exports.remove = remove;
