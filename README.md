# Servidor Back-End: React Movie Database

Este é o servidor back-end para o projeto "React Movie Database", construído para atender aos requisitos de um desafio técnico de vaga de emprego.

Este servidor foi construído em **Node.js com TypeScript** e tem duas responsabilidades principais:

1.  **Proteger a Chave da API:** Atua como um proxy seguro, gerenciando todas as chamadas para a API do TMDB, escondendo a `TMDB_API_KEY` do front-end.
2.  **Gerenciar Dados Persistentes:** Conecta-se a um banco de dados PostgreSQL (hospedado no Supabase) para armazenar e gerenciar a lista de filmes favoritos de cada usuário.

---

## 💻 Pilha de Tecnologias (Tech Stack)

- **Node.js**
- **TypeScript**
- **Express:** Para criar o servidor e as rotas da API.
- **Prisma:** ORM para comunicação segura com o banco de dados.
- **PostgreSQL (Supabase):** Banco de dados relacional hospedado na nuvem.
- **Axios:** Para fazer chamadas HTTP para a API do TMDB.
- **`ts-node-dev`:** Para recarregamento automático (hot-reload) do servidor em desenvolvimento.
- **`dotenv`:** Para gerenciamento de variáveis de ambiente.

---

## 📖 Documentação da API

O servidor expõe as seguintes rotas:

### 1. Busca

- **Rota:** `GET /api/search`
- **Query Params:** `?query={string}`
- **Função:** Recebe um termo de busca, chama a API do TMDB com a chave secreta e retorna o array de resultados de filmes.

### 2. Favoritos

- **Rota:** `GET /api/favorites`
- **Query Params:** `?userId={string}`
- **Função:** Retorna a lista de todos os filmes favoritados por um `userId` específico.

- **Rota:** `POST /api/favorites`
- **Body (JSON):** `{ tmdbId, title, posterPath, userId, voteAverage }`
- **Função:** Adiciona um novo filme à lista de favoritos. Retorna um erro `409 (Conflict)` se o `tmdbId` já existir (conforme a restrição `@unique` do Prisma).

- **Rota:** `DELETE /api/favorites`
- **Body (JSON):** `{ tmdbId, userId }`
- **Função:** Encontra e remove um filme da lista de favoritos com base no `tmdbId` e `userId`.

---

## 🛠️ Configuração e Execução Local

Este projeto requer uma configuração cuidadosa do banco de dados para se conectar ao Supabase.

### 1. Instalar Dependências

```bash
npm install
```
