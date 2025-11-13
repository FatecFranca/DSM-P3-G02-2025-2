"use client";

import React from "react";

const HeroSearch: React.FC = () => {
  return (
          <section className="w-full flex justify-center">
            <div className="mt-4 bg-neutral-800 rounded-full px-6 py-2 flex items-center gap-3 w-96">
              <input className="bg-transparent outline-none text-gray-200 placeholder-gray-500 w-full" placeholder="Busque seu artista" />
              <button className="bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-full px-4 py-1">Buscar</button>
            </div>
          </section>
  );
};

export default HeroSearch;
