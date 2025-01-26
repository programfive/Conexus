import { SignInButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  return <>
    <div className="flex items-center justify-around p-5">
      <div>
        <h1>Sign In Clerk</h1>
      </div>
      <SignInButton>
        Sign In
      </SignInButton>
      <div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  </>
}