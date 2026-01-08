import { z } from "zod";

export const addFavoriteSchema = z.object({
	tmdbId: z.number({ message: "ID do filme inválido ou ausente" }),

	title: z
		.string({ message: "Título é obrigatório" })
		.min(1, "Título não pode ser vazio"),

	posterPath: z.string().optional(),

	userId: z.string({ message: "ID de usuário obrigatório" }),

	voteAverage: z.number().optional(),
});

export const removeFavoriteSchema = z.object({
	tmdbId: z.number({ message: "ID do filme obrigatório" }),
	userId: z.string({ message: "ID de usuário obrigatório" }),
});
