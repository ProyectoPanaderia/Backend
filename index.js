
//este index lo hice para probar el controller y el service
const express = require("express");
const bodyParser = require("body-parser");

// Tu AppService falso (mock)
const productoAppService = {
  async crearProducto(dto) {
    return { id: 1, ...dto }; // simula insert
  },
  async obtenerProductos({ limit, offset }) {
    return [
      { id: 1, nombre: "Pan", peso: 500 },
      { id: 2, nombre: "Bizcocho", peso: 200 }
    ];
  }
};

const ProductoController = require("./src/interfaces/controllers/ProductoController");
const productoController = new ProductoController(productoAppService);

const app = express();
app.use(bodyParser.json());

// Rutas
app.post("/productos", productoController.crearProducto);
app.get("/productos", productoController.obtenerProductos);

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));