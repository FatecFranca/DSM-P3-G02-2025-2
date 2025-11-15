import { Toaster } from 'sonner';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from '@/context/CartContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Autenticação", 
  description: "Cadastre-se ou faça login",  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <CartProvider>
          {children}
          <Toaster 
            position="top-right"
            duration={3000}
            closeButton
            theme="dark"
            toastOptions={{
              style: {
                background: '#262626',
                color: 'white',
                borderRadius: '12px',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '500',
              },
            }}
            icons={{
              success: '🛒',
            }}
          />
        </CartProvider>
      </body>
    </html>
  );
}