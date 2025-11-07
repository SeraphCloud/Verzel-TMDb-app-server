import express, { Request, Response } from "express";
import cors from "cors";
import axios from "axios";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";

// Instâncias
const app = express();
const prisma = new PrismaClient();
const PORT = 3001;

// Leitura do .env
const apiKey = process.env.TMDB_API_KEY;
const tmdbBaseUrl = "https://api.themoviedb.org/3/search/movie";

// Middlewares
app.use(cors());
app.use(express.json());

// ---Rotas---
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Servidor de pé" });
});

app.get("/api/search", async (req: Request, res: Response) => {
  const searchTerm = req.query.query as string;

  if (!searchTerm) {
    return res
      .status(400)
      .json({ error: 'O parâmetro "query" é obrigatório.' });
  }

  if (!apiKey) {
    return res
      .status(500)
      .json({ error: "Chave da API do TMDB não configurada no servidor" });
  }

  try {
    const response = await axios.get(tmdbBaseUrl, {
      params: {
        api_key: apiKey,
        query: searchTerm,
        language: "pt-BR",
      },
    });

    res.json(response.data.results);
  } catch (err) {
    console.error("Erro ao chamar a API do TMDB", err);
    res.status(500).json({ error: "Erro ao buscar filmes." });
  }
});

app.get("/api/favorites", async (req: Request, res: Response) => {
  const userId = req.query.userId as string;

  if (!userId) {
    return res
      .status(400)
      .json({ error: 'O parâmetro "userId" é obrigatório.' });
  }

  try {
    const favorites = await prisma.favoriteMovie.findMany({
      where: {
        userId: userId,
      },
    });

    res.json(favorites);
  } catch (err) {
    console.error("Erro ao buscar favoritos", err);
    res.status(500).json({ error: "Erro ao buscar favoritos." });
  }
});

app.post("/api/favorites", async (req: Request, res: Response) => {
  const { tmdbId, title, posterPath, userId, voteAverage } = req.body;

  try {
    const newFavorite = await prisma.favoriteMovie.create({
      data: {
        tmdbId,
        title,
        posterPath,
        userId,
        voteAverage,
      },
    });

    res.status(201).json(newFavorite);
  } catch (err) {
    console.error("Erro ao adicionar novo favorito", err);
    res.status(409).json({ error: "Erro ao salvar (filme pode já existir)" });
  }
});

app.delete("/api/favorites", async (req: Request, res: Response) => {
  const { tmdbId, userId } = req.body;

  try {
    const favorite = await prisma.favoriteMovie.findFirst({
      where: {
        tmdbId: tmdbId,
        userId: userId,
      },
    });

    if (!favorite) {
      return res.status(404).json({ error: "Favorito não encontrado." });
    }

    await prisma.favoriteMovie.delete({
      where: {
        id: favorite.id,
      },
    });

    res.status(204).send();
  } catch (err) {
    console.error("Erro ao remover favorito:", err);
    res.status(500).json({ error: "Erro ao remover favorito" });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Rodando na porta: ${PORT}`);
});
