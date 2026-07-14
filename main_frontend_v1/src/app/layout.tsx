import type { Metadata, Viewport } from "next";
import "./globals.css";
import { cormorant, inter } from "@/lib/fonts";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ComingSoonProvider } from "@/components/coming-soon/coming-soon-provider";
import { ClarityProvider } from "@/components/clarity-provider/clarity-provider";

import Script from "next/script";


export const metadata: Metadata = {
  metadataBase: new URL("https://craftedsprays.com"),
  title: "Crafted Sprays — Personalised Fragrance",
  description: "Take a 5-minute discovery to get a fragrance crafted around your personality, preferences and lifestyle. Delivered to your doorstep.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black",
  },
};

export const viewport: Viewport = {
  themeColor: "#151311",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-17772674522"></Script>
        <Script id="google-tag" strategy= "afterInteractive" >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-17772674522');
          `}
        </Script>
      </head>
      <body className="grain-overlay relative min-h-screen bg-bg text-text-primary">
        <ClarityProvider />
        <ComingSoonProvider>
          <Header />
          <main className="mt-10">{children}</main>
          <Footer />
        </ComingSoonProvider>
      </body>
    </html>
  );
}
