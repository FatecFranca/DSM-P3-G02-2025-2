"use client";

import React, { useState, useEffect } from 'react';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (eventData: EventFormData) => Promise<void>;
  initialData?: EventFormData;
  mode: 'create' | 'edit';
}

export interface EventFormData {
  id?: string;
  data: string;
  local: string;
  preco_ingresso: number;
  descricao?: string;
}

export default function EventModal({ isOpen, onClose, onSave, initialData, mode }: EventModalProps) {
  const [formData, setFormData] = useState<EventFormData>({
    data: '',
    local: '',
    preco_ingresso: 0,
    descricao: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      // Convert ISO string to datetime-local format
      const dateValue = initialData.data ? new Date(initialData.data).toISOString().slice(0, 16) : '';
      setFormData({
        ...initialData,
        data: dateValue,
      });
    } else {
      setFormData({
        data: '',
        local: '',
        preco_ingresso: 0,
        descricao: '',
      });
    }
    setError(null);
  }, [initialData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Convert datetime-local to ISO string
      const eventData = {
        ...formData,
        data: new Date(formData.data).toISOString(),
      };
      await onSave(eventData);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar evento');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-neutral-900 rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white font-poppins">
            {mode === 'create' ? 'Criar Evento' : 'Editar Evento'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
            disabled={isSubmitting}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Data e Hora *
            </label>
            <input
              type="datetime-local"
              value={formData.data}
              onChange={(e) => setFormData({ ...formData, data: e.target.value })}
              className="w-full bg-neutral-800 text-white border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:border-[#FF7A29] transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Local *
            </label>
            <input
              type="text"
              value={formData.local}
              onChange={(e) => setFormData({ ...formData, local: e.target.value })}
              placeholder="Ex: Teatro Municipal, São Paulo"
              className="w-full bg-neutral-800 text-white border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:border-[#FF7A29] transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Preço do Ingresso (R$) *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.preco_ingresso}
              onChange={(e) => setFormData({ ...formData, preco_ingresso: parseFloat(e.target.value) || 0 })}
              placeholder="0.00"
              className="w-full bg-neutral-800 text-white border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:border-[#FF7A29] transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Descrição
            </label>
            <textarea
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              placeholder="Adicione detalhes sobre o evento..."
              rows={4}
              className="w-full bg-neutral-800 text-white border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:border-[#FF7A29] transition resize-none"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 bg-neutral-800 text-white py-2 px-4 rounded-lg hover:bg-neutral-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#FF7A29] text-white py-2 px-4 rounded-lg hover:bg-[#ff6a19] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
