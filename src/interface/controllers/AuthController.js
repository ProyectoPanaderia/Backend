class AuthController {
  constructor(authAppService) {
    this.authAppService = authAppService;
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      // Llamamos al servicio inyectado
      const resultado = await this.authAppService.login(username, password);
      return res.status(200).json(resultado);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

module.exports = AuthController;