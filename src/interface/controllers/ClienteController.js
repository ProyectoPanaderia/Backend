class ClienteController {
  constructor(clienteAppService) {
    this.clienteAppService = clienteAppService;

    // Bind para conservar el contexto de this
    this.crear = this.crear.bind(this);
    this.listar = this.listar.bind(this);
    this.obtener = this.obtener.bind(this);
    this.editar = this.editar.bind(this);
    this.eliminar = this.eliminar.bind(this);
  }

  // POST /clientes
  async crear(req, res, next) {
    try {
      const result = await this.clienteAppService.crear(req.body);
      res
        .status(201)
        .location(`/clientes/${result.data.id}`)
        .json(result); // { data: {...} }
    } catch (err) {
      next(err);
    }
  }

  // GET /clientes
  async listar(req, res, next) {
    try {
      const result = await this.clienteAppService.listar(req.query);
      res.json(result); // { data: [...], meta: {...} }
    } catch (err) {
      next(err);
    }
  }

  // GET /clientes/:id
  async obtener(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.clienteAppService.obtener(id);
      res.json(result); // { data: {...} }
    } catch (err) {
      next(err);
    }
  }

  // PUT /clientes/:id
  async editar(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.clienteAppService.editar(id, req.body);
      res.json(result); // { data: {...} }
    } catch (err) {
      next(err);
    }
  }

  // DELETE /clientes/:id
  async eliminar(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.clienteAppService.eliminar(id);
      res.json(result); // { data: { ok: true } }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ClienteController;