"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFavoriteSchema = exports.addFavoriteSchema = void 0;
const zod_1 = require("zod");
exports.addFavoriteSchema = zod_1.z.object({
    tmdbId: zod_1.z.number({ message: "ID do filme inválido ou ausente" }),
    title: zod_1.z
        .string({ message: "Título é obrigatório" })
        .min(1, "Título não pode ser vazio"),
    posterPath: zod_1.z.string().optional(),
    userId: zod_1.z.string({ message: "ID de usuário obrigatório" }),
    voteAverage: zod_1.z.number().optional(),
});
exports.removeFavoriteSchema = zod_1.z.object({
    tmdbId: zod_1.z.number({ message: "ID do filme obrigatório" }),
    userId: zod_1.z.string({ message: "ID de usuário obrigatório" }),
});
