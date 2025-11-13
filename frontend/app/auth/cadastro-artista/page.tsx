import ArtistRegisterForm from "@/components/auth/ArtistRegisterForm";

const ArtistPage: React.FC = () => {
  return (
    <main className="min-h-screen w-full bg-black text-white flex items-center justify-center p-4">
      <ArtistRegisterForm />
    </main>
  );
};

export default ArtistPage;