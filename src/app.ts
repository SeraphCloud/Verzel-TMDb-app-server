import "dotenv/config";
import { routes } from "./routes";
import express from "express";
import type { Request, Response, NextFunction } from "express";

const app = express();

// --- Middlewares Globais ---
app.use((req: Request, res: Response, next: NextFunction) => {
	// Lista de origens permitidas
	const allowedOrigins = [
		"http://localhost:5173",
		"https://verzel-tmdb-app.vercel.app",
	];

	const origin = req.headers.origin;

	if (origin && allowedOrigins.includes(origin)) {
		res.setHeader("Access-Control-Allow-Origin", origin);
	}

	res.header(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE",
	);
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
	res.header("Access-Control-Allow-Credentials", "true");

	if (req.method === "OPTIONS") {
		res.sendStatus(200); // Retorna e encerra a requisição se for preflight
	} else {
		next(); // Passa para o próximo middleware
	}
});

app.use(express.json());
// --- Rotas ---
app.use("/api", routes);

export default app;
