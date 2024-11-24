"use client";

import { AuthContent } from "../../components/AuthContent";
import { FormSignIn } from "./components/form-sign-in";

export default function SignInPage() {
  return (
    <AuthContent
      textLink="Sign up"
      link="/auth/sign-up"
      image="/images/sign-in.svg"
    >
      <FormSignIn />
    </AuthContent>
  );
}
