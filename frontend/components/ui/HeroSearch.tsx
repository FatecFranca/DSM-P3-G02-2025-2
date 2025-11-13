"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { artists as artistsIndex, type Artist } from "../../data/artists";

const HeroSearch: React.FC = () => {
  const [q, setQ] = useState("");
  const [notFound, setNotFound] = useState(false);
  const router = useRouter();


  const doSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const query = q.trim();
    if (!query) return;

    const lower = query.toLowerCase();
    const found = artistsIndex.find((a) => a.name.toLowerCase().includes(lower));
    if (found) {
      setNotFound(false);
      router.push(`/artista/${found.id}`);
      return;
    }
    setNotFound(true);
    setTimeout(() => setNotFound(false), 3500);
  };

  const suggestions: Artist[] = q.trim()
    ? artistsIndex.filter((a) => a.name.toLowerCase().includes(q.trim().toLowerCase())).slice(0, 5)
    : [];

  const goToArtist = (artist: Artist) => {
    setQ(artist.name);
    setNotFound(false);
    router.push(`/artista/${artist.id}`);
  };

  return (
    <section className="w-full flex flex-col items-center">
      <div className="relative w-96 mt-4">
        <form
          onSubmit={doSearch}
          className={`bg-neutral-800 rounded-full px-6 py-2 flex items-center gap-3 w-full ${notFound ? 'ring-2 ring-red-500' : ''}`}
        >
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); setNotFound(false); }}
            className="bg-transparent outline-none text-gray-200 placeholder-gray-500 w-full"
            placeholder="Busque seu artista"
            aria-label="Buscar artista"
            autoComplete="off"
          />
          <button type="submit" className="bg-linear-to-r from-purple-600 to-orange-500 text-white rounded-full px-4 py-1">Buscar</button>
        </form>

        {suggestions.length > 0 && (
          <ul className="absolute left-0 right-0 mt-2 bg-neutral-900 rounded-md shadow-lg max-h-56 overflow-auto z-40">
            {suggestions.map((s) => (
              <li
                key={s.id}
                onMouseDown={(e) => e.preventDefault()} /* prevent blur before click */
                onClick={() => goToArtist(s)}
                className="px-4 py-2 hover:bg-neutral-800 cursor-pointer text-left text-gray-100"
              >
                {s.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div role="status" aria-live="polite">
        {notFound && <p className="mt-2 text-red-400 text-sm">Artista não encontrado</p>}
      </div>
    </section>
  );
};

export default HeroSearch;
