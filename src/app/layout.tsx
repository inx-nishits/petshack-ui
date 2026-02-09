import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Petshack.au - Compare Pet Product Prices Across Australia",
  description: "Find the best deals on pet food, toys, and healthcare products across Australia's top retailers. Compare prices and save on your pet essentials.",
  keywords: ["pet food prices", "compare pet products australia", "petbarn vs petstock", "cheapest dog food", "petshack"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased text-foreground bg-white`} suppressHydrationWarning>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}

