import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "TravelDiscovery — Tú pones el presupuesto, nosotros la escapada",
  description:
    "Descubre los mejores viajes dentro de tu presupuesto. Vuelo + Hotel combinados desde Canarias. Motor de descubrimiento de escapadas inteligente.",
  keywords: [
    "viajes baratos",
    "escapadas desde Canarias",
    "vuelos baratos Tenerife",
    "viajes presupuesto",
    "descubrimiento de viajes",
  ],
  openGraph: {
    title: "TravelDiscovery — Tú pones el presupuesto, nosotros la escapada",
    description:
      "¿Cuánto tienes para viajar? Descubre escapadas completas (vuelo + hotel) dentro de tu presupuesto.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0F1A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

import Providers from "@/components/common/Providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
