import prisma from '../config/database.js';

class FornecedorService {
  async findAll() {
    return prisma.fornecedor.findMany({
      include: {
        _count: {
          select: {
            produtos: true
          }
        }
      },
      orderBy: {
        razao_social: 'asc'
      }
    });
  }

  async findById(id) {
    return prisma.fornecedor.findUnique({
      where: { id },
      include: {
        produtos: {
          include: {
            produto: {
              include: {
                artista: {
                  select: {
                    id: true,
                    nome: true
                  }
                }
              }
            }
          }
        }
      }
    });
  }

  async create(data) {
    return prisma.fornecedor.create({
      data
    });
  }

  async update(id, data) {
    return prisma.fornecedor.update({
      where: { id },
      data
    });
  }

  async delete(id) {
    return prisma.fornecedor.delete({
      where: { id }
    });
  }

  async addProduto(fornecedor_id, produto_id, preco_compra) {
    return prisma.fornecedorProduto.create({
      data: {
        fornecedor_id,
        produto_id,
        preco_compra
      },
      include: {
        fornecedor: true,
        produto: true
      }
    });
  }

  async removeProduto(fornecedor_id, produto_id) {
    return prisma.fornecedorProduto.deleteMany({
      where: {
        fornecedor_id,
        produto_id
      }
    });
  }

  async findByCnpj(cnpj) {
    return prisma.fornecedor.findUnique({
      where: { cnpj }
    });
  }
}

export default new FornecedorService();
