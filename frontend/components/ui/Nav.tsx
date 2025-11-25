"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { clearAuth } from '@/lib/api';

interface User {
  name: string;
  email: string;
  type?: 'artista' | 'fa';
}

const Nav: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const accountMenuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const { cartItems } = useCart();

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    setMounted(true);
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error parsing user from localStorage', e);
      }
    }
  }, []);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
      if (accountMenuRef.current && !accountMenuRef.current.contains(e.target as Node)) {
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const handleLogout = () => {
    clearAuth();
    setUser(null);
    setOpen(false);
    setAccountMenuOpen(false);
    router.push("/auth");
  };

  const configLink = user?.type === 'artista'
    ? '/auth/cadastro-artista'
    : '/configurar-conta';

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
                <p className="text-white text-lg font-medium">
                  {user ? user.name : "Visitante"}
                </p>
                <p className="text-gray-400 text-sm mb-4">
                  {user ? user.email : "Faça login para continuar"}
                </p>

                <div className="border-t border-neutral-800 pt-3">

                  <Link href={configLink} className="text-sm text-white underline">
                    Configurar conta
                  </Link>

                  {user ? (
                    <button onClick={handleLogout} className="block mt-3 text-sm text-red-400 cursor-pointer">
                      Sair
                    </button>
                  ) : (
                    <Link href="/auth" className="block mt-3 text-sm text-primary cursor-pointer">
                      Entrar
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-gray-300">
          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/artistas" className="hover:text-white">Artistas</Link>
          <Link href="/produtos" className="hover:text-white">Produtos</Link>
          <Link href="/conheca" className="hover:text-white">Conheça</Link>
        </nav>

        <div className="flex items-center gap-4">
          {/* Cart Icon with Badge */}
          <Link href="/carrinho" className="relative">
            <div className="w-6 h-6 relative cursor-pointer hover:opacity-80 transition">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-300 hover:text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </div>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* Account Menu */}
          <div className="relative" ref={accountMenuRef}>
            <button
              onClick={() => setAccountMenuOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={accountMenuOpen}
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
            >
              <div className="w-6 h-6 relative">
                <Image src="/user.png" alt="Account" width={24} height={24} className="object-contain" />
              </div>
            </button>

            {accountMenuOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-neutral-900 rounded-xl shadow-2xl p-4 text-left">
                <p className="text-white text-lg font-medium">
                  {user ? user.name : "Visitante"}
                </p>
                <p className="text-gray-400 text-sm mb-4">
                  {user ? user.email : "Faça login para continuar"}
                </p>

                <div className="border-t border-neutral-800 pt-3">
                  {user ? (
                    <>
                      <Link href={configLink} className="block text-sm text-white hover:text-purple-400 transition">
                        Configurar conta
                      </Link>
                      <button onClick={handleLogout} className="block mt-3 text-sm text-red-400 hover:text-red-300 cursor-pointer transition">
                        Sair
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/auth" className="block text-sm text-white hover:text-purple-400 transition">
                        Entrar
                      </Link>
                      <Link href="/auth/register" className="block mt-3 text-sm text-gray-300 hover:text-white transition">
                        Cadastrar
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {!user && (
            <Link href="/auth" className="hidden md:block">
              <button className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 font-semibold transition-all">
                Entrar
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Nav;