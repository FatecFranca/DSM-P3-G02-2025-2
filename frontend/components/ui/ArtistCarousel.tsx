"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { artists } from "../../data/artists";

const ArtistCarousel: React.FC = () => {
  const [current, setCurrent] = useState<number>(1);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragDelta, setDragDelta] = useState<number>(0);
  const n = artists.length;

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
          <Image src={artists[leftIndex].img} alt={artists[leftIndex].name} fill className="object-cover" />
        </div>

        <div className="relative w-48 h-64 rounded-xl overflow-hidden shadow-2xl transform scale-105 z-20">
          <Link href={`/artista/${artists[current].id}`} className="block w-full h-full">
            <Image src={artists[current].img} alt={artists[current].name} fill className="object-cover" />
          </Link>
        </div>

        <div
          onClick={() => setCurrent(rightIndex)}
          className="absolute right-0 top-12 w-40 h-56 rounded-xl overflow-hidden shadow-xl transform transition-transform duration-300 cursor-pointer hover:scale-105"
          style={{ zIndex: 10 }}
        >
          <Image src={artists[rightIndex].img} alt={artists[rightIndex].name} fill className="object-cover" />
        </div>

        <button
          aria-label="next"
          onClick={next}
          className="absolute right-2 z-10 text-gray-400 hover:text-white"
        >
          ›
        </button>
      </div>

      <div className="mt-4 text-center">
        <p className="text-white font-semibold mb-2">{artists[current].name}</p>
        <div className="flex items-center justify-center gap-2">
          {artists.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full ${i === current ? 'bg-white' : 'bg-gray-600'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistCarousel;
