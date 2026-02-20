class DevolucionController {
  constructor(devolucionAppService) {
    this.devolucionAppService = devolucionAppService;

    // Bind para conservar el contexto de this
    this.crear = this.crear.bind(this);
    this.listar = this.listar.bind(this);
    this.obtener = this.obtener.bind(this);
    this.editar = this.editar.bind(this);
    this.eliminar = this.eliminar.bind(this);
  }

  // POST /devoluciones
  async crear(req, res, next) {
    try {
      const payload = req.body;
      
      // SEGURIDAD: Si es repartidor, forzamos su ID de camión
      if (req.usuario && req.usuario.rol === 'REPARTIDOR') {
        if (!req.usuario.repartoId) {
            throw new Error('El usuario repartidor no tiene un repartoId asignado.');
        }
        payload.repartoId = req.usuario.repartoId;
      }

      const result = await this.devolucionAppService.crear(payload);
      res.status(201).json(result); 
    } catch (err) {
      console.error("Error en DevolucionController:", err.message);
      next(err);
    }
  }

  // GET /devoluciones
  async listar(req, res, next) {
    try {
      const query = { ...req.query };
      
      // SEGURIDAD: El repartidor solo ve las devoluciones de su camión
      if (req.usuario && req.usuario.rol === 'REPARTIDOR') {
        query.repartoId = req.usuario.repartoId;
      }

      const result = await this.devolucionAppService.listar(query);
      res.json(result); 
    } catch (err) {
      next(err);
    }
  }

  // GET /devoluciones/:id
  async obtener(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.devolucionAppService.obtener(id);
      
      // SEGURIDAD: Evitar que un repartidor vea devoluciones de otro camión
      if (req.usuario && req.usuario.rol === 'REPARTIDOR' && result.data.repartoId !== req.usuario.repartoId) {
         return res.status(403).json({ message: "Acceso denegado. Esta devolución pertenece a otro reparto." });
      }

      res.json(result); 
    } catch (err) {
      next(err);
    }
  }

  // PATCH /devoluciones/:id
  async editar(req, res, next) {
    try {
      const id = Number(req.params.id);
      const payload = req.body;

      // SEGURIDAD: Evitar que al editar, el repartidor asigne la devolución a otro camión
      if (req.usuario && req.usuario.rol === 'REPARTIDOR') {
        payload.repartoId = req.usuario.repartoId;
      }

      const result = await this.devolucionAppService.editar(id, payload);
      res.json(result); 
    } catch (err) {
      next(err);
    }
  }

  // DELETE /devoluciones/:id
  async eliminar(req, res, next) {
    try {
      // SEGURIDAD EXTREMA: Un repartidor no puede borrar devoluciones (para evitar fraudes)
      if (req.usuario && req.usuario.rol === 'REPARTIDOR') {
         return res.status(403).json({ message: "Los repartidores no tienen permisos para eliminar devoluciones." });
      }

      const id = Number(req.params.id);
      const result = await this.devolucionAppService.eliminar(id);
      res.json(result); 
    } catch (err) {
      next(err);
    }
  }
}

module.exports = DevolucionController;