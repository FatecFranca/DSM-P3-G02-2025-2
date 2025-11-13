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
    <section id="agenda" className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Agenda</h2>
        
        <div className="max-w-2xl mx-auto space-y-4">
          {shows.map((show, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-800">{show.date}</h3>
                  <p className="text-gray-600">{show.location}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-800">{show.event}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}