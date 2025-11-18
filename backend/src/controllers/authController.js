import authService from '../services/authService.js';

class AuthController {
  async loginArtista(req, res, next) {
    try {
      const { email, senha } = req.body;
      const result = await authService.loginArtista(email, senha);
      res.json(result);
    } catch (error) {
      if (error.message === 'Credenciais inválidas') {
        return res.status(401).json({ error: error.message });
      }
      next(error);
    }
  }

  async loginCliente(req, res, next) {
    try {
      const { email, senha } = req.body;
      const result = await authService.loginCliente(email, senha);
      res.json(result);
    } catch (error) {
      if (error.message === 'Credenciais inválidas') {
        return res.status(401).json({ error: error.message });
      }
      next(error);
    }
  }

  async registerArtista(req, res, next) {
    try {
      const result = await authService.registerArtista(req.body);
      res.status(201).json(result);
    } catch (error) {
      if (error.message === 'Email já cadastrado') {
        return res.status(400).json({ error: error.message });
      }
      next(error);
    }
  }

  async registerCliente(req, res, next) {
    try {
      const result = await authService.registerCliente(req.body);
      res.status(201).json(result);
    } catch (error) {
      if (error.message === 'Email já cadastrado' || error.message === 'CPF já cadastrado') {
        return res.status(400).json({ error: error.message });
      }
      next(error);
    }
  }

  async getProfile(req, res, next) {
    try {
      res.json({ user: req.user });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
