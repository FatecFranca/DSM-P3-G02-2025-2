"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="flex flex-col items-center gap-8">
          <div className="w-32 h-32 relative">
            <Image src="/sonora_logo.svg" alt="Sonora logo" fill className="object-contain" />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Bem-vindo ao <span className="bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">Sonora</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl">
            A plataforma que conecta artistas musicais brasileiros com seus fãs
          </p>
          <div className="mt-4">
            <Image src="/waveform.svg" alt="waveform" width={560} height={30} />
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-16">Como usar a plataforma</h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Para Fãs */}
          <div className="bg-neutral-900 rounded-2xl p-8 border border-gray-800">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-orange-500 flex items-center justify-center text-2xl font-bold">
                🎵
              </div>
              <h3 className="text-3xl font-bold">Para Fãs</h3>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="text-purple-500 font-bold text-xl">1</div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Crie sua conta</h4>
                  <p className="text-gray-400">Cadastre-se gratuitamente como fã para começar</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-purple-500 font-bold text-xl">2</div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Explore artistas</h4>
                  <p className="text-gray-400">Descubra novos talentos da música brasileira</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-purple-500 font-bold text-xl">3</div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Acompanhe a agenda</h4>
                  <p className="text-gray-400">Veja shows e eventos dos seus artistas favoritos</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-purple-500 font-bold text-xl">4</div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Compre produtos</h4>
                  <p className="text-gray-400">Adquira merchandising oficial dos artistas</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link href="/auth/register">
                <Button>Cadastrar como Fã</Button>
              </Link>
            </div>
          </div>

          {/* Para Artistas */}
          <div className="bg-neutral-900 rounded-2xl p-8 border border-gray-800">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 flex items-center justify-center text-2xl font-bold">
                🎤
              </div>
              <h3 className="text-3xl font-bold">Para Artistas</h3>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="text-orange-500 font-bold text-xl">1</div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Registre-se como artista</h4>
                  <p className="text-gray-400">Crie seu perfil profissional na plataforma</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-orange-500 font-bold text-xl">2</div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Configure seu perfil</h4>
                  <p className="text-gray-400">Adicione fotos, biografia e informações</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-orange-500 font-bold text-xl">3</div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Divulgue eventos</h4>
                  <p className="text-gray-400">Publique sua agenda de shows e apresentações</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-orange-500 font-bold text-xl">4</div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Venda produtos</h4>
                  <p className="text-gray-400">Ofereça merchandising aos seus fãs</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link href="/auth/cadastro-artista">
                <Button>Cadastrar como Artista</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">Pronto para começar?</h2>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Junte-se à comunidade que valoriza e impulsiona a música brasileira
        </p>
        <Link href="/">
          <button className="px-10 py-4 text-lg rounded-full bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 font-semibold transition-all">
            Explorar Artistas
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-400">
          <p>© 2025 Sonora - Conectando artistas e fãs da música brasileira</p>
        </div>
      </footer>
    </main>
  );
}