"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/ui/Footer";
import { useArtists } from "@/hooks/useApi";

interface Artist {
  id: string;
  nome: string;
  img?: string;
  genero_musical?: string;
  bio?: string;
}

interface ApiArtist {
  id: string;
  nome: string;
  genero_musical?: string;
  bio?: string;
}

// Image mapping for artists (outside component to avoid recreating)
const artistImages: Record<string, string> = {
  "691c47435ecfe54f6cdd63dd": "/ebony.svg",
  "691c47435ecfe54f6cdd63dc": "/marina_sena.svg",
  "691c47435ecfe54f6cdd63de": "/duquesa.svg",
};

// Fallback data (outside component to avoid recreating)
const fallbackArtists: Artist[] = [
  { id: "691c47435ecfe54f6cdd63dd", nome: "Ebony", img: "/ebony.svg", genero_musical: "Pop/R&B" },
  { id: "691c47435ecfe54f6cdd63dc", nome: "Marina Sena", img: "/marina_sena.svg", genero_musical: "MPB/Pop" },
  { id: "691c47435ecfe54f6cdd63de", nome: "Duquesa", img: "/duquesa.svg", genero_musical: "Rap/Hip-Hop" },
];

const ArtistasPage: React.FC = () => {
  const { artists: apiArtists, loading, error } = useArtists();
  const [searchQuery, setSearchQuery] = useState("");
  const [notFound, setNotFound] = useState(false);

  // Map API artists with images using useMemo to avoid recreating on every render
  const displayArtists = useMemo(() => {
    if (apiArtists.length > 0) {
      return apiArtists.map((artist: ApiArtist) => ({
        id: artist.id,
        nome: artist.nome,
        img: artistImages[artist.id] || "/placeholder.svg",
        genero_musical: artist.genero_musical,
        bio: artist.bio,
      }));
    }
    return fallbackArtists;
  }, [apiArtists]);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    const lower = query.toLowerCase();
    const found = displayArtists.find((artist: Artist) =>
      artist.nome.toLowerCase().includes(lower) ||
      (artist.genero_musical && artist.genero_musical.toLowerCase().includes(lower))
    );

    if (found) {
      setNotFound(false);
      return;
    }
    setNotFound(true);
    setTimeout(() => setNotFound(false), 3500);
  };

  const filteredArtists = searchQuery.trim()
    ? displayArtists.filter((artist: Artist) =>
        artist.nome.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
        (artist.genero_musical && artist.genero_musical.toLowerCase().includes(searchQuery.trim().toLowerCase()))
      )
    : displayArtists;

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 font-poppins">Nossos Artistas</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Descubra talentos musicais brasileiros e conecte-se com artistas incríveis
          </p>
        </div>

        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <form
              onSubmit={handleSearch}
              className={`bg-neutral-900 rounded-full px-6 py-3 flex items-center gap-3 w-full ${notFound ? 'ring-2 ring-red-500' : ''}`}
            >
              <button type="submit" className="cursor-pointer">
                <Image
                  src="/busca.png"
                  alt="Buscar"
                  width={20}
                  height={20}
                />
              </button>

              <input
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setNotFound(false); }}
                className="bg-transparent outline-none text-gray-200 placeholder-gray-500 w-full font-montserrat"
                placeholder="Busque um artista ou gênero musical..."
                aria-label="Buscar artistas"
                autoComplete="off"
              />
            </form>

            <div role="status" aria-live="polite">
              {notFound && <p className="mt-2 text-red-400 text-sm text-center">Artista não encontrado</p>}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-400">Carregando artistas...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-red-400">Erro ao carregar artistas. Usando dados de exemplo.</p>
          </div>
        ) : filteredArtists.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-400">Nenhum artista encontrado.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArtists.map((artist: Artist) => (
              <Link
                key={artist.id}
                href={`/artista/${artist.id}`}
                className="group"
              >
                <div className="bg-neutral-900 rounded-xl overflow-hidden hover:ring-2 hover:ring-[#7A3BFF] transition-all duration-300 transform hover:scale-105">
                  <div className="relative w-full aspect-square bg-neutral-800">
                    <Image
                      src={artist.img || "/placeholder.svg"}
                      alt={artist.nome}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 font-poppins group-hover:text-[#7A3BFF] transition">
                      {artist.nome}
                    </h3>
                    {artist.genero_musical && (
                      <p className="text-gray-400 text-sm font-montserrat mb-2">
                        {artist.genero_musical}
                      </p>
                    )}
                    {artist.bio && (
                      <p className="text-gray-300 text-sm font-montserrat line-clamp-3">
                        {artist.bio}
                      </p>
                    )}
                    <div className="mt-4 flex items-center text-[#7A3BFF] text-sm font-medium">
                      Ver perfil
                      <span className="ml-2">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
};

export default ArtistasPage;
