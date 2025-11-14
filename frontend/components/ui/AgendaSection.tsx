// components/ui/AgendaSection.tsx
import React from 'react';

interface AgendaSectionProps {
  artistId?: string;
}

export default function AgendaSection({ artistId }: AgendaSectionProps) {
  const shows = [
    { date: "02 de Novembro de 2025", location: "Petrópolis", event: "Rock the Mountain" },
    { date: "07 de Novembro de 2025", location: "Belo Horizonte", event: "Chevrolet Hall" },
    { date: "09 de Novembro de 2025", location: "Petrópolis", event: "Rock the Mountain" },
    { date: "15 de Novembro de 2025", location: "Fortaleza", event: "Marina Park Hotel" },
    { date: "06 de Dezembro de 2025", location: "Rio de Janeiro", event: "Qd Unidos de Vila Isabel" },
    { date: "13 de Dezembro de 2025", location: "Belém", event: "Estádio Olímpico do Pará (Mangueirão)" },
  ];

  return (
    <section id="agenda" className="min-h-screen bg-neutral-900 py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Agenda</h2>
        
        <div className="space-y-4">
          {shows.map((show, index) => (
            <div key={index} className="bg-neutral-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="font-bold text-white text-xl">{show.date}</h3>
                  <p className="text-gray-300">{show.location}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white">{show.event}</p>
                  <button className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition font-medium">
                    Comprar Ingresso
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}