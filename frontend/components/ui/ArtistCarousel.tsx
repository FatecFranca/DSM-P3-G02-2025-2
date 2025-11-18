"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useArtists } from "@/hooks/useApi";

interface ArtistDisplay {
  id: string;
  nome: string;
  img: string;
  genero_musical?: string;
}

const ArtistCarousel: React.FC = () => {
  const { artists: apiArtists, loading } = useArtists();
  const [current, setCurrent] = useState<number>(0);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragDelta, setDragDelta] = useState<number>(0);
  const [artists, setArtists] = useState<ArtistDisplay[]>([]);

  // Image mapping for artists
  const artistImages: Record<string, string> = {
    "691c47435ecfe54f6cdd63dd": "/ebony.svg",
    "691c47435ecfe54f6cdd63dc": "/marina_sena.svg",
    "691c47435ecfe54f6cdd63de": "/duquesa.svg",
  };

  // Initialize with fallback data to avoid hydration mismatch
  useEffect(() => {
    const fallbackArtists: ArtistDisplay[] = [
      { id: "691c47435ecfe54f6cdd63dd", nome: "Ebony", img: "/ebony.svg", genero_musical: "Pop/R&B" },
      { id: "691c47435ecfe54f6cdd63dc", nome: "Marina Sena", img: "/marina_sena.svg", genero_musical: "MPB/Pop" },
      { id: "691c47435ecfe54f6cdd63de", nome: "Duquesa", img: "/duquesa.svg", genero_musical: "Rap/Hip-Hop" },
    ];

    if (apiArtists.length > 0) {
      // Map API artists with their images
      const mappedArtists = apiArtists.map((artist: any) => ({
        id: artist.id,
        nome: artist.nome,
        img: artistImages[artist.id] || "/placeholder.svg",
        genero_musical: artist.genero_musical,
      }));
      setArtists(mappedArtists);
    } else if (!loading) {
      setArtists(fallbackArtists);
    }
  }, [apiArtists, loading]);

  const n = artists.length;

  if (loading || n === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-400">{loading ? "Carregando artistas..." : "Nenhum artista encontrado."}</p>
      </div>
    );
  }

  const prev = () => setCurrent((c) => (c - 1 + n) % n);
  const next = () => setCurrent((c) => (c + 1) % n);

  const leftIndex = (current - 1 + n) % n;
  const rightIndex = (current + 1) % n;

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button === 2) return;
    try {
      (e.target as Element).setPointerCapture(e.pointerId);
    } catch {
    }
    setDragStart(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragStart === null) return;
    setDragDelta(e.clientX - dragStart);
  };

  const resetDrag = (e?: React.PointerEvent) => {
    if (dragStart === null) return;
    try {
      if (e) (e.target as Element).releasePointerCapture(e.pointerId);
    } catch {
    }
    setDragStart(null);
    setDragDelta(0);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragStart === null) return resetDrag(e);
    const delta = e.clientX - dragStart;
    const threshold = 60;
    if (delta > threshold) {
      prev();
    } else if (delta < -threshold) {
      next();
    }
    resetDrag(e);
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-[420px] h-[300px] flex items-center justify-center"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={resetDrag}
        onPointerLeave={resetDrag}
        style={{ transform: `translateX(${dragDelta}px)`, transition: dragStart ? 'none' : 'transform 300ms ease', touchAction: 'pan-y' }}
      >
        <button
          aria-label="previous"
          onClick={prev}
          className="absolute left-2 z-10 text-gray-400 hover:text-white"
        >
          ‹
        </button>

        <div
          onClick={() => setCurrent(leftIndex)}
          className="absolute left-0 top-12 w-40 h-56 rounded-xl overflow-hidden shadow-xl transform transition-transform duration-300 cursor-pointer hover:scale-105"
          style={{ zIndex: 10 }}
        >
          <Image
            src={artists[leftIndex].img}
            alt={artists[leftIndex].nome}
            fill
            className="object-cover"
          />
        </div>

        <div className="relative w-48 h-64 rounded-xl overflow-hidden shadow-2xl transform scale-105 z-20">
          <Link href={`/artista/${artists[current].id}`} className="block w-full h-full">
            <Image
              src={artists[current].img}
              alt={artists[current].nome}
              fill
              className="object-cover"
            />
          </Link>
        </div>

        <div
          onClick={() => setCurrent(rightIndex)}
          className="absolute right-0 top-12 w-40 h-56 rounded-xl overflow-hidden shadow-xl transform transition-transform duration-300 cursor-pointer hover:scale-105"
          style={{ zIndex: 10 }}
        >
          <Image
            src={artists[rightIndex].img}
            alt={artists[rightIndex].nome}
            fill
            className="object-cover"
          />
        </div>

        <button
          aria-label="next"
          onClick={next}
          className="absolute right-2 z-10 text-gray-400 hover:text-white"
        >
          ›
        </button>
      </div>

      <div className="mt-8 text-center">
        <h4 className="text-2xl font-semibold">{artists[current].nome}</h4>
        {artists[current].genero_musical && (
          <p className="text-gray-400 mt-2">{artists[current].genero_musical}</p>
        )}
      </div>

      <div className="flex mt-4 gap-2">
        {artists.map((_, i) => (
          <button
            key={i}
            aria-label={`go to slide ${i + 1}`}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full ${i === current ? 'bg-white' : 'bg-gray-600'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ArtistCarousel;