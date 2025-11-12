'use client'; 

import React, { useState } from 'react';
import InputField from '../ui/InputField';
import Button from '../ui/Button';
import { Mail, Lock } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log('Email:', email, 'Password:', password);
    setTimeout(() => {
      setLoading(false);
      alert('Login simulado!');
    }, 1500);
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
            <Button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
            </Button>
      </form>
      <div className="text-center mt-8">
        <a href="/auth/register" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
          Não tenho uma conta
        </a>
      </div>
    </div>
  );
};

export default LoginForm;