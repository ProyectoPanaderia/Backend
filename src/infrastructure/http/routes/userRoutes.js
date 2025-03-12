// src/infrastructure/http/routes/userRoutes.js
const express = require("express");
const { getUsers } = require("../controllers/userController");
const router = express.Router();

router.get("/users", getUsers);  // Ruta GET para obtener todos los usuarios

module.exports = router;  // Exportamos el router para ser usado en index.js
