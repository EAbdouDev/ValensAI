import NextThemeProvider from "@/components/providers/ThemeProvider";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import NextTopLoader from "nextjs-toploader";

const sansFont = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | MedSim AI",
    default: "MedSim AI",
  },
  description: "An assistant to help medical studnets.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={sansFont.className} suppressHydrationWarning>
          <NextThemeProvider>
            <NextTopLoader
              color="#ffff"
              initialPosition={0.08}
              crawlSpeed={200}
              showSpinner={false}
              height={3}
              crawl={true}
              easing="ease-in-out"
              speed={200}
              shadow="0 0 10px #ffff,0 0 5px #ffffD"
              zIndex={1600}
            />

            {children}
          </NextThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
