const CreatePrecioProductoDTO = require('../dtos/PrecioProductoDTO/CreatePrecioProductoDTO');
const UpdatePrecioProductoDTO = require('../dtos/PrecioProductoDTO/UpdatePrecioProductoDTO');
const PrecioProductoFilterDTO = require('../dtos/PrecioProductoDTO/PrecioProductoFilterDTO');
const precioProductoDTO = require('../dtos/PrecioProductoDTO/PrecioProductoDTO');

class PrecioProductoAppService {
  /**
   * @param {{ precioProductoRepo: import('../../domain/repositories/precioProductoRepository'), productoRepo: import('../../domain/repositories/productoRepository') }} deps
   */
  constructor({ precioProductoRepo, productoRepo }) {
    this.precioProductoRepo = precioProductoRepo;
    this.productoRepo = productoRepo;
  }

  // Crear nuevo precio
  async crear(payload) {
    const dto = new CreatePrecioProductoDTO(payload);

    // Validar que el producto existe
    const producto = await this.productoRepo.findById(dto.productoId);
    if (!producto) throw new Error('Producto no encontrado');

    const created = await this.precioProductoRepo.create(dto);
    return { data: precioProductoDTO(created) };
  }

  // Listar precios con filtros
  async listar(query) {
    const filter = new PrecioProductoFilterDTO(query);
    const result = await this.precioProductoRepo.findAll(filter);
    return {
      data: result.data.map(precioProductoDTO),
      meta: result.meta,
    };
  }

  // Obtener precio por ID
  async obtener(id) {
    const precio = await this.precioProductoRepo.findById(Number(id));
    if (!precio) throw new Error('Precio no encontrado');
    return { data: precioProductoDTO(precio) };
  }

  // Obtener precio vigente para un producto en una fecha
  async obtenerVigente(productoId, fecha, nombre = 'reventa') {
    const precio = await this.precioProductoRepo.findVigenteByProducto(
      Number(productoId),
      fecha,
      nombre
    );
    if (!precio) {
      throw new Error(`No hay precio vigente para el producto ${productoId} en la fecha ${fecha}`);
    }
    return { data: precioProductoDTO(precio) };
  }

  // Editar precio
  async editar(id, payload) {
    const dto = new UpdatePrecioProductoDTO(payload);

    // Si se actualiza el producto, validar que existe
    if (dto.productoId !== undefined) {
      const producto = await this.productoRepo.findById(dto.productoId);
      if (!producto) throw new Error('Producto no encontrado');
    }

    const updated = await this.precioProductoRepo.update(Number(id), dto);
    if (!updated) throw new Error('Precio no encontrado');
    return { data: precioProductoDTO(updated) };
  }

  // Eliminar precio
  async eliminar(id) {
    const ok = await this.precioProductoRepo.delete(Number(id));
    if (!ok) throw new Error('Precio no encontrado');
    return { data: { ok: true } };
  }
}

module.exports = PrecioProductoAppService;