import artistaService from '../services/artistaService.js';

class ArtistaController {
  async getAll(req, res, next) {
    try {
      const artistas = await artistaService.findAll();
      res.json(artistas);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const artista = await artistaService.findById(id);

      if (!artista) {
        return res.status(404).json({ error: 'Artista não encontrado' });
      }

      res.json(artista);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const artista = await artistaService.create(req.body);
      res.status(201).json(artista);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const artista = await artistaService.update(id, req.body);
      res.json(artista);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await artistaService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new ArtistaController();
