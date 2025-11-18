import { api, getToken } from './api';

export interface Produto {
  id: string;
  artista_id: string;
  nome: string;
  descricao?: string;
  preco: number;
  estoque: number;
  createdAt: string;
  updatedAt?: string;
  artista?: {
    id: string;
    nome: string;
    email: string;
  };
}

export interface CreateProdutoData {
  artista_id: string;
  nome: string;
  preco: number;
  estoque: number;
  descricao?: string;
}

export interface ProductFilters {
  artista_id?: string;
  minPreco?: number;
  maxPreco?: number;
}

export async function getProdutos(filters?: ProductFilters): Promise<Produto[]> {
  const params = new URLSearchParams();
  if (filters?.artista_id) params.append('artista_id', filters.artista_id);
  if (filters?.minPreco !== undefined) params.append('minPreco', filters.minPreco.toString());
  if (filters?.maxPreco !== undefined) params.append('maxPreco', filters.maxPreco.toString());

  const query = params.toString();
  return api(`/produtos${query ? `?${query}` : ''}`);
}

export async function getProdutoById(id: string): Promise<Produto> {
  return api(`/produtos/${id}`);
}

export async function createProduto(data: CreateProdutoData): Promise<Produto> {
  const token = getToken();
  return api('/produtos', {
    method: 'POST',
    body: JSON.stringify(data),
    token: token || undefined,
  });
}

export async function updateProduto(id: string, data: Partial<CreateProdutoData>): Promise<Produto> {
  const token = getToken();
  return api(`/produtos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    token: token || undefined,
  });
}

export async function updateEstoque(id: string, quantidade: number): Promise<Produto> {
  const token = getToken();
  return api(`/produtos/${id}/estoque`, {
    method: 'PATCH',
    body: JSON.stringify({ quantidade }),
    token: token || undefined,
  });
}

export async function deleteProduto(id: string): Promise<void> {
  const token = getToken();
  return api(`/produtos/${id}`, {
    method: 'DELETE',
    token: token || undefined,
  });
}
