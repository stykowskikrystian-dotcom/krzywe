import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./navigation.css";
import "./jezioro-krzywe/lake.css";
import "./home.css";
import "./oferta/offer.css";
import "./kontakt/contact.css";
import "./legal.css";
import "./direct-booking.css";
import "./hero-consistency.css";
import "./entry-intro.css";
import { FirstEntryExperience } from "./components/FirstEntryExperience";
import {
  CONTACT,
  SITE_DESCRIPTION,
  SITE_IMAGE_ABSOLUTE,
  SITE_LANGUAGE,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
} from "./lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Krzywe Lake Houses | Domy nad jeziorem na Mazurach",
    template: "%s | Krzywe Lake Houses",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Krzywe Lake Houses",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "travel",
  classification: "Domy wakacyjne nad jeziorem na Mazurach",
  keywords: [
    "domy nad jeziorem Mazury",
    "domki na Mazurach",
    "domy na wynajem Mikołajki",
    "domy na wynajem Mrągowo",
    "Jezioro Krzywe",
    "noclegi nad jeziorem Mrągowo",
    "apartamenty Mikołajki",
    "dom nad samą wodą Mazury",
    "dom z jacuzzi Mazury",
  ],
  alternates: {
    canonical: "/",
    languages: { "pl-PL": "/" },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon", sizes: "48x48" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon-48.png", type: "image/png", sizes: "48x48" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Krzywe Lake Houses — zostań bliżej wody",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: SITE_IMAGE_ABSOLUTE,
        width: 1536,
        height: 1024,
        alt: "Krzywe Lake Houses — dwa domy nad Jeziorem Krzywe na Mazurach",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Krzywe Lake Houses — domy nad jeziorem na Mazurach",
    description: SITE_DESCRIPTION,
    images: [SITE_IMAGE_ABSOLUTE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "geo.region": "PL-28",
    "geo.placename": "Krzywe, powiat mrągowski",
    "geo.position": `${CONTACT.latitude};${CONTACT.longitude}`,
    ICBM: `${CONTACT.latitude}, ${CONTACT.longitude}`,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f3ed" },
    { media: "(prefers-color-scheme: dark)", color: "#1d3024" },
  ],
  colorScheme: "light",
};

const globalStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.png`,
        width: 512,
        height: 512,
      },
      image: SITE_IMAGE_ABSOLUTE,
      email: CONTACT.email,
      telephone: CONTACT.phoneInternational,
      sameAs: SOCIAL_LINKS,
    },
    {
      "@type": ["LodgingBusiness", "VacationRental"],
      "@id": `${SITE_URL}/#lodging`,
      name: SITE_NAME,
      url: SITE_URL,
      image: SITE_IMAGE_ABSOLUTE,
      description: SITE_DESCRIPTION,
      email: CONTACT.email,
      telephone: CONTACT.phoneInternational,
      address: {
        "@type": "PostalAddress",
        addressLocality: CONTACT.locality,
        addressRegion: CONTACT.region,
        addressCountry: CONTACT.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: CONTACT.latitude,
        longitude: CONTACT.longitude,
      },
      amenityFeature: [
        "Bezpośredni dostęp do jeziora",
        "Jacuzzi",
        "Miejsce na ognisko",
        "Wi-Fi",
        "Parking",
        "Pełna kuchnia",
      ].map((name) => ({
        "@type": "LocationFeatureSpecification",
        name,
        value: true,
      })),
      sameAs: SOCIAL_LINKS,
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: SITE_LANGUAGE,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalStructuredData) }}
        />
        <FirstEntryExperience />
        {children}
      </body>
    </html>
  );
}
