const { z } = require("zod");

// Validación de entrada (DTO de creación)
const CrearProductoSchema = z.object({
  nombre: z.string().min(1),
  peso: z.number().nonnegative()
});

class ProductoController {
  constructor(productoAppService) {
    this.productoAppService = productoAppService;

    // Asegurar el this si usás como handlers en Express
    this.crearProducto = this.crearProducto.bind(this);
    this.obtenerProductos = this.obtenerProductos.bind(this);
  }

  async crearProducto(req, res, next) {
    try {
      const dto = CrearProductoSchema.parse(req.body); // valida
      const result = await this.productoAppService.crearProducto(dto);

      // Opcional: Location del recurso creado
      res.status(201)
         .location(`/api/productos/${result.id}`)
         .json(result); // devolvé DTO, no entidad/ORM
    } catch (err) {
      // zod lanza error de validación -> 400
      if (err.name === "ZodError") {
        return res.status(400).json({ error: "Datos inválidos", detalles: err.errors });
      }
      // Dejá que el middleware global decida (500, etc.)
      next(err);
    }
  }

  async obtenerProductos(req, res, next) {
    try {
      // paginación simple
      const limit = Math.min(parseInt(req.query.limit ?? 50, 10), 100);
      const offset = parseInt(req.query.offset ?? 0, 10);

      const result = await this.productoAppService.obtenerProductos({ limit, offset });
      res.json(result); // lista de DTOs
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProductoController;