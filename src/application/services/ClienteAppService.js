const CreateClienteDTO = require('../dtos/ClienteDTO/CreateClienteDTO');
const UpdateClienteDTO = require('../dtos/ClienteDTO/UpdateClienteDTO');
const clienteDTO = require('../dtos/ClienteDTO/ClienteDTO');

class ClienteAppService {
  constructor({ clienteRepo, ciudadRepo }) {
    this.clienteRepo = clienteRepo;
    this.ciudadRepo = ciudadRepo;
  }

  async crear(payload) {
    const dto = new CreateClienteDTO(payload);

    // Validar existencia de la ciudad antes de crear
    if (dto.ciudadId) {
      const ciudad = await this.ciudadRepo.findById(dto.ciudadId);
      if (!ciudad) throw new Error('Ciudad no encontrada');
    }

    const created = await this.clienteRepo.create(dto);
    return { data: clienteDTO(created) };
  }

  async listar() {
    const result = await this.clienteRepo.findAll();
    return {
      data: result.data.map(clienteDTO),
      meta: result.meta
    };
  }

  async obtener(id) {
    const cliente = await this.clienteRepo.findById(Number(id));
    if (!cliente) throw new Error('Cliente no encontrado');
    return { data: clienteDTO(cliente) };
  }

  async editar(id, payload) {
    const dto = new UpdateClienteDTO(payload);

    if (dto.ciudadId) {
      const ciudad = await this.ciudadRepo.findById(dto.ciudadId);
      if (!ciudad) throw new Error('Ciudad no encontrada');
    }

    const updated = await this.clienteRepo.update(Number(id), dto);
    if (!updated) throw new Error('Cliente no encontrado');
    return { data: clienteDTO(updated) };
  }

  async eliminar(id) {
    const ok = await this.clienteRepo.delete(Number(id));
    if (!ok) throw new Error('Cliente no encontrado');
    return { data: { ok: true } };
  }
}

module.exports = ClienteAppService;