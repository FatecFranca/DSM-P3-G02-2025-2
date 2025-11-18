"use client";

import React, { useState } from "react";
import Image from "next/image";
import Footer from "@/components/ui/Footer";
import Button from "@/components/ui/Button";
import { useProducts } from "@/hooks/useApi";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

interface Product {
  id: string | number;
  nome: string;
  descricao?: string;
  preco: number;
  image?: string;
  sizes?: string[];
  artista_id?: string;
}

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  selectedSize: string;
  onSizeSelect: (size: string) => void;
  onAddToCart: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  selectedSize,
  onSizeSelect,
  onAddToCart
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-neutral-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-neutral-800">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-6">
            <div className="w-full aspect-square bg-neutral-800 rounded-xl overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.descricao || product.nome}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="md:w-1/2 p-6 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white font-poppins">{product.nome}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <p className="text-gray-300 mb-4 font-montserrat">{product.descricao || "Produto oficial"}</p>

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
                {(product.sizes || ["P", "M", "G", "GG"]).map((size) => (
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
              <p className="text-2xl font-bold text-white mb-4 font-montserrat">
                R$ {typeof product.preco === 'number' ? product.preco.toFixed(2).replace('.', ',') : '0,00'}
              </p>

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

const ProdutosPage: React.FC = () => {
  const { products: apiProducts, loading, error } = useProducts();
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<{[key: string | number]: string}>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalSize, setModalSize] = useState("");

  // Fallback products data
  const fallbackProducts: Product[] = [
    {
      id: 1,
      nome: "Camiseta Coisas Naturais",
      descricao: "Camiseta Básica Coisas Naturais Oficial - 100% Algodão",
      preco: 129.90,
      image: "/produtos/coisas1.png",
      sizes: ["P", "M", "G", "GG"]
    },
    {
      id: 2,
      nome: "Camiseta Coisas Naturais",
      descricao: "Camiseta Básica Camiseta Coisas Naturais Oficial - 100% Algodão",
      preco: 129.90,
      image: "/produtos/coisas2.png",
      sizes: ["P", "M", "G", "GG"]
    },
    {
      id: 3,
      nome: "Camiseta Coisas Naturais",
      descricao: "Camiseta Básica Camiseta Coisas Naturais Oficial - 100% Algodão",
      preco: 129.90,
      image: "/produtos/coisas3.png",
      sizes: ["P", "M", "G", "GG"]
    },
    {
      id: 4,
      nome: "Camiseta De Primeira",
      descricao: "Camiseta Básica Camiseta De Primeira Oficial - 100% Algodão",
      preco: 129.90,
      image: "/produtos/primeira1.png",
      sizes: ["P", "M", "G", "GG"]
    },
    {
      id: 5,
      nome: "Camiseta De Primeira",
      descricao: "Camiseta Básica Camiseta De Primeira Oficial - 100% Algodão",
      preco: 129.90,
      image: "/produtos/primeira2.png",
      sizes: ["P", "M", "G", "GG"]
    },
    {
      id: 6,
      nome: "Camiseta De Primeira",
      descricao: "Camiseta Básica Camiseta De Primeira Oficial - 100% Algodão",
      preco: 129.90,
      image: "/produtos/primeira3.png",
      sizes: ["P", "M", "G", "GG"]
    },
    {
      id: 7,
      nome: "Camiseta Vício Inerente",
      descricao: "Camiseta Básica Vício Inerente Oficial - 100% Algodão",
      preco: 129.90,
      image: "/produtos/vicio1.jpg",
      sizes: ["P", "M", "G", "GG"]
    },
    {
      id: 8,
      nome: "Camiseta Vício Inerente",
      descricao: "Camiseta Básica Vício Inerente Oficial - 100% Algodão",
      preco: 129.90,
      image: "/produtos/vicio2.jpg",
      sizes: ["P", "M", "G", "GG"]
    },
    {
      id: 9,
      nome: "Camiseta Vício Inerente",
      descricao: "Camiseta Básica Vício Inerente Oficial - 100% Algodão",
      preco: 129.90,
      image: "/produtos/vicio3.jpg",
      sizes: ["P", "M", "G", "GG"]
    },
  ];

  const displayProducts = apiProducts.length > 0 ? apiProducts : fallbackProducts;

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    const lower = query.toLowerCase();
    const found = displayProducts.find((product: Product) =>
      product.nome.toLowerCase().includes(lower) ||
      (product.descricao && product.descricao.toLowerCase().includes(lower))
    );

    if (found) {
      setNotFound(false);
      return;
    }
    setNotFound(true);
    setTimeout(() => setNotFound(false), 3500);
  };

  const filteredProducts = searchQuery.trim()
    ? displayProducts.filter((product: Product) =>
        product.nome.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
        (product.descricao && product.descricao.toLowerCase().includes(searchQuery.trim().toLowerCase()))
      )
    : displayProducts;

  const handleSizeSelect = (productId: string | number, size: string) => {
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

  const handleAddToCart = (productId: string | number) => {
    const selectedSize = selectedSizes[productId];

    if (!selectedSize) {
      toast.error("Por favor, selecione um tamanho antes de adicionar ao carrinho");
      return;
    }

    const product = displayProducts.find((p: Product) => p.id === productId);
    if (!product) return;

    let brand = "";
    if (product.nome.includes("Coisas Naturais")) brand = "Coisas Naturais";
    else if (product.nome.includes("De Primeira")) brand = "De Primeira";
    else if (product.nome.includes("Vício Inerente")) brand = "Vício Inerente";

    const cartProduct = {
      id: product.id,
      name: product.nome,
      description: product.descricao || "Produto oficial",
      brand: brand,
      size: selectedSize,
      color: "Preto",
      price: typeof product.preco === 'number' ? product.preco : parseFloat(product.preco.toString().replace('R$ ', '').replace(',', '.')),
      image: product.image || "/placeholder.svg"
    };

    addToCart(cartProduct);
    toast.success('Produto adicionado ao carrinho!');
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
        setSelectedProduct(null);
      }, 100);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 font-poppins">Produtos Oficiais</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Adquira produtos oficiais dos seus artistas favoritos
          </p>
        </div>

        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <form
              onSubmit={handleSearch}
              className={`bg-neutral-900 rounded-full px-6 py-3 flex items-center gap-3 w-full ${notFound ? 'ring-2 ring-red-500' : ''}`}
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
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setNotFound(false); }}
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

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-400">Carregando produtos...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-red-400">Erro ao carregar produtos. Usando dados de exemplo.</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-400">Nenhum produto encontrado.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product: Product) => (
              <div
                key={product.id}
                className="bg-neutral-900 rounded-xl overflow-hidden hover:ring-2 hover:ring-[#7A3BFF] transition-all duration-300 cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <div className="relative w-full aspect-square bg-neutral-800">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.descricao || product.nome}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-white text-lg mb-2 font-poppins">{product.nome}</h3>
                  <p className="text-gray-400 mb-4 font-montserrat text-sm line-clamp-2">
                    {product.descricao || "Produto oficial"}
                  </p>

                  <div className="mb-4">
                    <p className="text-gray-400 text-sm mb-2 font-montserrat">Tamanho:</p>
                    <div className="flex gap-2">
                      {(product.sizes || ["P", "M", "G", "GG"]).map((size: string) => (
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

                  <p className="text-xl font-bold text-white mb-4 font-montserrat">
                    R$ {typeof product.preco === 'number' ? product.preco.toFixed(2).replace('.', ',') : '0,00'}
                  </p>

                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product.id);
                    }}
                    disabled={!selectedSizes[product.id]}
                    className={`w-full ${!selectedSizes[product.id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {selectedSizes[product.id] ? 'Adicionar ao carrinho' : 'Selecione um tamanho'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            isOpen={!!selectedProduct}
            onClose={() => setSelectedProduct(null)}
            selectedSize={modalSize}
            onSizeSelect={handleModalSizeSelect}
            onAddToCart={handleModalAddToCart}
          />
        )}
      </section>
      <Footer />
    </main>
  );
};

export default ProdutosPage;
