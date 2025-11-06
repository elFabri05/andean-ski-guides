import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "./components/ThemeRegistry";
import I18nProvider from "./components/I18nProvider";
import StructuredData from "./components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Andean Ski Guides - Mountain Adventures in the Andes",
  description: "Experience world-class skiing in the Andes Mountains with expert local guides. Professional ski touring in Las Leñas, Paso Pehuenche, and Andean Corridor near Aconcagua, Mendoza, Argentina.",
  keywords: [
    "ski guides",
    "Andes skiing",
    "backcountry skiing",
    "ski touring",
    "Las Leñas",
    "Paso Pehuenche",
    "Mendoza skiing",
    "Argentina ski guides",
    "mountain adventures",
    "Aconcagua skiing",
    "Andean skiing",
    "ski mountaineering",
  ],
  authors: [{ name: "Andean Ski Guides" }],
  creator: "Andean Ski Guides",
  publisher: "Andean Ski Guides",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://andeanskiguides.com"),
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      es: "/?lang=es",
      de: "/?lang=de",
    },
  },
  openGraph: {
    title: "Andean Ski Guides - Mountain Adventures in the Andes",
    description: "Experience world-class skiing in the Andes Mountains with expert local guides. Professional ski touring in Las Leñas, Paso Pehuenche, and Andean Corridor.",
    url: "https://andeanskiguides.com",
    siteName: "Andean Ski Guides",
    images: [
      {
        url: "/images/carousel/image1.jpg",
        width: 1200,
        height: 630,
        alt: "Skiing in the Andes Mountains",
      },
    ],
    locale: "en_US",
    alternateLocale: ["es_ES", "de_DE"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andean Ski Guides - Mountain Adventures in the Andes",
    description: "Experience world-class skiing in the Andes Mountains with expert local guides.",
    images: ["/images/carousel/image1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  verification: {
    // Add your verification codes when you set up Google Search Console and Bing Webmaster Tools
    // google: 'your-google-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nProvider>
          <ThemeRegistry>{children}</ThemeRegistry>
        </I18nProvider>
      </body>
    </html>
  );
}
