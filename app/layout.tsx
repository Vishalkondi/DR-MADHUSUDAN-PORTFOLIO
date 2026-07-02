import type { Metadata } from "next";
import { Playfair_Display, Inter, IBM_Plex_Mono } from "next/font/google";
import { CLINIC } from "@/lib/data";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = "https://dryemul.com"; // TODO: replace with your domain

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${CLINIC.doctor} — ${CLINIC.title}`,
    template: `%s | ${CLINIC.doctor}`,
  },
  description:
    "Senior interventional cardiologist with 25 years restoring hearts through evidence-based, compassionate, minimally-invasive care — from complex angioplasty to lifelong prevention.",
  keywords: [
    "cardiologist Pune",
    "interventional cardiology",
    "angioplasty",
    "heart specialist",
    "Dr. Madhusudan Yemul",
  ],
  authors: [{ name: CLINIC.doctor }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: `${CLINIC.doctor} — ${CLINIC.title}`,
    description:
      "Precision cardiac care in Pune. Book a consultation with a senior interventional cardiologist.",
    siteName: CLINIC.clinicName,
  },
  twitter: {
    card: "summary_large_image",
    title: `${CLINIC.doctor} — ${CLINIC.title}`,
    description: "Precision cardiac care in Pune.",
  },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Physician",
  name: CLINIC.doctor,
  medicalSpecialty: "Cardiovascular",
  description: `${CLINIC.title} in Pune, India.`,
  telephone: CLINIC.phone,
  email: CLINIC.email,
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    streetAddress: CLINIC.address,
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    postalCode: "411004",
    addressCountry: "IN",
  },
  openingHours: "Mo-Sa 10:00-14:00,17:00-20:00",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
