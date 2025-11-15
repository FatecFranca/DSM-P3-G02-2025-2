// components/ui/CommentsSection.tsx
import React from 'react';

interface CommentsSectionProps {
  artistId?: string;
}

export default function CommentsSection({ artistId }: CommentsSectionProps) {
  return (
    <section id="comentarios" className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-white font-poppins">Comentários</h2>
        
        <div className="max-w-4xl mx-auto">
          {/* Comentário Exemplo */}
          <div className="bg-neutral-900 rounded-xl p-6 mb-6 border border-neutral-800">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#7A3BFF] to-[#B14EFF] rounded-full flex items-center justify-center text-white font-bold font-poppins">
                FS
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-white font-poppins">Fã Clube Marina Sena</h4>
                  <span className="text-gray-400 text-sm font-montserrat">2 horas atrás</span>
                </div>
                <p className="text-gray-300 mt-2 font-montserrat">
                  Amei a camiseta do album Coisas Naturais e estou ansioso para o show no Festival! 💤❤️
                </p>
                <div className="flex space-x-4 mt-4 text-sm">
                  <button className="text-gray-400 hover:text-[#FF7A29] transition font-medium font-montserrat">
                    👍 Curtir
                  </button>
                  <button className="text-gray-400 hover:text-[#FF7A29] transition font-medium font-montserrat">
                    💬 Responder
                  </button>
                  <span className="text-gray-500 font-montserrat">15 curtidas</span>
                </div>
              </div>
            </div>
          </div>

          {/* Outro Comentário */}
          <div className="bg-neutral-900 rounded-xl p-6 mb-6 border border-neutral-800">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#FF7A29] to-[#B14EFF] rounded-full flex items-center justify-center text-white font-bold font-poppins">
                MS
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-white font-poppins">Fã Clube Seners</h4>
                  <span className="text-gray-400 text-sm font-montserrat">1 dia atrás</span>
                </div>
                <p className="text-gray-300 mt-2 font-montserrat">
                  A qualidade das camisetas é incrível! Comprei a do Vício Inerente e o tecido é muito confortável. Recomendo demais! ✨
                </p>
                <div className="flex space-x-4 mt-4 text-sm">
                  <button className="text-gray-400 hover:text-[#FF7A29] transition font-medium font-montserrat">
                    👍 Curtir
                  </button>
                  <button className="text-gray-400 hover:text-[#FF7A29] transition font-medium font-montserrat">
                    💬 Responder
                  </button>
                  <span className="text-gray-500 font-montserrat">28 curtidas</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mais um Comentário */}
          <div className="bg-neutral-900 rounded-xl p-6 mb-8 border border-neutral-800">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#7A3BFF] to-[#FF7A29] rounded-full flex items-center justify-center text-white font-bold font-poppins">
                RC
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-white font-poppins">Fã Clube Sena</h4>
                  <span className="text-gray-400 text-sm font-montserrat">3 dias atrás</span>
                </div>
                <p className="text-gray-300 mt-2 font-montserrat">
                  Chegou super rápido! Atendimento excelente e as estampas são de alta qualidade. Já vou comprar mais! 🚀
                </p>
                <div className="flex space-x-4 mt-4 text-sm">
                  <button className="text-gray-400 hover:text-[#FF7A29] transition font-medium font-montserrat">
                    👍 Curtir
                  </button>
                  <button className="text-gray-400 hover:text-[#FF7A29] transition font-medium font-montserrat">
                    💬 Responder
                  </button>
                  <span className="text-gray-500 font-montserrat">42 curtidas</span>
                </div>
              </div>
            </div>
          </div>

          {/* Formulário de Comentário */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <h4 className="font-poppins font-semibold text-white mb-4">Deixe seu comentário</h4>
            <textarea 
              placeholder="Escreva seu comentário..." 
              className="w-full h-24 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-gray-400 font-montserrat"
            ></textarea>
            <button className="mt-4 bg-gradient-to-r from-[#7A3BFF] to-[#FF7A29] text-white px-6 py-3 rounded-lg hover:from-[#6A2BFF] hover:to-[#E86A29] transition font-medium font-montserrat">
              Comentar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}