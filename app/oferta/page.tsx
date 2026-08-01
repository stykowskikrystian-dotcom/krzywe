import type { Metadata } from "next";
import Link from "next/link";
import { HomeIcon, type HomeIconName } from "../components/HomeIcon";
import { ArrowDownRight, ArrowUpRight } from "../components/Icons";
import { SiteHeader } from "../components/SiteHeader";
import { DirectBookingPanel } from "../components/DirectBookingPanel";
import { BOOKING_URL } from "../lib/booking";

const image = (id: string, width = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=84`;

const lakeImages = {
  spring: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Krzywe_zatoka.JPG",
  summer: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Krzywe_widok_latem.JPG",
  autumn: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Pasterzewo.jpg?width=1600",
  pier: "https://upload.wikimedia.org/wikipedia/commons/b/be/Krzywe_pomost.JPG",
} as const;

const seasons: {
  name: string;
  period: string;
  price: string;
  note: string;
  image: string;
  imageAlt: string;
  icon: HomeIconName;
  copy: string;
  highlights: string[];
  tone: string;
}[] = [
  {
    name: "Wiosna",
    period: "marzec — maj",
    price: "1 200–1 650 zł",
    note: "za noc · jeden dom",
    image: lakeImages.spring,
    imageAlt: "Spokojne jezioro i świeża zieleń wiosną",
    icon: "leaf",
    copy:
      "Pierwsze śniadania na tarasie, spokojne szlaki i Mazury budzące się bez letniego pośpiechu.",
    highlights: ["cisza poza sezonem", "rowery i spacery", "wieczór w jacuzzi"],
    tone: "spring",
  },
  {
    name: "Lato",
    period: "czerwiec — sierpień",
    price: "1 850–2 500 zł",
    note: "za noc · jeden dom",
    image: lakeImages.summer,
    imageAlt: "Słoneczne jezioro otoczone zielenią latem",
    icon: "sunrise",
    copy:
      "Woda od rana, długie popołudnia w ogrodzie i ognisko, które zaczyna się dopiero po zachodzie.",
    highlights: ["bezpośrednio nad wodą", "taras i ogród", "pełnia mazurskiego lata"],
    tone: "summer",
  },
  {
    name: "Jesień",
    period: "wrzesień — listopad",
    price: "1 150–1 650 zł",
    note: "za noc · jeden dom",
    image: lakeImages.autumn,
    imageAlt: "Jesienny krajobraz w ciepłym świetle",
    icon: "fire",
    copy:
      "Kolorowe lasy, spokojne drogi i ciepłe wnętrza po powrocie z całodziennej wycieczki.",
    highlights: ["grzyby i leśne trasy", "ognisko bez pośpiechu", "kameralny odpoczynek"],
    tone: "autumn",
  },
  {
    name: "Zima",
    period: "grudzień — luty",
    price: "1 350–2 100 zł",
    note: "za noc · jeden dom",
    image: image("photo-1483664852095-d6cc6870702d"),
    imageAlt: "Zimowy krajobraz nad wodą ze śniegiem",
    icon: "year",
    copy:
      "Panoramiczny widok, ciepły dom i prywatne jacuzzi — Mazury w ich najspokojniejszej wersji.",
    highlights: ["domy całoroczne", "zimowy widok na jezioro", "czas dla bliskich"],
    tone: "winter",
  },
];

const included: { icon: HomeIconName; title: string; text: string }[] = [
  { icon: "kitchen", title: "Pełna kuchnia", text: "Płyta, piekarnik, lodówka, zmywarka, ekspres i komplet naczyń." },
  { icon: "towels", title: "Pościel i ręczniki", text: "Przygotowane dla wszystkich zgłoszonych gości." },
  { icon: "wifi", title: "Wi‑Fi i Smart TV", text: "Wygodna łączność i dobry plan na spokojniejszy wieczór." },
  { icon: "jacuzzi", title: "Prywatne jacuzzi", text: "Odpoczynek po dniu nad wodą, na szlaku lub w mieście." },
  { icon: "fire", title: "Miejsce na ognisko", text: "Wspólna przestrzeń na długie mazurskie wieczory." },
  { icon: "lake", title: "Dostęp do jeziora", text: "Brzeg Jeziora Krzywe znajduje się około 10 metrów od domów." },
  { icon: "parking", title: "Parking przy domu", text: "Wygodne miejsca dla samochodów gości Modern i Loft." },
  { icon: "year", title: "Komfort przez cały rok", text: "Ogrzewanie i wyposażenie przygotowane na każdą porę roku." },
];

const onsite: { icon: HomeIconName; title: string; text: string }[] = [
  { icon: "lake", title: "Poranek przy wodzie", text: "Kawa na brzegu, spokojna kąpiel lub po prostu pierwsze światło nad Jeziorem Krzywe." },
  { icon: "jacuzzi", title: "Jacuzzi pod niebem", text: "Ciepła woda po aktywnym dniu i widok, który nie potrzebuje dodatkowej oprawy." },
  { icon: "fire", title: "Wieczór przy ogniu", text: "Miejsce na ognisko pozwala przedłużyć dzień niezależnie od pory roku." },
  { icon: "leaf", title: "Taras i ogród", text: "Przestrzeń na śniadanie, rozmowę, leżak i niespieszny rodzinny dzień." },
  { icon: "moon", title: "Nocna cisza", text: "Mniej świateł, więcej gwiazd i prawdziwie spokojny rytm miejscowości Krzywe." },
  { icon: "compass", title: "Baza do odkrywania", text: "Piecki, Mrągowo, Mikołajki, Ryn i Krutyń pozostają w zasięgu jednodniowych planów." },
];

const rules = [
  { value: "16:00", title: "Zameldowanie", text: "Dom jest gotowy na przyjazd gości od godziny 16:00." },
  { value: "11:00", title: "Wymeldowanie", text: "Prosimy o opuszczenie domu do godziny 11:00." },
  { value: "Bez zwierząt", title: "Spokojne zasady", text: "Obiekt nie przyjmuje zwierząt." },
  { value: "Zakaz palenia", title: "Czyste wnętrza", text: "W obu domach obowiązuje całkowity zakaz palenia." },
];

const faq = [
  {
    q: "Ile kosztuje wynajem domu nad Jeziorem Krzywe?",
    a: "Orientacyjne ceny zaczynają się od 1 150 zł za noc za jeden dom i zależą od pory roku, długości pobytu, weekendu oraz terminu świątecznego. Ostateczna cena jest widoczna po wybraniu dat.",
  },
  {
    q: "Czy można wynająć oba domy jednocześnie?",
    a: "Tak. Modern i Loft można zarezerwować razem dla grupy do 20 osób. Każdy dom pozostaje niezależny i ma własne sypialnie, łazienki, kuchnię oraz część dzienną.",
  },
  {
    q: "Co znajduje się w cenie pobytu?",
    a: "Goście otrzymują w pełni wyposażony dom, pościel, ręczniki, Wi‑Fi, Smart TV, parking, dostęp do jeziora, jacuzzi i miejsce na ognisko.",
  },
  {
    q: "Czy Krzywe Lake Houses działa zimą?",
    a: "Tak. Oba domy są całoroczne i przygotowane na jesienne, zimowe oraz wiosenne pobyty na Mazurach.",
  },
];

export const metadata: Metadata = {
  title: "Oferta pobytu nad jeziorem — wiosna, lato, jesień i zima",
  description:
    "Całoroczna oferta Krzywe Lake Houses: dwa domy na wynajem nad Jeziorem Krzywe koło Mrągowa, Mikołajek, Rynu i Piecek. Ceny sezonowe, jacuzzi i brzeg 10 m od domu.",
  keywords: [
    "domy na wynajem Mrągowo",
    "domy na wynajem Mikołajki",
    "domy na wynajem Ryn",
    "domy na wynajem Piecki",
    "dom nad jeziorem Mazury cena",
    "domy wakacyjne Mazury",
    "domy nad samą wodą Mazury",
    "całoroczny dom na Mazurach",
    "noclegi Jezioro Krzywe",
    "dom z jacuzzi Mazury",
    "wakacje nad jeziorem Mazury",
    "weekend na Mazurach",
  ],
  alternates: { canonical: "/oferta" },
  openGraph: {
    title: "Oferta całoroczna | Krzywe Lake Houses",
    description:
      "Modern i Loft nad Jeziorem Krzywe — sezonowe ceny, pełne wyposażenie i odpoczynek 10 metrów od brzegu.",
    url: "/oferta",
    type: "website",
    locale: "pl_PL",
    images: [{ url: "/krzywe-hero.webp", alt: "Krzywe Lake Houses nad Jeziorem Krzywe" }],
  },
};

export default function OfferPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "OfferCatalog",
        name: "Całoroczna oferta Krzywe Lake Houses",
        url: "https://www.krzywelakehouses.pl/oferta",
        itemListElement: seasons.map((season) => ({
          "@type": "Offer",
          name: `${season.name} nad Jeziorem Krzywe`,
          description: season.copy,
          priceCurrency: "PLN",
          availability: "https://schema.org/InStock",
          itemOffered: {
            "@type": "LodgingBusiness",
            name: "Krzywe Lake Houses",
          },
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://www.krzywelakehouses.pl/" },
          { "@type": "ListItem", position: 2, name: "Oferta", item: "https://www.krzywelakehouses.pl/oferta" },
        ],
      },
    ],
  };

  return (
    <main className="offer-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="offer-hero" aria-labelledby="offer-title">
        <SiteHeader activePath="/oferta" />
        <div className="offer-shell offer-hero__grid">
          <div className="offer-hero__copy">
            <p className="eyebrow">Cały rok · nad samą wodą</p>
            <h1 id="offer-title">
              <span className="hero-title__primary">Każda pora ma tu</span>
              <em>swój rytm.</em>
            </h1>
            <p className="offer-hero__lead">
              Wybierz jasny Modern albo nastrojowy Loft. Dwa całoroczne domy
              nad Jeziorem Krzywe łączą swobodę prywatnego domu z komfortem,
              którego potrzebuje rodzina lub grupa przyjaciół.
            </p>
            <div className="offer-hero__actions">
              <a className="button button--primary" href="#pory-roku">
                Zobacz ceny sezonowe <ArrowDownRight />
              </a>
              <a className="button button--quiet" href={BOOKING_URL}>
                Sprawdź termin <ArrowUpRight />
              </a>
            </div>
            <div className="offer-hero__facts property-facts" aria-label="Najważniejsze informacje">
              <div><strong>4</strong><span>pory roku do wyboru</span></div>
              <div><strong>od 1 150 zł</strong><span>za noc · jeden dom</span></div>
              <div><strong>1 lub 2</strong><span>domy w jednej rezerwacji</span></div>
            </div>
          </div>

          <div className="offer-hero__visual" aria-label="Krzywe Lake Houses przez cały rok">
            <figure className="offer-hero__main-image">
              <img src="/krzywe-hero.webp" alt="Dwa domy Krzywe Lake Houses nad Jeziorem Krzywe" fetchPriority="high" />
              <figcaption><span>Krzywe · Mazury</span><strong>Modern &amp; Loft</strong></figcaption>
            </figure>
            <figure className="offer-hero__season-image offer-hero__season-image--summer">
              <img src={seasons[1].image} alt={seasons[1].imageAlt} />
              <figcaption>Lato</figcaption>
            </figure>
            <figure className="offer-hero__season-image offer-hero__season-image--winter">
              <img src={seasons[3].image} alt={seasons[3].imageAlt} />
              <figcaption>Zima</figcaption>
            </figure>
            <div className="offer-hero__badge">
              <i aria-hidden="true"><HomeIcon name="sun" /></i>
              <span>
                <small>Pobyt całoroczny</small>
                <strong>4 pory · jeden adres</strong>
              </span>
            </div>
          </div>
        </div>
        <a className="offer-hero__scroll hero-scroll-cue" href="#pory-roku">
          <span>Znajdź swoją porę</span><i aria-hidden="true">↓</i>
        </a>
      </section>

      <section className="offer-booking" aria-label="Sprawdź dostępność domów">
        <div className="offer-shell">
          <DirectBookingPanel targetId="widgetHolder_offer_page" />
        </div>
      </section>

      <section className="offer-opening">
        <div className="offer-shell offer-opening__grid">
          <div>
            <p className="eyebrow">Ten sam adres · cztery różne pobyty</p>
            <h2>Nie sprzedajemy tylko noclegu. <em>Dajemy Wam przestrzeń na własny plan.</em></h2>
          </div>
          <div className="offer-opening__copy">
            <p>
              Latem najważniejsza jest woda. Jesienią — las i cisza. Zimą
              ciepłe wnętrza, a wiosną powrót na taras. Standard pozostaje ten
              sam: 130 m², cztery sypialnie, trzy łazienki i panoramiczny widok
              na Jezioro Krzywe w każdym domu.
            </p>
            <div className="offer-opening__tags" aria-label="Rodzaje pobytu">
              <span>Rodzinny urlop</span><span>Wyjazd przyjaciół</span><span>Spokojny weekend</span>
            </div>
          </div>
        </div>
      </section>

      <section className="offer-seasons" id="pory-roku" aria-labelledby="seasons-title">
        <div className="offer-shell">
          <div className="offer-section-heading">
            <div>
              <p className="eyebrow">Wiosna · lato · jesień · zima</p>
              <h2 id="seasons-title">Wybierz porę, <em>która pasuje do Was.</em></h2>
            </div>
            <p>
              Widełki pokazują orientacyjną cenę za noc za jeden dom. Dokładna
              kwota zależy od terminu, długości pobytu, weekendów i świąt.
            </p>
          </div>
          <div className="offer-seasons__grid">
            {seasons.map((season) => (
              <article className={`offer-season offer-season--${season.tone}`} key={season.name}>
                <figure>
                  <img src={season.image} alt={season.imageAlt} loading="lazy" />
                  <span className="offer-season__period">{season.period}</span>
                  <span className="offer-season__icon"><HomeIcon name={season.icon} /></span>
                </figure>
                <div className="offer-season__body">
                  <div className="offer-season__topline">
                    <h3>{season.name}</h3>
                    <div><strong>{season.price}</strong><span>{season.note}</span></div>
                  </div>
                  <p>{season.copy}</p>
                  <ul>
                    {season.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                  </ul>
                  <a href={BOOKING_URL}>Sprawdź dostępność <ArrowUpRight /></a>
                </div>
              </article>
            ))}
          </div>
          <p className="offer-price-note">
            Terminy świąteczne, długie weekendy i pobyty obejmujące wydarzenia
            specjalne wyceniamy indywidualnie. Cena końcowa jest zawsze
            potwierdzana przed rezerwacją.
          </p>
        </div>
      </section>

      <section className="offer-included" aria-labelledby="included-title">
        <div className="offer-shell">
          <div className="offer-included__intro">
            <p className="eyebrow">W cenie pobytu</p>
            <h2 id="included-title">Przyjeżdżacie odpocząć. <em>Reszta już na Was czeka.</em></h2>
            <p>
              Modern i Loft są przygotowane do wygodnego pobytu większej grupy
              — bez dopisywania podstawowych udogodnień do rachunku.
            </p>
          </div>
          <div className="offer-included__grid">
            {included.map((item) => (
              <article key={item.title}>
                <span><HomeIcon name={item.icon} /></span>
                <div><h3>{item.title}</h3><p>{item.text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="offer-onsite" aria-labelledby="onsite-title">
        <div className="offer-shell">
          <div className="offer-onsite__layout">
            <div className="offer-onsite__gallery">
              <figure className="offer-onsite__photo offer-onsite__photo--main">
                <img src="/krzywe-hero.webp" alt="Domy Krzywe Lake Houses położone tuż nad jeziorem" loading="lazy" />
              </figure>
              <figure className="offer-onsite__photo offer-onsite__photo--detail">
                <img src={lakeImages.pier} alt="Pomost nad Jeziorem Krzywe" loading="lazy" />
              </figure>
              <div className="offer-onsite__distance"><strong>10 m</strong><span>od domu do brzegu</span></div>
            </div>
            <div className="offer-onsite__intro">
              <p className="eyebrow">Nie trzeba nigdzie jechać</p>
              <h2 id="onsite-title">Najlepsze atrakcje <em>zaczynają się przy domu.</em></h2>
              <p>
                Dzień może być pełny bez pakowania samochodu. Woda, ogród,
                jacuzzi, ognisko i cisza tworzą naturalny plan od poranka do nocy.
              </p>
              <Link className="button button--quiet" href="/atrakcje">
                Poznaj okolicę <ArrowUpRight />
              </Link>
            </div>
          </div>
          <div className="offer-onsite__grid">
            {onsite.map((item) => (
              <article key={item.title}>
                <HomeIcon name={item.icon} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="offer-configurations" aria-labelledby="configurations-title">
        <div className="offer-shell">
          <div className="offer-section-heading offer-section-heading--light">
            <div>
              <p className="eyebrow">Jeden dom albo oba</p>
              <h2 id="configurations-title">Tyle prywatności, <em>ile potrzebujecie.</em></h2>
            </div>
            <p>
              Dwa niezależne domy pozwalają dobrze ułożyć pobyt jednej rodziny,
              kilku par albo większej grupy bez rezygnacji ze wspólnego czasu.
            </p>
          </div>
          <div className="offer-configurations__grid">
            <article>
              <span>01 · Jeden dom</span>
              <HomeIcon name="house" />
              <h3>Modern albo Loft</h3>
              <strong>do 10 osób</strong>
              <p>130 m², cztery sypialnie, trzy łazienki, salon z kuchnią i widok na wodę.</p>
              <Link href="/domy-i-galeria">Porównaj wnętrza <ArrowUpRight /></Link>
            </article>
            <article>
              <span>02 · Cała przestrzeń</span>
              <HomeIcon name="guests" />
              <h3>Modern i Loft</h3>
              <strong>do 20 osób</strong>
              <p>Dwa osobne rytmy dnia, wspólny ogród i bliskość, kiedy chcecie być razem.</p>
              <a href={BOOKING_URL}>Sprawdź oba domy <ArrowUpRight /></a>
            </article>
          </div>
        </div>
      </section>

      <section className="offer-rules" aria-labelledby="rules-title">
        <div className="offer-shell">
          <div className="offer-rules__intro">
            <p className="eyebrow">Proste zasady pobytu</p>
            <h2 id="rules-title">Wszystko jasne <em>jeszcze przed przyjazdem.</em></h2>
            <p>
              Konkretne godziny i czytelne zasady pomagają dobrze zaplanować
              drogę oraz spokojnie rozpocząć pobyt.
            </p>
          </div>
          <div className="offer-rules__grid">
            {rules.map((rule) => (
              <article key={rule.value}>
                <strong>{rule.value}</strong>
                <div><h3>{rule.title}</h3><p>{rule.text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="offer-faq" aria-labelledby="offer-faq-title">
        <div className="offer-shell offer-faq__grid">
          <div>
            <p className="eyebrow">Przed rezerwacją</p>
            <h2 id="offer-faq-title">Najważniejsze odpowiedzi <em>o ofercie.</em></h2>
            <p>Jeżeli potrzebujesz indywidualnej wyceny obu domów, napisz lub zadzwoń.</p>
          </div>
          <div className="offer-faq__list">
            {faq.map((item, index) => (
              <details key={item.q} open={index === 0}>
                <summary>{item.q}<span aria-hidden="true">+</span></summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="offer-closing">
        <div className="offer-shell offer-closing__card">
          <figure>
            <img src="/krzywe-hero.webp" alt="Krzywe Lake Houses nad Jeziorem Krzywe na Mazurach" loading="lazy" />
          </figure>
          <div>
            <p className="eyebrow">Rezerwacja bezpośrednia</p>
            <h2>Wybierz porę roku. <em>Resztę ułożymy razem.</em></h2>
            <p>
              Sprawdź dostępność Modern i Loft, wybierz jeden dom lub oba i
              zaplanuj pobyt nad samym Jeziorem Krzywe.
            </p>
            <div>
              <a className="button button--primary" href={BOOKING_URL}>Sprawdź termin <ArrowUpRight /></a>
              <Link className="button button--quiet" href="/kontakt">Zapytaj o pobyt <ArrowUpRight /></Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
