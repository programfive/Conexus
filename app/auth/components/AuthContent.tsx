import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

interface WallpaperProps {
  image: string;
  children: React.ReactNode;
  link: string;
  textLink: string;
}
export function AuthContent({
  image,
  children,
  link,
  textLink,
}: WallpaperProps) {
  return (
    <motion.div
      animate={{ x: 100 }}
      className="grid min-h-screen grid-cols-1 lg:grid-cols-2"
    >
      <div className="relative hidden  bg-muted p-10 dark:border-r lg:flex">
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={image}
            alt="authentication"
            width={700}
            height={700}
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <div className="relative z-20 flex items-start justify-center gap-2 text-xl  font-bold">
          <Icons.logo className="h-6 w-6" />
          Conexus
        </div>
      </div>

      <div className="flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <div className="flex items-center text-lg font-bold">
              <Icons.logo className="mr-2 h-6 w-6" />
              Conexus
            </div>
            <Link
              href={link}
              className={cn(buttonVariants({ variant: "ghost" }), "text-sm")}
            >
              {textLink}
            </Link>
          </div>

          <div className="mb-6 flex justify-center lg:hidden">
            <Image
              src={image}
              alt="authentication"
              width={250}
              height={250}
              className="max-w-full"
            />
          </div>

          <div className="absolute right-8 top-8 hidden lg:block">
            <Link
              href={link}
              className={cn(buttonVariants({ variant: "ghost" }), "text-sm")}
            >
              {textLink}
            </Link>
          </div>

          <div className="w-full">{children}</div>
        </div>
      </div>
    </motion.div>
  );
}
