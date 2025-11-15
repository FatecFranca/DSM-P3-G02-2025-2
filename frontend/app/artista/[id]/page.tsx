import Nav from '@/components/ui/Nav';
import Footer from '@/components/ui/Footer';
import ArtistSection from '@/components/ui/ArtistSection';
import AgendaSection from '@/components/ui/AgendaSection';
import ProductsSection from '@/components/ui/ProductsSection';
import CommentsSection from '@/components/ui/CommentsSection';

interface ArtistPageProps {
  params: {
    id: string;
  };
}

export default function ArtistPage({ params }: ArtistPageProps) {
  return (
    <div className="bg-neutral-900 min-h-screen">
      <Nav />
      
    
      <ArtistSection artistId={params.id} />
      <AgendaSection artistId={params.id} />
      <ProductsSection artistId={params.id} />
      <CommentsSection artistId={params.id} />
      
      <Footer />
    </div>
  );
}