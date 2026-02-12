class ExistenciaController {
  constructor(existenciaAppService) {
    this.existenciaAppService = existenciaAppService;

    // Bind para conservar el contexto de this
    this.crear = this.crear.bind(this);
    this.listar = this.listar.bind(this);
    this.obtener = this.obtener.bind(this);
    this.editar = this.editar.bind(this);
    this.eliminar = this.eliminar.bind(this);
  }

  // POST /existencias
  async crear(req, res, next) {
    try {
      const result = await this.existenciaAppService.crear(req.body);
      res
        .status(201)
        .location(`/existencias/${result.data.id}`)
        .json(result); // { data: {...} }
    } catch (err) {
      next(err);
    }
  }

  // GET /existencias
  // Soporta filtros via query params: ?productoId=1&repartoId=2
  async listar(req, res, next) {
    try {
      const result = await this.existenciaAppService.listar(req.query);
      res.json(result); // { data: [...], meta: {...} }
    } catch (err) {
      next(err);
    }
  }

  // GET /existencias/:id
  async obtener(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.existenciaAppService.obtener(id);
      res.json(result); // { data: {...} }
    } catch (err) {
      next(err);
    }
  }

  // PUT /existencias/:id
  async editar(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.existenciaAppService.editar(id, req.body);
      res.json(result); // { data: {...} }
    } catch (err) {
      next(err);
    }
  }

  // DELETE /existencias/:id
  async eliminar(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.existenciaAppService.eliminar(id);
      res.json(result); // { data: { ok: true } }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ExistenciaController;