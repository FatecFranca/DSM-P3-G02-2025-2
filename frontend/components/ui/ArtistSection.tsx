'use client';
import React, { useMemo } from 'react';
import ArtistPageCarousel from './ArtistPageCarousel';
import { useArtist } from '@/hooks/useApi';

interface ArtistSectionProps {
  artistId?: string;
}

// Artist image and data mapping
const artistDefaults: Record<string, { img: string; defaultName: string; socialLinks: any }> = {
  "691c47435ecfe54f6cdd63dc": {
    img: "/marina_sena.svg",
    defaultName: "Marina Sena",
    socialLinks: {
      spotify: "https://open.spotify.com/intl-pt/artist/0nFdWpwl7h6fp3ADRyG14L",
      instagram: "https://www.instagram.com/amarinasena",
      facebook: "https://www.facebook.com/amarinasena2/?locale=pt_BR",
      twitter: "https://twitter.com/amarinasena"
    }
  },
  "691c47435ecfe54f6cdd63dd": {
    img: "/ebony.svg",
    defaultName: "Ebony",
    socialLinks: {
      instagram: "https://www.instagram.com/ebonyoficial",
      spotify: "https://open.spotify.com/artist/ebony"
    }
  },
  "691c47435ecfe54f6cdd63de": {
    img: "/duquesa.svg",
    defaultName: "Duquesa",
    socialLinks: {
      instagram: "https://www.instagram.com/duquesareal",
      spotify: "https://open.spotify.com/artist/duquesa",
      youtube: "https://www.youtube.com/duquesa"
    }
  }
};

export default function ArtistSection({ artistId }: ArtistSectionProps) {
  const { artist, loading, error } = useArtist(artistId || "691c47435ecfe54f6cdd63dc");

  const artistData = useMemo(() => {
    const defaults = artistDefaults[artistId || "691c47435ecfe54f6cdd63dc"];
    return {
      nome: artist?.nome || defaults?.defaultName || "Artista",
      bio: artist?.bio || "Informações sobre o artista em breve.",
      rede_social: artist?.rede_social || [],
      socialLinks: defaults?.socialLinks || {}
    };
  }, [artist, artistId]);

  if (loading) {
    return (
      <section id="artista" className="min-h-screen bg-black text-white py-8">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-400">Carregando informações do artista...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="artista" className="min-h-screen bg-black text-white py-8">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex justify-center items-center h-64">
            <p className="text-red-400">Erro ao carregar artista.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="artista" className="min-h-screen bg-black text-white py-8">
      <div className="container mx-auto px-6 max-w-6xl">

        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-6 font-poppins">{artistData.nome}</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          <div className="flex justify-center">
            <ArtistPageCarousel artistId={artistId || "691c47435ecfe54f6cdd63dc"} />
          </div>

          <div className="space-y-6">
            <div className="text-gray-300 leading-relaxed text-justify">
              <p className="text-lg">
                {artistData.bio}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-gray-300 mt-12 px-4">
          {artistData.socialLinks.spotify && (
            <a
              href={artistData.socialLinks.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-white transition"
            >
              <img src="/spotify.png" alt="Spotify" className="w-6 h-6" />
              <span className="font-semibold">Spotify</span>
            </a>
          )}

          {artistData.socialLinks.instagram && (
            <a
              href={artistData.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-white transition"
            >
              <img src="/instagram.png" alt="Instagram" className="w-6 h-6" />
              <span className="font-medium">Instagram</span>
            </a>
          )}

          {artistData.socialLinks.facebook && (
            <a
              href={artistData.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-white transition"
            >
              <img src="/facebook.png" alt="Facebook" className="w-6 h-6" />
              <span className="font-medium">Facebook</span>
            </a>
          )}

          {artistData.socialLinks.twitter && (
            <a
              href={artistData.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-white transition"
            >
              <img src="/midia-social.png" alt="X" className="w-6 h-6" />
              <span className="font-medium">X</span>
            </a>
          )}

          {artistData.socialLinks.youtube && (
            <a
              href={artistData.socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-white transition"
            >
              <img src="/midia-social.png" alt="YouTube" className="w-6 h-6" />
              <span className="font-medium">YouTube</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}