const ProductoDTO = require('../dtos/ProductoDTO');

class ProductoAppService {
  constructor(productoRepository) {
    this.productoRepository = productoRepository;
  }

  async crearProducto(dto) {
    // Validaciones de negocio, transformación de DTO a entidad, etc.
    // Puede lanzar errores de dominio
    
    const producto = await this.productoRepository.create(dto);
    return new ProductoDTO(producto);
  }

  async obtenerProductos() {
    const productos = await this.productoRepository.findAll();
    return productos.map(p => new ProductoDTO(p));
  }

  // Otros métodos: actualizar, eliminar, etc.
}
module.exports = ProductoAppService;