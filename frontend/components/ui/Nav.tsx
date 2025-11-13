"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";

const Nav: React.FC = () => {
  return (
    <header className="w-full sticky top-0 z-50 bg-black/70 backdrop-blur-sm transition-colors">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/home">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 relative">
                <Image src="/sonora_icon.svg" alt="Sonora" fill className="object-cover" />
              </div>
            </div>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-gray-300">
          <Link href="/home" className="hover:text-white">Home</Link>
          <Link href="/home#artistas" className="hover:text-white">Artistas</Link>
          <Link href="/home#conheca" className="hover:text-white">Conheça</Link>
          <Link href="/carrinho" className="hover:text-white">Carrinho</Link>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
