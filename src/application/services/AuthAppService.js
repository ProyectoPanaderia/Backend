const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 

class AuthAppService { 
  constructor({ usuarioRepo, empleadoRepo }) { 
    this.usuarioRepo = usuarioRepo;
    this.empleadoRepo = empleadoRepo;
  } 

  async login(username, password) { 
    // 1. Buscamos el usuario
    const usuario = await this.usuarioRepo.buscarPorUsername(username); 
     
    if (!usuario) throw new Error('Credenciales inválidas'); 

    // 2. Validamos contraseña
    const passwordValida = await bcrypt.compare(password, usuario.password); 
    if (!passwordValida) throw new Error('Credenciales inválidas'); 

    let repartoIdFinal = null;

    // 3. Lógica de vinculación de Reparto
    if (this.empleadoRepo) {
      const resultadoEmpleado = await this.empleadoRepo.findAll({ usuarioId: usuario.id });
      
      if (resultadoEmpleado && resultadoEmpleado.data && resultadoEmpleado.data.length > 0) {
        // Obtenemos la primera coincidencia
        const filaCruda = resultadoEmpleado.data[0];
        const data = typeof filaCruda.get === 'function' ? filaCruda.get({ plain: true }) : filaCruda;

        console.log("DEBUG LOGIN - Procesando estructura para:", usuario.username, data);

        /**
         * EXTRACCIÓN DINÁMICA:
         * Buscamos el ID tanto si la DB devuelve el Empleado directo 
         * como si devuelve el Reparto con el Empleado anidado.
         */
        const idDesdeEmpleado = data.repartoId || data.repartold;
        const idDesdeRelacion = data.Empleado ? (data.Empleado.repartoId || data.Empleado.repartold) : null;
        
        repartoIdFinal = idDesdeEmpleado || idDesdeRelacion || null;

        // SEGURIDAD EXTRA: Si es ADMIN y el ID detectado es de otro usuario, forzamos null
        if (usuario.rol === 'ADMINISTRADOR' && data.usuarioId !== usuario.id && (!data.Empleado || data.Empleado.usuarioId !== usuario.id)) {
            console.log("[AuthService] Limpiando repartoId accidental para Administrador");
            repartoIdFinal = null;
        }
      }
    }

    // 4. Generación de Payload y Token
    const payload = { 
      id: usuario.id, 
      username: usuario.username, 
      rol: usuario.rol, 
      repartoId: repartoIdFinal  
    }; 

    console.log(`[AuthService] Login exitoso: ${usuario.username} | Rol: ${usuario.rol} | Reparto: ${repartoIdFinal}`);

    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secreto_super_seguro_para_desarrollo', { 
      expiresIn: '8h'  
    }); 

    return { 
      usuario: payload, 
      token 
    }; 
  } 
} 

module.exports = AuthAppService;