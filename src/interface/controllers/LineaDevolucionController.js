class LineaDevolucionController {
  constructor(lineaDevolucionAppService) {
    this.lineaDevolucionAppService = lineaDevolucionAppService;

    // Bind para conservar el contexto de this
    this.crear = this.crear.bind(this);
    this.listar = this.listar.bind(this);
    this.obtener = this.obtener.bind(this);
    this.editar = this.editar.bind(this);
    this.eliminar = this.eliminar.bind(this);
  }

  // POST /lineas-devolucion
  async crear(req, res, next) {
    try {
      const result = await this.lineaDevolucionAppService.crear(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  // GET /lineas-devolucion
  async listar(req, res, next) {
    try {
      const result = await this.lineaDevolucionAppService.listar(req.query);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  // GET /lineas-devolucion/:id
  async obtener(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.lineaDevolucionAppService.obtener(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  // PATCH /lineas-devolucion/:id
  async editar(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.lineaDevolucionAppService.editar(id, req.body);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  // DELETE /lineas-devolucion/:id
  async eliminar(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.lineaDevolucionAppService.eliminar(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = LineaDevolucionController;