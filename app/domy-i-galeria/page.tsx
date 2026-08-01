import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowDownRight, ArrowUpRight, Waves } from "../components/Icons";
import { SiteHeader } from "../components/SiteHeader";
import { BOOKING_URL } from "../lib/booking";
import { HouseGallery } from "./HouseGallery";
import { HouseIcon } from "./HouseIcons";
import { galleryImages } from "./galleryData";

const MODERN_MASTER_IMAGE = "/modern-sypialnia-glowna.webp";

export const metadata: Metadata = {
  title: {
    absolute: "Domy nad jeziorem Mikołajki i Mrągowo | Krzywe Lake Houses",
  },
  description:
    "Dwa całoroczne domy na wynajem nad Jeziorem Krzywe, blisko Mikołajek i Mrągowa. Modern i Loft stoją 10 m od brzegu i mieszczą po 10 osób. Zobacz galerię.",
  keywords: [
    "domy na wynajem Mrągowo",
    "apartamenty Mikołajki",
    "domy nad jeziorem Mrągowo",
    "domy nad jeziorem Mikołajki",
    "domy nad jeziorem Ryn",
    "domki na Mazurach nad samą wodą",
    "dom na wynajem Ryn",
    "dom wakacyjny Piecki",
    "apartamenty Mrągowo",
    "nowoczesna stodoła Mazury",
    "noclegi nad Jeziorem Krzywe",
    "dom dla 10 osób Mazury",
  ],
  alternates: {
    canonical: "/domy-i-galeria",
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName: "Krzywe Lake Houses",
    title: "Domy na wynajem blisko Mikołajek i Mrągowa — Modern i Loft",
    description:
      "Dwa całoroczne domy 10 m od Jeziora Krzywe. Po 130 m², 4 sypialnie, 3 łazienki i panoramiczne przeszklenia na wodę.",
    url: "/domy-i-galeria",
    images: [
      {
        url: "/krzywe-hero.webp",
        width: 1600,
        height: 1067,
        alt: "Dwa domy Krzywe Lake Houses nad Jeziorem Krzywe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Domy nad jeziorem na Mazurach — Modern i Loft",
    description:
      "Dwa całoroczne domy 10 m od Jeziora Krzywe, blisko Mikołajek i Mrągowa.",
    images: ["/krzywe-hero.webp"],
  },
};

const details = [
  { icon: "area", value: "130 m²", label: "powierzchni każdego domu" },
  { icon: "guests", value: "do 10", label: "gości w każdym domu" },
  { icon: "bed", value: "4", label: "niezależne sypialnie" },
  { icon: "bath", value: "3", label: "komfortowe łazienki" },
] as const;

const amenities = [
  { icon: "kitchen", title: "Pełna kuchnia", text: "Płyta, piekarnik, lodówka, zmywarka, ekspres i komplet naczyń." },
  { icon: "linen", title: "Pościel i ręczniki", text: "Przygotowane dla wszystkich zgłoszonych gości." },
  { icon: "wifi", title: "Wi‑Fi i Smart TV", text: "Wygodna łączność oraz spokojny wieczór filmowy." },
  { icon: "lake", title: "10 m od jeziora", text: "Bezpośredni dostęp do wody i panoramiczny widok." },
  { icon: "fire", title: "Miejsce na ognisko", text: "Wspólna przestrzeń na długie mazurskie wieczory." },
  { icon: "hotTub", title: "Jacuzzi", text: "Odpoczynek po dniu nad wodą lub wycieczce po Mazurach." },
  { icon: "parking", title: "Parking przy domu", text: "Wygodne miejsca na samochody gości obu domów." },
  { icon: "year", title: "Całoroczne", text: "Ogrzewanie i wyposażenie przygotowane na każdą porę roku." },
] as const;

const faq = [
  {
    question: "Ile osób może nocować w jednym domu?",
    answer:
      "Każdy z domów — Modern i Loft — jest przygotowany dla maksymalnie 10 osób. W środku znajdują się cztery niezależne sypialnie, trzy łazienki oraz wspólna strefa dzienna.",
  },
  {
    question: "Jak blisko domów znajduje się Jezioro Krzywe?",
    answer:
      "Domy stoją około 10 metrów od linii brzegowej. Salon z aneksem kuchennym i główna sypialnia mają panoramiczne przeszklenia skierowane na jezioro.",
  },
  {
    question: "Czy domy są dostępne przez cały rok?",
    answer:
      "Tak. Modern i Loft są całoroczne, ogrzewane i w pełni wyposażone. Sprawdzają się zarówno latem, jak i podczas jesiennych, zimowych oraz wiosennych pobytów na Mazurach.",
  },
  {
    question: "Czy można przyjechać ze zwierzęciem?",
    answer:
      "Nie przyjmujemy zwierząt. Dzięki temu możemy zachować jednolity standard przygotowania domów dla kolejnych gości.",
  },
];

export default function HousesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LodgingBusiness",
        "@id": "https://www.krzywelakehouses.pl/#lodging",
        name: "Krzywe Lake Houses",
        url: "https://www.krzywelakehouses.pl/domy-i-galeria",
        telephone: "+48505586950",
        image: "https://www.krzywelakehouses.pl/krzywe-hero.webp",
        checkinTime: "16:00",
        checkoutTime: "11:00",
        petsAllowed: false,
        description:
          "Dwa całoroczne domy wakacyjne nad Jeziorem Krzywe, blisko Mrągowa, Mikołajek, Piecek i Rynu.",
        amenityFeature: [
          { "@type": "LocationFeatureSpecification", name: "Bezpośredni dostęp do jeziora", value: true },
          { "@type": "LocationFeatureSpecification", name: "Jacuzzi", value: true },
          { "@type": "LocationFeatureSpecification", name: "Miejsce na ognisko", value: true },
          { "@type": "LocationFeatureSpecification", name: "Ręczniki", value: true },
          { "@type": "LocationFeatureSpecification", name: "Zwierzęta", value: false },
        ],
        containsPlace: [
          {
            "@type": "Accommodation",
            name: "Dom Modern",
            floorSize: { "@type": "QuantitativeValue", value: 130, unitCode: "MTK" },
            numberOfBedrooms: 4,
            numberOfBathroomsTotal: 3,
            occupancy: { "@type": "QuantitativeValue", maxValue: 10 },
          },
          {
            "@type": "Accommodation",
            name: "Dom Loft",
            floorSize: { "@type": "QuantitativeValue", value: 130, unitCode: "MTK" },
            numberOfBedrooms: 4,
            numberOfBathroomsTotal: 3,
            occupancy: { "@type": "QuantitativeValue", maxValue: 10 },
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <main className="houses-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="houses-hero">
        <SiteHeader activePath="/domy-i-galeria" />
        <div className="houses-hero__grid">
          <div className="houses-hero__copy">
            <p className="eyebrow">Modern · Loft · Mazury</p>
            <h1>
              <span className="hero-title__primary">Dwa domy.</span>
              <em>Jedno jezioro.</em>
            </h1>
            <p className="houses-hero__lead">
              Nowoczesne stodoły stojące 10 metrów od brzegu. Każda mieści do
              10 osób. W obu domach panoramiczne przeszklenia znajdują się
              w sypialni głównej oraz salonie z aneksem kuchennym.
            </p>
            <div className="houses-hero__actions">
              <a className="button button--primary" href="#galeria">
                Otwórz galerię <ArrowDownRight />
              </a>
              <a className="button button--quiet" href={BOOKING_URL}>
                Zaplanuj pobyt <ArrowUpRight />
              </a>
            </div>
            <div className="houses-hero__stats property-facts" aria-label="Najważniejsze informacje o domach">
              <div><strong>130 m²</strong><span>powierzchni każdego domu</span></div>
              <div><strong>4</strong><span>niezależne sypialnie</span></div>
              <div><strong>3</strong><span>komfortowe łazienki</span></div>
            </div>
          </div>

          <div className="houses-hero__gallery" aria-label="Domy Modern i Loft nad Jeziorem Krzywe">
            <figure className="houses-hero__photo houses-hero__photo--main">
              <img src="/krzywe-hero.webp" alt="Dwa nowoczesne domy Krzywe Lake Houses nad Jeziorem Krzywe" />
              <figcaption><span>Krzywe · Mazury</span> Dwa domy, 10 m od jeziora</figcaption>
            </figure>
            <figure className="houses-hero__photo houses-hero__photo--top">
              <img src={MODERN_MASTER_IMAGE} alt="Panoramiczna sypialnia główna domu Modern z widokiem na jezioro" />
              <figcaption><span>Modern</span> Sypialnia z widokiem</figcaption>
            </figure>
            <figure className="houses-hero__photo houses-hero__photo--bottom">
              <img src="/krzywe-hero.webp" alt="Dom Loft stojący nad Jeziorem Krzywe" />
              <figcaption><span>Loft</span> Tuż nad wodą</figcaption>
            </figure>
            <div className="houses-hero__badge">
              <span>W pierwszej linii</span>
              Jezioro Krzywe · 10 m
            </div>
          </div>
        </div>
        <a className="houses-hero__scroll hero-scroll-cue" href="#poznaj-domy" aria-label="Przewiń do prezentacji domów">
          <span>Poznaj domy</span>
          <i><ArrowDown /></i>
        </a>
      </section>

      <section className="houses-facts" aria-label="Najważniejsze parametry domów">
        <div className="section-shell houses-facts__grid">
          {details.map((item) => (
            <article key={item.label}>
              <HouseIcon type={item.icon} />
              <div><strong>{item.value}</strong><p>{item.label}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="houses-intro" id="poznaj-domy">
        <div className="section-shell houses-intro__heading">
          <div>
            <p className="eyebrow">Ten sam komfort · inny nastrój</p>
            <h2>Wybierz wnętrze, w którym chcecie obudzić się nad wodą.</h2>
          </div>
          <p>
            Układ i standard obu domów są równie wygodne. Różni je charakter:
            Modern jest jasny, naturalny i lekki. Loft wykorzystuje głębsze
            kolory, wyraziste materiały i bardziej wieczorowy klimat.
          </p>
        </div>

        <div className="section-shell house-duo">
          <article className="house-profile house-profile--modern">
            <figure>
              <img src={MODERN_MASTER_IMAGE} alt="Panoramiczna sypialnia główna domu Modern" loading="lazy" />
              <figcaption><span>01</span> Jasny i naturalny</figcaption>
            </figure>
            <div className="house-profile__content">
              <p className="eyebrow">Dom Modern</p>
              <h3>Światło, drewno i spokojne poranki.</h3>
              <p>
                Jasna paleta, miękkie tkaniny i otwarta strefa dzienna tworzą
                wnętrze, które naturalnie prowadzi wzrok w stronę jeziora.
              </p>
              <ul>
                <li>130 m² · maksymalnie 10 osób</li>
                <li>4 sypialnie · 3 łazienki</li>
                <li>Panoramiczna sypialnia i salon z aneksem</li>
              </ul>
              <a href="#galeria">Zobacz zdjęcia Modern <ArrowDownRight /></a>
            </div>
          </article>

          <article className="house-profile house-profile--loft">
            <figure>
              <img src="/krzywe-hero.webp" alt="Dom Loft nad Jeziorem Krzywe" loading="lazy" />
              <figcaption><span>02</span> Głębszy i nastrojowy</figcaption>
            </figure>
            <div className="house-profile__content">
              <p className="eyebrow">Dom Loft</p>
              <h3>Kontrast, faktura i długie wieczory.</h3>
              <p>
                Ciemniejsze akcenty, ciepłe drewno i bardziej zdecydowana forma
                nadają temu domowi wyrazisty, kameralny charakter.
              </p>
              <ul>
                <li>130 m² · maksymalnie 10 osób</li>
                <li>4 sypialnie · 3 łazienki</li>
                <li>Panoramiczna sypialnia i salon z aneksem</li>
              </ul>
              <a href="#galeria">Zobacz zdjęcia Loft <ArrowDownRight /></a>
            </div>
          </article>
        </div>
      </section>

      <section className="houses-waterline">
        <div className="section-shell houses-waterline__grid">
          <div className="houses-waterline__copy">
            <p className="eyebrow">Pierwsza linia brzegowa</p>
            <h2>Jezioro jest częścią każdego wnętrza.</h2>
            <p>
              Przeszklenia w salonie i głównej sypialni kadrują wodę od rana do
              wieczora. Taras, ogród i brzeg tworzą jedną, naturalną przestrzeń
              wypoczynku.
            </p>
            <div className="houses-waterline__metrics">
              <div className="houses-waterline__metric">
                <Waves />
                <div><strong>10 m</strong><span>do jeziora</span></div>
              </div>
              <div className="houses-waterline__metric">
                <HouseIcon type="window" />
                <div><strong>2</strong><span>panoramiczne strefy</span></div>
              </div>
            </div>
          </div>
          <figure>
            <img src={MODERN_MASTER_IMAGE} alt="Panoramiczne przeszklenie domu Modern otwarte na jezioro" loading="lazy" />
            <figcaption>Widok z domu prowadzi prosto nad wodę</figcaption>
          </figure>
        </div>
      </section>

      <HouseGallery images={galleryImages} />

      <section className="houses-amenities">
        <div className="section-shell">
          <div className="houses-section-heading">
            <div>
              <p className="eyebrow">Wszystko na miejscu</p>
              <h2>Przyjeżdżacie odpocząć. Reszta już czeka.</h2>
            </div>
            <p>
              Oba domy są przygotowane do samodzielnego, wygodnego pobytu przez
              cały rok — od pierwszego śniadania po wieczór przy ognisku.
            </p>
          </div>
          <div className="houses-amenities__grid">
            {amenities.map((item) => (
              <article key={item.title}>
                <HouseIcon type={item.icon} />
                <div><h3>{item.title}</h3><p>{item.text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="houses-stay">
        <div className="section-shell houses-stay__card">
          <div className="houses-stay__intro">
            <p className="eyebrow">Warto wiedzieć przed przyjazdem</p>
            <h2>Proste zasady. Spokojny pobyt.</h2>
            <p>
              Informacje organizacyjne podajemy jasno, aby po przyjeździe można
              było od razu zwolnić tempo.
            </p>
          </div>
          <div className="houses-stay__rules">
            <article><span>16:00</span><div><strong>Zameldowanie</strong><p>Dom czeka na Was od godziny 16:00.</p></div></article>
            <article><span>11:00</span><div><strong>Wymeldowanie</strong><p>Prosimy o opuszczenie domu do 11:00.</p></div></article>
            <article><HouseIcon type="pet" /><div><strong>Bez zwierząt</strong><p>Obiekt nie przyjmuje zwierząt.</p></div></article>
            <article><HouseIcon type="smoke" /><div><strong>Zakaz palenia</strong><p>Wnętrza obu domów są wolne od dymu.</p></div></article>
          </div>
        </div>
      </section>

      <section className="houses-seo">
        <div className="section-shell">
          <div className="houses-seo__grid">
            <div>
              <p className="eyebrow">Domy na wynajem na Mazurach</p>
              <h2>Blisko Mrągowa i Mikołajek. Bezpośrednio nad Jeziorem Krzywe.</h2>
            </div>
            <div className="houses-seo__copy">
              <p>
                Krzywe Lake Houses to alternatywa dla apartamentów w Mikołajkach
                i miejskich noclegów w Mrągowie. Zamiast dzielić wspólne części
                budynku, otrzymujecie cały, 130‑metrowy dom nad jeziorem,
                cztery sypialnie i własny rytm dnia.
              </p>
              <p>
                Położenie pomiędzy Pieckami, Mrągowem, Mikołajkami i Rynem
                pozwala łatwo zwiedzać Mazury, a wieczorem wracać do ciszy,
                ogrodu i bezpośredniego dostępu do wody.
              </p>
              <Link href="/atrakcje">Zobacz atrakcje w okolicy <ArrowUpRight /></Link>
            </div>
          </div>
          <div className="houses-faq">
            {faq.map((item) => (
              <details key={item.question}>
                <summary>{item.question}<span>+</span></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="houses-booking" id="rezerwacja">
        <div className="section-shell houses-booking__card">
          <div className="houses-booking__copy">
            <p className="eyebrow">Rezerwacja bezpośrednia</p>
            <h2>Zarezerwuj ciszę nad samym jeziorem.</h2>
            <p className="houses-booking__lead">
              Sprawdź wolne terminy dla domu Modern lub Loft i zarezerwuj pobyt
              bezpośrednio. Jeśli potrzebujesz pomocy w wyborze domu, zadzwoń —
              chętnie podpowiemy.
            </p>

            <div className="houses-booking__benefits" aria-label="Najważniejsze informacje o pobycie">
              <span><HouseIcon type="lake" /><strong>10 m od jeziora</strong></span>
              <span><HouseIcon type="guests" /><strong>do 10 osób w domu</strong></span>
              <span><HouseIcon type="year" /><strong>otwarte przez cały rok</strong></span>
            </div>

            <div className="houses-booking__actions">
              <a className="button houses-booking__primary" href={BOOKING_URL}>
                Sprawdź wolne terminy <ArrowUpRight />
              </a>
              <a className="button houses-booking__secondary" href="tel:+48505586950">
                Zadzwoń 505 586 950
              </a>
            </div>
            <small className="houses-booking__note">
              Bezpieczna rezerwacja online obsługiwana przez BedBooking.
            </small>
          </div>

          <figure className="houses-booking__visual">
            <img
              src="/krzywe-hero.webp"
              alt="Dwa nowoczesne domy Krzywe Lake Houses nad Jeziorem Krzywe"
              loading="lazy"
            />
            <div className="houses-booking__distance">
              <strong>10 m</strong>
              <span>do brzegu</span>
            </div>
            <figcaption>
              <span>Krzywe · Mazury</span>
              <strong>Dwa domy. Jedno jezioro.</strong>
              <small>Modern &amp; Loft · do 20 gości</small>
            </figcaption>
          </figure>
        </div>
      </section>
    </main>
  );
}
