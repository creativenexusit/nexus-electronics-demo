import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import Script from "next/script";

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

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0TWSBRDFP2"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            window.gtag = function() {
              window.dataLayer.push(arguments);
            };
            window.gtag('js', new Date());
            window.gtag('config', 'G-0TWSBRDFP2');
          `}
        </Script>
      </body>
    </html>
  );
}
