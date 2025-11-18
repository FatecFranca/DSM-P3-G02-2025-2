import prisma from '../config/database.js';
import { hashPassword } from '../utils/auth.js';

class ClienteService {
  async findAll() {
    return prisma.cliente.findMany({
      select: {
        id: true,
        nome: true,
        cpf: true,
        dataNascimento: true,
        email: true,
        telefone: true,
        endereco: true,
        createdAt: true,
        _count: {
          select: {
            pedidos: true
          }
        }
      }
    });
  }

  async findById(id) {
    return prisma.cliente.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        cpf: true,
        dataNascimento: true,
        email: true,
        telefone: true,
        endereco: true,
        createdAt: true,
        pedidos: {
          select: {
            id: true,
            nome: true,
            data_hora: true,
            status: true,
            total: true
          },
          orderBy: {
            data_hora: 'desc'
          }
        }
      }
    });
  }

  async create(data) {
    const hashedPassword = await hashPassword(data.senha);

    return prisma.cliente.create({
      data: {
        ...data,
        senha: hashedPassword,
        dataNascimento: new Date(data.dataNascimento)
      },
      select: {
        id: true,
        nome: true,
        cpf: true,
        dataNascimento: true,
        email: true,
        telefone: true,
        endereco: true,
        createdAt: true
      }
    });
  }

  async update(id, data) {
    if (data.senha) {
      data.senha = await hashPassword(data.senha);
    }

    if (data.dataNascimento) {
      data.dataNascimento = new Date(data.dataNascimento);
    }

    return prisma.cliente.update({
      where: { id },
      data,
      select: {
        id: true,
        nome: true,
        cpf: true,
        dataNascimento: true,
        email: true,
        telefone: true,
        endereco: true,
        updatedAt: true
      }
    });
  }

  async delete(id) {
    return prisma.cliente.delete({
      where: { id }
    });
  }

  async findByEmail(email) {
    return prisma.cliente.findUnique({
      where: { email }
    });
  }

  async findByCpf(cpf) {
    return prisma.cliente.findUnique({
      where: { cpf }
    });
  }
}

export default new ClienteService();
