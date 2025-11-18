// frontend/app/home-artista/page.tsx
"use client";

import React from "react";
import HeroSearch from "@/components/ui/HeroSearch";
import ArtistCarousel from "@/components/ui/ArtistCarousel";
import Footer from "@/components/ui/Footer";
import Image from "next/image";

const ArtistHomePage: React.FC = () => {
  return (
    <main className="min-h-screen bg-black text-white">
      <section id="home" className="max-w-4xl mx-auto px-6 text-center pt-8">
        <div className="py-12">
          <div className="flex flex-col items-center gap-6">
            <div className="w-40 h-40 relative mx-auto">
              <Image src="/sonora_logo.svg" alt="Sonora logo" fill className="object-contain" />
            </div>
            <p className="text-gray-300 max-w-xl">Conectando artistas, fãs e produtores em um só lugar.</p>
            <div className="mt-4">
              <Image src="/waveform.svg" alt="waveform" width={560} height={30} />
            </div>
            <HeroSearch />
          </div>
        </div>
      </section>

      <section id="artistas" className="max-w-4xl mx-auto px-6 py-12">
        <h3 className="text-4xl font-bold mb-8 text-center">Veja nossos artistas</h3>
        <ArtistCarousel />
      </section>

      <section id="conheca" className="max-w-4xl mx-auto px-6 py-12">
        <h3 className="text-4xl font-extrabold mb-8">Conheça nosso site</h3>
        <div className="grid grid-cols-1 md:grid-cols-1">
          <div />
          <div className="justify-self-end">
            <p className="text-gray-300 leading-relaxed max-w-lg text-2xl text-justify">
              Nossa iniciativa busca impulsionar a visibilidade de <b>artistas musicais nacionais</b> em ascensão e fortalecer a <b>cultura da música brasileira</b>, valorizando talentos locais e ao mesmo tempo criando um espaço digital que conecta artistas e fãs.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ArtistHomePage;