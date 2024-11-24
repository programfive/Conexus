import { Muted } from "@/components/ui/typography";

interface FooterProps {
  children: React.ReactNode;
}
export function Footer({ children }: FooterProps) {
  return (
    <div className="space-y-4">
      {children}
      <div className=" flex items-center justify-center text-center">
        <Muted>
          By clicking continue, you agree to our Terms of
          <br />
          Service and Privacy Policy .
        </Muted>
      </div>
    </div>
  );
}
