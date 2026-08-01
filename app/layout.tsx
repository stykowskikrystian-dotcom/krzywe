import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.krzywelakehouses.pl"),
  title: {
    default: "Krzywe Lake Houses | Domy nad jeziorem na Mazurach",
    template: "%s | Krzywe Lake Houses",
  },
  description:
    "Dwa całoroczne domy nad Jeziorem Krzywe, blisko Mikołajek, Mrągowa i Piecek. Do 10 gości w każdym domu, jacuzzi, miejsce na ognisko i bezpośredni dostęp do jeziora.",
  applicationName: "Krzywe Lake Houses",
  keywords: [
    "domy nad jeziorem Mazury",
    "domki na Mazurach",
    "domy na wynajem Mikołajki",
    "domy na wynajem Mrągowo",
    "Jezioro Krzywe",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon", sizes: "48x48" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon-48.png", type: "image/png", sizes: "48x48" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName: "Krzywe Lake Houses",
    title: "Krzywe Lake Houses — zostań bliżej wody",
    description:
      "Dwa całoroczne domy nad samym Jeziorem Krzywe. Blisko Mikołajek, Mrągowa i Piecek.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <FirstEntryExperience />
        {children}
      </body>
    </html>
  );
}
