import { api, getToken } from './api';

export interface Evento {
  id: string;
  artista_id: string;
  data: string;
  local: string;
  descricao?: string;
  preco_ingresso: number;
  createdAt: string;
  updatedAt?: string;
  artista?: {
    id: string;
    nome: string;
    genero_musical?: string;
  };
}

export interface CreateEventoData {
  artista_id: string;
  data: string;
  local: string;
  preco_ingresso: number;
  descricao?: string;
}

export interface EventFilters {
  artista_id?: string;
  dataInicio?: string;
  dataFim?: string;
}

export async function getEventos(filters?: EventFilters): Promise<Evento[]> {
  const params = new URLSearchParams();
  if (filters?.artista_id) params.append('artista_id', filters.artista_id);
  if (filters?.dataInicio) params.append('dataInicio', filters.dataInicio);
  if (filters?.dataFim) params.append('dataFim', filters.dataFim);

  const query = params.toString();
  return api(`/eventos${query ? `?${query}` : ''}`);
}

export async function getUpcomingEventos(): Promise<Evento[]> {
  return api('/eventos/upcoming');
}

export async function getEventoById(id: string): Promise<Evento> {
  return api(`/eventos/${id}`);
}

export async function createEvento(data: CreateEventoData): Promise<Evento> {
  const token = getToken();
  return api('/eventos', {
    method: 'POST',
    body: JSON.stringify(data),
    token: token || undefined,
  });
}

export async function updateEvento(id: string, data: Partial<CreateEventoData>): Promise<Evento> {
  const token = getToken();
  return api(`/eventos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    token: token || undefined,
  });
}

export async function deleteEvento(id: string): Promise<void> {
  const token = getToken();
  return api(`/eventos/${id}`, {
    method: 'DELETE',
    token: token || undefined,
  });
}
