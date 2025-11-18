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

export default async function ArtistPage({ params }: ArtistPageProps) {
  // In some Next.js versions `params` can be a Promise; unwrap to be safe
  const resolvedParams = await params as { id: string };
  const id = resolvedParams?.id;

  return (
    <div className="bg-neutral-900 min-h-screen">

      <ArtistSection artistId={id} />
      <AgendaSection artistId={id} />
      <ProductsSection artistId={id} />
      <CommentsSection artistId={id} />

      <Footer />
    </div>
  );
}