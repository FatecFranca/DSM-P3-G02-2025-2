import ArtistRegisterForm from "@/components/auth/ArtistRegisterForm";
import Footer from "@/components/ui/Footer";

const ArtistPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="py-12 px-4 md:px-6">
        <ArtistRegisterForm />
      </section>
      <Footer />
    </main>
  );
};

export default ArtistPage;