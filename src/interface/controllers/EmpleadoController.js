class EmpleadoController {
  constructor(empleadoAppService) {
    this.empleadoAppService = empleadoAppService;

    this.crear = this.crear.bind(this);
    this.listar = this.listar.bind(this);
    this.obtener = this.obtener.bind(this);
    this.obtenerPorReparto = this.obtenerPorReparto.bind(this);
    this.obtenerPorUsuario = this.obtenerPorUsuario.bind(this);
    this.editar = this.editar.bind(this);
    this.eliminar = this.eliminar.bind(this);
  }

  async crear(req, res, next) {
    try {
      const result = await this.empleadoAppService.crear(req.body);
      res
        .status(201)
        .location(`/empleados/${result.data.id}`)
        .json(result);
    } catch (err) {
      next(err);
    }
  }

  async listar(req, res, next) {
    try {
      const result = await this.empleadoAppService.listar(req.query);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async obtener(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.empleadoAppService.obtener(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async obtenerPorReparto(req, res, next) {
    try {
      const repartoId = Number(req.params.repartoId);
      const result = await this.empleadoAppService.obtenerPorReparto(repartoId);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

    async obtenerPorUsuario(req, res, next) {
    try {
      const usuarioId = Number(req.params.usuarioId);
      const result = await this.empleadoAppService.obtenerPorUsuario(usuarioId);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async editar(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.empleadoAppService.editar(id, req.body);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  async eliminar(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.empleadoAppService.eliminar(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = EmpleadoController;