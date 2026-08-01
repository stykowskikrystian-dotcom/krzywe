import type { Metadata } from "next";
import Link from "next/link";
import { attractions } from "./atrakcje/attractions";
import { ArrowDown, ArrowDownRight, ArrowUpRight, Facebook, Instagram, Mail, MapPin, Phone, Waves } from "./components/Icons";
import { HomeIcon, type HomeIconName } from "./components/HomeIcon";
import { DirectBookingPanel } from "./components/DirectBookingPanel";
import { SiteHeader } from "./components/SiteHeader";
import { BOOKING_URL } from "./lib/booking";

const image = (id: string, width = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=84`;

const lakeImages = {
  strait: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Krzywe_przesmyk.JPG",
  bay: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Krzywe_zatoka.JPG",
  pier: "https://upload.wikimedia.org/wikipedia/commons/b/be/Krzywe_pomost.JPG",
  summer: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Krzywe_widok_latem.JPG",
} as const;

const houses = [
  {
    name: "Modern",
    eyebrow: "Jasny i naturalny",
    copy: "Światło, spokojne materiały i panoramiczne przeszklenie, które prowadzi wzrok prosto na jezioro. Dom dla tych, którzy najlepiej odpoczywają w lekkiej, uporządkowanej przestrzeni.",
    exterior: image("photo-1600585154340-be6161a56a0c"),
    interior: image("photo-1600607687920-4e2a09cf159d", 1000),
    className: "home-house--modern",
  },
  {
    name: "Loft",
    eyebrow: "Głębszy i nastrojowy",
    copy: "Ciemniejsze akcenty, drewno i przytulne światło budują bardziej wyrazisty charakter. Nadal blisko natury, tylko z wieczornym, loftowym rytmem.",
    exterior: image("photo-1600047508788-786f3865b4b9"),
    interior: image("photo-1617806118233-18e1de247200", 1000),
    className: "home-house--loft",
  },
] as const;

const amenities: { icon: HomeIconName; title: string; text: string }[] = [
  { icon: "kitchen", title: "Pełna kuchnia", text: "Płyta, piekarnik, lodówka, zmywarka, ekspres i komplet naczyń." },
  { icon: "towels", title: "Pościel i ręczniki", text: "Przygotowane dla wszystkich zgłoszonych gości." },
  { icon: "wifi", title: "Wi‑Fi i Smart TV", text: "Wygodna łączność oraz spokojny wieczór filmowy." },
  { icon: "lake", title: "10 m od jeziora", text: "Bezpośredni dostęp do wody i panoramiczny widok." },
  { icon: "fire", title: "Miejsce na ognisko", text: "Wspólna przestrzeń na długie mazurskie wieczory." },
  { icon: "jacuzzi", title: "Jacuzzi", text: "Odpoczynek po dniu nad wodą lub wycieczce po Mazurach." },
  { icon: "parking", title: "Parking przy domu", text: "Wygodne miejsca na samochody gości obu domów." },
  { icon: "year", title: "Całoroczne", text: "Ogrzewanie i wyposażenie przygotowane na każdą porę roku." },
];

const nearby = [1, 12, 26, 34].map((id) => attractions.find((item) => item.id === id)!);

const faqs = [
  {
    question: "Gdzie znajdują się Krzywe Lake Houses?",
    answer:
      "Domy znajdują się w miejscowości Krzywe w powiecie mrągowskim, bezpośrednio nad Jeziorem Krzywe. To spokojna baza pomiędzy Pieckami, Mrągowem, Mikołajkami i Rynem.",
  },
  {
    question: "Ile osób mieści każdy dom?",
    answer:
      "Każdy dom ma 130 m², cztery niezależne sypialnie, trzy łazienki i mieści do 10 osób. Łącznie oba domy mogą przyjąć do 20 gości.",
  },
  {
    question: "Jak daleko jest od domów do jeziora?",
    answer:
      "Domy stoją około 10 metrów od linii brzegowej. Goście mają bezpośredni dostęp do Jeziora Krzywe i widok na wodę z salonu oraz głównej sypialni.",
  },
  {
    question: "Czy domy są dostępne przez cały rok?",
    answer:
      "Tak. Modern i Loft to domy całoroczne, przygotowane zarówno na letni wypoczynek nad wodą, jak i jesienny, zimowy lub wiosenny pobyt na Mazurach.",
  },
  {
    question: "Czy na miejscu jest jacuzzi i miejsce na ognisko?",
    answer:
      "Tak. Do dyspozycji gości są jacuzzi oraz miejsce na ognisko. Każdy dom ma również taras, pełną kuchnię, Wi‑Fi, Smart TV, pościel i ręczniki.",
  },
  {
    question: "Jak wygląda zameldowanie i pobyt ze zwierzęciem?",
    answer:
      "Doba rozpoczyna się o 16:00, a wymeldowanie odbywa się do 11:00. Obiekt jest bez zwierząt i obowiązuje w nim zakaz palenia.",
  },
];

export const metadata: Metadata = {
  title: {
    absolute: "Domy na wynajem nad jeziorem Mazury | Mrągowo i Mikołajki",
  },
  description:
    "Dwa całoroczne domy na wynajem nad Jeziorem Krzywe koło Mrągowa i Mikołajek. 130 m², 4 sypialnie, 3 łazienki, do 10 osób, jacuzzi i brzeg 10 m od domu.",
  keywords: [
    "domy na wynajem Mrągowo",
    "apartamenty Mrągowo",
    "noclegi Mrągowo",
    "domy na wynajem Mikołajki",
    "apartamenty Mikołajki",
    "noclegi Mikołajki",
    "domy nad jeziorem Mazury",
    "domy nad samą wodą Mazury",
    "dom wakacyjny Mazury",
    "wakacyjne domy na wynajem",
    "domy na wynajem Ryn",
    "domy na wynajem Piecki",
    "noclegi Krzywe",
    "Jezioro Krzywe noclegi",
    "dom dla 10 osób Mazury",
    "nowoczesna stodoła Mazury",
    "dom z jacuzzi Mazury",
    "Krzywe Lake Houses",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Krzywe Lake Houses — domy nad samym jeziorem na Mazurach",
    description:
      "Modern i Loft: dwa całoroczne domy dla maksymalnie 10 osób każdy, około 10 metrów od Jeziora Krzywe.",
    url: "/",
    type: "website",
    locale: "pl_PL",
    images: [
      {
        url: "/krzywe-hero.png",
        width: 1536,
        height: 1024,
        alt: "Krzywe Lake Houses — dwa nowoczesne domy nad Jeziorem Krzywe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Domy nad Jeziorem Krzywe | Krzywe Lake Houses",
    description:
      "Dwa całoroczne domy na Mazurach, do 10 gości w każdym, z jacuzzi i bezpośrednim dostępem do jeziora.",
    images: ["/krzywe-hero.png"],
  },
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LodgingBusiness",
        "@id": "https://www.krzywelakehouses.pl/#lodging",
        name: "Krzywe Lake Houses",
        url: "https://www.krzywelakehouses.pl/",
        logo: "https://www.krzywelakehouses.pl/favicon.png",
        image: [
          "https://www.krzywelakehouses.pl/krzywe-hero.png",
          lakeImages.strait,
          lakeImages.summer,
        ],
        description: metadata.description,
        telephone: "+48 505 586 950",
        email: "krzywelakehouses@gmail.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Krzywe",
          addressRegion: "warmińsko-mazurskie",
          addressCountry: "PL",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 53.8024,
          longitude: 21.2638,
        },
        amenityFeature: amenities.map((item) => ({
          "@type": "LocationFeatureSpecification",
          name: item.title,
          value: true,
        })),
        sameAs: [
          "https://www.facebook.com/krzywelakehousesmazury",
          "https://www.instagram.com/krzywelakehousesmazury/",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://www.krzywelakehouses.pl/#website",
        url: "https://www.krzywelakehouses.pl/",
        name: "Krzywe Lake Houses",
        inLanguage: "pl-PL",
        publisher: {
          "@id": "https://www.krzywelakehouses.pl/#lodging",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Krzywe Lake Houses",
            item: "https://www.krzywelakehouses.pl/",
          },
        ],
      },
    ],
  };

  return (
    <main className="home-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="home-hero" aria-labelledby="home-hero-title">
        <SiteHeader activePath="/" />

        <div className="home-hero__grid">
          <div className="home-hero__copy">
            <p className="eyebrow">Dwa domy · Jezioro Krzywe · Mazury</p>
            <h1 id="home-hero-title">
              <span className="hero-title__primary">Mazury zaczynają się</span>
              <em>przy wodzie.</em>
            </h1>
            <p className="home-hero__lead">
              Dwa całoroczne domy nad samym Jeziorem Krzywe. Po 130 m²,
              cztery sypialnie i przestrzeń dla maksymalnie 10 osób w każdym.
              Tu widok z okna nie zapowiada dnia — on go układa.
            </p>
            <div className="home-hero__actions">
              <Link className="button button--primary" href="/domy-i-galeria">
                Poznaj domy <ArrowUpRight />
              </Link>
              <a className="button button--quiet" href={BOOKING_URL}>
                Sprawdź termin <ArrowDownRight />
              </a>
            </div>
            <div className="home-hero__facts property-facts" aria-label="Najważniejsze informacje">
              <div><strong>2</strong><span>niezależne domy</span></div>
              <div><strong>do 20</strong><span>gości łącznie</span></div>
              <div><strong>10 m</strong><span>od brzegu jeziora</span></div>
            </div>
          </div>

          <div className="home-hero__visual">
            <figure className="home-hero__main">
              <img
                src="/home-hero-main.webp"
                alt="Dwa nowoczesne domy Krzywe Lake Houses pośród ogrodu nad Jeziorem Krzywe"
                fetchPriority="high"
              />
              <span className="home-hero__main-shade" />
              <figcaption>
                <span>Krzywe, Mazury</span>
                Domy stoją około 10 metrów od brzegu
              </figcaption>
            </figure>

            <figure className="home-hero__lake">
              <img
                src="/modern-sypialnia-glowna.webp"
                alt="Panoramiczna sypialnia domu Modern z widokiem na Jezioro Krzywe"
                fetchPriority="high"
              />
            </figure>

            <figure className="home-hero__detail">
              <img
                src={image("photo-1505691938895-1758d7feb511", 800)}
                alt="Jasna sypialnia z dużym przeszkleniem"
              />
            </figure>

            <div className="home-hero__water-note">
              <span><Waves /></span>
              <p><small>Pierwsza linia brzegowa</small>Jezioro zostaje za oknem</p>
            </div>
            <div className="home-hero__open">Całoroczne</div>
          </div>
        </div>

        <div className="home-booking-panel">
          <DirectBookingPanel
            targetId="widgetHolder_home_page"
            variant="home"
          />
        </div>

        <a className="home-hero__scroll hero-scroll-cue" href="#domy">
          <span>Zobacz więcej</span><i aria-hidden="true"><ArrowDown /></i>
        </a>
      </section>

      <section className="home-signature" id="domy">
        <div className="home-shell">
          <div className="home-heading home-heading--intro">
            <div>
              <p className="eyebrow">Krzywe Lake Houses</p>
              <h2>Dom nie stoi obok Mazur. <em>Jest ich częścią.</em></h2>
            </div>
            <div className="home-heading__aside">
              <p>
                Poranna kawa przy wodzie, śniadanie przy panoramicznym oknie,
                popołudnie w ogrodzie i jacuzzi po zachodzie słońca. Bez
                codziennego pakowania auta i szukania miejsca nad jeziorem.
              </p>
              <Link className="home-text-link" href="/domy-i-galeria">
                Zobacz domy i galerię <ArrowUpRight />
              </Link>
            </div>
          </div>

          <div className="home-signature__gallery">
            <figure className="home-signature__image home-signature__image--tall">
              <img
                src="/home-signature-rhythm.webp"
                alt="Spokojny odpoczynek na pomoście nad mazurskim jeziorem"
                loading="lazy"
              />
              <figcaption><span>01</span>Własny rytm nad wodą</figcaption>
            </figure>
            <figure className="home-signature__image">
              <img
                src={image("photo-1600210492486-724fe5c67fb0")}
                alt="Jasny salon z aneksem kuchennym"
                loading="lazy"
              />
              <figcaption><span>02</span>Wspólna przestrzeń</figcaption>
            </figure>
            <figure className="home-signature__image">
              <img
                src={image("photo-1505693416388-ac5ce068fe85")}
                alt="Naturalna sypialnia w spokojnej palecie"
                loading="lazy"
              />
              <figcaption><span>03</span>Cisza po całym dniu</figcaption>
            </figure>
          </div>

          <div className="home-numbers" aria-label="Parametry każdego domu">
            <article><HomeIcon name="area" /><strong>130 m²</strong><span>powierzchni każdego domu</span></article>
            <article><HomeIcon name="guests" /><strong>do 10</strong><span>gości w każdym domu</span></article>
            <article><HomeIcon name="bed" /><strong>4</strong><span>niezależne sypialnie</span></article>
            <article><HomeIcon name="bath" /><strong>3</strong><span>komfortowe łazienki</span></article>
          </div>
        </div>
      </section>

      <section className="home-houses" aria-labelledby="houses-title">
        <div className="home-shell">
          <div className="home-heading">
            <div>
              <p className="eyebrow">Dwa domy, dwa charaktery</p>
              <h2 id="houses-title">Wybierz wnętrze. <em>Widok jest ten sam.</em></h2>
            </div>
            <p className="home-heading__aside">
              Modern i Loft mają taki sam wygodny układ, panoramiczną sypialnię
              główną oraz salon z aneksem otwarty na jezioro. Różni je nastrój,
              nie standard wypoczynku.
            </p>
          </div>

          <div className="home-houses__grid">
            {houses.map((house) => (
              <article className={`home-house ${house.className}`} key={house.name}>
                <div className="home-house__media">
                  <img src={house.exterior} alt={`Dom ${house.name} z tarasem`} loading="lazy" />
                  <img src={house.interior} alt={`Wnętrze domu ${house.name}`} loading="lazy" />
                </div>
                <div className="home-house__copy">
                  <p className="eyebrow">{house.eyebrow}</p>
                  <h3>{house.name}</h3>
                  <p>{house.copy}</p>
                  <ul aria-label={`Parametry domu ${house.name}`}>
                    <li>130 m²</li>
                    <li>4 sypialnie</li>
                    <li>3 łazienki</li>
                    <li>do 10 osób</li>
                  </ul>
                  <Link href="/domy-i-galeria">
                    Poznaj dom {house.name} <ArrowUpRight />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-audiences" aria-labelledby="audiences-title">
        <div className="home-shell">
          <div className="home-heading">
            <div>
              <p className="eyebrow">Miejsce dla Was</p>
              <h2 id="audiences-title">Przyjedźcie razem. <em>Miejsca wystarczy.</em></h2>
            </div>
            <p className="home-heading__aside">
              Każdy dom mieści do 10 osób, a oba razem tworzą wygodną bazę dla
              maksymalnie 20 gości. Duża wspólna przestrzeń nie odbiera nikomu
              prywatności czterech niezależnych sypialni.
            </p>
          </div>

          <div className="home-audiences__grid">
            <article>
              <figure>
                <img
                  src={image("photo-1600566753190-17f0baa2a6c3")}
                  alt="Przestronne wnętrze domu wakacyjnego dla rodziny"
                  loading="lazy"
                />
              </figure>
              <div className="home-audiences__copy">
                <span className="home-audiences__icon"><HomeIcon name="house" /></span>
                <p className="eyebrow">Rodzinny pobyt</p>
                <h3>Wspólny salon. Osobne sypialnie.</h3>
                <p>
                  Dzieci mają ogród i jezioro blisko domu, a dorośli wygodną
                  kuchnię, trzy łazienki i miejsce na spokojny wieczór.
                </p>
              </div>
            </article>

            <article>
              <figure>
                <img
                  src={image("photo-1600607687939-ce8a6c25118c")}
                  alt="Nastrojowe wnętrze większego domu nad jeziorem"
                  loading="lazy"
                />
              </figure>
              <div className="home-audiences__copy">
                <span className="home-audiences__icon"><HomeIcon name="guests" /></span>
                <p className="eyebrow">Wyjazd z przyjaciółmi</p>
                <h3>Do 10 osób pod jednym dachem.</h3>
                <p>
                  Wspólne śniadanie, dzień na wodzie, ognisko i jacuzzi bez
                  dzielenia grupy między pokoje w różnych częściach obiektu.
                </p>
              </div>
            </article>

            <article>
              <figure>
                <img
                  src={image("photo-1494526585095-c41746248156")}
                  alt="Dwa nowoczesne domy w otoczeniu zieleni"
                  loading="lazy"
                />
              </figure>
              <div className="home-audiences__copy">
                <span className="home-audiences__icon"><HomeIcon name="area" /></span>
                <p className="eyebrow">Dwie ekipy</p>
                <h3>Blisko siebie. Nadal niezależnie.</h3>
                <p>
                  Modern i Loft pozwalają być razem nawet dwudziestu osobom,
                  zachowując dwie kuchnie, dwa salony i prywatny rytm każdego domu.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="home-amenities" aria-labelledby="amenities-title">
        <div className="home-shell">
          <div className="home-amenities__heading">
            <div>
              <p className="eyebrow">Wszystko na miejscu</p>
              <h2 id="amenities-title">Mniej planowania. <em>Więcej bycia razem.</em></h2>
            </div>
            <p>
              Przyjedźcie z planem albo bez niego. Domy są wyposażone tak, aby
              wygodnie zacząć dzień, wrócić po wycieczce i zostać na miejscu,
              kiedy najlepszy widok jest właśnie tutaj.
            </p>
          </div>
          <div className="home-amenities__grid">
            {amenities.map((item) => (
              <article key={item.title}>
                <span><HomeIcon name={item.icon} /></span>
                <div><h3>{item.title}</h3><p>{item.text}</p></div>
              </article>
            ))}
          </div>
          <div className="home-amenities__note">
            <span>Praktycznie</span>
            <p>Zameldowanie od 16:00 · wymeldowanie do 11:00 · bez zwierząt · zakaz palenia</p>
          </div>
        </div>
      </section>

      <section className="home-private" aria-labelledby="private-title">
        <div className="home-shell">
          <div className="home-private__card">
            <figure>
              <img
                src="/krzywe-hero.webp"
                alt="Krzywe Lake Houses w pierwszej linii brzegowej Jeziora Krzywe"
                loading="lazy"
              />
              <span className="home-private__shade" />
              <figcaption>
                <small>Pierwsza linia brzegowa</small>
                Dom, ogród i jezioro tworzą jeden plan pobytu
              </figcaption>
            </figure>
            <div className="home-private__copy">
              <p className="eyebrow">Więcej niż nocleg</p>
              <h2 id="private-title">Własny dom. <em>Własny rytm.</em></h2>
              <p>
                Zamiast kilku hotelowych pokoi dostajecie pełny dom nad jeziorem:
                miejsce do gotowania, odpoczynku, rozmów i poranków bez ustalonej
                godziny śniadania.
              </p>
              <div className="home-private__benefits">
                <article><HomeIcon name="kitchen" /><span><strong>Pełna kuchnia</strong>Śniadanie i kolacja wtedy, kiedy chcecie.</span></article>
                <article><HomeIcon name="bed" /><span><strong>4 sypialnie</strong>Prywatność także podczas grupowego pobytu.</span></article>
                <article><HomeIcon name="lake" /><span><strong>Brzeg około 10 m</strong>Bez dojazdów i pakowania rzeczy na plażę.</span></article>
                <article><HomeIcon name="fire" /><span><strong>Wieczór na miejscu</strong>Jacuzzi, taras i przestrzeń na ognisko.</span></article>
              </div>
              <div className="home-private__actions">
                <Link className="button button--primary" href="/domy-i-galeria">
                  Zobacz układ domów <ArrowUpRight />
                </Link>
                <a className="home-text-link" href={BOOKING_URL}>
                  Sprawdź termin <ArrowUpRight />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-lake" aria-labelledby="lake-home-title">
        <div className="home-shell home-lake__grid">
          <div className="home-lake__visual">
            <figure className="home-lake__main">
              <img
                src="/modern-sypialnia-glowna.webp"
                alt="Widok z panoramicznej sypialni domu Modern na Jezioro Krzywe"
                loading="lazy"
              />
              <figcaption>Jezioro Krzywe · Pojezierze Mrągowskie</figcaption>
            </figure>
            <figure className="home-lake__side">
              <img src={lakeImages.summer} alt="Letni widok na Jezioro Krzywe" loading="lazy" />
              <figcaption>Prawdziwy kadr znad jeziora</figcaption>
            </figure>
            <div className="home-lake__badge">
              <HomeIcon name="lake" />
              <span><strong>10 m</strong>od tarasu do wody</span>
            </div>
          </div>
          <div className="home-lake__copy">
            <p className="eyebrow">Jezioro Krzywe</p>
            <h2>Woda nie jest wycieczką. <em>Jest codziennością.</em></h2>
            <p>
              Jezioro Krzywe leży w powiecie mrągowskim, przy spokojnej
              miejscowości Krzywe. Zalesione brzegi, zatoki i strefa ciszy
              tworzą warunki do kajaka, wędkowania i zwykłego nicnierobienia
              blisko wody.
            </p>
            <div className="home-lake__facts">
              <div><strong>155,5 ha</strong><span>powierzchni jeziora</span></div>
              <div><strong>22,5 m</strong><span>głębokości maksymalnej</span></div>
              <div><strong>cisza</strong><span>bez pośpiechu wielkich portów</span></div>
            </div>
            <Link className="button button--primary" href="/jezioro-krzywe">
              Poznaj Jezioro Krzywe <ArrowUpRight />
            </Link>
          </div>
        </div>
      </section>

      <section className="home-longstay" aria-labelledby="longstay-title">
        <div className="home-shell home-longstay__grid">
          <div className="home-longstay__copy">
            <p className="eyebrow">Zostań trochę dłużej</p>
            <h2 id="longstay-title">Cztery dni. <em>Cztery różne Mazury.</em></h2>
            <p>
              Dom nad Jeziorem Krzywe pozwala połączyć spokojny wypoczynek,
              aktywny dzień i najważniejsze miasta regionu bez zmiany noclegu.
            </p>
            <div className="home-longstay__days">
              <article>
                <span>01</span>
                <HomeIcon name="lake" />
                <div><strong>Przyjazd nad wodę</strong><p>Rozpakowanie, spacer brzegiem i pierwszy wieczór w jacuzzi.</p></div>
              </article>
              <article>
                <span>02</span>
                <HomeIcon name="compass" />
                <div><strong>Krutyń i las</strong><p>Kajak, rezerwat Zakręt i powrót na ognisko przy domu.</p></div>
              </article>
              <article>
                <span>03</span>
                <HomeIcon name="guests" />
                <div><strong>Mikołajki lub Mrągowo</strong><p>Promenada, port, restauracje i spokojny wieczór nad Jeziorem Krzywe.</p></div>
              </article>
              <article>
                <span>04</span>
                <HomeIcon name="sunrise" />
                <div><strong>Poranek bez pośpiechu</strong><p>Śniadanie z widokiem i ostatnia kawa przed wymeldowaniem do 11:00.</p></div>
              </article>
            </div>
          </div>
          <figure className="home-longstay__visual">
            <img
              src="/home-longstay-directions.webp"
              alt="Aktywny dzień na mazurskim jeziorze niedaleko Krzywe"
              loading="lazy"
            />
            <span className="home-longstay__shade" />
            <figcaption>
              <small>Jedna baza · wiele kierunków</small>
              Krzywe, Mrągowo, Mikołajki i Krutyń
            </figcaption>
            <Link href="/atrakcje">
              Zaplanuj pobyt <ArrowUpRight />
            </Link>
          </figure>
        </div>
      </section>

      <section className="home-rhythm" aria-labelledby="rhythm-title">
        <div className="home-shell">
          <div className="home-heading">
            <div>
              <p className="eyebrow">Dzień po mazursku</p>
              <h2 id="rhythm-title">Plan, który pisze <em>światło i pogoda.</em></h2>
            </div>
            <p className="home-heading__aside">
              Nie trzeba wybierać między aktywnym wyjazdem a odpoczynkiem.
              Najlepsze dni nad Jeziorem Krzywe swobodnie mieszczą jedno i drugie.
            </p>
          </div>
          <div className="home-rhythm__grid">
            <article>
              <figure><img src="/home-rhythm-morning.webp" alt="Spokojne, zielone jezioro o poranku na Mazurach" loading="lazy" /></figure>
              <div className="home-rhythm__top"><HomeIcon name="sunrise" /><span>Rano</span></div>
              <h3>Zacznij od jeziora</h3>
              <p>Kawa na tarasie, spokojne śniadanie i pierwszy spacer brzegiem, zanim dzień nabierze tempa.</p>
            </article>
            <article>
              <figure><img className="home-rhythm__image--day" src="/home-rhythm-day.webp" alt="Kajak na spokojnym mazurskim jeziorze wśród trzcin" loading="lazy" /></figure>
              <div className="home-rhythm__top"><HomeIcon name="compass" /><span>W dzień</span></div>
              <h3>Wybierz własny kierunek</h3>
              <p>Kajak na Krutyni, promenada w Mikołajkach, Mrągowo albo dzień bez wyjazdu — nad wodą i w ogrodzie.</p>
            </article>
            <article>
              <figure><img src="/home-rhythm-evening-family.webp" alt="Rodzinny wieczór przy ognisku na Mazurach" loading="lazy" /></figure>
              <div className="home-rhythm__top"><HomeIcon name="moon" /><span>Wieczorem</span></div>
              <h3>Wróć do ciszy</h3>
              <p>Jacuzzi, ognisko i rozmowy na tarasie. Wszystko, czego potrzeba, czeka tuż przy domu.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="home-nearby" aria-labelledby="nearby-title">
        <div className="home-shell">
          <div className="home-nearby__heading">
            <div>
              <p className="eyebrow">Mazury w zasięgu dnia</p>
              <h2 id="nearby-title">Spokojna baza. <em>Dużo kierunków.</em></h2>
            </div>
            <div>
              <p>
                Domy leżą między najciekawszymi miejscami Pojezierza
                Mrągowskiego. Blisko, gdy macie ochotę ruszyć. Wystarczająco
                daleko, by po powrocie znów słyszeć wodę i las.
              </p>
              <Link className="home-text-link" href="/atrakcje">
                Otwórz wyszukiwarkę atrakcji <ArrowUpRight />
              </Link>
            </div>
          </div>
          <div className="home-nearby__grid">
            {nearby.map((place) => (
              <Link href="/atrakcje" className="home-place" key={place.id}>
                <figure>
                  <img src={place.image} alt={place.name} loading="lazy" />
                  <span>{place.minutes} min</span>
                </figure>
                <div>
                  <p>{place.area}</p>
                  <h3>{place.name}</h3>
                  <span>Odkryj miejsce <ArrowUpRight /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-seasons" aria-labelledby="seasons-title">
        <div className="home-shell">
          <div className="home-seasons__intro">
            <p className="eyebrow">Cztery pory blisko wody</p>
            <h2 id="seasons-title">Nie czekaj tylko <em>na lipiec.</em></h2>
            <p>
              Krzywe Lake Houses są całoroczne. Wiosna daje długie spacery,
              lato otwiera wodę, jesień wycisza las, a zima zostawia więcej
              miejsca na ciepło domu i jacuzzi.
            </p>
          </div>
          <div className="home-seasons__rail">
            <article><img src="/home-season-spring.webp" alt="Wiosenny krajobraz jeziora pośród zielonych wzgórz i lasów" loading="lazy" /><span>Wiosna</span></article>
            <article><img src="/home-season-summer.webp" alt="Letni odpoczynek na pomoście nad mazurskim jeziorem" loading="lazy" /><span>Lato</span></article>
            <article><img src="/home-season-autumn.webp" alt="Jesienny las i spokojne jezioro o poranku" loading="lazy" /><span>Jesień</span></article>
            <article><img src="/home-season-winter.webp" alt="Zimowe jezioro, ośnieżona łódź i trzciny" loading="lazy" /><span>Zima</span></article>
          </div>
        </div>
      </section>

      <section className="home-seo" aria-labelledby="seo-title">
        <div className="home-shell home-seo__grid">
          <div className="home-seo__title">
            <p className="eyebrow">Domy nad jeziorem na Mazurach</p>
            <h2 id="seo-title">Między Mrągowem a Mikołajkami. <em>Dokładnie nad wodą.</em></h2>
          </div>
          <div className="home-seo__copy">
            <p>
              Jeśli szukacie <strong>domu na wynajem koło Mrągowa</strong>,
              apartamentu w okolicy Mikołajek albo większego noclegu nad
              jeziorem na Mazurach, Krzywe daje coś, czego nie zapewnia centrum
              miasta: bezpośredni dostęp do wody, prywatność i przestrzeń dla
              całej grupy.
            </p>
            <p>
              Każdy dom mieści do 10 osób, dlatego to wygodna propozycja dla
              rodzin i przyjaciół szukających całorocznego domu wakacyjnego.
              Mrągowo, Piecki, Mikołajki, Krutyń i Ryn pozostają w zasięgu
              jednodniowych wycieczek, a po powrocie czeka Jezioro Krzywe.
            </p>
            <div className="home-seo__links">
              <Link href="/domy-i-galeria">Domy i galeria <ArrowUpRight /></Link>
              <Link href="/atrakcje">Atrakcje w okolicy <ArrowUpRight /></Link>
              <Link href="/blog">Przewodniki po Mazurach <ArrowUpRight /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home-faq" aria-labelledby="faq-title">
        <div className="home-shell home-faq__grid">
          <div className="home-faq__intro">
            <p className="eyebrow">Przed rezerwacją</p>
            <h2 id="faq-title">Najważniejsze <em>odpowiedzi.</em></h2>
            <p>
              Konkretne informacje o domach i pobycie. Jeśli chcecie ustalić
              coś więcej, napiszcie lub zadzwońcie — odpowiemy bezpośrednio.
            </p>
            <Link className="button button--quiet" href="/kontakt">
              Przejdź do kontaktu <ArrowUpRight />
            </Link>
          </div>
          <div className="home-faq__list">
            {faqs.map((item, index) => (
              <details key={item.question} open={index === 0}>
                <summary>{item.question}<span>+</span></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="home-closing">
        <div className="home-shell">
          <div className="home-closing__card">
            <figure>
              <img src="/krzywe-hero.webp" alt="Krzywe Lake Houses nad Jeziorem Krzywe" loading="lazy" />
              <span />
            </figure>
            <div className="home-closing__copy">
              <p className="eyebrow">Rezerwacja bezpośrednia</p>
              <h2>Zarezerwuj dom, <em>który zostaje w pamięci.</em></h2>
              <p>
                Wybierz Modern albo Loft i zaplanuj pobyt nad Jeziorem Krzywe.
                Dwa domy, maksymalnie 20 gości łącznie i jeden brzeg tuż za oknem.
              </p>
              <div>
                <a className="button home-closing__primary" href={BOOKING_URL}>
                  Sprawdź wolne terminy <ArrowUpRight />
                </a>
                <a className="button home-closing__phone" href="tel:+48505586950">
                  <Phone /> 505 586 950
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <div className="home-shell home-footer__grid">
          <div className="home-footer__brand">
            <img src="/brand-mark.png" alt="" />
            <div><strong>Krzywe</strong><span>Lake Houses · Mazury</span></div>
          </div>
          <nav aria-label="Nawigacja w stopce">
            <Link href="/domy-i-galeria">Domy i galeria</Link>
            <Link href="/jezioro-krzywe">Jezioro Krzywe</Link>
            <Link href="/atrakcje">Atrakcje</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/kontakt">Kontakt</Link>
          </nav>
          <div className="home-footer__contact">
            <a href="tel:+48505586950"><Phone />505 586 950</a>
            <a href="mailto:krzywelakehouses@gmail.com"><Mail />krzywelakehouses@gmail.com</a>
          </div>
          <div className="home-footer__socials">
            <a href="https://www.facebook.com/krzywelakehousesmazury" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook /></a>
            <a href="https://www.instagram.com/krzywelakehousesmazury/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram /></a>
            <a href="https://www.google.com/maps/dir/?api=1&destination=53.8024%2C21.2638" target="_blank" rel="noreferrer" aria-label="Prowadź na miejsce"><MapPin /></a>
          </div>
        </div>
        <div className="home-shell home-footer__bottom">
          <span>© {new Date().getFullYear()} Krzywe Lake Houses</span>
          <div className="home-footer__legal">
            <Link href="/polityka-prywatnosci">Polityka prywatności</Link>
            <Link href="/regulamin">Regulamin</Link>
          </div>
          <span>Krzywe · powiat mrągowski · Mazury</span>
        </div>
      </footer>
    </main>
  );
}
