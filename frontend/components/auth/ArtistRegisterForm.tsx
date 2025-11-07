// frontend/components/auth/ArtistRegisterForm.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import ArtistInputField from '../ui/ArtistInputField';
import ArtistTextArea from '../ui/ArtistTextArea';
import ArtistFileDropzone from '../ui/ArtistFileDropzone';
import Button from '../ui/Button'; 

const ArtistRegisterForm: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [about, setAbout] = useState('');
  const [spotify, setSpotify] = useState('');
  const [instagram, setInstagram] = useState('');
  const [xLink, setXLink] = useState('');
  const [facebook, setFacebook] = useState('');

  const [eventDate, setEventDate] = useState('');
  const [eventLocal, setEventLocal] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventTicket, setEventTicket] = useState('');
  
  const [productName, setProductName] = useState('');
  const [productValue, setProductValue] = useState('');
  const [productDesc, setProductDesc] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("Salvando dados do artista...");
    setTimeout(() => {
      setLoading(false);
      router.push('/home-artista'); 
    }, 1500);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-4xl p-8 md:p-10 bg-neutral-900 rounded-xl shadow-xl space-y-8"
    >
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white text-center">
          Compartilhe sua música
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <ArtistTextArea
              id="about"
              name="about"
              placeholder="Sobre você, compartilhe aqui sua história..."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={5}
            />
            <ArtistInputField
              id="spotify"
              name="spotify"
              type="text"
              placeholder="Link do seu Spotify"
              value={spotify}
              onChange={(e) => setSpotify(e.target.value)}
            />
            <ArtistInputField
              id="instagram"
              name="instagram"
              type="text"
              placeholder="Link do seu Instagram"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4"> 
            <div className="flex-grow min-h-[140px]"> 
              <ArtistFileDropzone
                title="Arraste e insira suas fotos de perfil"
                description="PNG, JPG (max. 800x400px)"
              />
            </div>
            <ArtistInputField
              id="x"
              name="x"
              type="text"
              placeholder="Link do seu X"
              value={xLink}
              onChange={(e) => setXLink(e.target.value)}
            />
            <ArtistInputField
              id="facebook"
              name="facebook"
              type="text"
              placeholder="Link do seu Facebook"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white text-center">
          Compartilhe sua Agenda
        </h2>
        <p className="text-lg text-gray-300 font-semibold mt-4">1º Evento</p> 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ArtistInputField
            id="eventDate"
            name="eventDate"
            type="text"
            placeholder="Data: __/__/__"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
          <ArtistInputField
            id="eventLocal"
            name="eventLocal"
            type="text"
            placeholder="Local"
            value={eventLocal}
            onChange={(e) => setEventLocal(e.target.value)}
          />
          <ArtistInputField
            id="eventName"
            name="eventName"
            type="text"
            placeholder="Nome do evento"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <ArtistInputField
            id="eventTime"
            name="eventTime"
            type="text"
            placeholder="Horário: 00h00min"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
          />
          <div className="md:col-span-2">
            <ArtistInputField
              id="eventTicket"
              name="eventTicket"
              type="text"
              placeholder="Link da compra do ingresso"
              value={eventTicket}
              onChange={(e) => setEventTicket(e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <Button type="button" className="w-full">
              Adicionar mais um evento
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white text-center">
          Compartilhe seus produtos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Coluna Esquerda */}
          <div className="space-y-4">
            <ArtistInputField
              id="productName"
              name="productName"
              type="text"
              placeholder="Nome do produto"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <ArtistInputField
              id="productValue"
              name="productValue"
              type="text"
              placeholder="Valor do produto: R$ 00,00"
              value={productValue}
              onChange={(e) => setProductValue(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4">
            <ArtistTextArea
              id="productDesc"
              name="productDesc"
              placeholder="Descrição do produto"
              value={productDesc}
              onChange={(e) => setProductDesc(e.target.value)}
              rows={5} 
              className="flex-grow" 
            />
            <div className="flex-grow min-h-[140px]">
              <ArtistFileDropzone
                title="Arraste e insira as fotos do seu produto"
                description="PNG, JPG (max. 800x800px)"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <Button type="button" className="w-full">
              Adicionar mais um Produto
            </Button>
          </div>
        </div>
      </div>

      <div className="pt-4 space-y-4">
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Criando...' : 'Criar'}
        </Button>
        <div className="text-center">
          <Link href="/auth/register" className="text-sm text-gray-400 hover:text-white transition-colors">
            Voltar
          </Link>
        </div>
      </div>
    </form>
  );
};

export default ArtistRegisterForm;