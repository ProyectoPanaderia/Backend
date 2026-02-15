class LineaRemitoController {
  constructor(lineaRemitoAppService) {
    this.lineaRemitoAppService = lineaRemitoAppService;

    // Bind para conservar el contexto de this
    this.crear = this.crear.bind(this);
    this.listar = this.listar.bind(this);
    this.obtener = this.obtener.bind(this);
    this.obtenerPorRemito = this.obtenerPorRemito.bind(this);
    this.editar = this.editar.bind(this);
    this.eliminar = this.eliminar.bind(this);
    this.calcularTotalRemito = this.calcularTotalRemito.bind(this);
  }

  // POST /lineas-remito
  async crear(req, res, next) {
    try {
      const result = await this.lineaRemitoAppService.crear(req.body);
      res
        .status(201)
        .location(`/lineas-remito/${result.data.id}`)
        .json(result);
    } catch (err) {
      next(err);
    }
  }

  // GET /lineas-remito
  async listar(req, res, next) {
    try {
      const result = await this.lineaRemitoAppService.listar(req.query);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  // GET /lineas-remito/:id
  async obtener(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.lineaRemitoAppService.obtener(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  // GET /remitos/:remitoId/lineas
  async obtenerPorRemito(req, res, next) {
    try {
      const remitoId = Number(req.params.remitoId);
      const result = await this.lineaRemitoAppService.obtenerPorRemito(remitoId);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  // PUT /lineas-remito/:id
  async editar(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.lineaRemitoAppService.editar(id, req.body);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  // DELETE /lineas-remito/:id
  async eliminar(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.lineaRemitoAppService.eliminar(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  // GET /remitos/:remitoId/total
  async calcularTotalRemito(req, res, next) {
    try {
      const remitoId = Number(req.params.remitoId);
      const result = await this.lineaRemitoAppService.calcularTotalRemito(remitoId);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = LineaRemitoController;