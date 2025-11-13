"use client";

import React from "react";
import Nav from "@/components/ui/Nav";
import HeroSearch from "@/components/ui/HeroSearch";
import ArtistCarousel from "@/components/ui/ArtistCarousel";
import Footer from "@/components/ui/Footer";
import Image from "next/image";

const HomePage: React.FC = () => {
  return (
    <main className="min-h-screen bg-black text-white">
      <Nav />
       <section className="max-w-4xl mx-auto px-6 text-center pt-8">
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
          
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h3 className="text-3xl font-bold mb-8 text-center">Veja nossos artistas</h3>
        <ArtistCarousel />
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12">
        <h3 className="text-3xl font-bold mb-4">Conheça nosso site</h3>
        <p className="text-gray-300 leading-relaxed">
          Nossa iniciativa busca impulsionar a visibilidade de artistas musicais nacionais em ascensão e fortalecer a cultura da música brasileira, valorizando talentos locais e ao mesmo tempo criando um espaço digital que conecta artistas e fãs.
        </p>
      </section>

      <Footer />
    </main>
  );
};

export default HomePage;
