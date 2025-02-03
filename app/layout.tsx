import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/providers/theme";
import SWRConfig from "@/providers/swr";
import { GeistSans } from "geist/font/sans";
export const metadata: Metadata = {
  title: "Conexus",
  description:"A real-time chat application for efficient communication and connection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${GeistSans.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <SWRConfig>
              {children}    
            </SWRConfig>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
