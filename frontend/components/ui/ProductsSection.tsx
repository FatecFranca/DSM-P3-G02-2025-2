'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Button from './Button'; // Ajuste o caminho conforme necessário

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  sizes: string[];
}

interface ProductsSectionProps {
  artistId?: string;
}

export default function ProductsSection({ artistId }: ProductsSectionProps) {
  const [q, setQ] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<{[key: number]: string}>({});

  const handleSizeSelect = (productId: number, size: string) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size
    }));
  };

  const handleAddToCart = (productId: number) => {
    const selectedSize = selectedSizes[productId];
    console.log(`Adicionando produto ${productId} tamanho ${selectedSize} ao carrinho`);
    // Aqui você pode adicionar a lógica do carrinho
  };

  const products = [
    { 
      id: 1, 
      name: "Camiseta Coisas Naturais", 
      description: "Camiseta Básica Coisas Naturais Oficial - 100% Algodão", 
      price: "R$ 129,90", 
      image: "/produtos/coisas1.png",
      sizes: ["P", "M", "G", "GG"]
    },
    { 
      id: 2, 
      name: "Camiseta Coisas Naturais", 
      description: "Camiseta Básica Camiseta Coisas Naturais Oficial - 100% Algodão", 
      price: "R$ 129,90", 
      image: "/produtos/coisas2.png",
      sizes: ["P", "M", "G", "GG"]
    },
    { 
      id: 3, 
      name: "Camiseta Coisas Naturais", 
      description: "Camiseta Básica Camiseta Coisas Naturais Oficial - 100% Algodão", 
      price: "R$ 129,90", 
      image: "/produtos/coisas3.png",
      sizes: ["P", "M", "G", "GG"]
    },
    { 
      id: 4, 
      name: "Camiseta De Primeira", 
      description: "Camiseta Básica Camiseta De Primeira Oficial - 100% Algodão", 
      price: "R$ 129,90", 
      image: "/produtos/primeira1.png",
      sizes: ["P", "M", "G", "GG"]
    },
    { 
      id: 5, 
      name: "Camiseta De Primeira", 
      description: "Camiseta Básica Camiseta De Primeira Oficial - 100% Algodão", 
      price: "R$ 129,90", 
      image: "/produtos/primeira2.png",
      sizes: ["P", "M", "G", "GG"]
    },
    { 
      id: 6, 
      name: "Camiseta De Primeira", 
      description: "Camiseta Básica Camiseta De Primeira Oficial - 100% Algodão", 
      price: "R$ 129,90", 
      image: "/produtos/primeira3.png",
      sizes: ["P", "M", "G", "GG"]
    },
    { 
      id: 7, 
      name: "Camiseta Vício Inerente", 
      description: "Camiseta Básica Vício Inerente Oficial - 100% Algodão", 
      price: "R$ 129,90", 
      image: "/produtos/vicio1.jpg",
      sizes: ["P", "M", "G", "GG"]
    },
    { 
      id: 8, 
      name: "Camiseta Vício Inerente", 
      description: "Camiseta Básica Vício Inerente Oficial - 100% Algodão", 
      price: "R$ 129,90", 
      image: "/produtos/vicio2.jpg",
      sizes: ["P", "M", "G", "GG"]
    },
    { 
      id: 9, 
      name: "Camiseta Vício Inerente", 
      description: "Camiseta Básica Vício Inerente Oficial - 100% Algodão", 
      price: "R$ 129,90", 
      image: "/produtos/vicio3.jpg",
      sizes: ["P", "M", "G", "GG"]
    },
  ];

  const doSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const query = q.trim();
    if (!query) return;

    const lower = query.toLowerCase();
    const found = products.find((p) => 
      p.name.toLowerCase().includes(lower) || 
      p.description.toLowerCase().includes(lower)
    );
    
    if (found) {
      setNotFound(false);
      return;
    }
    setNotFound(true);
    setTimeout(() => setNotFound(false), 3500);
  };

  const filteredProducts = q.trim()
    ? products.filter((p) => 
        p.name.toLowerCase().includes(q.trim().toLowerCase()) || 
        p.description.toLowerCase().includes(q.trim().toLowerCase())
      )
    : products;

  return (
    <section id="produtos" className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-white font-poppins">Produtos</h2>
        
        {/* Barra de Pesquisa - LUPA À ESQUERDA */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <form
              onSubmit={doSearch}
              className={`bg-neutral-900 rounded-full px-6 py-2 flex items-center gap-3 w-full ${notFound ? 'ring-2 ring-red-500' : ''}`}
            >
              {/* Ícone da lupa da pasta public */}
              <button type="submit" className="cursor-pointer">
                <Image 
                  src="/busca.png" 
                  alt="Buscar" 
                  width={20} 
                  height={20}
                />
              </button>
              
              <input
                value={q}
                onChange={(e) => { setQ(e.target.value); setNotFound(false); }}
                className="bg-transparent outline-none text-gray-200 placeholder-gray-500 w-full font-montserrat"
                placeholder="Busque um produto..."
                aria-label="Buscar produtos"
                autoComplete="off"
              />
            </form>

            <div role="status" aria-live="polite">
              {notFound && <p className="mt-2 text-red-400 text-sm text-center">Produto não encontrado</p>}
            </div>
          </div>
        </div>

        {/* Grid de Produtos - 9 GRIDS QUADRADOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-neutral-900 rounded-lg p-6 border border-neutral-800 aspect-square flex flex-col">
              {/* Área da imagem - QUADRADA */}
              <div className="w-full aspect-square bg-neutral-800 rounded-lg mb-4 overflow-hidden">
                <Image 
                  src={product.image} 
                  alt={product.description}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Conteúdo - ocupa o resto do espaço */}
              <div className="flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-bold text-white text-lg mb-2 font-poppins">{product.name}</h3>
                  <p className="text-gray-400 mb-3 font-montserrat text-sm">{product.description}</p>
                  
                  {/* Seletor de Tamanhos */}
                  <div className="mb-4">
                    <p className="text-gray-400 text-sm mb-2 font-montserrat">Tamanho:</p>
                    <div className="flex gap-2">
                      {product.sizes?.map((size) => (
                        <button
                          key={size}
                          onClick={() => handleSizeSelect(product.id, size)}
                          className={`w-8 h-8 rounded text-sm font-medium transition ${
                            selectedSizes[product.id] === size
                              ? 'bg-[#7A3BFF] text-white'
                              : 'bg-neutral-700 text-gray-300 hover:bg-neutral-600'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <p className="text-xl font-bold text-white mb-4 font-montserrat">{product.price}</p>
                  
                  {/* USANDO O COMPONENTE BUTTON DA SUA AMIGA */}
                  <Button
                    onClick={() => handleAddToCart(product.id)}
                    disabled={!selectedSizes[product.id]}
                    className={!selectedSizes[product.id] ? 'opacity-50 cursor-not-allowed' : ''}
                  >
                    {selectedSizes[product.id] ? 'Adicionar ao carrinho' : 'Selecione um tamanho'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botão Ver Mais - TAMBÉM USANDO O COMPONENTE BUTTON */}
        <div className="text-center mt-8">
          <Button
            onClick={() => console.log('Ver mais produtos')}
            className="border border-[#7A3BFF] text-white bg-transparent hover:from-purple-700 hover:to-orange-600"
          >
            Ver mais
          </Button>
        </div>
      </div>
    </section>
  );
}