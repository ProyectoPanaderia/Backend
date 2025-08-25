const CreateProductoDTO = require('../dtos/ProductoDTO/CreateProductoDTO');
const UpdateProductoDTO = require('../dtos/ProductoDTO/UpdateProductoDTO');
const ProductoFilterDTO = require('../dtos/ProductoDTO/ProductoFilterDTO');
const productoDTO = require('../dtos/ProductoDTO/ProductoDTO');

class ProductoAppService {
  constructor({ productoRepo }) { this.productoRepo = productoRepo; }

  async crear(payload) {
    const dto = new CreateProductoDTO(payload);
    const created = await this.productoRepo.create(dto);
    return { data: productoDTO(created) };
  }

  async listar(query) {
    const filter = new ProductoFilterDTO(query);
    const result = await this.productoRepo.findAll(filter);
    return { data: result.data.map(productoDTO), meta: result.meta };
  }

  async obtener(id) {
    const prod = await this.productoRepo.findById(Number(id));
    if (!prod) throw new Error('Producto no encontrado');
    return { data: productoDTO(prod) };
  }

  async editar(id, payload) {
    const dto = new UpdateProductoDTO(payload);
    const updated = await this.productoRepo.update(Number(id), dto);
    if (!updated) throw new Error('Producto no encontrado');
    return { data: productoDTO(updated) };
  }

  async eliminar(id) {
    const ok = await this.productoRepo.delete(Number(id));
    if (!ok) throw new Error('Producto no encontrado');
    return { data: { ok: true } };
  }
}

module.exports = ProductoAppService;