import eventoService from '../services/eventoService.js';

class EventoController {
  async getAll(req, res, next) {
    try {
      const filters = {
        artista_id: req.query.artista_id,
        dataInicio: req.query.dataInicio,
        dataFim: req.query.dataFim
      };

      const eventos = await eventoService.findAll(filters);
      res.json(eventos);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const evento = await eventoService.findById(id);

      if (!evento) {
        return res.status(404).json({ error: 'Evento não encontrado' });
      }

      res.json(evento);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const evento = await eventoService.create(req.body);
      res.status(201).json(evento);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const evento = await eventoService.update(id, req.body);
      res.json(evento);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await eventoService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async getUpcoming(req, res, next) {
    try {
      const eventos = await eventoService.findUpcoming();
      res.json(eventos);
    } catch (error) {
      next(error);
    }
  }
}

export default new EventoController();
