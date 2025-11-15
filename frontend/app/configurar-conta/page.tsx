// frontend/app/configurar-conta/page.tsx
import ConfigForm from "../../components/auth/ConfigForm";

const ConfigPage: React.FC = () => {
  return (
    <main className="min-h-screen w-full bg-black text-white flex items-center justify-center p-4">
      <ConfigForm />
    </main>
  );
};

export default ConfigPage;