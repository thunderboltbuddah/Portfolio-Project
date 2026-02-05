import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import Script from "next/script";
import GAListener from "@/components/GAListener";// We'll define this next

export const clashDisplay = localFont({
  src: [
    { path: "./fonts/ClashDisplay-Extralight.ttf", weight: "200", style: "normal" },
    { path: "./fonts/ClashDisplay-Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/ClashDisplay-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/ClashDisplay-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/ClashDisplay-Semibold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/ClashDisplay-Bold.ttf", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-clash-display",
});

export const metadata: Metadata = {
  title: "Aun Muhammad's Portfolio",
  description: "Aun Muhammad",
};

// Root Layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-L7G74DP73S"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-L7G74DP73S', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>

      <body className={`${clashDisplay.className} antialiased cursor-auto-mobile`}>
        <GAListener /> {/* Tracks client-side navigation */}
        <CustomCursor />
        <Header />
        <main className="min-h-svh bg-white relative z-40 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
