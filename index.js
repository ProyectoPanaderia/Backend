// src/index.js
const express = require("express");
const userRoutes = require("./src/infrastructure/http/routes/userRoutes");

const app = express();
app.use(express.json());  // Middleware para parsear JSON
app.use("/api", userRoutes);  // Rutas de usuario bajo "/api"

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
