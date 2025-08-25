class ProductoController {
  constructor(productoAppService) {
    this.productoAppService = productoAppService;

    // bind
    this.crear   = this.crear.bind(this);
    this.listar  = this.listar.bind(this);
    this.obtener = this.obtener.bind(this);
    this.editar  = this.editar.bind(this);
    this.eliminar= this.eliminar.bind(this);
  }

  // POST /productos
  async crear(req, res, next) {
    try {
      const result = await this.productoAppService.crear(req.body);
      res
        .status(201)
        .location(`/productos/${result.data.id}`)
        .json(result); // { data: {...} }
    } catch (err) { next(err); }
  }

  // GET /productos?q=&minPeso=&maxPeso=&page=&pageSize=&orderBy=&orderDir=
  async listar(req, res, next) {
    try {
      const result = await this.productoAppService.listar(req.query);
      res.json(result); // { data: [...], meta: {...} }
    } catch (err) { next(err); }
  }

  // GET /productos/:id
  async obtener(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.productoAppService.obtener(id);
      res.json(result); // { data: {...} }
    } catch (err) { next(err); }
  }

  // PUT /productos/:id
  async editar(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.productoAppService.editar(id, req.body);
      res.json(result); // { data: {...} }
    } catch (err) { next(err); }
  }

  // DELETE /productos/:id
  async eliminar(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.productoAppService.eliminar(id);
      res.json(result); // { data: { ok: true } }
    } catch (err) { next(err); }
  }
}

module.exports = ProductoController;