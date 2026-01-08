import axios from "axios";

const tmdbBaseUrl = "https://api.themoviedb.org/3/search/movie";
const apiKey = process.env.TMDB_API_KEY;

export const searchMovies = async (query: string) => {
	if (!apiKey) {
		throw new Error("TMDB_API_KEY is missing in environment variables");
	}

	const response = await axios.get(tmdbBaseUrl, {
		params: {
			api_key: apiKey,
			query: query,
			language: "pt-BR",
		},
	});

	return response.data.results;
};
