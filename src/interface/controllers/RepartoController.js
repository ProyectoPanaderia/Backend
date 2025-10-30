class RepartoController {
  constructor(repartoAppService) {
    this.repartoAppService = repartoAppService;

    this.crear = this.crear.bind(this);
    this.listar = this.listar.bind(this);
    this.obtener = this.obtener.bind(this);
    this.editar = this.editar.bind(this);
    this.eliminar = this.eliminar.bind(this);
  }

  async crear(req, res, next) {
    try {
      const result = await this.repartoAppService.crear(req.body);
      res
        .status(201)
        .location(`/repartos/${result.data.id}`)
        .json(result); // { data: {...} }
    } catch (err) {
      next(err);
    }
  }

  async listar(req, res, next) {
    try {
      const result = await this.repartoAppService.listar(req.query);
      res.json(result); // { data: [...], meta: {...} }
    } catch (err) {
      next(err);
    }
  }

  async obtener(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.repartoAppService.obtener(id);
      res.json(result); // { data: {...} }
    } catch (err) {
      next(err);
    }
  }

  async editar(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.repartoAppService.editar(id, req.body);
      res.json(result); // { data: {...} }
    } catch (err) {
      next(err);
    }
  }

  async eliminar(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.repartoAppService.eliminar(id);
      res.json(result); // { data: { ok: true } }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = RepartoController;