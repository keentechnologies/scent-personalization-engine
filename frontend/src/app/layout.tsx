import "./globals.css";

import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

      <body>

        {children}

        <Script
          src="https://verify.msg91.com/otp-provider.js"
          strategy="afterInteractive"
        />

      </body>

    </html>
  );
}