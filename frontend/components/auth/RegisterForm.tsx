'use client'; 

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import InputField from '../ui/InputField';
import Button from '../ui/Button';
import { User, Mail, Lock } from 'lucide-react'; 

interface User {
  name: string;
  email: string;
  type: string;
  password?: string;
}

const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState('');
  
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!userType || !name || !email || !password) {
      setError('Por favor, preencha todos os campos.');
      setLoading(false);
      return;
    }

    const newUser: User = {
      name: name,
      email: email,
      type: userType,
      password: password
    };

    const usersDB: User[] = JSON.parse(localStorage.getItem("usersDB") || "[]");
    const userExists = usersDB.find((user) => user.email === email);

    if (userExists) {
      setError('Este e-mail já está cadastrado.');
      setLoading(false);
      return;
    }

    usersDB.push(newUser);
    localStorage.setItem("usersDB", JSON.stringify(usersDB));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    setTimeout(() => {
      setLoading(false);
      
      if (userType === 'artista') {
        router.push('/auth/cadastro-artista');
      } else {
        router.push('/home'); 
      }
      
    }, 1500);
  };

  return (
    <div className="w-full max-w-sm p-8 bg-neutral-900 rounded-xl shadow-xl">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        Crie sua conta
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
          placeholder="Senha"
          icon={<Lock size={20} />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400 mb-2 ml-1">
            Você é:
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setUserType('artista')}
              className={`py-2.5 rounded-full w-full font-semibold transition-colors duration-200 ${
                userType === 'artista'
                  ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white'
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
              }`}
            >
              Artista
            </button>
            <button
              type="button"
              onClick={() => setUserType('fa')}
              className={`py-2.5 rounded-full w-full font-semibold transition-colors duration-200 ${
                userType === 'fa'
                  ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white' 
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
              }`}
            >
              Fã
            </button>
          </div>
        </div>

        {error && (
          <p className="text-red-400 text-sm text-center mb-4">{error}</p>
        )}

        <Button 
          type="submit" 
          className="mt-4" 
          disabled={loading || !userType || !name || !email || !password}
        >
          {loading ? 'Criando...' : 'Criar'}
        </Button>
      </form>
      
      <div className="text-center mt-8">
        <Link href="/auth" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
          Voltar
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;