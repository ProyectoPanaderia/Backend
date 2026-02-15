class RemitoController {
  constructor(remitoAppService) {
    this.remitoAppService = remitoAppService;

    // Bind para conservar el contexto de this
    this.crear = this.crear.bind(this);
    this.listar = this.listar.bind(this);
    this.obtener = this.obtener.bind(this);
    this.editar = this.editar.bind(this);
    this.eliminar = this.eliminar.bind(this);
    this.obtenerTotalVentas = this.obtenerTotalVentas.bind(this);
  }

  // POST /remitos
  async crear(req, res, next) {
    try {
      const result = await this.remitoAppService.crear(req.body);
      res
        .status(201)
        .location(`/remitos/${result.data.id}`)
        .json(result);
    } catch (err) {
      next(err);
    }
  }

  // GET /remitos
  async listar(req, res, next) {
    try {
      const result = await this.remitoAppService.listar(req.query);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  // GET /remitos/:id
  async obtener(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.remitoAppService.obtener(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  // PUT /remitos/:id
  async editar(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.remitoAppService.editar(id, req.body);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  // DELETE /remitos/:id
  async eliminar(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.remitoAppService.eliminar(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  // GET /remitos/reportes/totales
  async obtenerTotalVentas(req, res, next) {
    try {
      const result = await this.remitoAppService.obtenerTotalVentas(req.query);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = RemitoController;