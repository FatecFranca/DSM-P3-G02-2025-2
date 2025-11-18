import artistaService from './artistaService.js';
import clienteService from './clienteService.js';
import { comparePassword, generateToken } from '../utils/auth.js';

class AuthService {
  async loginArtista(email, senha) {
    const artista = await artistaService.findByEmail(email);

    if (!artista) {
      throw new Error('Credenciais inválidas');
    }

    const isPasswordValid = await comparePassword(senha, artista.senha);

    if (!isPasswordValid) {
      throw new Error('Credenciais inválidas');
    }

    const token = generateToken({
      id: artista.id,
      email: artista.email,
      type: 'artista'
    });

    return {
      token,
      user: {
        id: artista.id,
        nome: artista.nome,
        email: artista.email,
        type: 'artista'
      }
    };
  }

  async loginCliente(email, senha) {
    const cliente = await clienteService.findByEmail(email);

    if (!cliente) {
      throw new Error('Credenciais inválidas');
    }

    const isPasswordValid = await comparePassword(senha, cliente.senha);

    if (!isPasswordValid) {
      throw new Error('Credenciais inválidas');
    }

    const token = generateToken({
      id: cliente.id,
      email: cliente.email,
      type: 'cliente'
    });

    return {
      token,
      user: {
        id: cliente.id,
        nome: cliente.nome,
        email: cliente.email,
        type: 'cliente'
      }
    };
  }

  async registerArtista(data) {
    const existingArtista = await artistaService.findByEmail(data.email);

    if (existingArtista) {
      throw new Error('Email já cadastrado');
    }

    const artista = await artistaService.create(data);

    const token = generateToken({
      id: artista.id,
      email: artista.email,
      type: 'artista'
    });

    return {
      token,
      user: {
        id: artista.id,
        nome: artista.nome,
        email: artista.email,
        type: 'artista'
      }
    };
  }

  async registerCliente(data) {
    const existingEmail = await clienteService.findByEmail(data.email);

    if (existingEmail) {
      throw new Error('Email já cadastrado');
    }

    const existingCpf = await clienteService.findByCpf(data.cpf);

    if (existingCpf) {
      throw new Error('CPF já cadastrado');
    }

    const cliente = await clienteService.create(data);

    const token = generateToken({
      id: cliente.id,
      email: cliente.email,
      type: 'cliente'
    });

    return {
      token,
      user: {
        id: cliente.id,
        nome: cliente.nome,
        email: cliente.email,
        type: 'cliente'
      }
    };
  }
}

export default new AuthService();
