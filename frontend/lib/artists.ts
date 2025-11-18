import { api, getToken } from './api';

export interface Artista {
  id: string;
  nome: string;
  genero_musical?: string;
  bio?: string;
  rede_social?: string[];
  email: string;
  telefone?: string;
  createdAt: string;
  updatedAt?: string;
  _count?: {
    produtos: number;
    eventos: number;
  };
}

export async function getArtistas(): Promise<Artista[]> {
  return api('/artistas');
}

export async function getArtistaById(id: string): Promise<Artista> {
  return api(`/artistas/${id}`);
}

export async function updateArtista(id: string, data: Partial<Artista>): Promise<Artista> {
  const token = getToken();
  return api(`/artistas/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    token: token || undefined,
  });
}

export async function deleteArtista(id: string): Promise<void> {
  const token = getToken();
  return api(`/artistas/${id}`, {
    method: 'DELETE',
    token: token || undefined,
  });
}
