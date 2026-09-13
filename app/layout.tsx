import type { Metadata } from "next";
import { Anton, Inter_Tight, Inter } from "next/font/google";
import NavigationProgress from "@/components/ui/NavigationProgress";
import "./globals.css";

const anton = Anton({
  weight: "400",
  variable: "--font-anton",
  subsets: ["latin"],
  display: "swap",
});

const interTight = Inter_Tight({
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "VISTAR — Influencer Marketing & Talent Management Agency",
    template: "%s | VISTAR",
  },
  description: "Maharashtra's leading regional influencer marketing and creator talent management agency.",
  keywords: [
    "influencer marketing",
    "Maharashtra creators",
    "Marathi influencers",
    "regional marketing",
    "talent management",
    "Pune",
    "Mumbai",
    "brand campaigns",
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://vistar.agency"),
  openGraph: {
    title: "VISTAR — Influencer Marketing & Talent Management Agency",
    description: "Maharashtra's leading regional influencer marketing and creator talent management agency.",
    url: "https://vistar.agency",
    siteName: "VISTAR Agency",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VISTAR — Influencer Marketing & Talent Management Agency",
    description: "Maharashtra's leading regional influencer marketing and creator talent management agency.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${interTight.variable} ${inter.variable} h-full antialiased scroll-smooth dark`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#07090E] text-[#F8FAFC] selection:bg-[#00D2FF]/30 selection:text-white">
        <NavigationProgress />
        {children}
      </body>
    </html>
  );
}


