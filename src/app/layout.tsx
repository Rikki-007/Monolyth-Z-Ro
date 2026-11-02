import type { Metadata } from "next";
import { Bebas_Neue, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import NoiseOverlay from "@/components/NoiseOverlay";
import GridOverlay from "@/components/GridOverlay";
import Background3DLoader from "@/components/Background3DLoader";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import AppShell from "@/components/AppShell";
import { contact } from "@/data/contact";

const siteUrl = "https://www.monolythzro.com";
const description =
  "MONOLYTH Z-RO is a digital design and engineering studio: brand, interface and software, built to one standard from first concept to shipped product.";

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Canonical URLs are set per page: a canonical here would be inherited by
// every route and point them all at the homepage.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "MONOLYTH Z-RO — Design | Engineering | Software",
  description,
  applicationName: "MONOLYTH Z-RO",
  openGraph: {
    type: "website",
    siteName: "MONOLYTH Z-RO",
    title: "MONOLYTH Z-RO — Digital Design & Engineering Studio",
    description,
    locale: "en_IE",
  },
  twitter: {
    card: "summary",
    title: "MONOLYTH Z-RO — Digital Design & Engineering Studio",
    description,
  },
};

// Tells crawlers who the studio is: the exact brand name and the one set of
// contact details the site publishes.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MONOLYTH Z-RO",
  url: siteUrl,
  email: contact.email,
  telephone: contact.phone.href.replace("tel:", ""),
  description,
  sameAs: [contact.github, contact.instagram, contact.facebook],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebas.variable} ${grotesk.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-obsidian text-paper">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <GridOverlay />
        <Background3DLoader />
        <NoiseOverlay />
        <CustomCursor />
        <ScrollProgress />
        <div className="relative z-10 flex min-h-full flex-1 flex-col">
          <AppShell>{children}</AppShell>
        </div>
      </body>
    </html>
  );
}
