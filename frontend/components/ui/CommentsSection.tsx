// components/ui/CommentsSection.tsx
import React from 'react';

interface CommentsSectionProps {
  artistId?: string;
}

export default function CommentsSection({ artistId }: CommentsSectionProps) {
  return (
    <section id="comentarios" className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-title text-center mb-12 text-primary">Comentários</h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-custom">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                FS
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 font-title">Fã Clube Marina Sena</h4>
                <p className="text-gray-600 mt-2">
                  Amei a camiseta do album Coisas Naturais e estou ansioso para o show no Festival! 💤❤️
                </p>
                <div className="flex space-x-4 mt-4 text-sm text-gray-500">
                  <button className="hover:text-primary transition font-medium">👍 Curtir</button>
                  <button className="hover:text-primary transition font-medium">💬 Responder</button>
                  <span>2 horas atrás</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-custom rounded-xl p-6">
            <h4 className="font-title font-semibold text-gray-800 mb-4">Deixe seu comentário</h4>
            <textarea 
              placeholder="Escreva seu comentário..." 
              className="w-full h-24 px-4 py-3 border border-gray-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-body"
            ></textarea>
            <button className="mt-4 bg-primary text-white px-6 py-3 rounded-lg hover:bg-purple-800 transition font-medium">
              Comentar
            </button>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-custom">
            <h4 className="font-title font-semibold text-gray-800 mb-4">Sobre o Projeto</h4>
            <p className="text-gray-600">
              Braidorma Social de Artistas, Shows e Fãs desenvolvido como projeto interdisciplinar 
              do curso de Desenvolvimento de Software Multiplataforma da Fatec Franca.
            </p>
            <div className="mt-4 text-sm text-gray-500">
              <p><strong>Desenvolvedoras:</strong> Ana Laura, Is Oliveira Zanith Eduardo Fernandes Greg, Héricles Robert Mendes, João Marcos Landi Sousa</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}