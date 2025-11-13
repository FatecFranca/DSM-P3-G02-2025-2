"use client";

import React from "react";
import Image from "next/image";

const ArtistCarousel: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div className="relative w-80 h-64">
        <div className="absolute left-0 top-4 w-56 h-56 rounded-lg overflow-hidden transform -translate-x-6 shadow-xl">
          <Image src="/sonora_logo.svg" alt="artist" fill className="object-contain" />
        </div>
        <div className="absolute left-12 top-0 w-56 h-64 rounded-lg overflow-hidden shadow-2xl">
          <Image src="/sonora_logo.svg" alt="artist" fill className="object-contain" />
        </div>
        <div className="absolute left-28 top-6 w-56 h-56 rounded-lg overflow-hidden transform translate-x-6 shadow-xl">
          <Image src="/sonora_logo.svg" alt="artist" fill className="object-contain" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 text-center">
          <p className="text-white font-semibold">Marina Sena</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${i === 2 ? 'bg-white' : 'bg-gray-600'}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistCarousel;
