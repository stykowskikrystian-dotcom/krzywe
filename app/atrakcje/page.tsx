import type { Metadata } from "next";
import { SiteHeader } from "../components/SiteHeader";
import { ArrowDown, ArrowDownRight } from "../components/Icons";
import { attractions } from "./attractions";
import { AttractionsExplorer } from "./AttractionsExplorer";

export const metadata: Metadata = {
  title: "Atrakcje Mikołajki, Mrągowo, Ryn i Mazury — ponad 50 miejsc",
  description:
    "Ponad 50 atrakcji oraz 21 tras rowerowych w Mikołajkach, Mrągowie, Pieckach i okolicy. Interaktywna wyszukiwarka, ślady GPS i domy nad jeziorem na Mazurach.",
  keywords: [
    "atrakcje Mikołajki",
    "atrakcje Mrągowo",
    "atrakcje Ryn",
    "atrakcje Piecki",
    "atrakcje Kętrzyn",
    "atrakcje Mazury",
    "trasy rowerowe Mrągowo",
    "trasy rowerowe Mikołajki",
    "trasy rowerowe Piecki",
    "szlaki rowerowe Mazury",
    "Mazurska Pętla Rowerowa",
    "domy na wynajem Mrągowo",
    "domy na wynajem Mikołajki",
    "domy na wynajem Ryn",
    "domy na wynajem Mazury",
    "domy na wynajem nad samą wodą",
    "wakacyjne domy na wynajem",
    "domy nad jeziorem",
  ],
  alternates: {
    canonical: "/atrakcje",
  },
  openGraph: {
    title: "Ponad 50 atrakcji na Mazurach blisko Krzywe Lake Houses",
    description: "Mikołajki, Mrągowo, Piecki, Ryn i Kętrzyn — wybierz kierunek, pogodę i swój rytm dnia.",
    url: "/atrakcje",
    type: "website",
    locale: "pl_PL",
    images: [{ url: attractions[0].image, alt: "Promenada miejska w Mikołajkach" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atrakcje Mikołajki, Mrągowo, Ryn i Mazury",
    description: "Interaktywny przewodnik po ponad 50 miejscach z dojazdem i sprawdzonymi zdjęciami.",
    images: [attractions[0].image],
  },
};

export default function AttractionsPage() {
  const fallback = attractions[0];
  const krutyn = attractions.find((item) => item.id === 26) ?? fallback;
  const ryn = attractions.find((item) => item.id === 34) ?? fallback;
  const mikolajki = attractions.find((item) => item.id === 1) ?? fallback;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://krzywe-lake-houses.hybyszy.chatgpt.site/atrakcje#page",
        name: "Atrakcje Mikołajki, Mrągowo, Ryn, Piecki i Kętrzyn",
        description: metadata.description,
        isPartOf: {
          "@type": "WebSite",
          name: "Krzywe Lake Houses",
          url: "https://krzywe-lake-houses.hybyszy.chatgpt.site/",
        },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: attractions.length,
          itemListElement: attractions.map((attraction, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "TouristAttraction",
              name: attraction.name,
              description: attraction.description,
              image: attraction.image,
              url: attraction.website,
              address: {
                "@type": "PostalAddress",
                addressLocality: attraction.place,
                addressRegion: "warmińsko-mazurskie",
                addressCountry: "PL",
              },
            },
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Strona główna",
            item: "https://krzywe-lake-houses.hybyszy.chatgpt.site/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Atrakcje",
            item: "https://krzywe-lake-houses.hybyszy.chatgpt.site/atrakcje",
          },
        ],
      },
    ],
  };

  return (
    <main className="attractions-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="attractions-hero" aria-labelledby="attractions-title">
        <SiteHeader activePath="/atrakcje" />
        <div className="attractions-hero__grid">
          <div className="attractions-hero__copy">
            <p className="eyebrow">Przewodnik po okolicy</p>
            <h1 id="attractions-title">
              <span className="hero-title__primary">Blisko miejsc.</span>
              <em>Daleko od zgiełku.</em>
            </h1>
            <p className="attractions-hero__lead">
              Od porannego kajaka na Krutyni po wieczór w Mikołajkach.
              Wybraliśmy miejsca, do których naprawdę warto pojechać —
              dopasuj kierunek do pogody, czasu i własnego rytmu.
            </p>
            <div className="attractions-hero__actions">
              <a className="button button--primary" href="#wyszukiwarka">
                Znajdź atrakcję
                <ArrowDown />
              </a>
              <a className="button button--quiet" href="#gotowe-plany">
                Zobacz gotowe plany
                <ArrowDownRight />
              </a>
            </div>
            <div className="attractions-hero__stats property-facts" aria-label="Zakres przewodnika">
              <div><strong>{attractions.length}</strong><span>sprawdzonych miejsc</span></div>
              <div><strong>5</strong><span>kierunków Mazur</span></div>
              <div><strong>13–59</strong><span>minut samochodem</span></div>
            </div>
          </div>

          <div className="attractions-hero__gallery" aria-label="Atrakcje w okolicy Krzywe Lake Houses">
            <figure className="attractions-hero__photo attractions-hero__photo--main">
              <img src={krutyn.image} alt="Kajaki na rzece Krutyni" />
              <figcaption><span>Krutyń</span> Spływ w rytmie rzeki</figcaption>
            </figure>
            <figure className="attractions-hero__photo attractions-hero__photo--top">
              <img src={ryn.image} alt="Zamek w Rynie" />
              <figcaption><span>Ryn</span> Historia nad wodą</figcaption>
            </figure>
            <figure className="attractions-hero__photo attractions-hero__photo--bottom">
              <img src={mikolajki.image} alt="Promenada w Mikołajkach" />
              <figcaption><span>Mikołajki</span> Promenada miejska</figcaption>
            </figure>
            <div className="attractions-hero__badge">
              <span>Najbliżej</span>
              Piecki · 13 min
            </div>
          </div>
        </div>
        <a className="attractions-hero__scroll hero-scroll-cue" href="#kategorie">
          <span>Przewiń po inspiracje</span>
          <i aria-hidden="true"><ArrowDown /></i>
        </a>
      </section>

      <AttractionsExplorer attractions={attractions} />
    </main>
  );
}
