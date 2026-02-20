class PedidoController {
  constructor(pedidoAppService) {
    this.pedidoAppService = pedidoAppService;

    // Bind para conservar el contexto de this
    this.crear = this.crear.bind(this);
    this.listar = this.listar.bind(this);
    this.obtener = this.obtener.bind(this);
    this.editar = this.editar.bind(this);
    this.cambiarEstado = this.cambiarEstado.bind(this);
    this.eliminar = this.eliminar.bind(this);
    this.obtenerUltimoPorCliente = this.obtenerUltimoPorCliente.bind(this);
  }


  // POST /pedidos
  async crear(req, res, next) {
    try {
      const payload = req.body;
      
      // CAMBIO CLAVE: Usamos 'usuario' para que coincida con tu middleware
      if (req.usuario && req.usuario.rol === 'REPARTIDOR') {
        console.log("Middleware detectado. Usuario:", req.usuario.username, "Reparto:", req.usuario.repartoId);
        
        if (!req.usuario.repartoId) {
            throw new Error('El usuario repartidor no tiene un repartoId asignado.');
        }
        
        // Aquí ocurre la magia: pisamos el 0 del front con el 1 del token
        payload.repartoId = req.usuario.repartoId;
      }

      const result = await this.pedidoAppService.crear(payload);
      res.status(201).json(result); 
    } catch (err) {
      console.error("Error en PedidoController:", err.message);
      next(err);
    }
  }

  // GET /pedidos
  async listar(req, res, next) {
    try {
      const query = { ...req.query };
      
      // CAMBIO: req.usuario
      if (req.usuario && req.usuario.rol === 'REPARTIDOR') {
        query.repartoId = req.usuario.repartoId;
      }

      const result = await this.pedidoAppService.listar(query);
      res.json(result); 
    } catch (err) {
      next(err);
    }
  }

  // GET /pedidos/:id
  async obtener(req, res, next) {
    try {
      const id = Number(req.params.id);
      const result = await this.pedidoAppService.obtener(id);
      
      // SEGURIDAD (Opcional pero recomendada): Evitar que un repartidor vea pedidos de otro camión por URL directa
      if (req.usuario && req.usuario.rol === 'REPARTIDOR' && result.data.repartoId !== req.usuario.repartoId) {
         return res.status(403).json({ message: "Acceso denegado. Este pedido pertenece a otro reparto." });
      }

      res.json(result); 
    } catch (err) {
      next(err);
    }
  }

  // PATCH /pedidos/:id (Actualización general)
  async editar(req, res, next) {
    try {
      const id = Number(req.params.id);
      const payload = req.body;

      // SEGURIDAD: Evitar que al editar, el repartidor asigne el pedido a otro camión
      if (req.usuario && req.usuario.rol === 'REPARTIDOR') {
        payload.repartoId = req.usuario.repartoId;
      }

      const result = await this.pedidoAppService.editar(id, payload);
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
      // SEGURIDAD EXTREMA: Un repartidor jamás puede borrar un pedido, aunque logre mandar la petición HTTP
      if (req.usuario && req.usuario.rol === 'REPARTIDOR') {
         return res.status(403).json({ message: "Los repartidores no tienen permisos para eliminar pedidos." });
      }

      const id = Number(req.params.id);
      const result = await this.pedidoAppService.eliminar(id);
      res.json(result); 
    } catch (err) {
      next(err);
    }
  }

  // GET /pedidos/ultimo/:clienteId
  async obtenerUltimoPorCliente(req, res, next) {
    try {
      const clienteId = Number(req.params.clienteId);
      const result = await this.pedidoAppService.obtenerUltimoPorCliente(clienteId);
      
      // Si no hay pedido, 404 limpio
      if (!result.data) {
        return res.status(404).json({ message: "No se encontraron pedidos previos para este cliente" });
      }
      
      // SEGURIDAD: Evitar que al precargar, lea el pedido de un cliente que fue atendido por otro camión
      if (req.usuario && req.usuario.rol === 'REPARTIDOR' && result.data.repartoId !== req.usuario.repartoId) {
        return res.status(404).json({ message: "El último pedido de este cliente pertenece a otro reparto." });
      }

      res.json(result); 
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PedidoController;