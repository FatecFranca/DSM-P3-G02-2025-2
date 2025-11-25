"use client";

import React from 'react';
import { useEvents } from '@/hooks/useApi';

interface AgendaSectionProps {
  artistId?: string;
}

export default function AgendaSection({ artistId }: AgendaSectionProps) {
  const { events: apiEvents, loading, error } = useEvents(artistId ? { artista_id: artistId } : undefined);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateString;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <section id="agenda" className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-white font-poppins">Agenda</h2>

        {loading && (
          <div className="flex justify-center items-center h-24">
            <p className="text-gray-400">Carregando agenda...</p>
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center h-24">
            <p className="text-red-400">Erro ao carregar eventos</p>
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-3">
            {apiEvents && apiEvents.length > 0 ? (
              apiEvents.map((evento: any) => (
                <div key={evento.id} className="text-white p-6 border border-neutral-800 rounded-lg bg-neutral-900 hover:border-[#FF7A29] transition">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 mb-1">Data e Hora</span>
                      <span className="font-montserrat text-white">{formatDate(evento.data)}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 mb-1">Local</span>
                      <span className="font-montserrat text-white">{evento.local}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 mb-1">Ingresso</span>
                      <span className="font-montserrat text-white">{formatPrice(evento.preco_ingresso)}</span>
                    </div>
                  </div>
                  {evento.descricao && (
                    <div className="mt-4">
                      <span className="text-xs text-gray-400 mb-1 block">Descrição</span>
                      <p className="font-montserrat text-gray-300 text-sm">{evento.descricao}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center text-gray-400 py-12">
                <p className="font-montserrat">Nenhum evento cadastrado</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}