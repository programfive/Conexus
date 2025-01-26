import { Icons } from "@/components/ui/icons";
import { H3 } from "@/components/ui/typography";
import { ModeToggle } from "@/components/utils/mode-toggle";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <main className="grid place-content-center p-5 min-h-screen container mx-auto relative">
      <header className="absolute  flex justify-between items-center  left-5 top-5 right-5">
        <div className="flex items-center gap-2">
          <Icons.logo className="w-7 h-7"/>
          <H3>Conexus</H3>
        </div>
        <ModeToggle />
      </header>
      {children}
    </main>
  );
}
