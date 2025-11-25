'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import ArtistInputField from '../ui/ArtistInputField';
import ArtistTextArea from '../ui/ArtistTextArea';
import Button from '../ui/Button';
import { getUser } from '@/lib/api';
import { getEventos, createEvento, updateEvento, deleteEvento } from '@/lib/events';
import { getProdutos, createProduto, updateProduto, deleteProduto } from '@/lib/products';

interface ApiEvent {
  id?: string;
  artista_id?: string;
  data: string;
  local: string;
  descricao?: string;
  preco_ingresso: number;
}

interface ApiProduct {
  id?: string;
  artista_id?: string;
  nome: string;
  preco: number;
  estoque: number;
  descricao?: string;
}

const ArtistRegisterForm: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [user, setUser] = useState<any>(null);
  const [events, setEvents] = useState<ApiEvent[]>([]);
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [deletedEventIds, setDeletedEventIds] = useState<string[]>([]);
  const [deletedProductIds, setDeletedProductIds] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
    const userData = getUser();
    setUser(userData);

    if (userData?.id) {
      loadArtistData(userData.id);
    }
  }, []);

  const loadArtistData = async (artistId: string) => {
    try {
      setLoading(true);
      const [eventsData, productsData] = await Promise.all([
        getEventos({ artista_id: artistId }),
        getProdutos({ artista_id: artistId })
      ]);

      setEvents(eventsData.length > 0 ? eventsData : [{ data: '', local: '', descricao: '', preco_ingresso: 0 }]);
      setProducts(productsData.length > 0 ? productsData : [{ nome: '', preco: 0, estoque: 0, descricao: '' }]);
    } catch (error) {
      console.error('Error loading artist data:', error);
      setEvents([{ data: '', local: '', descricao: '', preco_ingresso: 0 }]);
      setProducts([{ nome: '', preco: 0, estoque: 0, descricao: '' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id) {
      setMessage({ type: 'error', text: 'Usuário não encontrado. Faça login novamente.' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      // Handle deleted events
      for (const eventId of deletedEventIds) {
        await deleteEvento(eventId);
      }

      // Handle deleted products
      for (const productId of deletedProductIds) {
        await deleteProduto(productId);
      }

      // Handle events (create/update)
      const eventPromises = events.map(async (event) => {
        if (!event.data || !event.local) return; // Skip empty events

        const eventData = {
          artista_id: user.id,
          data: event.data,
          local: event.local,
          descricao: event.descricao || '',
          preco_ingresso: event.preco_ingresso || 0
        };

        if (event.id) {
          return updateEvento(event.id, eventData);
        } else {
          return createEvento(eventData);
        }
      });

      // Handle products (create/update)
      const productPromises = products.map(async (product) => {
        if (!product.nome) return; // Skip empty products

        const productData = {
          artista_id: user.id,
          nome: product.nome,
          preco: product.preco || 0,
          estoque: product.estoque || 0,
          descricao: product.descricao || ''
        };

        if (product.id) {
          return updateProduto(product.id, productData);
        } else {
          return createProduto(productData);
        }
      });

      await Promise.all([...eventPromises, ...productPromises]);

      setMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' });
      setDeletedEventIds([]);
      setDeletedProductIds([]);

      // Reload data to get updated IDs
      await loadArtistData(user.id);

      setTimeout(() => {
        router.push(`/artista/${user.id}`);
      }, 1500);
    } catch (error: any) {
      console.error('Error saving artist profile:', error);
      setMessage({ type: 'error', text: error.message || 'Erro ao salvar perfil. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  const handleEventChange = (index: number, field: keyof ApiEvent, value: any) => {
    setEvents((prev) => prev.map((ev, i) => (i === index ? { ...ev, [field]: value } : ev)));
  };

  const addEvent = () => {
    setEvents((prev) => [...prev, { data: '', local: '', descricao: '', preco_ingresso: 0 }]);
  };

  const removeEvent = (index: number) => {
    const event = events[index];
    if (event.id) {
      setDeletedEventIds(prev => [...prev, event.id!]);
    }
    setEvents((prev) => prev.filter((_, i) => i !== index));
  };

  const handleProductChange = (index: number, field: keyof ApiProduct, value: any) => {
    setProducts((prev) => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)));
  };

  const addProduct = () => {
    setProducts((prev) => [...prev, { nome: '', preco: 0, estoque: 0, descricao: '' }]);
  };

  const removeProduct = (index: number) => {
    const product = products[index];
    if (product.id) {
      setDeletedProductIds(prev => [...prev, product.id!]);
    }
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  if (!mounted) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6 md:p-10 bg-neutral-900 rounded-xl shadow-xl">
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-6xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="bg-neutral-900 rounded-xl shadow-xl p-6 md:p-8 border border-gray-800">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-2">
          Configure sua Conta de Artista
        </h1>
        <p className="text-gray-400 text-center">
          Gerencie seus eventos e produtos
        </p>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-900/50 text-green-300 border border-green-700' : 'bg-red-900/50 text-red-300 border border-red-700'}`}>
          {message.text}
        </div>
      )}

      {/* Events Section */}
      <div className="bg-neutral-900 rounded-xl shadow-xl p-6 md:p-8 border border-gray-800">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            📅 Agenda de Eventos
          </h2>
          <p className="text-gray-400 text-sm">Adicione os eventos onde você irá se apresentar</p>
        </div>

        <div className="space-y-6">
          {loading && events.length === 0 ? (
            <div className="text-center text-gray-400 py-8">Carregando eventos...</div>
          ) : (
            events.map((event, idx) => (
              <div key={idx} className="bg-black/30 p-4 md:p-6 rounded-lg border border-gray-800">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Evento {idx + 1}</h3>
                  {events.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEvent(idx)}
                      className="text-red-400 hover:text-red-300 text-sm transition"
                    >
                      Remover
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ArtistInputField
                    id={`eventDate-${idx}`}
                    name={`eventDate-${idx}`}
                    type="datetime-local"
                    placeholder="Data e hora"
                    value={event.data}
                    onChange={(e) => handleEventChange(idx, 'data', e.target.value)}
                    required
                  />
                  <ArtistInputField
                    id={`eventLocal-${idx}`}
                    name={`eventLocal-${idx}`}
                    type="text"
                    placeholder="Local do evento"
                    value={event.local}
                    onChange={(e) => handleEventChange(idx, 'local', e.target.value)}
                    required
                  />
                  <ArtistInputField
                    id={`eventPrice-${idx}`}
                    name={`eventPrice-${idx}`}
                    type="number"
                    step="0.01"
                    placeholder="Preço do ingresso (R$)"
                    value={event.preco_ingresso || ''}
                    onChange={(e) => handleEventChange(idx, 'preco_ingresso', parseFloat(e.target.value) || 0)}
                    required
                  />
                  <div className="md:col-span-2">
                    <ArtistTextArea
                      id={`eventDesc-${idx}`}
                      name={`eventDesc-${idx}`}
                      placeholder="Descrição do evento"
                      value={event.descricao || ''}
                      onChange={(e) => handleEventChange(idx, 'descricao', e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 flex justify-center">
          <Button type="button" onClick={addEvent} className="max-w-xs">
            + Adicionar Evento
          </Button>
        </div>
      </div>

      {/* Products Section */}
      <div className="bg-neutral-900 rounded-xl shadow-xl p-6 md:p-8 border border-gray-800">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            🛍️ Produtos
          </h2>
          <p className="text-gray-400 text-sm">Cadastre produtos para vender aos seus fãs</p>
        </div>

        <div className="space-y-6">
          {loading && products.length === 0 ? (
            <div className="text-center text-gray-400 py-8">Carregando produtos...</div>
          ) : (
            products.map((product, idx) => (
              <div key={idx} className="bg-black/30 p-4 md:p-6 rounded-lg border border-gray-800">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Produto {idx + 1}</h3>
                  {products.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeProduct(idx)}
                      className="text-red-400 hover:text-red-300 text-sm transition"
                    >
                      Remover
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ArtistInputField
                    id={`productName-${idx}`}
                    name={`productName-${idx}`}
                    type="text"
                    placeholder="Nome do produto"
                    value={product.nome}
                    onChange={(e) => handleProductChange(idx, 'nome', e.target.value)}
                    required
                  />
                  <ArtistInputField
                    id={`productPrice-${idx}`}
                    name={`productPrice-${idx}`}
                    type="number"
                    step="0.01"
                    placeholder="Preço (R$)"
                    value={product.preco || ''}
                    onChange={(e) => handleProductChange(idx, 'preco', parseFloat(e.target.value) || 0)}
                    required
                  />
                  <ArtistInputField
                    id={`productStock-${idx}`}
                    name={`productStock-${idx}`}
                    type="number"
                    placeholder="Quantidade em estoque"
                    value={product.estoque || ''}
                    onChange={(e) => handleProductChange(idx, 'estoque', parseInt(e.target.value) || 0)}
                    required
                  />
                  <div className="md:col-span-2">
                    <ArtistTextArea
                      id={`productDesc-${idx}`}
                      name={`productDesc-${idx}`}
                      placeholder="Descrição do produto"
                      value={product.descricao || ''}
                      onChange={(e) => handleProductChange(idx, 'descricao', e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 flex justify-center">
          <Button type="button" onClick={addProduct} className="max-w-xs">
            + Adicionar Produto
          </Button>
        </div>
      </div>

      {/* Submit Section */}
      <div className="bg-neutral-900 rounded-xl shadow-xl p-6 md:p-8 border border-gray-800">
        <div className="space-y-4">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
          <div className="text-center">
            <Link href={user?.id ? `/artista/${user.id}` : '/'} className="text-sm text-gray-400 hover:text-white transition-colors">
              ← Voltar para o perfil
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ArtistRegisterForm;