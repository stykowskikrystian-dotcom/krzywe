import type { Metadata } from "next";
import Link from "next/link";
import { DirectBookingPanel } from "../components/DirectBookingPanel";
import { ContactForm } from "./ContactForm";
import { HomeIcon } from "../components/HomeIcon";
import {
  ArrowUpRight,
  ArrowDown,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
} from "../components/Icons";
import { SiteHeader } from "../components/SiteHeader";

const PHONE_DISPLAY = "505 586 950";
const PHONE_URL = "tel:+48505586950";
const EMAIL = "krzywelakehouses@gmail.com";
const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=53.8024%2C21.2638";
const FACEBOOK_URL = "https://www.facebook.com/krzywelakehousesmazury";
const INSTAGRAM_URL = "https://www.instagram.com/krzywelakehousesmazury/";
const LAKE_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/4/4b/Krzywe_widok_latem.JPG";

export const metadata: Metadata = {
  title: {
    absolute: "Kontakt i rezerwacja — Krzywe Lake Houses",
  },
  description:
    "Kontakt i bezpośrednia rezerwacja Krzywe Lake Houses. Sprawdź terminy domów nad Jeziorem Krzywe koło Mrągowa i Mikołajek, zadzwoń, napisz lub wyznacz trasę.",
  keywords: [
    "Krzywe Lake Houses kontakt",
    "domy nad jeziorem Krzywe rezerwacja",
    "domy na wynajem Mrągowo kontakt",
    "noclegi Mikołajki rezerwacja bezpośrednia",
    "dom nad jeziorem Mazury telefon",
    "rezerwacja bezpośrednia Mazury",
    "apartamenty Mrągowo rezerwacja",
    "noclegi nad Jeziorem Krzywe",
    "domy na wynajem Mikołajki kontakt",
    "dom nad wodą Mrągowo rezerwacja",
  ],
  alternates: { canonical: "/kontakt" },
  openGraph: {
    title: "Kontakt i rezerwacja bezpośrednia | Krzywe Lake Houses",
    description:
      "Zadzwoń, napisz lub wyznacz trasę do dwóch całorocznych domów nad Jeziorem Krzywe.",
    url: "/kontakt",
    type: "website",
    locale: "pl_PL",
    images: [
      {
        url: "/krzywe-hero.webp",
        alt: "Krzywe Lake Houses nad Jeziorem Krzywe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontakt i rezerwacja | Krzywe Lake Houses",
    description:
      "Sprawdź dostępność domów Modern i Loft nad Jeziorem Krzywe, zadzwoń, napisz lub wyznacz trasę.",
    images: ["/krzywe-hero.webp"],
  },
};

const faq = [
  {
    question: "Jak najszybciej sprawdzić wolny termin?",
    answer:
      "Skorzystaj z kalendarza rezerwacji dostępnego na stronie albo wyślij formularz z datami przyjazdu i wyjazdu. Możesz też zadzwonić bezpośrednio pod numer 505 586 950.",
  },
  {
    question: "Czy mogę zapytać jednocześnie o Modern i Loft?",
    answer:
      "Tak. W formularzu wybierz opcję „Oba domy”. To najlepszy wariant dla grupy liczącej do 20 osób, która chce zachować wygodę dwóch niezależnych przestrzeni.",
  },
  {
    question: "Kiedy otrzymam odpowiedź?",
    answer:
      "Na wiadomości odpowiadamy możliwie szybko, zwykle jeszcze tego samego dnia. W sprawach dotyczących bliskiego terminu najlepiej zadzwonić.",
  },
  {
    question: "Czy adres prowadzi bezpośrednio do obiektu?",
    answer:
      "Przycisk „Prowadź na miejsce” korzysta z dokładnych współrzędnych Krzywe Lake Houses i otwiera nawigację do obiektu w miejscowości Krzywe.",
  },
];

export default function ContactPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        name: "Kontakt — Krzywe Lake Houses",
        url: "https://www.krzywelakehouses.pl/kontakt",
        description: metadata.description,
        mainEntity: { "@id": "https://www.krzywelakehouses.pl/#lodging" },
      },
      {
        "@type": "LodgingBusiness",
        "@id": "https://www.krzywelakehouses.pl/#lodging",
        name: "Krzywe Lake Houses",
        url: "https://www.krzywelakehouses.pl/",
        logo: "https://www.krzywelakehouses.pl/favicon.png",
        image: "https://www.krzywelakehouses.pl/krzywe-hero.webp",
        telephone: "+48 505 586 950",
        email: EMAIL,
        priceRange: "$$",
        petsAllowed: false,
        checkinTime: "16:00",
        checkoutTime: "11:00",
        areaServed: ["Krzywe", "Mrągowo", "Mikołajki", "Ryn", "Mazury"],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+48 505 586 950",
          email: EMAIL,
          contactType: "reservations",
          availableLanguage: ["pl", "en"],
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Krzywe",
          postalCode: "11-700",
          addressRegion: "warmińsko-mazurskie",
          addressCountry: "PL",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 53.8024,
          longitude: 21.2638,
        },
        sameAs: [FACEBOOK_URL, INSTAGRAM_URL],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Strona główna",
            item: "https://www.krzywelakehouses.pl/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Kontakt i rezerwacja",
            item: "https://www.krzywelakehouses.pl/kontakt",
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
    <main className="contact-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="contact-hero" aria-labelledby="contact-title">
        <SiteHeader activePath="/kontakt" />
        <div className="contact-shell contact-hero__grid">
          <div className="contact-hero__copy">
            <p className="eyebrow">Kontakt i rezerwacja bezpośrednia</p>
            <h1 id="contact-title">
              <span className="hero-title__primary">Zacznijmy</span>
              <em>od terminu.</em>
            </h1>
            <p className="contact-hero__lead">
              Napisz, zadzwoń albo od razu wyznacz trasę. Pomożemy wybrać
              Modern, Loft lub oba domy i odpowiemy na pytania przed przyjazdem
              nad Jezioro Krzywe.
            </p>
            <div className="contact-hero__actions">
              <a className="button button--primary" href={PHONE_URL}>
                Zadzwoń <Phone />
              </a>
              <a className="button button--quiet" href={`mailto:${EMAIL}`}>
                Napisz e-mail <Mail />
              </a>
              <a
                className="button button--quiet"
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noreferrer"
              >
                Prowadź <MapPin />
              </a>
            </div>
            <div
              className="contact-hero__facts property-facts"
              aria-label="Najważniejsze informacje kontaktowe"
            >
              <div>
                <strong>bezpośrednio</strong>
                <span>bez dodatkowych pośredników</span>
              </div>
              <div>
                <strong>2 domy</strong>
                <span>Modern, Loft lub oba</span>
              </div>
              <div>
                <strong>365 dni</strong>
                <span>kontakt przez cały rok</span>
              </div>
            </div>
          </div>

          <div className="contact-hero__visual" aria-label="Krzywe Lake Houses">
            <figure className="contact-hero__main-image">
              <img
                src="/krzywe-hero.webp"
                alt="Dwa domy Krzywe Lake Houses nad Jeziorem Krzywe"
                fetchPriority="high"
              />
              <figcaption>
                <span>Krzywe · Mazury</span>
                <strong>10 m od jeziora</strong>
              </figcaption>
            </figure>
            <figure className="contact-hero__lake-image">
              <img src={LAKE_IMAGE} alt="Jezioro Krzywe latem" />
            </figure>
          </div>
        </div>
        <a className="contact-hero__scroll hero-scroll-cue" href="#dane-kontaktowe">
          <span>Wszystkie dane</span>
          <i aria-hidden="true"><ArrowDown /></i>
        </a>
      </section>

      <section
        className="contact-booking"
        id="dostepnosc"
        aria-labelledby="contact-booking-title"
      >
        <div className="contact-shell contact-booking__card">
          <DirectBookingPanel
            headingId="contact-booking-title"
            targetId="widgetHolder_contact_page"
          />
        </div>
      </section>

      <section className="contact-details" id="dane-kontaktowe">
        <div className="contact-shell">
          <div className="contact-section-heading">
            <div>
              <p className="eyebrow">Wybierz najwygodniejszy kontakt</p>
              <h2>
                Jesteśmy blisko.
                <em>Także przed przyjazdem.</em>
              </h2>
            </div>
            <p>
              Pytania o termin, wyposażenie, pobyt większej grupy albo dojazd?
              Wszystkie najważniejsze dane znajdziesz w jednym miejscu.
            </p>
          </div>

          <div className="contact-details__grid">
            <article className="contact-detail-card contact-detail-card--primary">
              <div className="contact-detail-card__icon"><Phone /></div>
              <small>Telefon</small>
              <a href={PHONE_URL}>{PHONE_DISPLAY}</a>
              <p>Najlepszy wybór, gdy termin jest bliski lub potrzebujesz szybkiej odpowiedzi.</p>
              <a className="contact-detail-card__link" href={PHONE_URL}>
                Zadzwoń teraz <ArrowUpRight />
              </a>
            </article>

            <article className="contact-detail-card">
              <div className="contact-detail-card__icon"><Mail /></div>
              <small>E-mail</small>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <p>Wiadomości dotyczące rezerwacji, faktur, pobytów grupowych i pytań organizacyjnych.</p>
              <a className="contact-detail-card__link" href={`mailto:${EMAIL}`}>
                Napisz wiadomość <ArrowUpRight />
              </a>
            </article>

            <article className="contact-detail-card">
              <div className="contact-detail-card__icon"><MapPin /></div>
              <small>Adres obiektu</small>
              <strong>Krzywe, 11-700 Mrągowo</strong>
              <p>Powiat mrągowski, województwo warmińsko-mazurskie. Dokładny cel zapisaliśmy we współrzędnych.</p>
              <a
                className="contact-detail-card__link"
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noreferrer"
              >
                Prowadź na miejsce <ArrowUpRight />
              </a>
            </article>

          </div>

          <div className="contact-business-panel" aria-label="Dane firmy i płatności">
            <article className="contact-business-panel__company">
              <div className="contact-business-panel__icon">
                <HomeIcon name="house" />
              </div>
              <div className="contact-business-panel__heading">
                <small>Dane firmy i do faktury</small>
                <strong>Krzywe Lake Houses</strong>
              </div>
              <dl>
                <div>
                  <dt>Adres</dt>
                  <dd>Krzywe, 11-700 Mrągowo</dd>
                </div>
                <div>
                  <dt>NIP</dt>
                  <dd className="is-placeholder">numer do uzupełnienia</dd>
                </div>
              </dl>
            </article>

            <article className="contact-business-panel__payment">
              <div className="contact-business-panel__icon">
                <HomeIcon name="shield" />
              </div>
              <div className="contact-business-panel__heading">
                <small>Dane do wpłaty</small>
                <strong>Rachunek bankowy</strong>
              </div>
              <div className="contact-business-panel__account">
                <span>Numer konta</span>
                <b className="is-placeholder">PL •• •••• •••• •••• •••• •••• ••••</b>
              </div>
              <p>
                Przed wpłatą potwierdź numer rachunku w wiadomości dotyczącej
                rezerwacji.
              </p>
            </article>

            <nav className="contact-business-panel__legal" aria-label="Dokumenty prawne">
              <span>Dokumenty rezerwacji</span>
              <Link href="/polityka-prywatnosci">Polityka prywatności <ArrowUpRight /></Link>
              <Link href="/regulamin">Regulamin <ArrowUpRight /></Link>
            </nav>
          </div>
        </div>
      </section>

      <section className="contact-route" aria-labelledby="route-title">
        <div className="contact-shell contact-route__grid">
          <div className="contact-route__map">
            <iframe
              title="Mapa dojazdu do Krzywe Lake Houses"
              src="https://www.google.com/maps?q=53.8024,21.2638&z=13&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="contact-route__map-note">
              <span><MapPin /></span>
              <div>
                <small>Krzywe Lake Houses</small>
                <strong>nad Jeziorem Krzywe</strong>
              </div>
            </div>
          </div>

          <div className="contact-route__copy">
            <p className="eyebrow">Nawigacja pod sam dom</p>
            <h2 id="route-title">
              Jeden przycisk.
              <em>Resztę prowadzi mapa.</em>
            </h2>
            <p>
              Obiekt znajduje się w miejscowości Krzywe w powiecie mrągowskim.
              Link korzysta z dokładnych współrzędnych, dlatego nie musisz
              wyszukiwać podobnie nazwanych miejscowości na Mazurach.
            </p>
            <dl className="contact-route__address">
              <div><dt>Miejscowość</dt><dd>Krzywe, 11-700 Mrągowo</dd></div>
              <div><dt>Region</dt><dd>Mazury · powiat mrągowski</dd></div>
              <div><dt>GPS</dt><dd>53.8024, 21.2638</dd></div>
            </dl>
            <a
              className="button button--primary"
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noreferrer"
            >
              Prowadź na miejsce <ArrowUpRight />
            </a>
          </div>
        </div>
      </section>

      <section className="contact-form-section" id="formularz" aria-labelledby="form-title">
        <div className="contact-shell contact-form-section__grid">
          <div className="contact-form-section__intro">
            <p className="eyebrow">Opowiedz nam o swoim pobycie</p>
            <h2 id="form-title">
              Kilka konkretów.
              <em>Jedna dobra odpowiedź.</em>
            </h2>
            <p>
              Podaj planowany termin, liczbę gości i wybrany dom. Formularz
              uporządkuje wszystkie informacje i przygotuje gotową wiadomość
              e-mail do Krzywe Lake Houses.
            </p>
            <div className="contact-form-section__benefits">
              <span><HomeIcon name="shield" /> Kontakt bez pośredników</span>
              <span><HomeIcon name="house" /> Modern, Loft lub oba domy</span>
              <span><HomeIcon name="lake" /> Pobyt 10 metrów od jeziora</span>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <section className="contact-social" aria-labelledby="social-title">
        <div className="contact-shell contact-social__grid">
          <div>
            <p className="eyebrow">Zobacz, co dzieje się nad wodą</p>
            <h2 id="social-title">
              Krzywe na co dzień.
              <em>Obserwuj nas.</em>
            </h2>
          </div>
          <div className="contact-social__links">
            <a href={FACEBOOK_URL} target="_blank" rel="noreferrer">
              <Facebook />
              <span><small>Facebook</small><strong>Krzywe Lake Houses Mazury</strong></span>
              <ArrowUpRight />
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              <Instagram />
              <span><small>Instagram</small><strong>@krzywelakehousesmazury</strong></span>
              <ArrowUpRight />
            </a>
          </div>
        </div>
      </section>

      <section className="contact-faq" aria-labelledby="contact-faq-title">
        <div className="contact-shell contact-faq__grid">
          <div>
            <p className="eyebrow">Zanim napiszesz</p>
            <h2 id="contact-faq-title">
              Krótko i jasno.
              <em>Najważniejsze odpowiedzi.</em>
            </h2>
          </div>
          <div className="contact-faq__list">
            {faq.map((item) => (
              <details key={item.question}>
                <summary>
                  <span>{item.question}</span>
                  <i aria-hidden="true">+</i>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-closing">
        <div className="contact-shell contact-closing__card">
          <figure>
            <img src={LAKE_IMAGE} alt="Spokojna tafla Jeziora Krzywe" />
            <span className="contact-closing__shade" aria-hidden="true" />
            <figcaption>
              <span><HomeIcon name="lake" /></span>
              <div>
                <small>Tuż za oknem</small>
                <strong>Jezioro Krzywe · 10 m od domu</strong>
              </div>
            </figcaption>
          </figure>
          <div className="contact-closing__copy">
            <p className="eyebrow">Rezerwacja bezpośrednia</p>
            <h2>
              Termin zaczyna plan.
              <em>Reszta przychodzi łatwo.</em>
            </h2>
            <p>
              Zadzwoń, wyślij wiadomość albo przygotuj zapytanie w formularzu.
              Odpowiemy i pomożemy wybrać najlepszy wariant pobytu.
            </p>
            <div className="contact-closing__notes" aria-label="Najważniejsze informacje">
              <span><b>02</b> niezależne domy</span>
              <span><b>20</b> gości łącznie</span>
              <span><b>365</b> dni w roku</span>
            </div>
            <div className="contact-closing__actions">
              <a className="button button--primary" href={PHONE_URL}>
                {PHONE_DISPLAY} <Phone />
              </a>
              <a className="button button--quiet" href={`mailto:${EMAIL}`}>
                Napisz e-mail <Mail />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="contact-footer">
        <div className="contact-shell contact-footer__grid">
          <div>
            <img src="/brand-logo.png" alt="Krzywe Lake Houses" />
            <p>Dwa całoroczne domy nad Jeziorem Krzywe.</p>
          </div>
          <nav aria-label="Stopka">
            <Link href="/">Strona główna</Link>
            <Link href="/domy-i-galeria">Domy i galeria</Link>
            <Link href="/oferta">Oferta</Link>
            <Link href="/polityka-prywatnosci">Polityka prywatności</Link>
            <Link href="/regulamin">Regulamin</Link>
          </nav>
          <div className="contact-footer__contact">
            <a href={PHONE_URL}><Phone />{PHONE_DISPLAY}</a>
            <a href={`mailto:${EMAIL}`}><Mail />{EMAIL}</a>
          </div>
        </div>
        <div className="contact-shell contact-footer__bottom">
          <span>© {new Date().getFullYear()} Krzywe Lake Houses</span>
          <span>Krzywe · Mazury · Jezioro Krzywe</span>
        </div>
      </footer>
    </main>
  );
}
