const { Router } = require('express');
const AuthController = require('../../../interface/controllers/AuthController'); 

module.exports = function authRoutesFactory({ authAppService }) {
  const router = Router();
  const controller = new AuthController(authAppService);

  router.post('/login', (req, res) => controller.login(req, res));

  return router;
};