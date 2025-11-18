import fornecedorService from '../services/fornecedorService.js';

class FornecedorController {
  async getAll(req, res, next) {
    try {
      const fornecedores = await fornecedorService.findAll();
      res.json(fornecedores);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const fornecedor = await fornecedorService.findById(id);

      if (!fornecedor) {
        return res.status(404).json({ error: 'Fornecedor não encontrado' });
      }

      res.json(fornecedor);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const fornecedor = await fornecedorService.create(req.body);
      res.status(201).json(fornecedor);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const fornecedor = await fornecedorService.update(id, req.body);
      res.json(fornecedor);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await fornecedorService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async addProduto(req, res, next) {
    try {
      const { id } = req.params;
      const { produto_id, preco_compra } = req.body;

      const result = await fornecedorService.addProduto(id, produto_id, preco_compra);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async removeProduto(req, res, next) {
    try {
      const { id, produto_id } = req.params;

      await fornecedorService.removeProduto(id, produto_id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new FornecedorController();
