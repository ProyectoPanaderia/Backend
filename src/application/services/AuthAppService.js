const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 

class AuthAppService { 
  constructor({ usuarioRepo, empleadoRepo }) { 
    this.usuarioRepo = usuarioRepo;
    this.empleadoRepo = empleadoRepo;
  } 

  async login(username, password) { 
    const usuario = await this.usuarioRepo.buscarPorUsername(username); 
     
    if (!usuario) { 
      throw new Error('Credenciales inválidas'); 
    } 

    const passwordValida = await bcrypt.compare(password, usuario.password); 
    if (!passwordValida) { 
      throw new Error('Credenciales inválidas'); 
    }

    // BUSCAMOS EL PERFIL DEL EMPLEADO
    // Usamos el método que creamos para vincular el usuario con su reparto
    const resultadoEmpleado = await this.empleadoRepo.findAll({ usuarioId: usuario.id });
    const empleado = resultadoEmpleado.data.length > 0 ? resultadoEmpleado.data[0] : null;

    const payload = { 
      id: usuario.id, 
      username: usuario.username, 
      rol: usuario.rol, 
      // El repartoId ahora viene del perfil del empleado
      repartoId: empleado ? empleado.repartoId : null  
    }; 

    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secreto_super_seguro_para_desarrollo', { 
      expiresIn: '8h'  
    }); 

    return { usuario: payload, token }; 
  } 
} 

module.exports = AuthAppService;