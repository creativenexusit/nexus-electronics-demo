import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";

export const metadata: Metadata = {
  title: "Nexus Electronic – Premium Electronics & Smart Gadgets",
  description:
    "Shop the latest smartphones, laptops, earbuds, smart watches, and accessories at Nexus Electronic. Premium electronics at competitive prices.",
  keywords:
    "electronics, smartphones, laptops, earbuds, smart watches, nexus electronic",
  openGraph: {
    title: "Nexus Electronic",
    description: "Premium Electronics & Smart Gadgets Store",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-neutral-900 min-h-screen flex flex-col">
        <StoreProvider>
          <Header />
          <main className="flex-1 pb-16 md:pb-0">{children}</main>
          <Footer />
          <MobileNav />
        </StoreProvider>
      </body>
    </html>
  );
}
