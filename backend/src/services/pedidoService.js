import prisma from '../config/database.js';
import produtoService from './produtoService.js';

class PedidoService {
  async findAll(filters = {}) {
    const where = {};

    if (filters.cliente_id) {
      where.cliente_id = filters.cliente_id;
    }

    if (filters.status) {
      where.status = filters.status;
    }

    return prisma.pedido.findMany({
      where,
      include: {
        cliente: {
          select: {
            id: true,
            nome: true,
            email: true
          }
        },
        itensPedido: {
          include: {
            produto: {
              select: {
                id: true,
                nome: true,
                preco: true
              }
            }
          }
        }
      },
      orderBy: {
        data_hora: 'desc'
      }
    });
  }

  async findById(id) {
    return prisma.pedido.findUnique({
      where: { id },
      include: {
        cliente: {
          select: {
            id: true,
            nome: true,
            email: true,
            telefone: true,
            endereco: true
          }
        },
        itensPedido: {
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
          },
          orderBy: {
            num_item: 'asc'
          }
        }
      }
    });
  }

  async create(data) {
    // Validar estoque e calcular total
    let total = 0;
    const itemsWithPrices = [];

    for (const item of data.items) {
      const produto = await produtoService.findById(item.produto_id);

      if (!produto) {
        throw new Error(`Produto ${item.produto_id} não encontrado`);
      }

      if (produto.estoque < item.quantidade) {
        throw new Error(`Estoque insuficiente para o produto ${produto.nome}`);
      }

      const itemTotal = produto.preco * item.quantidade;
      total += itemTotal;

      itemsWithPrices.push({
        ...item,
        preco_unitario: produto.preco
      });
    }

    // Criar pedido com itens
    const pedido = await prisma.pedido.create({
      data: {
        nome: data.nome,
        cliente_id: data.cliente_id,
        total,
        status: 'pendente',
        itensPedido: {
          create: itemsWithPrices.map((item, index) => ({
            num_item: index + 1,
            quantidade: item.quantidade,
            preco_unitario: item.preco_unitario,
            produto_id: item.produto_id
          }))
        }
      },
      include: {
        cliente: {
          select: {
            id: true,
            nome: true,
            email: true
          }
        },
        itensPedido: {
          include: {
            produto: true
          }
        }
      }
    });

    // Atualizar estoque
    for (const item of data.items) {
      await produtoService.updateEstoque(item.produto_id, -item.quantidade);
    }

    return pedido;
  }

  async updateStatus(id, status) {
    const validStatus = ['pendente', 'processando', 'enviado', 'entregue', 'cancelado'];

    if (!validStatus.includes(status)) {
      throw new Error('Status inválido');
    }

    return prisma.pedido.update({
      where: { id },
      data: { status },
      include: {
        cliente: {
          select: {
            id: true,
            nome: true,
            email: true
          }
        },
        itensPedido: {
          include: {
            produto: true
          }
        }
      }
    });
  }

  async cancel(id) {
    const pedido = await this.findById(id);

    if (!pedido) {
      throw new Error('Pedido não encontrado');
    }

    if (pedido.status === 'cancelado') {
      throw new Error('Pedido já está cancelado');
    }

    if (pedido.status === 'entregue') {
      throw new Error('Não é possível cancelar um pedido já entregue');
    }

    // Devolver produtos ao estoque
    for (const item of pedido.itensPedido) {
      await produtoService.updateEstoque(item.produto_id, item.quantidade);
    }

    return this.updateStatus(id, 'cancelado');
  }

  async delete(id) {
    return prisma.pedido.delete({
      where: { id }
    });
  }
}

export default new PedidoService();
