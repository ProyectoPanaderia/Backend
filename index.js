const express = require("express");
const userRoutes = require("./src/infrastructure/http/routes/userRoutes");
const { sequelize } = require("./src/infrastructure/database/models/models");

const app = express();
app.use(express.json());
app.use("/api", userRoutes);

// Sincroniza la base de datos y luego se inicia el servidor
sequelize.sync({ force: false })  // O `true` si querés que borre y recree las tablas
    .then(() => {
        console.log("🟢 Base de datos sincronizada");
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
    })
    .catch(error => {
        console.error("❌ Error al sincronizar la base de datos:", error);
    });