// components/ui/ArtistSection.tsx
import React from 'react';

interface ArtistSectionProps {
  artistId?: string;
}

export default function ArtistSection({ artistId }: ArtistSectionProps) {
  return (
    <section id="artista" className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header Simples */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Marina Sena</h1>
        </header>

        <div className="max-w-4xl mx-auto">
          {/* Descrição do Artista */}
          <div className="bg-gray-50 rounded-lg p-8 mb-8">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Cuiada por sua paixão pelo canto, Marina Sena sempre soube a que veio. A cantora e compositora mineira conquistou o país com seu carisma, gingado e timbre inconfundível ao unir ritmos como samba, reggae, axé, MPB e dancehall em um pop autêntico e irresistível.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Com uma trajetória marcada por projetos plurais - da sonoridade psicodélica d'A Outra Banda da Lua ao frescor indie-pop do Rosa Neon Marina lançou-se em carreira solo com De Primeira (2021), um álbum de estreia arrebatador que traduziu o calor da paixão e do desejo em melodias envolventes.
            </p>
          </div>

          {/* Redes Sociais - Simples */}
          <div className="flex justify-center space-x-8">
            <button className="flex flex-col items-center text-gray-700 hover:text-primary transition">
              <span className="text-2xl mb-2">🎵</span>
              <span className="font-medium">Spotify</span>
            </button>
            <button className="flex flex-col items-center text-gray-700 hover:text-primary transition">
              <span className="text-2xl mb-2">📷</span>
              <span className="font-medium">Instagram</span>
            </button>
            <button className="flex flex-col items-center text-gray-700 hover:text-primary transition">
              <span className="text-2xl mb-2">👥</span>
              <span className="font-medium">Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}