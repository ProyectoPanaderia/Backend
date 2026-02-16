class VehiculoController {
  constructor(vehiculoAppService) {
    this.vehiculoAppService = vehiculoAppService;

    this.crear = this.crear.bind(this);
    this.listar = this.listar.bind(this);
    this.obtener = this.obtener.bind(this);
    this.obtenerPorReparto = this.obtenerPorReparto.bind(this);
    this.editar = this.editar.bind(this);
    this.eliminar = this.eliminar.bind(this);
  }

  async crear(req, res, next) {
    try {
      const result = await this.vehiculoAppService.crear(req.body);
      res
        .status(201)
        .location(`/vehiculos/${result.data.id}`)
        .json(result);
    } catch (err) {
      next(err);
    }
  }

  async listar(req, res, next) {
    try {
      const result = await this.vehiculoAppService.listar(req.query);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async obtener(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.vehiculoAppService.obtener(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async obtenerPorReparto(req, res, next) {
    try {
      const repartoId = Number(req.params.repartoId);
      const result = await this.vehiculoAppService.obtenerPorReparto(repartoId);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async editar(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.vehiculoAppService.editar(id, req.body);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async eliminar(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.vehiculoAppService.eliminar(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = VehiculoController;