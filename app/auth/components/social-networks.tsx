import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Muted } from "@/components/ui/typography";
import * as Clerk from "@clerk/elements/common";
interface SocialNetworksProps {
  isLoading: boolean;
}
export function SocialNetworks({ isLoading }: SocialNetworksProps) {
  return (
    <>
      <Muted className="flex items-center gap-x-3   before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
        or
      </Muted>
      <div className="grid grid-cols-3 gap-4 ">
        <Clerk.Connection name="apple" asChild>
          <Button
            className="[&_svg]:size-5"
            variant="outline"
            type="button"
            disabled={isLoading}
          >
            <Clerk.Loading scope="provider:apple">
              {(isLoading) =>
                isLoading ? (
                  <Icons.spinner className="size-4 animate-spin" />
                ) : (
                  <>
                    <Icons.apple className="size-5" />
                  </>
                )
              }
            </Clerk.Loading>
          </Button>
        </Clerk.Connection>
        <Clerk.Connection name="facebook" asChild>
          <Button
            className="[&_svg]:size-5"
            variant="outline"
            type="button"
            disabled={isLoading}
          >
            <Clerk.Loading scope="provider:facebook">
              {(isLoading) =>
                isLoading ? (
                  <Icons.spinner className="size-4 animate-spin" />
                ) : (
                  <>
                    <Icons.facebook />
                  </>
                )
              }
            </Clerk.Loading>
          </Button>
        </Clerk.Connection>
        <Clerk.Connection name="google" asChild>
          <Button
            className="[&_svg]:size-5"
            variant="outline"
            type="button"
            disabled={isLoading}
          >
            <Clerk.Loading scope="provider:google">
              {(isLoading) =>
                isLoading ? (
                  <Icons.spinner className="size-4 animate-spin" />
                ) : (
                  <>
                    <Icons.google />
                  </>
                )
              }
            </Clerk.Loading>
          </Button>
        </Clerk.Connection>
      </div>
    </>
  );
}
