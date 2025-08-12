class ProductoController {
  constructor(productoAppService) {
    this.productoAppService = productoAppService;
    this.crearProducto = this.crearProducto.bind(this);
    this.obtenerProductos = this.obtenerProductos.bind(this);
  }

  async crearProducto(req, res, next) {
    try {
      const { nombre, peso } = req.body || {};
      if (!nombre || typeof peso !== 'number' || peso < 0) {
        return res.status(400).json({ error: 'Datos inválidos' });
      }
      const result = await this.productoAppService.crearProducto({ nombre, peso });
      res.status(201).location(`/api/productos/${result.id}`).json(result);
    } catch (err) { next(err); }
  }

  async obtenerProductos(req, res, next) {
    try {
      const limit = Math.min(parseInt(req.query.limit ?? 50, 10), 100);
      const offset = parseInt(req.query.offset ?? 0, 10);
      const result = await this.productoAppService.obtenerProductos({ limit, offset });
      res.json(result);
    } catch (err) { next(err); }
  }
}

module.exports = ProductoController;