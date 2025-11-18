import prisma from '../config/database.js';

class ProdutoService {
  async findAll(filters = {}) {
    const where = {};

    if (filters.artista_id) {
      where.artista_id = filters.artista_id;
    }

    if (filters.minPreco || filters.maxPreco) {
      where.preco = {};
      if (filters.minPreco) where.preco.gte = parseFloat(filters.minPreco);
      if (filters.maxPreco) where.preco.lte = parseFloat(filters.maxPreco);
    }

    return prisma.produto.findMany({
      where,
      include: {
        artista: {
          select: {
            id: true,
            nome: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async findById(id) {
    return prisma.produto.findUnique({
      where: { id },
      include: {
        artista: {
          select: {
            id: true,
            nome: true,
            genero_musical: true,
            email: true
          }
        },
        fornecedores: {
          include: {
            fornecedor: true
          }
        }
      }
    });
  }

  async create(data) {
    return prisma.produto.create({
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

  async update(id, data) {
    return prisma.produto.update({
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
    return prisma.produto.delete({
      where: { id }
    });
  }

  async updateEstoque(id, quantidade) {
    const produto = await this.findById(id);

    if (!produto) {
      throw new Error('Produto não encontrado');
    }

    if (produto.estoque + quantidade < 0) {
      throw new Error('Estoque insuficiente');
    }

    return prisma.produto.update({
      where: { id },
      data: {
        estoque: {
          increment: quantidade
        }
      }
    });
  }
}

export default new ProdutoService();
