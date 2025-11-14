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
    <section id="agenda" className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-white font-poppins">Agenda</h2>
        
        <div className="space-y-3">
          {shows.map((show, index) => (
            <div key={index} className="text-white p-4 border-b border-neutral-800">
              <div className="flex justify-between items-center">
                <span className="font-montserrat text-left flex-1">{show.date}</span>
                <span className="font-montserrat text-center flex-1">{show.location}</span>
                <span className="font-montserrat text-right flex-1">{show.event}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}