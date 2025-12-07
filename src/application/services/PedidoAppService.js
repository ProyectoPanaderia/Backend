const CreatePedidoDTO = require('../dtos/PedidoDTO/CreatePedidoDTO');
const UpdatePedidoDTO = require('../dtos/PedidoDTO/UpdatePedidoDTO');
const PedidoFilterDTO = require('../dtos/PedidoDTO/PedidoFilterDTO');
const pedidoDTO = require('../dtos/PedidoDTO/PedidoDTO'); 

class PedidoAppService {
  constructor({ pedidoRepo }) { 
    this.pedidoRepo = pedidoRepo; 
  }

  async crear(payload) {
    const dto = new CreatePedidoDTO(payload);
    const created = await this.pedidoRepo.create(dto);
    return { data: pedidoDTO(created) };
  }

  async listar(query) {
    const filter = new PedidoFilterDTO(query);
    const result = await this.pedidoRepo.findAll(filter);
    
    return { 
      data: result.data.map(pedidoDTO), 
      meta: result.meta 
    };
  }

  async obtener(id) {
    const pedido = await this.pedidoRepo.findById(Number(id));
    if (!pedido) throw new Error('Pedido no encontrado');
    return { data: pedidoDTO(pedido) };
  }

  async editar(id, payload) {
    const dto = new UpdatePedidoDTO(payload);
    const updated = await this.pedidoRepo.update(Number(id), dto);
    
    if (!updated) throw new Error('Pedido no encontrado');
    return { data: pedidoDTO(updated) };
  }

  async eliminar(id) {
    const ok = await this.pedidoRepo.delete(Number(id));
    if (!ok) throw new Error('Pedido no encontrado');
    return { data: { ok: true } };
  }
}

module.exports = PedidoAppService;