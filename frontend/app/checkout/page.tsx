'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import Nav from '@/components/ui/Nav';
import Footer from '@/components/ui/Footer';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const { cartItems, address, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'debit'>('credit');
  const [cardInfo, setCardInfo] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [showPopup, setShowPopup] = useState(false);

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  const deliveryDate = "15/11/2024";

  const handleCardInfoChange = (field: string, value: string) => {
    let formattedValue = value;

    if (field === 'number') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    }

    if (field === 'expiry') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(?=\d)/, '$1/');
    }

    if (field === 'cvc') {
      formattedValue = value.replace(/\D/g, '');
    }

    setCardInfo(prev => ({
      ...prev,
      [field]: formattedValue
    }));

    if (errors[field]) {
      setErrors(prev => ({...prev, [field]: ''}));
    }
  };

  const validateCard = () => {
    const newErrors: {[key: string]: string} = {};

    if (!cardInfo.number.trim()) {
      newErrors.number = "Número do cartão é obrigatório";
    } else if (cardInfo.number.replace(/\s/g, '').length !== 16) {
      newErrors.number = "Número do cartão deve ter 16 dígitos";
    }

    if (!cardInfo.name.trim()) {
      newErrors.name = "Nome do titular é obrigatório";
    } else if (cardInfo.name.trim().length < 3) {
      newErrors.name = "Nome deve ter pelo menos 3 caracteres";
    }

    if (!cardInfo.expiry.trim()) {
      newErrors.expiry = "Data de vencimento é obrigatória";
    } else {
      const [month, year] = cardInfo.expiry.split('/');
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      
      if (!month || !year || month.length !== 2 || year.length !== 2) {
        newErrors.expiry = "Formato inválido (MM/AA)";
      } else if (parseInt(month) < 1 || parseInt(month) > 12) {
        newErrors.expiry = "Mês inválido";
      } else if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        newErrors.expiry = "Cartão expirado";
      }
    }

    if (!cardInfo.cvc.trim()) {
      newErrors.cvc = "CVC é obrigatório";
    } else if (cardInfo.cvc.length !== 3) {
      newErrors.cvc = "CVC deve ter 3 dígitos";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateCard()) {
      toast.error("Preencha todos os campos corretamente");
      return;
    }

    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    clearCart();
    window.location.href = '/home';
  };

  return (
    <div className="bg-black">
      <Nav />
      <section className="min-h-screen bg-black py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl font-bold text-center mb-8 text-white font-poppins">Sua compra</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-neutral-900 rounded-xl p-6">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-white font-poppins">
                    Valor total da compra:
                  </h2>
                  <p className="text-2xl font-bold text-[#7A3BFF] font-poppins">
                    R$ {totalPrice.toFixed(2)}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h3 className="text-white font-semibold font-poppins mb-2">Endereço de entrega:</h3>
                    <p className="text-gray-300 font-montserrat text-sm">
                      {address.rua}, {address.numero}
                    </p>
                    <p className="text-gray-300 font-montserrat text-sm">
                      {address.bairro} - {address.cidade}
                    </p>
                    <p className="text-gray-300 font-montserrat text-sm">
                      CEP: {address.cep}
                    </p>
                    {address.complemento && (
                      <p className="text-gray-300 font-montserrat text-sm">
                        Complemento: {address.complemento}
                      </p>
                    )}
                    <p className="text-gray-300 font-montserrat text-sm">
                      Email: {address.email}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-white font-semibold font-poppins mb-2">Data da entrega:</h3>
                    <p className="text-gray-300 font-montserrat text-sm">
                      {deliveryDate}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800">
                <h2 className="text-2xl font-bold text-white font-poppins mb-6">Forma de pagamento:</h2>
                
                <div className="space-y-4">
                  <div className="flex gap-4 mb-6">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('credit')}
                      className={`flex-1 py-3 rounded-full border-2 transition font-medium font-montserrat ${
                        paymentMethod === 'credit'
                          ? 'border-[#7A3BFF] bg-[#7A3BFF] bg-opacity-10 text-white'
                          : 'border-neutral-700 text-gray-400 hover:border-neutral-600'
                      }`}
                    >
                      Crédito
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('debit')}
                      className={`flex-1 py-3 rounded-full border-2 transition font-medium font-montserrat ${
                        paymentMethod === 'debit'
                          ? 'border-[#7A3BFF] bg-[#7A3BFF] bg-opacity-10 text-white'
                          : 'border-neutral-700 text-gray-400 hover:border-neutral-600'
                      }`}
                    >
                      Débito
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-white text-sm font-montserrat block mb-2">
                        Número do cartão
                      </label>
                      <input
                        type="text"
                        value={cardInfo.number}
                        onChange={(e) => handleCardInfoChange('number', e.target.value)}
                        className={`w-full bg-white rounded-full px-4 py-3 text-black placeholder-gray-500 font-montserrat focus:outline-none focus:border-[#7A3BFF] ${
                          errors.number ? 'border-2 border-red-500' : 'border border-neutral-700'
                        }`}
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                      />
                      {errors.number && <p className="text-red-400 text-sm mt-1 font-montserrat">{errors.number}</p>}
                    </div>

                    <div>
                      <label className="text-white text-sm font-montserrat block mb-2">
                        Nome do cartão
                      </label>
                      <input
                        type="text"
                        value={cardInfo.name}
                        onChange={(e) => handleCardInfoChange('name', e.target.value)}
                        className={`w-full bg-white rounded-full px-4 py-3 text-black placeholder-gray-500 font-montserrat focus:outline-none focus:border-[#7A3BFF] ${
                          errors.name ? 'border-2 border-red-500' : 'border border-neutral-700'
                        }`}
                        placeholder="Nome como está no cartão"
                      />
                      {errors.name && <p className="text-red-400 text-sm mt-1 font-montserrat">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-white text-sm font-montserrat block mb-2">
                          Data de vencimento
                        </label>
                        <input
                          type="text"
                          value={cardInfo.expiry}
                          onChange={(e) => handleCardInfoChange('expiry', e.target.value)}
                          className={`w-full bg-white rounded-full px-4 py-3 text-black placeholder-gray-500 font-montserrat focus:outline-none focus:border-[#7A3BFF] ${
                            errors.expiry ? 'border-2 border-red-500' : 'border border-neutral-700'
                          }`}
                          placeholder="MM/AA"
                          maxLength={5}
                        />
                        {errors.expiry && <p className="text-red-400 text-sm mt-1 font-montserrat">{errors.expiry}</p>}
                      </div>

                      <div>
                        <label className="text-white text-sm font-montserrat block mb-2">
                          CVC
                        </label>
                        <input
                          type="text"
                          value={cardInfo.cvc}
                          onChange={(e) => handleCardInfoChange('cvc', e.target.value)}
                          className={`w-full bg-white rounded-full px-4 py-3 text-black placeholder-gray-500 font-montserrat focus:outline-none focus:border-[#7A3BFF] ${
                            errors.cvc ? 'border-2 border-red-500' : 'border border-neutral-700'
                          }`}
                          placeholder="000"
                          maxLength={3}
                        />
                        {errors.cvc && <p className="text-red-400 text-sm mt-1 font-montserrat">{errors.cvc}</p>}
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Link 
                        href="/cart"
                        className="flex-1 bg-transparent text-white px-6 py-3 rounded-full hover:bg-neutral-800 transition font-medium font-montserrat text-center"
                      >
                        Voltar
                      </Link>
                      <button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-[#7A3BFF] to-[#FF7A29] text-white px-6 py-3 rounded-full hover:from-[#6A2BFF] hover:to-[#E86A29] transition font-medium font-montserrat"
                      >
                        Finalizar Pagamento
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800 h-fit">
              <h2 className="text-2xl font-bold text-white font-poppins mb-6">Seus itens</h2>
              
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-3 border-b border-neutral-800 pb-4 last:border-b-0">
                    <div className="w-16 h-16 bg-neutral-800 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white text-sm font-poppins">{item.name}</h3>
                      <p className="text-gray-400 text-xs font-montserrat">
                        Tamanho: {item.size} | Qtd: {item.quantity}
                      </p>
                      <p className="text-white text-sm font-montserrat font-semibold">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-900 rounded-xl p-8 max-w-md w-full border border-neutral-800">
            <div className="text-center">
              <div className="text-6xl text-green-500 mb-4">✓</div>
              <h2 className="text-2xl font-bold text-green-500 font-poppins mb-4">
                Sua compra foi finalizada com sucesso!
              </h2>
              <p className="text-gray-300 font-montserrat mb-2">
                Você receberá seus produtos até: 14/12/25. Em caso de compra de ingresso receberá um e-mail com o mesmo.
              </p>
              <p className="text-gray-300 font-montserrat mb-6">
                <strong>Obrigado pela compra!</strong>
              </p>
            
              <button
                onClick={handleClosePopup}
                className="bg-gradient-to-r from-[#7A3BFF] to-[#FF7A29] text-white px-8 py-3 rounded-full hover:from-[#6A2BFF] hover:to-[#E86A29] transition font-medium font-montserrat"
              >
                Voltar ao Site
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}