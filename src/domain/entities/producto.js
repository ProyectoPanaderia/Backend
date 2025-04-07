class Producto {
  constructor(id, nombre, peso) {
    if (id == null || !nombre || peso == null) {
      throw new Error("Todos los campos son obligatorios");
    }

    this.id = id;
    this.nombre = nombre;
    this.peso = peso;
  }
}

module.exports = Producto;