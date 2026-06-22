import type { Metadata } from "next";
import "./globals.css";
import { cormorant, inter } from "@/lib/fonts";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ComingSoonProvider } from "@/components/coming-soon/coming-soon-provider";

export const metadata: Metadata = {
  title: "Crafted Sprays — Personalised Fragrance",
  description: "Take a 5-minute discovery to get a fragrance crafted around your personality, preferences and lifestyle. Delivered to your doorstep.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="grain-overlay relative min-h-screen bg-bg text-text-primary">
        <ComingSoonProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ComingSoonProvider>
      </body>
    </html>
  );
}
