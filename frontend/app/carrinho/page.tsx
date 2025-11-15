import CartSection from '@/components/ui/CartSection';
import Nav from '@/components/ui/Nav';
import Footer from '@/components/ui/Footer';

export default function CarrinhoPage() {
  return (
    <div className="bg-black min-h-screen"> 
      <Nav />
      <CartSection />
      <Footer />
    </div>
  );
}