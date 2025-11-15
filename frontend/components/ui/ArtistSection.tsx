'use client';
import React from 'react';
import ArtistPageCarousel from './ArtistPageCarousel';

interface ArtistSectionProps {
  artistId?: string;
}

export default function ArtistSection({ artistId }: ArtistSectionProps) {
  const socialLinks = {
    spotify: "https://open.spotify.com/intl-pt/artist/0nFdWpwl7h6fp3ADRyG14L",
    instagram: "https://www.instagram.com/amarinasena", 
    facebook: "https://www.facebook.com/amarinasena2/?locale=pt_BR",
    twitter: "https://twitter.com/amarinasena"
  };

  return (
    <section id="artista" className="min-h-screen bg-black text-white py-8">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-6 font-poppins font-bold">Marina Sena</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          <div className="flex justify-center">
            <ArtistPageCarousel artistId={artistId || "2"} />
          </div>

          <div className="space-y-6">
            <div className="text-gray-300 leading-relaxed text-justify">
              <p className="text-lg">
                Guiada por sua paixão pelo canto, Marina Sena sempre soube a que veio. A cantora e compositora mineira conquistou o país com seu carisma, gingado e timbre inconfundível ao unir ritmos como samba, reggae, axé, MPB e dancehall em um pop autêntico e irresistível. Com uma trajetória marcada por projetos plurais - da sonoridade psicodélica d'A Outra Banda da Lua ao frescor indie-pop do Rosa Neon Marina lançou-se em carreira solo com De Primeira (2021), um álbum de estreia arrebatador que traduziu o calor da paixão e do desejo em melodias envolventes.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-gray-300 mt-12 px-4">
          <a 
            href={socialLinks.spotify} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-white transition"
          >
            <img src="/spotify.png" alt="Spotify" className="w-6 h-6" />
            <span className="font-semibold">Spotify</span>
          </a>
          
          <a 
            href={socialLinks.instagram}
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-white transition"
          >
            <img src="/instagram.png" alt="Instagram" className="w-6 h-6" />
            <span className="font-medium">Instagram</span>
          </a>
          
          <a 
            href={socialLinks.facebook}
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-white transition"
          >
            <img src="/facebook.png" alt="Facebook" className="w-6 h-6" />
            <span className="font-medium">Facebook</span>
          </a>

          <a 
            href={socialLinks.twitter}
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-white transition"
          >
            <img src="/midia-social.png" alt="X" className="w-6 h-6" />
            <span className="font-medium">X</span>
          </a>
        </div>
      </div>
    </section>
  );
}