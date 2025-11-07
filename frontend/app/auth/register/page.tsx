import RegisterForm from "@/components/auth/RegisterForm";

const RegisterPage: React.FC = () => {
  return (
    <main className="min-h-screen w-full bg-black text-white flex items-center justify-center p-4">
      <RegisterForm />
    </main>
  );
};

export default RegisterPage;