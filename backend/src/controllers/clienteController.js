import clienteService from '../services/clienteService.js';

class ClienteController {
  async getAll(req, res, next) {
    try {
      const clientes = await clienteService.findAll();
      res.json(clientes);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const cliente = await clienteService.findById(id);

      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }

      res.json(cliente);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const cliente = await clienteService.create(req.body);
      res.status(201).json(cliente);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const cliente = await clienteService.update(id, req.body);
      res.json(cliente);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await clienteService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new ClienteController();
