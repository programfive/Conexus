import { Icons } from "@/components/ui/icons";
import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
export default async function SSOCallback() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <Icons.spinner className="h-24 w-24 animate-spin" />
        <h2 className="mt-4 text-xl font-semibold">
          Verifying your identity...
        </h2>
        <AuthenticateWithRedirectCallback signInUrl="/chat" signUpUrl="/chat" />
      </div>
    </div>
  );
}
