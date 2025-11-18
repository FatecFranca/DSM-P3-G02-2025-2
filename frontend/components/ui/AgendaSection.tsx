"use client";

import React from 'react';
import { useEvents } from '@/hooks/useApi';

interface AgendaSectionProps {
  artistId?: string;
}

export default function AgendaSection({ artistId }: AgendaSectionProps) {
  const { events: apiEvents, loading, error } = useEvents(artistId ? { artista_id: artistId } : undefined);

  // If API returns events, use them. Otherwise try to read localStorage saved profile data.
  let events = apiEvents || [];

  if ((!events || events.length === 0) && typeof window !== 'undefined') {
    try {
      const rawUser = JSON.parse(localStorage.getItem('user') || 'null');
      if (rawUser && (rawUser.id === artistId)) {
        events = rawUser.artistProfileData?.events || [];
      } else {
        const usersDB = JSON.parse(localStorage.getItem('usersDB') || '[]');
        const found = usersDB.find((u: any) => u.id === artistId);
        if (found) events = found.artistProfileData?.events || [];
      }
    } catch (e) {
      // ignore
    }
  }

  const showItems = (events && events.length > 0) ? events : [
    { date: "Em breve", local: "—", event: "Sem eventos cadastrados" }
  ];

  return (
    <section id="agenda" className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-white font-poppins">Agenda</h2>

        {loading && (
          <div className="flex justify-center items-center h-24">
            <p className="text-gray-400">Carregando agenda...</p>
          </div>
        )}

        <div className="space-y-3">
          {showItems.map((show: any, index: number) => (
            <div key={index} className="text-white p-4 border-b border-neutral-800">
              <div className="flex justify-between items-center">
                <span className="font-montserrat text-left flex-1">{show.date}</span>
                <span className="font-montserrat text-center flex-1">{show.local || show.location || ''}</span>
                <span className="font-montserrat text-right flex-1">{show.name || show.event || ''}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}