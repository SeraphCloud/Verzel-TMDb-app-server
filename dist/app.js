"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("dotenv/config");
const routes_1 = require("./routes");
const express_1 = __importDefault(require("express"));
// import { routes } from './routes'
const app = (0, express_1.default)();
exports.app = app;
// --- Middlewares Globais ---
app.use((req, res, next) => {
    // Lista de origens permitidas
    const allowedOrigins = [
        "http://localhost:5173",
        "https://verzel-tmdb-app.vercel.app/",
    ];
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    if (req.method === "OPTIONS") {
        res.sendStatus(200); // Retorna e encerra a requisição se for preflight
    }
    else {
        next(); // Passa para o próximo middleware
    }
});
app.use(express_1.default.json());
// --- Rotas ---
app.use("/api", routes_1.routes);
