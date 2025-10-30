const CreateRepartoDTO = require('../dtos/RepartoDTO/CreateRepartoDTO');
const UpdateRepartoDTO = require('../dtos/RepartoDTO/UpdateRepartoDTO');
const RepartoFilterDTO = require('../dtos/RepartoDTO/RepartoFilterDTO');
const repartoDTO = require('../dtos/RepartoDTO/RepartoDTO');

class RepartoAppService {
  constructor({ repartoRepo }) {
    this.repartoRepo = repartoRepo;
  }

  // Crear nuevo reparto
  async crear(payload) {
    const dto = new CreateRepartoDTO(payload);
    const created = await this.repartoRepo.create(dto);
    return { data: repartoDTO(created) };
  }

  // Listar con filtros y paginación
  async listar(query) {
    const filter = new RepartoFilterDTO(query);
    const result = await this.repartoRepo.findAll(filter);
    return {
      data: result.data.map(repartoDTO),
      meta: result.meta,
    };
  }

  // Obtener uno por ID
  async obtener(id) {
    const rep = await this.repartoRepo.findById(Number(id));
    if (!rep) throw new Error('Reparto no encontrado');
    return { data: repartoDTO(rep) };
  }

  // Editar existente
  async editar(id, payload) {
    const dto = new UpdateRepartoDTO(payload);
    const updated = await this.repartoRepo.update(Number(id), dto);
    if (!updated) throw new Error('Reparto no encontrado');
    return { data: repartoDTO(updated) };
  }

  // Eliminar reparto
  async eliminar(id) {
    const ok = await this.repartoRepo.delete(Number(id));
    if (!ok) throw new Error('Reparto no encontrado');
    return { data: { ok: true } };
  }
}

module.exports = RepartoAppService;