import { prisma } from "../config/prisma";

interface FavoriteData {
	tmdbId: number;
	title: string;
	posterPath?: string;
	userId: string;
	voteAverage?: number;
}

export const getFavorites = async (userId: string) => {
	return await prisma.favoriteMovie.findMany({
		where: { userId },
	});
};

export const addFavorite = async (data: FavoriteData) => {
	const existing = await prisma.favoriteMovie.findFirst({
		where: {
			tmdbId: data.tmdbId,
			userId: data.userId,
		},
	});

	if (existing) {
		throw new Error("Filme já adicionado aos seus favoritos.");
	}

	return await prisma.favoriteMovie.create({
		data: {
			tmdbId: data.tmdbId,
			title: data.title,
			posterPath: data.posterPath,
			userId: data.userId,
			voteAverage: data.voteAverage || 0,
		},
	});
};

export const removeFavorite = async (tmdbId: number, userId: string) => {
	const favorite = await prisma.favoriteMovie.findFirst({
		where: { tmdbId, userId },
	});

	if (!favorite) {
		throw new Error("Favorito não encontrado.");
	}

	return await prisma.favoriteMovie.delete({
		where: { id: favorite.id },
	});
};
