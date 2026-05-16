import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ParticleSnowBackground } from "@/components/ParticleSnowBackground";
import { SnowLoader } from "@/components/SnowLoader";

const title =
  "Snow Agência de Crescimento | Marketing Digital para Negócios Locais";
const description =
  "Estratégia, conteúdo, tráfego pago, vídeos, sites e consultoria para negócios locais que querem crescer com presença digital profissional.";

export const metadata: Metadata = {
  metadataBase: new URL("https://snowagencia.com/"),
  title: {
    default: title,
    template: "%s | Snow Agência de Crescimento"
  },
  description,
  keywords: [
    "marketing digital",
    "agência de marketing",
    "São José dos Pinhais",
    "tráfego pago",
    "social media",
    "vídeos",
    "criação de sites",
    "negócios locais",
    "Snow Agência de Crescimento"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title,
    description,
    url: "https://snowagencia.com/",
    siteName: "Snow Agência de Crescimento",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/images/snow-hero-orb.png",
        width: 1536,
        height: 1024,
        alt: "Visual futurista da Snow Agência de Crescimento"
      }
    ]
  },
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#09001F"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="aurora-field antialiased">
        <BackgroundEffects />
        <ParticleSnowBackground />
        <SnowLoader />
        <div className="relative z-10">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
