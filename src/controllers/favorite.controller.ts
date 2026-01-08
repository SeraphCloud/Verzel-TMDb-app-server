import type { Request, Response } from "express";
import {
	addFavorite,
	getFavorites,
	removeFavorite,
} from "../services/favorite.service";
import { addFavoriteSchema, removeFavoriteSchema } from "../utils/schemas";

export const list = async (req: Request, res: Response) => {
	const userId = req.query.userId as string;

	if (!userId) {
		return res.status(400).json({ error: "userId é obrigatório" });
	}

	try {
		const favorites = await getFavorites(userId);
		return res.json(favorites);
	} catch {
		return res.status(500).json({ error: "Erro ao buscar favoritos" });
	}
};

export const create = async (req: Request, res: Response) => {
	try {
		const data = addFavoriteSchema.parse(req.body);

		const newFavorite = await addFavorite(data);
		return res.status(201).json(newFavorite);
	} catch (error: any) {
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

export const remove = async (req: Request, res: Response) => {
	try {
		const { tmdbId, userId } = removeFavoriteSchema.parse(req.body);

		await removeFavorite(tmdbId, userId);
		return res.status(204).send();
	} catch (error: any) {
		if (error.message === "Favorito não encontrado.") {
			return res.status(404).json({ error: error.message });
		}
		return res.status(500).json({ error: "Erro ao remover favorito" });
	}
};
