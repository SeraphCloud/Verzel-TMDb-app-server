"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFavorite = exports.addFavorite = exports.getFavorites = void 0;
const prisma_1 = require("../config/prisma");
const getFavorites = async (userId) => {
    return await prisma_1.prisma.favoriteMovie.findMany({
        where: { userId },
    });
};
exports.getFavorites = getFavorites;
const addFavorite = async (data) => {
    const existing = await prisma_1.prisma.favoriteMovie.findFirst({
        where: {
            tmdbId: data.tmdbId,
            userId: data.userId,
        },
    });
    if (existing) {
        throw new Error("Filme já adicionado aos seus favoritos.");
    }
    return await prisma_1.prisma.favoriteMovie.create({
        data: {
            tmdbId: data.tmdbId,
            title: data.title,
            posterPath: data.posterPath,
            userId: data.userId,
            voteAverage: data.voteAverage || 0,
        },
    });
};
exports.addFavorite = addFavorite;
const removeFavorite = async (tmdbId, userId) => {
    const favorite = await prisma_1.prisma.favoriteMovie.findFirst({
        where: { tmdbId, userId },
    });
    if (!favorite) {
        throw new Error("Favorito não encontrado.");
    }
    return await prisma_1.prisma.favoriteMovie.delete({
        where: { id: favorite.id },
    });
};
exports.removeFavorite = removeFavorite;
