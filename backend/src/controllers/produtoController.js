import produtoService from '../services/produtoService.js';

class ProdutoController {
  async getAll(req, res, next) {
    try {
      const filters = {
        artista_id: req.query.artista_id,
        minPreco: req.query.minPreco,
        maxPreco: req.query.maxPreco
      };

      const produtos = await produtoService.findAll(filters);
      res.json(produtos);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const produto = await produtoService.findById(id);

      if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      res.json(produto);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const produto = await produtoService.create(req.body);
      res.status(201).json(produto);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const produto = await produtoService.update(id, req.body);
      res.json(produto);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await produtoService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async updateEstoque(req, res, next) {
    try {
      const { id } = req.params;
      const { quantidade } = req.body;

      const produto = await produtoService.updateEstoque(id, quantidade);
      res.json(produto);
    } catch (error) {
      next(error);
    }
  }
}

export default new ProdutoController();
