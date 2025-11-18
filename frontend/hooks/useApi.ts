'use client';

import { useEffect, useState } from 'react';
import { artists as localArtists } from '../data/artists';

export function useArtists() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArtists() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}/artistas`);
        if (!response.ok) throw new Error('Failed to fetch artists');
        const data = await response.json();
        setArtists(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchArtists();
  }, []);

  return { artists, loading, error };
}

export function useArtist(id?: string) {
  const [artist, setArtist] = useState<{
    id: string;
    nome: string;
    genero_musical?: string;
    bio?: string;
    rede_social?: string[];
    email: string;
    telefone?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArtist() {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}/artistas/${id}`);
        if (!response.ok) throw new Error('Failed to fetch artist');
        const data = await response.json();
        setArtist(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        // Fallback to local data when API is down or the fetch fails
        try {
          const found = localArtists.find(a => a.id === id);
          if (found) {
            // Map local structure to the shape expected by consumers
            setArtist({
              id: found.id,
              nome: found.name || found.nome,
              genero_musical: (found as any).genero_musical,
              bio: (found as any).bio,
              rede_social: (found as any).rede_social || [],
              email: ''
            });
            setError(null);
          }
        } catch (e) {
          // ignore fallback errors
        }
      } finally {
        setLoading(false);
      }
    }

    fetchArtist();
  }, [id]);

  return { artist, loading, error };
}

export function useProducts(filters?: { artista_id?: string }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const params = new URLSearchParams();
        if (filters?.artista_id) params.append('artista_id', filters.artista_id);

        const query = params.toString();
        const url = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}/produtos${query ? `?${query}` : ''}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [filters?.artista_id]);

  return { products, loading, error };
}

export function useEvents(filters?: { artista_id?: string }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const params = new URLSearchParams();
        if (filters?.artista_id) params.append('artista_id', filters.artista_id);

        const query = params.toString();
        const url = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}/eventos${query ? `?${query}` : ''}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch events');
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [filters?.artista_id]);

  return { events, loading, error };
}
