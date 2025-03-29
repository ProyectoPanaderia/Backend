const express = require("express");
const userRoutes = require("./src/infrastructure/http/routes/userRoutes");
const { sequelize } = require("./src/infrastructure/database/models/models");

const app = express();
app.use(express.json());  // Middleware para parsear JSON
app.use("/api", userRoutes);  // Rutas de usuario bajo "/api"

// Sincroniza la base de datos y luego inicia el servidor
sequelize.sync({ force: false })  // Cambia a `true` si quieres recrear las tablas cada vez
    .then(() => {
        console.log("Base de datos sincronizada");
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
    })
    .catch(error => {
        console.error("Error al sincronizar la base de datos:", error);
    });