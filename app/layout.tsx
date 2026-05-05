import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { PORTAL_DISPLAY_NAME } from "@/lib/constants";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://app.xamoxacademy.com"),
  title: {
    default: `${PORTAL_DISPLAY_NAME} — Campus`,
    template: `%s · ${PORTAL_DISPLAY_NAME}`,
  },
  description:
    "Accede a tus cursos, materiales y progreso en el campus online de Xamox Academy.",
  openGraph: {
    title: PORTAL_DISPLAY_NAME,
    description: "Campus online para alumnos de Xamox Academy.",
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
    <html lang="es">
      <body className={`${dmSans.variable} min-h-screen font-sans antialiased`}>
        <a
          href="#contenido-principal"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
        >
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
