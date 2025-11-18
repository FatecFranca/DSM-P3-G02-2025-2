'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import InputField from '../ui/InputField';
import Button from '../ui/Button';
import Link from 'next/link';
import { Mail, Lock } from 'lucide-react';
import { loginCliente, loginArtista } from '@/lib/auth';
import { setAuth } from '@/lib/api';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'cliente' | 'artista'>('cliente');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = userType === 'artista'
        ? await loginArtista(email, password)
        : await loginCliente(email, password);

      setAuth(response.token, response.user);

      if (response.user.type === 'artista') {
        router.push('/home-artista');
      } else {
        router.push('/home');
      }
    } catch (err) {
      setLoading(false);
      setError(err instanceof Error ? err.message : 'Email ou senha inválidos.');
    }
  };

  return (
    <div className="w-full max-w-sm">
      <h2 className="text-7xl font-bold text-white mb-8 text-left">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-white text-sm mb-2">Tipo de usuário</label>
          <div className="flex gap-4">
            <label className="flex items-center text-white cursor-pointer">
              <input
                type="radio"
                value="cliente"
                checked={userType === 'cliente'}
                onChange={(e) => setUserType(e.target.value as 'cliente')}
                className="mr-2"
              />
              Cliente
            </label>
            <label className="flex items-center text-white cursor-pointer">
              <input
                type="radio"
                value="artista"
                checked={userType === 'artista'}
                onChange={(e) => setUserType(e.target.value as 'artista')}
                className="mr-2"
              />
              Artista
            </label>
          </div>
        </div>

        <InputField
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          icon={<Mail size={20} />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputField
          id="password"
          name="password"
          type="password"
          placeholder="Senha"
          icon={<Lock size={20} />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <p className="text-red-400 text-sm text-center mt-2">{error}</p>
        )}

        <div className="text-center">
            <Button type="submit" className="mt-4 max-w-56" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
            </Button>
        </div>
      </form>
      <div className="text-center mt-8">
        <Link href="/auth/register" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
          Não tenho uma conta
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;