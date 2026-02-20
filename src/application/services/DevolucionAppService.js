const CreateDevolucionDTO = require('../dtos/DevolucionDTO/CreateDevolucionDTO');
const UpdateDevolucionDTO = require('../dtos/DevolucionDTO/UpdateDevolucionDTO');
const DevolucionFilterDTO = require('../dtos/DevolucionDTO/DevolucionFilterDTO');
const DevolucionDTO = require('../dtos/DevolucionDTO/DevolucionDTO'); 

class DevolucionAppService {
  /**
   * @param {{ devolucionRepo: import('../../domain/repositories/devolucionRepository') }} deps
   */
  constructor({ devolucionRepo }) { 
    this.devolucionRepo = devolucionRepo; 
  }

  async crear(payload) {
    // El DTO ya valida que vengan líneas y calcula el total de la cabecera
    const dto = new CreateDevolucionDTO(payload);
    
    // El repositorio se encargará de guardar cabecera y líneas en una transacción
    const created = await this.devolucionRepo.create(dto);
    
    return { data: new DevolucionDTO(created) };
  }

  async listar(query) {
    const filter = new DevolucionFilterDTO(query);
    const result = await this.devolucionRepo.findAll(filter);
    
    return { 
      data: result.data.map(d => new DevolucionDTO(d)), 
      meta: result.meta 
    };
  }

  async obtener(id) {
    const devolucion = await this.devolucionRepo.findById(Number(id));
    if (!devolucion) throw new Error('Devolución no encontrada');
    return { data: new DevolucionDTO(devolucion) };
  }

  async editar(id, payload) {
    const dto = new UpdateDevolucionDTO(payload);
    const updated = await this.devolucionRepo.update(Number(id), dto);
    
    if (!updated) throw new Error('Devolución no encontrada');
    return { data: new DevolucionDTO(updated) };
  }

  async eliminar(id) {
    const ok = await this.devolucionRepo.delete(Number(id));
    if (!ok) throw new Error('Devolución no encontrada');
    return { data: { ok: true } };
  }
}

module.exports = DevolucionAppService;