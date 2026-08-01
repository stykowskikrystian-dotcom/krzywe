import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "./components/SiteHeader";

export const metadata: Metadata = {
  title: "Strona nie została znaleziona",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main>
      <SiteHeader />
      <section className="legal-hero section-shell" aria-labelledby="not-found-title">
        <p className="eyebrow">Błąd 404</p>
        <h1 id="not-found-title">Ta ścieżka nie prowadzi nad Jezioro Krzywe.</h1>
        <p>
          Adres mógł się zmienić. Wróć na stronę główną albo przejdź do galerii domów Modern i Loft.
        </p>
        <div className="button-row">
          <Link className="button button--dark" href="/">Strona główna</Link>
          <Link className="button" href="/domy-i-galeria">Domy i galeria</Link>
        </div>
      </section>
    </main>
  );
}
