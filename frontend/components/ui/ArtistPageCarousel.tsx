"use client";

import React, { useState } from "react";
import Image from "next/image";
import { artists } from "../../data/artists";
import { useArtist } from '@/hooks/useApi';

interface ArtistPageCarouselProps {
  artistId?: string;
}

const ArtistPageCarousel: React.FC<ArtistPageCarouselProps> = ({ artistId }) => {
  const local = artists.find(a => a.id === artistId);
  const { artist: apiArtist } = useArtist(artistId);
  const images = local?.images || (apiArtist as any)?.images || [];

  if (typeof window !== 'undefined') {
    // eslint-disable-next-line no-console
    console.debug('[ArtistPageCarousel] artistId =', artistId, 'foundLocal=', !!local, 'localImages=', local?.images?.length, 'apiImages=', (apiArtist as any)?.images?.length);
  }
  
  const [current, setCurrent] = useState<number>(0);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragDelta, setDragDelta] = useState<number>(0);
  const n = images.length;

  if (n === 0) return <div>No images available</div>;

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
      <div className="relative flex items-center justify-center">
        
        <button
          aria-label="previous"
          onClick={prev}
          className="absolute -left-12 z-10 text-gray-400 hover:text-white text-3xl p-2"
        >
          ‹
        </button>

        <div
          className="relative w-[420px] h-[300px] flex items-center justify-center"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={resetDrag}
          onPointerLeave={resetDrag}
          style={{ transform: `translateX(${dragDelta}px)`, transition: dragStart ? 'none' : 'transform 300ms ease', touchAction: 'pan-y' }}
        >
          
          <div
            onClick={() => setCurrent(leftIndex)}
            className="absolute left-0 top-12 w-40 h-56 rounded-xl overflow-hidden shadow-xl transform transition-transform duration-300 cursor-pointer hover:scale-105"
            style={{ zIndex: 10 }}
          >
            <Image src={images[leftIndex].img} alt={images[leftIndex].alt} fill className="object-cover" />
          </div>

          <div className="relative w-48 h-64 rounded-xl overflow-hidden shadow-2xl transform scale-105 z-20 cursor-pointer">
            <Image 
              src={images[current].img} 
              alt={images[current].alt} 
              fill 
              className="object-cover" 
            />
          </div>

          <div
            onClick={() => setCurrent(rightIndex)}
            className="absolute right-0 top-12 w-40 h-56 rounded-xl overflow-hidden shadow-xl transform transition-transform duration-300 cursor-pointer hover:scale-105"
            style={{ zIndex: 10 }}
          >
            <Image src={images[rightIndex].img} alt={images[rightIndex].alt} fill className="object-cover" />
          </div>
        </div>


        <button
          aria-label="next"
          onClick={next}
          className="absolute -right-12 z-10 text-gray-400 hover:text-white text-3xl p-2"
        >
          ›
        </button>
      </div>

      <div className="mt-4 text-center">
        <div className="flex items-center justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full cursor-pointer ${i === current ? 'bg-white' : 'bg-gray-600'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistPageCarousel;