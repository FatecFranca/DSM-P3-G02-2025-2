'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Button from './Button'; 
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

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

const ProductModal: React.FC<{
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  selectedSize: string;
  onSizeSelect: (size: string) => void;
  onAddToCart: () => void;
}> = ({ product, isOpen, onClose, selectedSize, onSizeSelect, onAddToCart }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-neutral-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-neutral-800">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-6">
            <div className="w-full aspect-square bg-neutral-800 rounded-xl overflow-hidden">
              <Image 
                src={product.image} 
                alt={product.description}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="md:w-1/2 p-6 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white font-poppins">{product.name}</h2>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-white text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            <p className="text-gray-300 mb-4 font-montserrat">{product.description}</p>
            
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-2 font-poppins">Detalhes do Produto</h3>
              <ul className="text-gray-300 text-sm space-y-1 font-montserrat">
                <li>• 100% Algodão</li>
                <li>• Estampa de alta qualidade</li>
                <li>• Lavagem à mão recomendada</li>
                <li>• Entrega em 5-7 dias úteis</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-3 font-poppins">Selecione o Tamanho</h3>
              <div className="flex gap-3 flex-wrap">
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => onSizeSelect(size)}
                    className={`w-12 h-12 rounded-lg text-sm font-medium transition ${
                      selectedSize === size
                        ? 'bg-[#7A3BFF] text-white'
                        : 'bg-neutral-700 text-gray-300 hover:bg-neutral-600'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mt-auto">
              <p className="text-2xl font-bold text-white mb-4 font-montserrat">{product.price}</p>
              
              <Button
                onClick={onAddToCart}
                disabled={!selectedSize}
                className={`w-full ${!selectedSize ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {selectedSize ? 'Adicionar ao Carrinho' : 'Selecione um Tamanho'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ProductsSection({ artistId }: ProductsSectionProps) {
  const [q, setQ] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<{[key: number]: string}>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalSize, setModalSize] = useState("");

  const { addToCart } = useCart();

  const handleSizeSelect = (productId: number, size: string) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size
    }));
  };

  const handleModalSizeSelect = (size: string) => {
    if (selectedProduct) {
      setModalSize(size);
      setSelectedSizes(prev => ({
        ...prev,
        [selectedProduct.id]: size
      }));
    }
  };

  const handleAddToCart = (productId: number) => {
    const selectedSize = selectedSizes[productId];
    
    if (!selectedSize) {
      alert("Por favor, selecione um tamanho antes de adicionar ao carrinho");
      return;
    }

    const product = products.find(p => p.id === productId);
    if (!product) return;

    let brand = "";
    if (product.name.includes("Coisas Naturais")) brand = "Coisas Naturais";
    else if (product.name.includes("De Primeira")) brand = "De Primeira";
    else if (product.name.includes("Vício Inerente")) brand = "Vício Inerente";

    const cartProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      brand: brand,
      size: selectedSize,
      color: "Preto",
      price: parseFloat(product.price.replace('R$ ', '').replace(',', '.')),
      image: product.image
    };

    addToCart(cartProduct);
     console.log('🎯 Chamando toast.success...');
  toast.success('Produto adicionado ao carrinho!');
  
  console.log('✅ Produto adicionado:', cartProduct.name);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setModalSize(selectedSizes[product.id] || "");
  };

  const handleModalAddToCart = () => {
    if (selectedProduct && modalSize) {
      setSelectedSizes(prev => ({
        ...prev,
        [selectedProduct.id]: modalSize
      }));
      setTimeout(() => {
        handleAddToCart(selectedProduct.id);
      }, 100);
    }
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

        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <form
              onSubmit={doSearch}
              className={`bg-neutral-900 rounded-full px-6 py-2 flex items-center gap-3 w-full ${notFound ? 'ring-2 ring-red-500' : ''}`}
            >
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <div 
              key={product.id} 
              className="bg-neutral-900 rounded-lg p-4 aspect-square flex flex-col cursor-pointer hover:border-[#7A3BFF] transition"
              onClick={() => handleProductClick(product)} 
            >
              <div className="w-full aspect-square bg-neutral-800 rounded-lg mb-4 overflow-hidden">
                <Image 
                  src={product.image} 
                  alt={product.description}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-bold text-white text-lg mb-2 font-poppins">{product.name}</h3>
                  <p className="text-gray-400 mb-3 font-montserrat text-sm">{product.description}</p>
                  
                  <div className="mb-4">
                    <p className="text-gray-400 text-sm mb-2 font-montserrat">Tamanho:</p>
                    <div className="flex gap-2">
                      {product.sizes?.map((size) => (
                        <button
                          key={size}
                          onClick={(e) => {
                            e.stopPropagation(); 
                            handleSizeSelect(product.id, size);
                          }}
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
                  
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product.id);
                    }}
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

        <ProductModal
          product={selectedProduct!}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          selectedSize={modalSize}
          onSizeSelect={handleModalSizeSelect}
          onAddToCart={handleModalAddToCart}
        />

        <div className="text-center mt-8">
          <Button
            onClick={() => console.log('Ver mais produtos')}
            className="text-white bg-transparent hover:from-purple-700 hover:to-orange-600"
          >
            Ver mais
          </Button>
        </div>
      </div>
    </section>
  );
}