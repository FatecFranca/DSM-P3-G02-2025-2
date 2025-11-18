import pedidoService from '../services/pedidoService.js';

class PedidoController {
  async getAll(req, res, next) {
    try {
      const filters = {
        cliente_id: req.query.cliente_id,
        status: req.query.status
      };

      const pedidos = await pedidoService.findAll(filters);
      res.json(pedidos);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const pedido = await pedidoService.findById(id);

      if (!pedido) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }

      res.json(pedido);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const pedido = await pedidoService.create(req.body);
      res.status(201).json(pedido);
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const pedido = await pedidoService.updateStatus(id, status);
      res.json(pedido);
    } catch (error) {
      next(error);
    }
  }

  async cancel(req, res, next) {
    try {
      const { id } = req.params;
      const pedido = await pedidoService.cancel(id);
      res.json(pedido);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await pedidoService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new PedidoController();
