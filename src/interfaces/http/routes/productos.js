const express = require("express");
const router = express.Router();

module.exports = (controller) => {
  router.post("/", controller.crearProducto);
  router.get("/", controller.obtenerProductos);
  return router;
};

// app.js
app.use("/api/productos", productosRoutes(productoController));

// Middleware de errores (último)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500).json({ error: err.message ?? "Error interno" });
});