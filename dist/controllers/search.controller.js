"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = void 0;
const tmdb_service_1 = require("../services/tmdb.service");
const search = async (req, res) => {
    const query = req.query.query;
    if (!query) {
        return res
            .status(400)
            .json({ error: 'O parâmetro "query" é obrigatório.' });
    }
    try {
        const results = await (0, tmdb_service_1.searchMovies)(query);
        return res.json(results);
    }
    catch (error) {
        console.error("Erro no search controller:", error);
        return res.status(500).json({ error: "Erro ao buscar filmes." });
    }
};
exports.search = search;
