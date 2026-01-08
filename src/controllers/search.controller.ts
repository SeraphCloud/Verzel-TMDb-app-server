import type { Request, Response } from "express";
import { searchMovies } from "../services/tmdb.service";

export const search = async (req: Request, res: Response) => {
	const query = req.query.query as string;

	if (!query) {
		return res
			.status(400)
			.json({ error: 'O parâmetro "query" é obrigatório.' });
	}

	try {
		const results = await searchMovies(query);
		return res.json(results);
	} catch (error) {
		console.error("Erro no search controller:", error);
		return res.status(500).json({ error: "Erro ao buscar filmes." });
	}
};
