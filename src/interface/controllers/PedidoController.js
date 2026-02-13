class PedidoController {
  constructor(pedidoAppService) {
    this.pedidoAppService = pedidoAppService;

    // Bind para conservar el contexto de this
    this.crear = this.crear.bind(this);
    this.listar = this.listar.bind(this);
    this.obtener = this.obtener.bind(this);
    this.editar = this.editar.bind(this); // Para cambios generales (fecha, etc.)
    this.cambiarEstado = this.cambiarEstado.bind(this); // Específico para flujo de trabajo
    this.eliminar = this.eliminar.bind(this);
  }

  // POST /pedidos
  async crear(req, res, next) {
    try {
      const result = await this.pedidoAppService.crear(req.body);
      res
        .status(201)
        .location(`/pedidos/${result.data.id}`)
        .json(result); // { data: {...} }
    } catch (err) {
      next(err);
    }
  }

  // GET /pedidos
  // Soporta filtros: ?clienteId=1&estado=Pendiente&fechaEmision=...
  async listar(req, res, next) {
    try {
      const result = await this.pedidoAppService.listar(req.query);
      res.json(result); // { data: [...], meta: {...} }
    } catch (err) {
      next(err);
    }
  }

  // GET /pedidos/:id
  async obtener(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.pedidoAppService.obtener(id);
      res.json(result); // { data: {...} }
    } catch (err) {
      next(err);
    }
  }

  // PATCH /pedidos/:id (Actualización general)
  async editar(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.pedidoAppService.editar(id, req.body);
      res.json(result); 
    } catch (err) {
      next(err);
    }
  }

  // PATCH /pedidos/:id/estado (Actualización específica de estado)
  async cambiarEstado(req, res, next) {
    try {
      const id = Number(req.params.id);
      const { estado } = req.body;
      const result = await this.pedidoAppService.cambiarEstado(id, estado);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  // DELETE /pedidos/:id
  async eliminar(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.pedidoAppService.eliminar(id);
      res.json(result); // { data: { ok: true } }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PedidoController;