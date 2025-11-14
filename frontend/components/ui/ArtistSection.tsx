// components/ui/ArtistSection.tsx
import React from 'react';

interface ArtistSectionProps {
  artistId?: string;
}

export default function ArtistSection({ artistId }: ArtistSectionProps) {
  return (
    <section id="artista" className="min-h-screen bg-black text-white py-8">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-6">Marina Sena</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* COLUNA DA ESQUERDA - IMAGEM */}
          <div className="flex justify-center">
            <div className="w-80 h-80 bg-neutral-900 rounded-2xl flex items-center justify-center border border-neutral-800">
              <div className="text-6xl">🎤</div>
            </div>
          </div>

          {/* COLUNA DA DIREITA - TEXTO */}
          <div className="space-y-6">
            {/* Descrição do Artista */}
            <div className="text-gray-300 leading-relaxed text-justify">
              <p className="text-lg">
                Guiada por sua paixão pelo canto, Marina Sena sempre soube a que veio. A cantora e compositora mineira conquistou o país com seu carisma, gingado e timbre inconfundível ao unir ritmos como samba, reggae, axé, MPB e dancehall em um pop autêntico e irresistível. Com uma trajetória marcada por projetos plurais - da sonoridade psicodélica d'A Outra Banda da Lua ao frescor indie-pop do Rosa Neon Marina lançou-se em carreira solo com De Primeira (2021), um álbum de estreia arrebatador que traduziu o calor da paixão e do desejo em melodias envolventes.
              </p>
            </div>
          </div>
        </div>

        

<div className="flex justify-between items-center text-gray-300 mt-12 px-4">
  <div className="flex items-center space-x-2">
    <img src="/spotify.png" alt="Spotify" className="w-6 h-6" />
    <span className="font-semibold">Spotify</span>
  </div>
  
  <div className="flex items-center space-x-2">
    <img src="/instagram.png" alt="Instagram" className="w-6 h-6" />
    <span className="font-medium">Instagram</span>
  </div>
  
  <div className="flex items-center space-x-2">
    <img src="/facebook.png" alt="Facebook" className="w-6 h-6" />
    <span className="font-medium">Facebook</span>
  </div>

  <div className="flex items-center space-x-2">
    <img src="/midia-social.png" alt="X" className="w-6 h-6" />
    <span className="font-medium">X</span>
  </div>
</div>
      </div>
    </section>
  );
}