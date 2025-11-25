"use client";

import React, { useState, useEffect } from "react";
import Footer from "@/components/ui/Footer";
import EventModal, { EventFormData } from "@/components/ui/EventModal";
import { getEventos, createEvento, updateEvento, deleteEvento, Evento } from "@/lib/events";
import { useRouter } from "next/navigation";

const ArtistHomePage: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [events, setEvents] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedEvent, setSelectedEvent] = useState<Evento | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in and is an artist
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/auth');
      return;
    }

    const userData = JSON.parse(storedUser);
    if (userData.type !== 'artista') {
      router.push('/');
      return;
    }

    setUser(userData);
    loadEvents(userData.id);
  }, [router]);

  const loadEvents = async (artistId: string) => {
    try {
      setLoading(true);
      const fetchedEvents = await getEventos({ artista_id: artistId });
      setEvents(fetchedEvents);
    } catch (err) {
      console.error('Error loading events:', err);
      setError('Erro ao carregar eventos');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = () => {
    setModalMode('create');
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleEditEvent = (event: Evento) => {
    setModalMode('edit');
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleSaveEvent = async (eventData: EventFormData) => {
    if (!user) return;

    try {
      if (modalMode === 'create') {
        await createEvento({
          artista_id: user.id,
          data: eventData.data,
          local: eventData.local,
          preco_ingresso: eventData.preco_ingresso,
          descricao: eventData.descricao,
        });
      } else if (selectedEvent) {
        await updateEvento(selectedEvent.id, {
          data: eventData.data,
          local: eventData.local,
          preco_ingresso: eventData.preco_ingresso,
          descricao: eventData.descricao,
        });
      }
      await loadEvents(user.id);
      setIsModalOpen(false);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Erro ao salvar evento');
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm('Tem certeza que deseja excluir este evento?')) return;

    try {
      await deleteEvento(eventId);
      if (user) {
        await loadEvents(user.id);
      }
    } catch (err) {
      alert('Erro ao excluir evento');
      console.error(err);
    }
  };

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

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">Carregando...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 font-poppins">Bem-vindo, {user.nome}!</h1>
          <p className="text-gray-400">Gerencie seus eventos e perfil de artista</p>
        </div>

        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold font-poppins">Meus Eventos</h2>
            <button
              onClick={handleCreateEvent}
              className="bg-[#FF7A29] hover:bg-[#ff6a19] text-white px-6 py-3 rounded-lg transition font-medium flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Criar Evento
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-500/20 border border-red-500 rounded-lg">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-48">
              <p className="text-gray-400">Carregando eventos...</p>
            </div>
          ) : events.length > 0 ? (
            <div className="grid gap-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 hover:border-[#FF7A29] transition"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <span className="text-xs text-gray-400 block mb-1">Data e Hora</span>
                          <span className="font-montserrat text-white">{formatDate(event.data)}</span>
                        </div>
                        <div>
                          <span className="text-xs text-gray-400 block mb-1">Local</span>
                          <span className="font-montserrat text-white">{event.local}</span>
                        </div>
                        <div>
                          <span className="text-xs text-gray-400 block mb-1">Ingresso</span>
                          <span className="font-montserrat text-white">{formatPrice(event.preco_ingresso)}</span>
                        </div>
                      </div>
                      {event.descricao && (
                        <div className="mt-4">
                          <span className="text-xs text-gray-400 block mb-1">Descrição</span>
                          <p className="font-montserrat text-gray-300 text-sm">{event.descricao}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEditEvent(event)}
                        className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition"
                        title="Editar"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition"
                        title="Excluir"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-neutral-900 rounded-lg border border-neutral-800">
              <p className="text-gray-400 mb-4">Você ainda não possui eventos cadastrados</p>
              <button
                onClick={handleCreateEvent}
                className="text-[#FF7A29] hover:text-[#ff6a19] font-medium"
              >
                Criar seu primeiro evento
              </button>
            </div>
          )}
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 font-poppins">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => router.push(`/artista/${user.id}`)}
              className="bg-neutral-900 border border-neutral-800 p-6 rounded-lg hover:border-[#FF7A29] transition text-left"
            >
              <div className="text-[#FF7A29] mb-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="font-bold mb-1">Ver Meu Perfil</h3>
              <p className="text-sm text-gray-400">Veja como seu perfil aparece para os fãs</p>
            </button>
            <button
              onClick={() => router.push('/configurar-conta')}
              className="bg-neutral-900 border border-neutral-800 p-6 rounded-lg hover:border-[#FF7A29] transition text-left"
            >
              <div className="text-[#FF7A29] mb-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-bold mb-1">Configurações</h3>
              <p className="text-sm text-gray-400">Edite suas informações e preferências</p>
            </button>
            <button
              onClick={() => router.push('/produtos')}
              className="bg-neutral-900 border border-neutral-800 p-6 rounded-lg hover:border-[#FF7A29] transition text-left"
            >
              <div className="text-[#FF7A29] mb-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="font-bold mb-1">Produtos</h3>
              <p className="text-sm text-gray-400">Gerencie seus produtos e mercadorias</p>
            </button>
          </div>
        </section>
      </div>

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
        mode={modalMode}
        initialData={selectedEvent ? {
          id: selectedEvent.id,
          data: selectedEvent.data,
          local: selectedEvent.local,
          preco_ingresso: selectedEvent.preco_ingresso,
          descricao: selectedEvent.descricao,
        } : undefined}
      />

      <Footer />
    </main>
  );
};

export default ArtistHomePage;
