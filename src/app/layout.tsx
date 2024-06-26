import "~/styles/globals.css";

import { Inter as FontSans } from "next/font/google";

import StoreProvider from "~/components/providers/store-provider";
import { ThemeProvider } from "~/components/providers/theme-provider";
import { cn } from "~/lib/utils";
import { TRPCReactProvider } from "~/trpc/react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Cube X",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/logo_white.svg" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        " min-h-dvh bg-background font-sans antialiased",
        fontSans.variable,
        "font-degular",
      )}
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <StoreProvider>
            <TRPCReactProvider>{children}</TRPCReactProvider>
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
