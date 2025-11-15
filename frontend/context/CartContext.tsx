'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Address {
  cep: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  complemento: string;
  email: string;
}

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

interface CartContextType {
  cartItems: CartItem[];
  address: Address;
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (productId: number, size: string, color: string) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  updateAddress: (address: Address) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [address, setAddress] = useState<Address>({
    cep: "",
    cidade: "",
    bairro: "",
    rua: "",
    numero: "",
    complemento: "",
    email: ""
  });

  // Carregar dados do localStorage quando o componente montar
  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    const savedAddress = localStorage.getItem('address');
    
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
    
    if (savedAddress) {
      setAddress(JSON.parse(savedAddress));
    }
  }, []);

  // Salvar cartItems no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Salvar address no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('address', JSON.stringify(address));
  }, [address]);

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => 
        item.id === product.id && item.size === product.size && item.color === product.color
      );
      
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id && item.size === product.size && item.color === product.color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number, size: string, color: string) => {
    setCartItems(prev => prev.filter(item => 
      !(item.id === productId && item.size === size && item.color === color)
    ));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      setCartItems(prev => prev.filter(item => item.id !== productId));
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const updateAddress = (newAddress: Address) => {
    setAddress(newAddress);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
    localStorage.removeItem('address');
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      address,
      addToCart,
      removeFromCart,
      updateQuantity,
      updateAddress,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}