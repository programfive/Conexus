"use client";
import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { HeaderText } from "@/app/auth/components/header-text";
import { Footer } from "@/app/auth/components/footer";
import { SocialNetworks } from "@/app/auth/components/social-networks";


export function FormSignUp() {
  return (
    <div className="grid w-full grow items-center ">
      <SignUp.Root>
        <Clerk.Loading>
          {(isGlobalLoading) => (
            <>
              <SignUp.Step name="start">
                <section className="space-y-6">
                  <HeaderText
                    title="Create your account"
                    subtitle="Welcome! Please fill in the details to get started."
                  />
                  <div className="flex flex-col gap-4">
                    <Clerk.Field name="emailAddress" className="space-y-2">
                      <Clerk.Label asChild>
                        <Label>Email address</Label>
                      </Clerk.Label>
                      <Clerk.Input type="email" required asChild>
                        <Input />
                      </Clerk.Input>
                      <Clerk.FieldError className="block text-sm text-destructive" />
                    </Clerk.Field>
                    <Clerk.Field name="password" className="space-y-2">
                      <Clerk.Label asChild>
                        <Label>Password</Label>
                      </Clerk.Label>
                      <Clerk.Input type="password" required asChild>
                        <Input />
                      </Clerk.Input>
                      <Clerk.FieldError className="block text-sm text-destructive" />
                    </Clerk.Field>

                    <div className="flex flex-col gap-4">
                      <SignUp.Captcha className="empty:hidden" />
                      <SignUp.Action submit asChild>
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
                      </SignUp.Action>
                    </div>
                  </div>
                  <Footer>
                    <SocialNetworks isLoading={isGlobalLoading} />
                  </Footer>
                </section>
              </SignUp.Step>

              <SignUp.Step name="continue">
                <section className="space-y-6">
                  <HeaderText
                    title="Continue registration"
                    subtitle="Welcome! Please fill in the details to get started."
                  />
                  <Clerk.Field name="username" className="space-y-2">
                    <Clerk.Label>
                      <Label>Username</Label>
                    </Clerk.Label>
                    <Clerk.Input type="text" required asChild>
                      <Input />
                    </Clerk.Input>
                    <Clerk.FieldError className="block text-sm text-destructive" />
                  </Clerk.Field>

                  <div className="grid w-full gap-y-4">
                    <SignUp.Action submit asChild>
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
                    </SignUp.Action>
                  </div>
                </section>
              </SignUp.Step>

              <SignUp.Step name="verifications">
                <SignUp.Strategy name="email_code">
                  <section className="space-y-6">
                    <HeaderText
                      title="Verify your email"
                      subtitle="  Use the verification link sent to your email address"
                    />
                    <div className="grid items-center justify-center gap-y-2">
                      <Clerk.Field name="code" className="space-y-2">
                        <Clerk.Label className="sr-only">
                          Email address
                        </Clerk.Label>
                        <div className="flex justify-center text-center">
                          <Clerk.Input
                            type="otp"
                            className="flex justify-center has-[:disabled]:opacity-50"
                            autoSubmit
                            render={({ value, status }) => {
                              return (
                                <div
                                  data-status={status}
                                  className={cn(
                                    "relative flex size-10 items-center justify-center  border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md md:size-12 lg:size-14",
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
                      <SignUp.Action
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
                        <Button type="button" variant="link" size="sm">
                          Didn&apos;t receive a code? Resend
                        </Button>
                      </SignUp.Action>
                    </div>

                    <div className="grid w-full gap-y-4">
                      <SignUp.Action submit asChild>
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
                      </SignUp.Action>
                    </div>
                  </section>
                </SignUp.Strategy>
              </SignUp.Step>
            </>
          )}
        </Clerk.Loading>
      </SignUp.Root>
    </div>
  );
}
