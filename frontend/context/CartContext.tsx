// context/CartContext.tsx
'use client'; // Importante: Context precisa ser client component

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Interface para os itens do carrinho
interface CartItem {
  id: number;
  name: string;
  description: string;
  brand: string;
  size: string;
  color: string;
  price: number;
  image: string;
  quantity: number;
}

// Interface para as funções do carrinho
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

// Cria o Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider - componente que vai envolver sua aplicação
export function CartProvider({ children }: { children: ReactNode }) {
  // Estado que armazena os itens do carrinho
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Função para ADICIONAR produto ao carrinho
  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      // Verifica se o produto já está no carrinho (mesmo ID e tamanho)
      const existingItem = prev.find(item => 
        item.id === product.id && item.size === product.size
      );
      
      if (existingItem) {
        // Se já existe, aumenta a quantidade
        return prev.map(item =>
          item.id === product.id && item.size === product.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      // Se não existe, adiciona novo item com quantidade 1
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Função para REMOVER produto do carrinho
  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  // Função para ATUALIZAR quantidade
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return; // Não permite quantidade menor que 1
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity } // Atualiza a quantidade
          : item
      )
    );
  };

  // Função para LIMPAR carrinho
  const clearCart = () => {
    setCartItems([]);
  };

  // Retorna o Provider com todos os valores e funções
  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook personalizado para usar o carrinho
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}