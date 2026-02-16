const CreateDevolucionDTO = require('../dtos/DevolucionDTO/CreateDevolucionDTO');
const UpdateDevolucionDTO = require('../dtos/DevolucionDTO/UpdateDevolucionDTO');
const DevolucionFilterDTO = require('../dtos/DevolucionDTO/DevolucionFilterDTO');
const devolucionDTO = require('../dtos/DevolucionDTO/DevolucionDTO');

class DevolucionAppService {
  /**
   * @param {{ devolucionRepo: import('../../domain/repositories/devolucionRepository'), repartoRepo: import('../../domain/repositories/repartoRepository') }} deps
   */
  constructor({ devolucionRepo, repartoRepo }) {
    this.devolucionRepo = devolucionRepo;
    this.repartoRepo = repartoRepo;
  }

  // Crear nueva devolución
  async crear(payload) {
    const dto = new CreateDevolucionDTO(payload);

    // Validar que el reparto existe
    const reparto = await this.repartoRepo.findById(dto.repartoId);
    if (!reparto) throw new Error('Reparto no encontrado');

    const created = await this.devolucionRepo.create(dto);
    return { data: devolucionDTO(created) };
  }

  // Listar devoluciones con filtros y paginación
  async listar(query) {
    const filter = new DevolucionFilterDTO(query);
    const result = await this.devolucionRepo.findAll(filter);
    return {
      data: result.data.map(devolucionDTO),
      meta: result.meta,
    };
  }

  // Obtener devolución por ID
  async obtener(id) {
    const devolucion = await this.devolucionRepo.findById(Number(id));
    if (!devolucion) throw new Error('Devolución no encontrada');
    return { data: devolucionDTO(devolucion) };
  }

  // Listar todas las devoluciones de un reparto específico
  async obtenerPorReparto(repartoId) {
    const devoluciones = await this.devolucionRepo.findByRepartoId(Number(repartoId));
    if (!devoluciones || devoluciones.length === 0) {
      throw new Error('No hay devoluciones para este reparto');
    }
    
    return {
      data: devoluciones.map(devolucionDTO),
      meta: { total: devoluciones.length }
    };
  }

  // Editar devolución existente
  async editar(id, payload) {
    const dto = new UpdateDevolucionDTO(payload);

    // Si se actualiza repartoId, validar que existe
    if (dto.repartoId !== undefined) {
      const reparto = await this.repartoRepo.findById(dto.repartoId);
      if (!reparto) throw new Error('Reparto no encontrado');
    }

    const updated = await this.devolucionRepo.update(Number(id), dto);
    if (!updated) throw new Error('Devolución no encontrada');
    return { data: devolucionDTO(updated) };
  }

  // Eliminar devolución
  async eliminar(id) {
    const ok = await this.devolucionRepo.delete(Number(id));
    if (!ok) throw new Error('Devolución no encontrada');
    return { data: { ok: true } };
  }

  // Obtener estadísticas de devoluciones por razón
  async obtenerEstadisticas(filtro = {}) {
    const filter = new DevolucionFilterDTO(filtro);
    const result = await this.devolucionRepo.findAll(filter);
    
    // Agrupar por razón
    const porRazon = {};
    result.data.forEach(dev => {
      if (!porRazon[dev.razon]) {
        porRazon[dev.razon] = 0;
      }
      porRazon[dev.razon]++;
    });

    return {
      data: {
        totalDevoluciones: result.data.length,
        porRazon,
        razonesMasComunes: Object.entries(porRazon)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([razon, cantidad]) => ({ razon, cantidad }))
      }
    };
  }
}

module.exports = DevolucionAppService;