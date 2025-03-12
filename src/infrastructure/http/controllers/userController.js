// src/infrastructure/http/controllers/userController.js
const { User } = require("../../database/models");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    const userData = users.map(user => user.toJSON());  // Convierte a JSON limpio
    res.json(userData);  // Envia los usuarios como respuesta JSON
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};
