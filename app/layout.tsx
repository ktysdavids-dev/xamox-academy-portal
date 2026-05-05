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
  openGraph: {
    title: PORTAL_DISPLAY_NAME,
    description: "Campus online — Xamox Academy.",
    url: "https://app.xamoxacademy.com",
    siteName: PORTAL_DISPLAY_NAME,
    locale: "es_ES",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
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
