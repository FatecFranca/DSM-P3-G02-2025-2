// components/ui/ProductsSection.tsx
'use client';

import React, { useState } from 'react';

interface ProductsSectionProps {
  artistId?: string;
}

export default function ProductsSection({ artistId }: ProductsSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const products = [
    { id: 1, name: "MARINA VX-ES", description: "Camiseta oficial", price: "R$ 79,90" },
    { id: 2, name: "MARINA VX-ES", description: "Álbum físico", price: "R$ 49,90" },
    { id: 3, name: "MARINA VX-ES", description: "Boné oficial", price: "R$ 59,90" },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="produtos" className="min-h-screen bg-neutral-900 py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Produtos</h2>
        
        {/* Barra de Pesquisa */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Buscar produtos..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>
        </div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-neutral-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-40 bg-neutral-700 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-3xl">🛍️</span>
              </div>
              <div className="text-center">
                <h3 className="font-bold text-white text-lg mb-2">{product.name}</h3>
                <p className="text-gray-300 mb-3">{product.description}</p>
                <p className="text-xl font-bold text-white mb-4">{product.price}</p>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition font-medium w-full">
                  Adicionar ao carrinho
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Botão Ver Mais */}
        <div className="text-center mt-8">
          <button className="border border-purple-600 text-purple-600 px-6 py-2 rounded-lg hover:bg-purple-600 hover:text-white transition font-medium">
            Ver mais
          </button>
        </div>
      </div>
    </section>
  );
}