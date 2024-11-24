"use client";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import { SocialNetworks } from "@/app/auth/components/social-networks";
import { HeaderText } from "@/app/auth/components/header-text";
import { Footer } from "@/app/auth/components/footer";
import { cn } from "@/lib/utils";

export function FormSignIn() {
  return (
    <div className="grid w-full grow items-center">
      <SignIn.Root>
        <Clerk.Loading>
          {(isGlobalLoading) => (
            <>
              <SignIn.Step name="start">
                <section className="space-y-6">
                  <HeaderText
                    title="Welcome back"
                    subtitle="Sign in to your account to continue"
                  />
                  <div className="flex flex-col gap-4">
                    <Clerk.Field name="identifier" className="space-y-2">
                      <Clerk.Label asChild>
                        <Label>Email address</Label>
                      </Clerk.Label>
                      <Clerk.Input type="email" required asChild>
                        <Input />
                      </Clerk.Input>
                      <Clerk.FieldError className="block text-sm text-destructive" />
                    </Clerk.Field>

                    <div className="grid w-full gap-y-4">
                      <SignIn.Action submit asChild>
                        <Button className="mt-6" disabled={isGlobalLoading}>
                          <Clerk.Loading>
                            {(isLoading) => {
                              return isLoading ? (
                                <Icons.spinner className="size-4 animate-spin" />
                              ) : (
                                "Continue"
                              );
                            }}
                          </Clerk.Loading>
                        </Button>
                      </SignIn.Action>
                    </div>
                  </div>
                  <Footer>
                    <SocialNetworks isLoading={isGlobalLoading} />
                  </Footer>
                </section>
              </SignIn.Step>

              <SignIn.Step name="choose-strategy">
                <section className="space-y-6">
                  <HeaderText
                    title="Choose sign in method"
                    subtitle="Select your preferred method to continue"
                  />
                  <div className="grid gap-y-4">
                    <SignIn.SupportedStrategy name="email_code" asChild>
                      <Button
                        type="button"
                        variant="link"
                        disabled={isGlobalLoading}
                      >
                        Email code
                      </Button>
                    </SignIn.SupportedStrategy>
                    <SignIn.SupportedStrategy name="password" asChild>
                      <Button
                        type="button"
                        variant="link"
                        disabled={isGlobalLoading}
                      >
                        Password
                      </Button>
                    </SignIn.SupportedStrategy>
                  </div>

                  <div className="grid w-full gap-y-4">
                    <SignIn.Action navigate="previous" asChild>
                      <Button disabled={isGlobalLoading}>
                        <Clerk.Loading>
                          {(isLoading) => {
                            return isLoading ? (
                              <Icons.spinner className="size-4 animate-spin" />
                            ) : (
                              "Go back"
                            );
                          }}
                        </Clerk.Loading>
                      </Button>
                    </SignIn.Action>
                  </div>
                </section>
              </SignIn.Step>

              <SignIn.Step name="verifications">
                <SignIn.Strategy name="password">
                  <section className="space-y-6">
                    <HeaderText
                      title="Enter password"
                      subtitle="Please enter your password to continue"
                    />
                    <div className="grid gap-y-4">
                      <Clerk.Field name="password" className="space-y-2">
                        <Clerk.Label asChild>
                          <Label>Password</Label>
                        </Clerk.Label>
                        <Clerk.Input type="password" asChild>
                          <Input />
                        </Clerk.Input>
                        <Clerk.FieldError className="block text-sm text-destructive" />
                      </Clerk.Field>
                    </div>

                    <div className="grid w-full gap-y-4">
                      <SignIn.Action submit asChild>
                        <Button disabled={isGlobalLoading}>
                          <Clerk.Loading>
                            {(isLoading) => {
                              return isLoading ? (
                                <Icons.spinner className="size-4 animate-spin" />
                              ) : (
                                "Continue"
                              );
                            }}
                          </Clerk.Loading>
                        </Button>
                      </SignIn.Action>
                      <SignIn.Action navigate="choose-strategy" asChild>
                        <Button type="button" size="sm" variant="link">
                          Use another method
                        </Button>
                      </SignIn.Action>
                    </div>
                  </section>
                </SignIn.Strategy>
                <SignIn.Strategy name="email_code">
                  <section className="space-y-6">
                    <HeaderText
                      title="Verify your email"
                      subtitle="Use the verification code sent to your email address"
                    />
                    <div className="grid items-center justify-center gap-y-2">
                      <Clerk.Field name="code">
                        <Clerk.Label className="sr-only">
                          Email verification code
                        </Clerk.Label>
                        <div className="flex justify-center text-center">
                          <Clerk.Input
                            type="otp"
                            autoSubmit
                            className="flex justify-center has-[:disabled]:opacity-50"
                            render={({ value, status }) => {
                              return (
                                <div
                                  data-status={status}
                                  className={cn(
                                    "relative flex size-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md md:size-12 lg:size-14",
                                    {
                                      "z-10 ring-2 ring-ring ring-offset-background":
                                        status === "cursor" ||
                                        status === "selected",
                                    }
                                  )}
                                >
                                  {value}
                                  {status === "cursor" && (
                                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                      <div className="animate-caret-blink h-4 w-px bg-foreground duration-1000" />
                                    </div>
                                  )}
                                </div>
                              );
                            }}
                          />
                        </div>
                        <Clerk.FieldError className="block text-center text-sm text-destructive" />
                      </Clerk.Field>
                      <SignIn.Action
                        asChild
                        resend
                        className="text-muted-foreground"
                        fallback={({ resendableAfter }) => (
                          <Button variant="link" size="sm" disabled>
                            Didn&apos;t receive a code? Resend (
                            <span className="tabular-nums">
                              {resendableAfter}
                            </span>
                            )
                          </Button>
                        )}
                      >
                        <Button variant="link" size="sm">
                          Didn&apos;t receive a code? Resend
                        </Button>
                      </SignIn.Action>
                    </div>

                    <div className="grid w-full gap-y-4">
                      <SignIn.Action submit asChild>
                        <Button disabled={isGlobalLoading}>
                          <Clerk.Loading>
                            {(isLoading) => {
                              return isLoading ? (
                                <Icons.spinner className="size-4 animate-spin" />
                              ) : (
                                "Continue"
                              );
                            }}
                          </Clerk.Loading>
                        </Button>
                      </SignIn.Action>
                      <SignIn.Action navigate="choose-strategy" asChild>
                        <Button size="sm" variant="link">
                          Use another method
                        </Button>
                      </SignIn.Action>
                    </div>
                  </section>
                </SignIn.Strategy>
              </SignIn.Step>
            </>
          )}
        </Clerk.Loading>
      </SignIn.Root>
    </div>
  );
}
