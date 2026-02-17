class PrecioProductoController {
  constructor(precioProductoAppService) {
    this.precioProductoAppService = precioProductoAppService;
    
    // Bind para conservar el contexto de this
    this.crear = this.crear.bind(this);
    this.listar = this.listar.bind(this);
    this.obtener = this.obtener.bind(this);
    this.obtenerVigente = this.obtenerVigente.bind(this);
    this.editar = this.editar.bind(this);
    this.eliminar = this.eliminar.bind(this);
  }

  // POST /precio-productos
  async crear(req, res, next) {
    try {
      const result = await this.precioProductoAppService.crear(req.body);
      res
        .status(201)
        .location(`/precio-productos/${result.data.id}`)
        .json(result);
    } catch (err) {
      next(err);
    }
  }

  // GET /precio-productos
  async listar(req, res, next) {
    try {
      const result = await this.precioProductoAppService.listar(req.query);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  // GET /precio-productos/:id
  async obtener(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.precioProductoAppService.obtener(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  // GET /precio-productos/vigente/:productoId?fecha=YYYY-MM-DD&nombre=reventa
  async obtenerVigente(req, res, next) {
    try {
      const productoId = Number(req.params.productoId);
      const { fecha, nombre } = req.query;
      const result = await this.precioProductoAppService.obtenerVigente(
        productoId,
        fecha || new Date().toISOString().split('T')[0],
        nombre || 'reventa'
      );
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  // PUT /precio-productos/:id
  async editar(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.precioProductoAppService.editar(id, req.body);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  // DELETE /precio-productos/:id
  async eliminar(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.precioProductoAppService.eliminar(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PrecioProductoController;