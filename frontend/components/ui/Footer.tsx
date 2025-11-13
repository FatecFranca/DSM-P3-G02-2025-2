import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="w-full">
      <div className="mx-auto px-6 py-10 text-gray-400 flex justify-center w-full"> 
        <div className="max-w-4xl w-full"> 
      <div className="grid grid-cols-1 md:grid-cols-2 gap-80">
        <div>
                    <p className="font-semibold text-white mb-2">Sobre o Projeto</p>
                    <p className="text-sm">Plataforma social de artistas, shows e fãs desenvolvida como projeto interdisciplinar do curso de Desenvolvimento de Software Multiplataforma da Fatec Franca.</p>
                </div>
        <div className="md:justify-self-end text-right">
                    <p className="font-semibold text-white mb-2">Desenvolvedores</p>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="https://github.com/OliveiraZenith" target="_blank" rel="noopener noreferrer">Ana Laura Lis Oliveira Zenith</Link></li>
                        <li><Link href="https://github.com/eduardogrespi" target="_blank" rel="noopener noreferrer">Eduardo Fernandes Grespi</Link></li>
                        <li><Link href="https://github.com/herixcx" target="_blank" rel="noopener noreferrer">Héricles Robert Mendes</Link></li>
                        <li><Link href="https://github.com/jmlandi" target="_blank" rel="noopener noreferrer">João Marcos Landi Sousa</Link></li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;