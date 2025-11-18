import { api } from './api';

export interface RegisterArtistaData {
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
  genero_musical?: string;
  bio?: string;
  rede_social?: string[];
}

export interface RegisterClienteData {
  nome: string;
  cpf: string;
  dataNascimento: string;
  email: string;
  senha: string;
  telefone?: string;
  endereco?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    nome: string;
    email: string;
    type: 'artista' | 'cliente';
  };
}

export async function registerArtista(data: RegisterArtistaData): Promise<AuthResponse> {
  return api('/auth/artista/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function loginArtista(email: string, senha: string): Promise<AuthResponse> {
  return api('/auth/artista/login', {
    method: 'POST',
    body: JSON.stringify({ email, senha }),
  });
}

export async function registerCliente(data: RegisterClienteData): Promise<AuthResponse> {
  return api('/auth/cliente/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function loginCliente(email: string, senha: string): Promise<AuthResponse> {
  return api('/auth/cliente/login', {
    method: 'POST',
    body: JSON.stringify({ email, senha }),
  });
}

export async function getProfile(token: string) {
  return api('/auth/profile', { token });
}
