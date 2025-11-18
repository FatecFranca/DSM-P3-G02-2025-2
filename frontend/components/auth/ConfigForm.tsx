'use client'; 

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import InputField from '../ui/InputField';
import Button from '../ui/Button';
import { User, Mail, Lock, CheckCircleIcon } from 'lucide-react';
import { Alert } from "@material-tailwind/react";

interface User {
  name: string;
  email: string;
  type?: string;
  password?: string;
}

const getInitialState = (): { user: User | null, name: string, email: string } => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const user: User = JSON.parse(storedUser);
      return { user, name: user.name, email: user.email };
    }
  }
  return { user: null, name: '', email: '' };
};

const ConfigForm: React.FC = () => {
  const router = useRouter();

  const [initialState, setInitialState] = useState(getInitialState);

  const [name, setName] = useState(initialState.name);
  const [email, setEmail] = useState(initialState.email);
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const [showSuccess, setShowSuccess] = useState(false);
  
  useEffect(() => {
    if (!initialState.user) {
      router.push('/auth');
    }
  }, [initialState.user, router]);

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        router.push('/');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !email) {
      alert('Nome e Email são obrigatórios.');
      setLoading(false);
      return;
    }
    
    const updatedUser: User = {
      ...(initialState.user || {}), 
      name: name,
      email: email,
    };

    if (newPassword) {
      updatedUser.password = newPassword;
    } else {
      updatedUser.password = initialState.user?.password;
    }

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
    }, 1000);
  };

  return (
    <div className="w-full max-w-sm p-8 bg-neutral-900 rounded-xl shadow-xl">
      
      <Alert
        open={showSuccess}
        color="green"
        icon={<CheckCircleIcon className="h-6 w-6" />}
        className="mb-4"
        onClose={() => setShowSuccess(false)}
      >
        Conta atualizada com sucesso! Redirecionando...
      </Alert>

      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        Configure sua conta
      </h2>
      <form onSubmit={handleSubmit}>
        <InputField
          id="name"
          name="name"
          type="text"
          placeholder="Nome"
          icon={<User size={20} />} 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          placeholder="Nova senha"
          icon={<Lock size={20} />}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button 
          type="submit" 
          className="mt-4" 
          disabled={loading || showSuccess}
        >
          {loading ? 'Salvando...' : 'Salvar'}
        </Button>
      </form>
      
      <div className="text-center mt-8">
        <button onClick={() => router.back()} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
          Voltar
        </button>
      </div>
    </div>
  );
};

export default ConfigForm;