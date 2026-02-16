class DevolucionController {
  constructor(devolucionAppService) {
    this.devolucionAppService = devolucionAppService;

    // Bind para conservar el contexto de this
    this.crear = this.crear.bind(this);
    this.listar = this.listar.bind(this);
    this.obtener = this.obtener.bind(this);
    this.obtenerPorReparto = this.obtenerPorReparto.bind(this);
    this.editar = this.editar.bind(this);
    this.eliminar = this.eliminar.bind(this);
    this.obtenerEstadisticas = this.obtenerEstadisticas.bind(this);
  }

  // POST /devoluciones
  async crear(req, res, next) {
    try {
      const result = await this.devolucionAppService.crear(req.body);
      res
        .status(201)
        .location(`/devoluciones/${result.data.id}`)
        .json(result);
    } catch (err) {
      next(err);
    }
  }

  // GET /devoluciones
  async listar(req, res, next) {
    try {
      const result = await this.devolucionAppService.listar(req.query);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  // GET /devoluciones/:id
  async obtener(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.devolucionAppService.obtener(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  // GET /repartos/:repartoId/devoluciones
  async obtenerPorReparto(req, res, next) {
    try {
      const repartoId = Number(req.params.repartoId);
      const result = await this.devolucionAppService.obtenerPorReparto(repartoId);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  // PUT /devoluciones/:id
  async editar(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.devolucionAppService.editar(id, req.body);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  // DELETE /devoluciones/:id
  async eliminar(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.devolucionAppService.eliminar(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  // GET /devoluciones/estadisticas/resumen
  async obtenerEstadisticas(req, res, next) {
    try {
      const result = await this.devolucionAppService.obtenerEstadisticas(req.query);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = DevolucionController;