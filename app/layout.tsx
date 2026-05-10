import type { Metadata } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";
import { PORTAL_DISPLAY_NAME } from "@/lib/constants";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://app.xamoxacademy.com"
  ),
  title: {
    default: `${PORTAL_DISPLAY_NAME} — Campus`,
    template: `%s · ${PORTAL_DISPLAY_NAME}`,
  },
  description:
    "Accede a tus cursos, materiales y progreso en el campus online de Xamox Academy.",
  applicationName: PORTAL_DISPLAY_NAME,
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Xamox Academy",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/brand/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/brand/logo-192.png", sizes: "192x192", type: "image/png" },
      { url: "/brand/logo-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/brand/favicon-48.png"],
  },
  openGraph: {
    title: PORTAL_DISPLAY_NAME,
    description: "Campus online — Xamox Academy.",
    url: "https://app.xamoxacademy.com",
    siteName: PORTAL_DISPLAY_NAME,
    locale: "es_ES",
    type: "website",
    images: [{ url: "/brand/logo-512.png", width: 512, height: 512 }],
  },
  twitter: {
    card: "summary_large_image",
    title: PORTAL_DISPLAY_NAME,
    description: "Campus online — Xamox Academy.",
    images: ["/brand/logo-512.png"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#D4AF37",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  colorScheme: "dark" as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${interTight.variable} ${fraunces.variable} ${jetbrains.variable} min-h-screen font-sans antialiased`}
      >
        <a
          href="#contenido-principal"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-xa-gold focus:px-4 focus:py-2 focus:text-xa-deep"
        >
          Saltar al contenido
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
