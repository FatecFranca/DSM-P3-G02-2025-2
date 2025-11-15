'use client'; 

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import InputField from '../ui/InputField';
import Button from '../ui/Button';
import Link from 'next/link';
import { Mail, Lock } from 'lucide-react';

interface User {
  name: string;
  email: string;
  type?: string;
  password?: string;
}

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState('');
  
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      
      const usersDB: User[] = JSON.parse(localStorage.getItem("usersDB") || "[]");
      
      const foundUser = usersDB.find(
        (user) => user.email === email && user.password === password
      );

      if (foundUser) {
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        router.push('/home');
      } else {
        setLoading(false);
        setError("Email ou senha inválidos.");
      }
    }, 1000); 
  };

  return (
    <div className="w-full max-w-sm">
      <h2 className="text-7xl font-bold text-white mb-8 text-left">Login</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          icon={<Mail size={20} />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          id="password"
          name="password"
          type="password"
          placeholder="Senha"
          icon={<Lock size={20} />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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