"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const Nav: React.FC = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const handleLogout = () => {
    // placeholder logout: clear any auth state and redirect to home
    try {
      localStorage.removeItem("auth");
    } catch {}
    setOpen(false);
    router.push("/auth");
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-black/70 backdrop-blur-sm transition-colors">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={open}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="w-10 h-10 relative">
                <Image src="/sonora_icon.svg" alt="Sonora" fill className="object-cover rounded-full" />
              </div>
            </button>

            {open && (
              <div className="absolute left-0 mt-3 w-64 bg-neutral-900 rounded-xl shadow-2xl p-4 text-left">
                <p className="text-white text-lg font-medium">Marina Sena</p>
                <p className="text-gray-400 text-sm mb-4">marinas@gmail.com</p>
                <div className="border-t border-neutral-800 pt-3">
                  <Link href="#" className="text-sm text-white underline">Configurar conta</Link>
                  <button onClick={handleLogout} className="block mt-3 text-sm text-red-400 cursor-pointer">Sair</button>
                </div>
              </div>
            )}
          </div>
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
