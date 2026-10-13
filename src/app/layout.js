import { Allura, Be_Vietnam_Pro, Playfair_Display } from "next/font/google";
import { siteConfig } from "@/lib/site";
import { IMAGES } from "@/lib/products";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileOrderBar from "@/components/layout/MobileOrderBar";
import Pixels from "@/components/analytics/Pixels";
import RevealScript from "@/components/ui/RevealScript";
import SmoothAnchors from "@/components/ui/SmoothAnchors";
import "./globals.css";

const body = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-body",
});

const display = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

// Chữ viết tay trang trí (Your Style Your Story, Special Offer…) — chỉ dùng cho chữ Latin
const hand = Allura({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-hand",
});

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Đầm dạ hội & đồ mặc nhà tôn dáng | Flash sale hôm nay`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: ["Solisst", "đầm dạ hội", "đầm dự tiệc", "đồ bộ mặc nhà", "đồ ngủ nữ", "thời trang nữ Bắc Ninh"],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Flash sale đến 35%`,
    description: siteConfig.description,
    images: [{ url: IMAGES.mocha, width: 1600, height: 1600, alt: "Đầm lụa satin Mocha — Solisst" }],
  },
  twitter: {
    card: "summary",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [IMAGES.mocha],
  },
  icons: {
    icon: [
      { url: "/icons/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: { url: "/icons/apple-touch-icon.png", sizes: "180x180" },
  },
  manifest: "/manifest.webmanifest",
};

export const viewport = {
  themeColor: siteConfig.themeColor,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={`${body.variable} ${display.variable} ${hand.variable}`}>
      <body className="min-h-screen bg-cream font-sans text-ink antialiased">
        <Header />
        {children}
        <Footer />
        <MobileOrderBar />
        <Pixels />
        <SmoothAnchors />
        <RevealScript />
      </body>
    </html>
  );
}
