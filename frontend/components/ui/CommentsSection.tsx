'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}

interface CommentsSectionProps {
  artistId?: string;
}

export default function CommentsSection({ artistId }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Fã Clube Marina Sena",
      avatar: "/comentarios/perfil1.jpg",
      content: "Amei a camiseta do album Coisas Naturais e estou ansioso para o show no Festival! 💤❤️",
      timestamp: "2 horas atrás",
      likes: 15,
      replies: []
    },
    {
      id: 2,
      author: "Fã Clube Seners",
      avatar: "/comentarios/perfil2.jpg",
      content: "A qualidade das camisetas é incrível! Comprei a do Vício Inerente e o tecido é muito confortável. Recomendo demais! ✨",
      timestamp: "1 dia atrás",
      likes: 28,
      replies: []
    },
    {
      id: 3,
      author: "Fã Clube Sena",
      avatar: "/comentarios/perfil3.jpg",
      content: "Chegou super rápido! Atendimento excelente e as estampas são de alta qualidade. Já vou comprar mais! 🚀",
      timestamp: "3 dias atrás",
      likes: 42,
      replies: []
    }
  ]);

  const [newComment, setNewComment] = useState("");
  
  // Estado corrigido para controlar respostas
  const [activeReply, setActiveReply] = useState<{
    commentId: number;
    replyText: string;
  } | null>(null);

  // Função para adicionar novo comentário principal
  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      author: "Você",
      avatar: "/comentarios/usuario.jpg",
      content: newComment,
      timestamp: "Agora mesmo",
      likes: 0,
      replies: []
    };

    setComments(prev => [comment, ...prev]);
    setNewComment("");
  };

  // Função para iniciar uma resposta
  const startReply = (commentId: number) => {
    setActiveReply({
      commentId,
      replyText: ""
    });
  };

  // Função para atualizar o texto da resposta
  const updateReplyText = (text: string) => {
    if (activeReply) {
      setActiveReply({
        ...activeReply,
        replyText: text
      });
    }
  };

  // Função para adicionar resposta
  const handleAddReply = () => {
    if (!activeReply || !activeReply.replyText.trim()) return;

    const reply: Comment = {
      id: Date.now(),
      author: "Você",
      avatar: "/comentarios/usuario.jpg",
      content: activeReply.replyText,
      timestamp: "Agora mesmo",
      likes: 0
    };

    setComments(prev => 
      prev.map(comment => 
        comment.id === activeReply.commentId
          ? {
              ...comment,
              replies: [...(comment.replies || []), reply]
            }
          : comment
      )
    );

    setActiveReply(null);
  };

  // Função para cancelar resposta
  const cancelReply = () => {
    setActiveReply(null);
  };

  // Função para curtir comentário
  const handleLike = (commentId: number, isReply: boolean = false, parentId?: number) => {
    if (isReply && parentId) {
      setComments(prev =>
        prev.map(comment =>
          comment.id === parentId
            ? {
                ...comment,
                replies: comment.replies?.map(reply =>
                  reply.id === commentId
                    ? { ...reply, likes: reply.likes + 1 }
                    : reply
                )
              }
            : comment
        )
      );
    } else {
      setComments(prev =>
        prev.map(comment =>
          comment.id === commentId
            ? { ...comment, likes: comment.likes + 1 }
            : comment
        )
      );
    }
  };

  // Componente para renderizar comentários
  const CommentItem: React.FC<{ comment: Comment; isReply?: boolean; parentId?: number }> = ({ 
    comment, 
    isReply = false, 
    parentId 
  }) => {
    return (
      <div className={`bg-neutral-900 rounded-xl p-4 mb-4 ${isReply ? 'ml-12 mt-3' : ''}`}>
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            <Image 
              src={comment.avatar}
              alt={comment.author}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-white font-poppins text-sm">{comment.author}</h4>
              <span className="text-gray-400 text-xs font-montserrat">{comment.timestamp}</span>
            </div>
            <p className="text-gray-300 mt-1 font-montserrat text-sm">{comment.content}</p>
            <div className="flex space-x-3 mt-3 text-xs">
              <button 
                onClick={() => handleLike(comment.id, isReply, parentId)}
                className="text-gray-400 hover:text-[#FF7A29] transition font-medium font-montserrat"
              >
                👍 Curtir ({comment.likes})
              </button>
              {!isReply && (
                <button 
                  onClick={() => startReply(comment.id)}
                  className="text-gray-400 hover:text-[#FF7A29] transition font-medium font-montserrat"
                >
                  💬 Responder
                </button>
              )}
            </div>

            {/* Área de resposta - CORRIGIDA */}
            {activeReply?.commentId === comment.id && (
              <div className="mt-4 p-3 bg-neutral-800 rounded-lg">
                <textarea 
                  value={activeReply.replyText}
                  onChange={(e) => updateReplyText(e.target.value)}
                  placeholder="Escreva sua resposta..."
                  className="w-full h-16 px-3 py-2 bg-neutral-700 rounded text-white placeholder-gray-400 font-montserrat text-sm focus:outline-none focus:border-[#7A3BFF]"
                />
                <div className="flex gap-2 mt-2">
                  <button 
                    onClick={handleAddReply}
                    className="bg-gradient-to-r from-[#7A3BFF] to-[#FF7A29] text-white px-4 py-2 rounded-full text-sm font-medium font-montserrat hover:from-[#6A2BFF] hover:to-[#E86A29] transition"
                  >
                    Responder
                  </button>
                  <button 
                    onClick={cancelReply}
                    className="bg-neutral-600 text-white px-4 py-2 rounded-full text-sm font-medium font-montserrat hover:bg-neutral-500 transition"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            {/* Renderizar respostas */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-4">
                {comment.replies.map(reply => (
                  <CommentItem 
                    key={reply.id} 
                    comment={reply} 
                    isReply={true} 
                    parentId={comment.id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="comentarios" className="min-h-screen bg-black py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-white font-poppins">Comentários</h2>
        
        <div className="max-w-4xl mx-auto">
          {/* Lista de Comentários */}
          {comments.map(comment => (
            <CommentItem key={comment.id} comment={comment} />
          ))}

          {/* Formulário de Comentário Principal */}
          <div className="bg-neutral-900 rounded-xl p-6">
            <h4 className="font-poppins font-semibold text-white mb-4">Deixe seu comentário</h4>
            <textarea 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escreva seu comentário..." 
              className="w-full h-24 px-4 py-3 bg-neutral-800 rounded-lg text-white placeholder-gray-400 font-montserrat focus:outline-none focus:border-[#7A3BFF]"
            />
            <button 
              onClick={handleAddComment}
              className="mt-4 bg-gradient-to-r from-[#7A3BFF] to-[#FF7A29] text-white px-6 py-3 rounded-full hover:from-[#6A2BFF] hover:to-[#E86A29] transition font-medium font-montserrat"
            >
              Comentar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}