const CreateLineaRemitoDTO = require('../dtos/LineaRemitoDTO/CreateLineaRemitoDTO');
const UpdateLineaRemitoDTO = require('../dtos/LineaRemitoDTO/UpdateLineaRemitoDTO');
const LineaRemitoFilterDTO = require('../dtos/LineaRemitoDTO/LineaRemitoFilterDTO');
const lineaRemitoDTO = require('../dtos/LineaRemitoDTO/LineaRemitoDTO');

class LineaRemitoAppService {
  /**
   * @param {{ lineaRemitoRepo: import('../../domain/repositories/lineaRemitoRepository'), remitoRepo: import('../../domain/repositories/remitoRepository'), existenciaRepo: import('../../domain/repositories/existenciaRepository') }} deps
   */
  constructor({ lineaRemitoRepo, remitoRepo, existenciaRepo }) {
    this.lineaRemitoRepo = lineaRemitoRepo;
    this.remitoRepo = remitoRepo;
    this.existenciaRepo = existenciaRepo;
  }

  // Crear nueva línea de remito
  async crear(payload) {
    const dto = new CreateLineaRemitoDTO(payload);

    // Validar que el remito existe
    const remito = await this.remitoRepo.findById(dto.remitoId);
    if (!remito) throw new Error('Remito no encontrado');

    // Validar que la existencia existe
    const existencia = await this.existenciaRepo.findById(dto.existenciaId);
    if (!existencia) throw new Error('Existencia no encontrada');

    // Validar que hay suficiente cantidad en stock
    if (existencia.cantidad < dto.cantidad) {
      throw new Error(`Stock insuficiente. Disponible: ${existencia.cantidad}, Solicitado: ${dto.cantidad}`);
    }

    const created = await this.lineaRemitoRepo.create(dto);
    return { data: lineaRemitoDTO(created) };
  }

  // Listar líneas de remito con filtros y paginación
  async listar(query) {
    const filter = new LineaRemitoFilterDTO(query);
    const result = await this.lineaRemitoRepo.findAll(filter);
    return {
      data: result.data.map(lineaRemitoDTO),
      meta: result.meta,
    };
  }

  // Obtener línea de remito por ID
  async obtener(id) {
    const linea = await this.lineaRemitoRepo.findById(Number(id));
    if (!linea) throw new Error('Línea de remito no encontrada');
    return { data: lineaRemitoDTO(linea) };
  }

  // Listar todas las líneas de un remito específico
  async obtenerPorRemito(remitoId) {
    const lineas = await this.lineaRemitoRepo.findByRemitoId(Number(remitoId));
    if (!lineas || lineas.length === 0) {
      throw new Error('No hay líneas para este remito');
    }
    
    return {
      data: lineas.map(lineaRemitoDTO),
      meta: { total: lineas.length }
    };
  }

  // Editar línea de remito existente
  async editar(id, payload) {
    const dto = new UpdateLineaRemitoDTO(payload);

    // Si se actualiza existenciaId, validar que existe
    if (dto.existenciaId !== undefined) {
      const existencia = await this.existenciaRepo.findById(dto.existenciaId);
      if (!existencia) throw new Error('Existencia no encontrada');
    }

    // Si se actualiza cantidad, validar stock
    if (dto.cantidad !== undefined) {
      const linea = await this.lineaRemitoRepo.findById(Number(id));
      if (!linea) throw new Error('Línea de remito no encontrada');
      
      const existencia = await this.existenciaRepo.findById(linea.existenciaId);
      if (existencia.cantidad < dto.cantidad) {
        throw new Error(`Stock insuficiente. Disponible: ${existencia.cantidad}, Solicitado: ${dto.cantidad}`);
      }
    }

    const updated = await this.lineaRemitoRepo.update(Number(id), dto);
    if (!updated) throw new Error('Línea de remito no encontrada');
    return { data: lineaRemitoDTO(updated) };
  }

  // Eliminar línea de remito
  async eliminar(id) {
    const ok = await this.lineaRemitoRepo.delete(Number(id));
    if (!ok) throw new Error('Línea de remito no encontrada');
    return { data: { ok: true } };
  }

  // Calcular subtotal de un remito (suma de todas sus líneas)
  async calcularTotalRemito(remitoId) {
    const lineas = await this.lineaRemitoRepo.findByRemitoId(Number(remitoId));
    const total = lineas.reduce((sum, linea) => sum + linea.subtotal, 0);
    return {
      data: {
        remitoId,
        totalCalculado: total,
        cantidadLineas: lineas.length
      }
    };
  }
}

module.exports = LineaRemitoAppService;