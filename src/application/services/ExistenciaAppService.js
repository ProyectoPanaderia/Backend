const CreateExistenciaDTO = require('../dtos/ExistenciaDTO/CreateExistenciaDTO');
const UpdateExistenciaDTO = require('../dtos/ExistenciaDTO/UpdateExistenciaDTO');
const ExistenciaFilterDTO = require('../dtos/ExistenciaDTO/ExistenciaFilterDTO');
const existenciaDTO = require('../dtos/ExistenciaDTO/ExistenciaDTO');

class ExistenciaAppService {
  constructor({ existenciaRepo }) {
    this.existenciaRepo = existenciaRepo;
  }

  async crear(payload) {
    const dto = new CreateExistenciaDTO(payload);
    const created = await this.existenciaRepo.create(dto);
    return { data: existenciaDTO(created) };
  }

  async listar(query) {
    const filter = new ExistenciaFilterDTO(query);
    const result = await this.existenciaRepo.findAll(filter);
    return {
      data: result.data.map(existenciaDTO),
      meta: result.meta
    };
  }

  async obtener(id) {
    const existencia = await this.existenciaRepo.findById(Number(id));
    if (!existencia) throw new Error('Existencia no encontrada');
    return { data: existenciaDTO(existencia) };
  }

  async editar(id, payload) {
    const dto = new UpdateExistenciaDTO(payload);
    const updated = await this.existenciaRepo.update(Number(id), dto);
    if (!updated) throw new Error('Existencia no encontrada o no se pudo actualizar');
    return { data: existenciaDTO(updated) };
  }

  async eliminar(id) {
    const ok = await this.existenciaRepo.delete(Number(id));
    if (!ok) throw new Error('Existencia no encontrada');
    return { data: { ok: true } };
  }
}

module.exports = ExistenciaAppService;