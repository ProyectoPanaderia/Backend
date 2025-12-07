const CreateCiudadDTO = require('../dtos/CiudadDTO/CreateCiudadDTO');
const UpdateCiudadDTO = require('../dtos/CiudadDTO/UpdateCiudadDTO');
const ciudadDTO = require('../dtos/CiudadDTO/CiudadDTO');

class CiudadAppService {

/**
 * @param {{ ciudadRepo: import('../../domain/repositories/ciudadRepository') }} deps
*/

  constructor({ ciudadRepo }) {
    this.ciudadRepo = ciudadRepo;
  }

  async crear(payload) {
    const dto = new CreateCiudadDTO(payload);
    const created = await this.ciudadRepo.create(dto);
    return { data: ciudadDTO(created) };
  }

  async listar() {
    const result = await this.ciudadRepo.findAll();
    return {
      data: result.data.map(ciudadDTO),
      meta: result.meta
    };
  }

  async obtener(id) {
    const ciudad = await this.ciudadRepo.findById(Number(id));
    if (!ciudad) throw new Error('Ciudad no encontrada');
    return { data: ciudadDTO(ciudad) };
  }

  async editar(id, payload) {
    const dto = new UpdateCiudadDTO(payload);
    const updated = await this.ciudadRepo.update(Number(id), dto);
    if (!updated) throw new Error('Ciudad no encontrada');
    return { data: ciudadDTO(updated) };
  }

  async eliminar(id) {
    const ok = await this.ciudadRepo.delete(Number(id));
    if (!ok) throw new Error('Ciudad no encontrada');
    return { data: { ok: true } };
  }
}

module.exports = CiudadAppService;