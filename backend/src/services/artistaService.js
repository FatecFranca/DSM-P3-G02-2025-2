import prisma from '../config/database.js';
import { hashPassword } from '../utils/auth.js';

class ArtistaService {
  async findAll() {
    return prisma.artista.findMany({
      select: {
        id: true,
        nome: true,
        genero_musical: true,
        bio: true,
        rede_social: true,
        email: true,
        telefone: true,
        createdAt: true,
        _count: {
          select: {
            produtos: true,
            eventos: true
          }
        }
      }
    });
  }

  async findById(id) {
    return prisma.artista.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        genero_musical: true,
        bio: true,
        rede_social: true,
        email: true,
        telefone: true,
        createdAt: true,
        produtos: {
          select: {
            id: true,
            nome: true,
            preco: true,
            estoque: true,
            descricao: true
          }
        },
        eventos: {
          select: {
            id: true,
            data: true,
            local: true,
            preco_ingresso: true,
            descricao: true
          }
        }
      }
    });
  }

  async create(data) {
    const hashedPassword = await hashPassword(data.senha);

    return prisma.artista.create({
      data: {
        ...data,
        senha: hashedPassword
      },
      select: {
        id: true,
        nome: true,
        genero_musical: true,
        bio: true,
        rede_social: true,
        email: true,
        telefone: true,
        createdAt: true
      }
    });
  }

  async update(id, data) {
    if (data.senha) {
      data.senha = await hashPassword(data.senha);
    }

    return prisma.artista.update({
      where: { id },
      data,
      select: {
        id: true,
        nome: true,
        genero_musical: true,
        bio: true,
        rede_social: true,
        email: true,
        telefone: true,
        updatedAt: true
      }
    });
  }

  async delete(id) {
    return prisma.artista.delete({
      where: { id }
    });
  }

  async findByEmail(email) {
    return prisma.artista.findUnique({
      where: { email }
    });
  }
}

export default new ArtistaService();
