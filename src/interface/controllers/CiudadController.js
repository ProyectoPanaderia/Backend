class CiudadController {
  constructor(ciudadAppService) {
    this.ciudadAppService = ciudadAppService;

    // Bind para conservar el contexto de this
    this.crear = this.crear.bind(this);
    this.listar = this.listar.bind(this);
    this.obtener = this.obtener.bind(this);
    this.editar = this.editar.bind(this);
    this.eliminar = this.eliminar.bind(this);
  }

  // POST /ciudades
  async crear(req, res, next) {
    try {
      const result = await this.ciudadAppService.crear(req.body);
      res
        .status(201)
        .location(`/ciudades/${result.data.id}`)
        .json(result); // { data: {...} }
    } catch (err) {
      next(err);
    }
  }

  // GET /ciudades
  async listar(req, res, next) {
    try {
      const result = await this.ciudadAppService.listar(req.query);
      res.json(result); // { data: [...], meta: {...} }
    } catch (err) {
      next(err);
    }
  }

  // GET /ciudades/:id
  async obtener(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.ciudadAppService.obtener(id);
      res.json(result); // { data: {...} }
    } catch (err) {
      next(err);
    }
  }

  // PUT /ciudades/:id
  async editar(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.ciudadAppService.editar(id, req.body);
      res.json(result); // { data: {...} }
    } catch (err) {
      next(err);
    }
  }

  // DELETE /ciudades/:id
  async eliminar(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.ciudadAppService.eliminar(id);
      res.json(result); // { data: { ok: true } }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CiudadController;
