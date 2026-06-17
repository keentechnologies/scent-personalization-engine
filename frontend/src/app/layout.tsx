import "./globals.css";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Script from "next/script";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "Crafted Sprays | Discover Your Fragrance",
  description:
    "A fragrance crafted around who you are, not what everyone else is wearing.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="grain-overlay font-sans">
        {children}

        <Script
          src="https://verify.msg91.com/otp-provider.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}