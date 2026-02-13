class LineaPedidoController {
  constructor(lineaPedidoAppService) {
    this.lineaPedidoAppService = lineaPedidoAppService;

    // Bind para conservar el contexto de this
    this.crear = this.crear.bind(this);
    this.listar = this.listar.bind(this);
    this.obtener = this.obtener.bind(this);
    this.editar = this.editar.bind(this);
    this.eliminar = this.eliminar.bind(this);
  }

  // POST /linea-pedidos
  // Body esperado: { pedidoId: 1, productoId: 5, cantidad: 10, ... }
  async crear(req, res, next) {
    try {
      const result = await this.lineaPedidoAppService.crear(req.body);
      res
        .status(201)
        .location(`/linea-pedidos/${result.data.id}`)
        .json(result); // { data: {...} }
    } catch (err) {
      next(err);
    }
  }

  // GET /linea-pedidos
  // Soporta filtros via query params: ?pedidoId=100&productoId=5&descripcion=pan
  async listar(req, res, next) {
    try {
      const result = await this.lineaPedidoAppService.listar(req.query);
      res.json(result); // { data: [...], meta: {...} }
    } catch (err) {
      next(err);
    }
  }

  // GET /linea-pedidos/:id
  async obtener(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.lineaPedidoAppService.obtener(id);
      res.json(result); // { data: {...} }
    } catch (err) {
      next(err);
    }
  }

  // PATCH /linea-pedidos/:id
  // Body esperado: { cantidad: 20 } (o lo que quieras cambiar)
  async editar(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.lineaPedidoAppService.editar(id, req.body);
      res.json(result); // { data: {...} }
    } catch (err) {
      next(err);
    }
  }

  // DELETE /linea-pedidos/:id
  async eliminar(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.lineaPedidoAppService.eliminar(id);
      res.json(result); // { data: { ok: true } }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = LineaPedidoController;