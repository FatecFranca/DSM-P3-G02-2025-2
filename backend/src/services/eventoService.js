import prisma from '../config/database.js';

class EventoService {
  async findAll(filters = {}) {
    const where = {};

    if (filters.artista_id) {
      where.artista_id = filters.artista_id;
    }

    if (filters.dataInicio || filters.dataFim) {
      where.data = {};
      if (filters.dataInicio) where.data.gte = new Date(filters.dataInicio);
      if (filters.dataFim) where.data.lte = new Date(filters.dataFim);
    }

    return prisma.evento.findMany({
      where,
      include: {
        artista: {
          select: {
            id: true,
            nome: true,
            genero_musical: true
          }
        }
      },
      orderBy: {
        data: 'asc'
      }
    });
  }

  async findById(id) {
    return prisma.evento.findUnique({
      where: { id },
      include: {
        artista: {
          select: {
            id: true,
            nome: true,
            genero_musical: true,
            bio: true,
            rede_social: true
          }
        }
      }
    });
  }

  async create(data) {
    return prisma.evento.create({
      data: {
        ...data,
        data: new Date(data.data)
      },
      include: {
        artista: {
          select: {
            id: true,
            nome: true
          }
        }
      }
    });
  }

  async update(id, data) {
    if (data.data) {
      data.data = new Date(data.data);
    }

    return prisma.evento.update({
      where: { id },
      data,
      include: {
        artista: {
          select: {
            id: true,
            nome: true
          }
        }
      }
    });
  }

  async delete(id) {
    return prisma.evento.delete({
      where: { id }
    });
  }

  async findUpcoming() {
    return prisma.evento.findMany({
      where: {
        data: {
          gte: new Date()
        }
      },
      include: {
        artista: {
          select: {
            id: true,
            nome: true,
            genero_musical: true
          }
        }
      },
      orderBy: {
        data: 'asc'
      },
      take: 10
    });
  }
}

export default new EventoService();
