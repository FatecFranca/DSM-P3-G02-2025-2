// components/ui/ProductsSection.tsx
'use client';

import React, { useState } from 'react';

interface ProductsSectionProps {
  artistId?: string;
}

export default function ProductsSection({ artistId }: ProductsSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const products = [
    { id: 1, name: "MARINA VX-ES", description: "Produto oficial", price: "R$ 79,90" },
    { id: 2, name: "MARINA VX-ES", description: "Produto oficial", price: "R$ 49,90" },
    { id: 3, name: "MARINA VX-ES", description: "Produto oficial", price: "R$ 59,90" },
  ];

  return (
    <section id="produtos" className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Produtos</h2>
        
        {/* Barra de Pesquisa Simples */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Buscar produtos..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Grid de Produtos Simples */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {products.map(product => (
            <div key={product.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-2xl">🛍️</span>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="text-lg font-bold text-gray-900 mb-3">{product.price}</p>
                <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition font-medium">
                  Adicionar ao carrinho
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Botão Ver Mais */}
        <div className="text-center mt-8">
          <button className="border border-primary text-primary px-6 py-2 rounded-lg hover:bg-primary hover:text-white transition font-medium">
            Ver mais
          </button>
        </div>
      </div>
    </section>
  );
}