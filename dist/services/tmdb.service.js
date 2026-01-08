"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchMovies = void 0;
const axios_1 = __importDefault(require("axios"));
const tmdbBaseUrl = "https://api.themoviedb.org/3/search/movie";
const apiKey = process.env.TMDB_API_KEY;
const searchMovies = async (query) => {
    if (!apiKey) {
        throw new Error("TMDB_API_KEY is missing in environment variables");
    }
    const response = await axios_1.default.get(tmdbBaseUrl, {
        params: {
            api_key: apiKey,
            query: query,
            language: "pt-BR",
        },
    });
    return response.data.results;
};
exports.searchMovies = searchMovies;
