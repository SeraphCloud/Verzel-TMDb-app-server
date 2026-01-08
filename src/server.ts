import { app } from "./app";

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
	console.log(`🚀 Server running on port ${PORT}`);
	console.log(`fw: ${process.env.NODE_ENV || "development"}`);
});

// Se o servidor cair ou receber um comando de parada, fechamos as conexões
process.on("SIGINT", () => {
	server.close(() => {
		console.log("Servidor encerrado com segurança.");
		process.exit(0);
	});
});
