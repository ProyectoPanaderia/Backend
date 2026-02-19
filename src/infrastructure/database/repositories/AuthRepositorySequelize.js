const Usuario = require('../models/usuario.js');
const AuthRepository = require('../../../domain/repositories/authRepository.js');

class AuthRepositorySequelize extends AuthRepository {
  async buscarPorUsername(username) {
    return await Usuario.findOne({ 
      where: { username: username } 
    });
  }

  async create(data) {
    return await Usuario.create(data);
  }

  async findAll() {
    const rows = await Usuario.findAll();
    return {
      data: rows,
      meta: { total: rows.length }
    };
  }

  async findById(id) {
    return await Usuario.findByPk(id);
  }

  async update(id, data) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return null;
    return await usuario.update(data);
  }

  async delete(id) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return false;
    await usuario.destroy();
    return true;
  }
}

module.exports = AuthRepositorySequelize;