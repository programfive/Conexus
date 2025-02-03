import { checkUser } from "@/actions/check-user";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}
async function ProtectedLayout({ children }: ProtectedLayoutProps) {
    const user = await checkUser();
    
  return (
    <main className=" min-h-screen">
      {children}
    </main>
  );
}
export default ProtectedLayout;