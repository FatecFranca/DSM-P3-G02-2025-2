import { api, getToken } from './api';

export interface ItemPedido {
  id: string;
  num_item: number;
  quantidade: number;
  preco_unitario: number;
  produto_id: string;
  pedido_id: string;
  produto?: {
    id: string;
    nome: string;
    preco: number;
  };
}

export interface Pedido {
  id: string;
  nome: string;
  data_hora: string;
  cliente_id: string;
  status: string;
  total: number;
  createdAt: string;
  cliente?: {
    id: string;
    nome: string;
    email: string;
  };
  itensPedido?: ItemPedido[];
}

export interface CreatePedidoData {
  nome: string;
  cliente_id: string;
  items: Array<{
    produto_id: string;
    quantidade: number;
  }>;
}

export interface OrderFilters {
  cliente_id?: string;
  status?: string;
}

export async function getPedidos(filters?: OrderFilters): Promise<Pedido[]> {
  const token = getToken();
  const params = new URLSearchParams();
  if (filters?.cliente_id) params.append('cliente_id', filters.cliente_id);
  if (filters?.status) params.append('status', filters.status);

  const query = params.toString();
  return api(`/pedidos${query ? `?${query}` : ''}`, { token: token || undefined });
}

export async function getPedidoById(id: string): Promise<Pedido> {
  const token = getToken();
  return api(`/pedidos/${id}`, { token: token || undefined });
}

export async function createPedido(data: CreatePedidoData): Promise<Pedido> {
  const token = getToken();
  return api('/pedidos', {
    method: 'POST',
    body: JSON.stringify(data),
    token: token || undefined,
  });
}

export async function updatePedidoStatus(id: string, status: string): Promise<Pedido> {
  const token = getToken();
  return api(`/pedidos/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
    token: token || undefined,
  });
}

export async function cancelPedido(id: string): Promise<Pedido> {
  const token = getToken();
  return api(`/pedidos/${id}/cancel`, {
    method: 'PATCH',
    token: token || undefined,
  });
}
