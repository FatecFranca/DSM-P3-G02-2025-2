'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext'; 

export default function CartSection() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const [address, setAddress] = useState({
    cep: "",
    cidade: "",
    bairro: "",
    rua: "",
    numero: "",
    complemento: "",
    email: ""
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleAddressChange = (field: string, value: string) => {
    setAddress(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({...prev, [field]: ''}));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!address.cep.trim()) newErrors.cep = "CEP é obrigatório";
    if (!address.cidade.trim()) newErrors.cidade = "Cidade é obrigatória";
    if (!address.bairro.trim()) newErrors.bairro = "Bairro é obrigatório";
    if (!address.rua.trim()) newErrors.rua = "Rua é obrigatória";
    if (!address.numero.trim()) newErrors.numero = "Número é obrigatório";
    if (!address.email.trim()) newErrors.email = "Email é obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFinalizePurchase = () => {
    if (!validateForm()) {
      return;
    }
    
    console.log("Compra finalizada:", { cartItems, address });
  };

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  if (cartItems.length === 0) {
    return (
      <section className="min-h-screen bg-black py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <h1 className="text-4xl font-bold text-center mb-8 text-white font-poppins">Seu carrinho</h1>
          
          <div className="bg-neutral-900 rounded-xl p-8 border border-neutral-800 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-white font-poppins mb-4">Seu carrinho está vazio</h2>
            <p className="text-gray-400 mb-6 font-montserrat">
              Adicione alguns produtos incríveis ao seu carrinho!
            </p>
            <Link 
              href="/home#produtos"
              className="bg-gradient-to-r from-[#7A3BFF] to-[#FF7A29] text-white px-6 py-3 rounded-full hover:from-[#6A2BFF] hover:to-[#E86A29] transition font-medium font-montserrat inline-block"
            >
              Continuar Comprando
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-white font-poppins">Seu carrinho</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {cartItems.map(item => (
              <div key={`${item.id}-${item.size}`} className="bg-neutral-900 rounded-xl p-6">
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-neutral-800 rounded-lg overflow-hidden flex-shrink-0">
                    <Image 
                      src={item.image}
                      alt={item.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-lg font-poppins">{item.name}</h3>
                    <p className="text-gray-400 text-sm font-montserrat">{item.description}</p>
                    <p className="text-gray-400 text-sm font-montserrat">{item.brand}</p>
                    
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-gray-300 text-sm font-montserrat">
                        Tamanho {item.size} | Cor: {item.color}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-xl font-bold text-white font-montserrat">
                        R$ {item.price.toFixed(2)}
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 bg-neutral-700 text-white rounded hover:bg-neutral-600 transition font-montserrat"
                        >
                          -
                        </button>
                        <span className="text-white font-montserrat px-2">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-neutral-700 text-white rounded hover:bg-neutral-600 transition font-montserrat"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 mt-4">
                      <button className="text-[#7A3BFF] hover:text-[#B14EFF] transition font-medium font-montserrat text-sm">
                        Ver mais
                      </button>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-300 transition font-medium font-montserrat text-sm"
                      >
                        Excluir do carrinho
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="bg-neutral-900 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-white font-poppins mb-4">
                Valor total da compra: R$ {totalPrice.toFixed(2)}
              </h3>
              
              <div className="flex gap-4">
                <Link 
                  href="/home"
                  className="flex-1 bg-transparent text-white px-6 py-3 rounded-full hover:bg-[#7A3BFF] hover:text-white transition font-medium font-montserrat text-center"
                >
                  Voltar
                </Link>
                <button 
                  onClick={handleFinalizePurchase}
                  className="flex-1 bg-gradient-to-r from-[#7A3BFF] to-[#FF7A29] text-white px-6 py-3 rounded-full hover:from-[#6A2BFF] hover:to-[#E86A29] transition font-medium font-montserrat"
                >
                  Finalizar Compra
                </button>
              </div>
            </div>
          </div>

          <div className="bg-neutral-900 rounded-xl p-6 h-fit">
            <h2 className="text-2xl font-bold text-white font-poppins mb-6">
              Endereço de entrega:
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white text-sm font-montserrat block mb-2">CEP *</label>
                  <input
                    type="text"
                    value={address.cep}
                    onChange={(e) => handleAddressChange('cep', e.target.value)}
                    className={`w-full bg-white border ${
                      errors.cep ? 'border-red-500' : 'border-neutral-700'
                    } rounded-full px-4 py-3 text-black placeholder-gray-500 font-montserrat focus:outline-none focus:border-[#7A3BFF]`}
                    placeholder="..."
                  />
                  {errors.cep && <p className="text-red-400 text-sm mt-1 font-montserrat">{errors.cep}</p>}
                </div>
                <div>
                  <label className="text-white text-sm font-montserrat block mb-2">Cidade *</label>
                  <input
                    type="text"
                    value={address.cidade}
                    onChange={(e) => handleAddressChange('cidade', e.target.value)}
                    className={`w-full bg-white border ${
                      errors.cidade ? 'border-red-500' : 'border-neutral-700'
                    } rounded-full px-4 py-3 text-black placeholder-gray-500 font-montserrat focus:outline-none focus:border-[#7A3BFF]`}
                    placeholder="..."
                  />
                  {errors.cidade && <p className="text-red-400 text-sm mt-1 font-montserrat">{errors.cidade}</p>}
                </div>
              </div>
              
              <div>
                <label className="text-white text-sm font-montserrat block mb-2">Bairro *</label>
                <input
                  type="text"
                  value={address.bairro}
                  onChange={(e) => handleAddressChange('bairro', e.target.value)}
                  className={`w-full bg-white border ${
                    errors.bairro ? 'border-red-500' : 'border-neutral-700'
                  } rounded-full px-4 py-3 text-black placeholder-gray-500 font-montserrat focus:outline-none focus:border-[#7A3BFF]`}
                  placeholder="..."
                />
                {errors.bairro && <p className="text-red-400 text-sm mt-1 font-montserrat">{errors.bairro}</p>}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white text-sm font-montserrat block mb-2">Rua *</label>
                  <input
                    type="text"
                    value={address.rua}
                    onChange={(e) => handleAddressChange('rua', e.target.value)}
                    className={`w-full bg-white border ${
                      errors.rua ? 'border-red-500' : 'border-neutral-700'
                    } rounded-full px-4 py-3 text-black placeholder-gray-500 font-montserrat focus:outline-none focus:border-[#7A3BFF]`}
                    placeholder="..."
                  />
                  {errors.rua && <p className="text-red-400 text-sm mt-1 font-montserrat">{errors.rua}</p>}
                </div>
                <div>
                  <label className="text-white text-sm font-montserrat block mb-2">Número *</label>
                  <input
                    type="text"
                    value={address.numero}
                    onChange={(e) => handleAddressChange('numero', e.target.value)}
                    className={`w-full bg-white border ${
                      errors.numero ? 'border-red-500' : 'border-neutral-700'
                    } rounded-full px-4 py-3 text-black placeholder-gray-500 font-montserrat focus:outline-none focus:border-[#7A3BFF]`}
                    placeholder="..."
                  />
                  {errors.numero && <p className="text-red-400 text-sm mt-1 font-montserrat">{errors.numero}</p>}
                </div>
              </div>
              
              <div>
                <label className="text-white text-sm font-montserrat block mb-2">Complemento</label>
                <input
                  type="text"
                  value={address.complemento}
                  onChange={(e) => handleAddressChange('complemento', e.target.value)}
                  className="w-full bg-white border border-neutral-700 rounded-full px-4 py-3 text-black placeholder-gray-500 font-montserrat focus:outline-none focus:border-[#7A3BFF]"
                  placeholder="..."
                />
              </div>
              
              <div>
                <label className="text-white text-sm font-montserrat block mb-2">Email *</label>
                <input
                  type="email"
                  value={address.email}
                  onChange={(e) => handleAddressChange('email', e.target.value)}
                  className={`w-full bg-white border ${
                    errors.email ? 'border-red-500' : 'border-neutral-700'
                  } rounded-full px-4 py-3 text-black placeholder-gray-500 font-montserrat focus:outline-none focus:border-[#7A3BFF]`}
                  placeholder="..."
                />
                {errors.email && <p className="text-red-400 text-sm mt-1 font-montserrat">{errors.email}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}