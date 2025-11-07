import LoginForm from '../../components/auth/LoginForm';
import Image from 'next/image';

const AuthPage: React.FC = () => {
  return (
    <main className="flex min-h-screen w-full">
      <div className="w-3/5 bg-black text-white flex items-center justify-center p-12 lg:p-20">
        <div className=" w-full"> 
          <h1 className="text-7xl lg:text-6xl font-extrabold leading-tight mb-6">
            Cadastre-se ou <br />
            faça login
          </h1>
          
          <p className="text-4xl text-gray-300 mb-10">
            E fique por dentro das novidades e agenda <br />do seu artista favorito.
          </p>

          <Image
            src="/waveform.svg"
            alt="Onda sonora"
            width={1000}
            height={90} 
            className="w-full h-auto"
          />
        </div>
      </div>
      <div className="w-2/5 bg-neutral-900 text-white flex items-center justify-center p-12">
        <LoginForm />
      </div>

    </main>
  );
};

export default AuthPage;