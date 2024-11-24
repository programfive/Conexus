"use client";

import { AuthContent } from "../../components/AuthContent";
import { FormSignUp } from "./components/form-sign-up";

export default function SignUpPage() {
  return (
    <AuthContent
      link="/auth/sign-in"
      textLink="Sign in"
      image="/images/sign-up.svg"
    >
      <FormSignUp />
    </AuthContent>
  );
}
