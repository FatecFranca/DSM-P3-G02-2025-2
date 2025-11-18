'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import ArtistInputField from '../ui/ArtistInputField';
import ArtistTextArea from '../ui/ArtistTextArea';
import ArtistFileDropzone from '../ui/ArtistFileDropzone';
import Button from '../ui/Button'; 

interface ArtistEvent {
  id: number;
  date: string;
  local: string;
  name: string;
  time: string;
  ticket: string;
}
interface ArtistProduct {
  id: number;
  name: string;
  value: string;
  desc: string;
  files?: File[];
}
interface ArtistProfileData {
  about: string;
  spotify: string;
  instagram: string;
  xLink: string;
  facebook: string;
  events: ArtistEvent[];
  products: ArtistProduct[];
  profileFiles?: File[];
}

interface User {
  name: string;
  email: string;
  type: 'artista' | 'fa';
  password?: string;
  artistProfileData?: ArtistProfileData;
}

const getInitialData = (): ArtistProfileData => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const user: User = JSON.parse(storedUser);
      return user.artistProfileData || {
        about: '',
        spotify: '',
        instagram: '',
        xLink: '',
        facebook: '',
        events: [{ id: Date.now(), date: '', local: '', name: '', time: '', ticket: '' }],
        products: [{ id: Date.now() + 1, name: '', value: '', desc: '', files: [] }],
        profileFiles: []
      };
    }
  }
  return {
    about: '',
    spotify: '',
    instagram: '',
    xLink: '',
    facebook: '',
    events: [{ id: Date.now(), date: '', local: '', name: '', time: '', ticket: '' }],
    products: [{ id: Date.now() + 1, name: '', value: '', desc: '', files: [] }],
    profileFiles: []
  };
};


const ArtistRegisterForm: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [initialData] = useState(getInitialData);
  
  const [about, setAbout] = useState(initialData.about);
  const [spotify, setSpotify] = useState(initialData.spotify);
  const [instagram, setInstagram] = useState(initialData.instagram);
  const [xLink, setXLink] = useState(initialData.xLink);
  const [facebook, setFacebook] = useState(initialData.facebook);
  const [events, setEvents] = useState<ArtistEvent[]>(initialData.events);
  const [products, setProducts] = useState<ArtistProduct[]>(initialData.products);
  const [profileFiles, setProfileFiles] = useState<File[]>(initialData.profileFiles || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const artistProfileData: ArtistProfileData = {
      about,
      spotify,
      instagram,
      xLink,
      facebook,
      events,
      products,
      profileFiles: profileFiles || []
    };

    console.log("Salvando dados do artista:", artistProfileData);

    const currentUser: User = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const rawUser = JSON.parse(localStorage.getItem('user') || "{}");

    const updatedCurrentUser = { ...currentUser, artistProfileData };
    localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));

    // Also update the raw `user` object (this one contains the id used in routes)
    try {
      const updatedRawUser = { ...rawUser, artistProfileData };
      localStorage.setItem('user', JSON.stringify(updatedRawUser));
    } catch (e) {
      // ignore storage errors
    }

    const usersDB: User[] = JSON.parse(localStorage.getItem("usersDB") || "[]");
    const userIndex = usersDB.findIndex((user: User) => user.email === (currentUser.email || rawUser.email));
    if (userIndex > -1) {
      usersDB[userIndex] = { ...usersDB[userIndex], artistProfileData };
      localStorage.setItem("usersDB", JSON.stringify(usersDB));
    }

    setTimeout(() => {
      setLoading(false);
      const id = rawUser?.id || rawUser?.Id || rawUser?.userId;
      if (id) {
        router.push(`/artista/${id}`);
      } else {
        router.push('/artista');
      }
    }, 1500);
  };

  const handleEventChange = (id: number, field: string, value: string) => {
    setEvents((prev) => prev.map((ev) => (ev.id === id ? { ...ev, [field]: value } : ev)));
  };

  const addEvent = () => {
    setEvents((prev) => [
      ...prev,
      { id: Date.now() + Math.floor(Math.random() * 1000), date: '', local: '', name: '', time: '', ticket: '' },
    ]);
  };

  const handleProductChange = (id: number, field: string, value: string) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handleProductFilesChange = (id: number, files: File[]) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, files } : p)));
  };

  const addProduct = () => {
    setProducts((prev) => [
      ...prev,
      { id: Date.now() + Math.floor(Math.random() * 1000), name: '', value: '', desc: '', files: [] },
    ]);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-4xl p-8 md:p-10 bg-neutral-900 rounded-xl shadow-xl space-y-8"
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white text-center">Configure sua conta de Artista</h1>
      </div>

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
                accept="image/png,image/jpeg"
                multiple={true}
                maxFiles={5}
                onFilesChange={(f) => setProfileFiles(f)}
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
        <div className="space-y-4 mt-4">
          {events.map((ev, idx) => (
            <div key={ev.id}>
              <p className="text-lg text-gray-300 font-semibold">{`${idx + 1}º Evento`}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <ArtistInputField
                  id={`eventDate-${ev.id}`}
                  name={`eventDate-${ev.id}`}
                  type="text"
                  placeholder="Data: __/__/__"
                  value={ev.date}
                  onChange={(e) => handleEventChange(ev.id, 'date', e.target.value)}
                />
                <ArtistInputField
                  id={`eventLocal-${ev.id}`}
                  name={`eventLocal-${ev.id}`}
                  type="text"
                  placeholder="Local"
                  value={ev.local}
                  onChange={(e) => handleEventChange(ev.id, 'local', e.target.value)}
                />
                <ArtistInputField
                  id={`eventName-${ev.id}`}
                  name={`eventName-${ev.id}`}
                  type="text"
                  placeholder="Nome do evento"
                  value={ev.name}
                  onChange={(e) => handleEventChange(ev.id, 'name', e.target.value)}
                />
                <ArtistInputField
                  id={`eventTime-${ev.id}`}
                  name={`eventTime-${ev.id}`}
                  type="text"
                  placeholder="Horário: 00h00min"
                  value={ev.time}
                  onChange={(e) => handleEventChange(ev.id, 'time', e.target.value)}
                />
                <div className="md:col-span-2">
                  <ArtistInputField
                    id={`eventTicket-${ev.id}`}
                    name={`eventTicket-${ev.id}`}
                    type="text"
                    placeholder="Link da compra do ingresso"
                    value={ev.ticket}
                    onChange={(e) => handleEventChange(ev.id, 'ticket', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="md:col-span-2 flex justify-center">
            <Button type="button" className="max-w-xs" onClick={addEvent}>
              Adicionar mais um evento
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white text-center">
          Compartilhe seus produtos
        </h2>
        <div className="space-y-4 mt-4">
          {products.map((p, idx) => (
            <div key={p.id}>
              <p className="text-lg text-gray-300 font-semibold">{`Produto ${idx + 1}`}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="space-y-4">
                  <ArtistInputField
                    id={`productName-${p.id}`}
                    name={`productName-${p.id}`}
                    type="text"
                    placeholder="Nome do produto"
                    value={p.name}
                    onChange={(e) => handleProductChange(p.id, 'name', e.target.value)}
                  />
                  <ArtistInputField
                    id={`productValue-${p.id}`}
                    name={`productValue-${p.id}`}
                    type="text"
                    placeholder="Valor do produto: R$ 00,00"
                    value={p.value}
                    onChange={(e) => handleProductChange(p.id, 'value', e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <ArtistTextArea
                    id={`productDesc-${p.id}`}
                    name={`productDesc-${p.id}`}
                    placeholder="Descrição do produto"
                    value={p.desc}
                    onChange={(e) => handleProductChange(p.id, 'desc', e.target.value)}
                    rows={5}
                    className="flex-grow"
                  />
                  <div className="flex-grow min-h-[140px]">
                    <ArtistFileDropzone
                      title="Arraste e insira as fotos do seu produto"
                      description="PNG, JPG (max. 800x800px)"
                      accept="image/png,image/jpeg"
                      multiple={true}
                      maxFiles={5}
                      onFilesChange={(files) => handleProductFilesChange(p.id, files)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="md:col-span-2 flex justify-center">
            <Button type="button" className="max-w-xs" onClick={addProduct}>
              Adicionar mais um Produto
            </Button>
          </div>
        </div>
      </div>

      <div className="pt-4 space-y-4">
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar'}
        </Button>
        <div className="text-center">
          <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
            Voltar para Home
          </Link>
        </div>
      </div>
    </form>
  );
};

export default ArtistRegisterForm;