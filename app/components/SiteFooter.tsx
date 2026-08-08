import Link from "next/link";
import { ArrowUpRight, Facebook, Instagram, Mail, MapPin, Phone } from "./Icons";
import { CONTACT, SOCIAL_LINKS } from "../lib/seo";

const primaryNavigation = [
  { href: "/", label: "Strona główna" },
  { href: "/domy-i-galeria", label: "Domy i galeria" },
  { href: "/jezioro-krzywe", label: "Jezioro Krzywe" },
  { href: "/atrakcje", label: "Atrakcje" },
  { href: "/oferta", label: "Oferta" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/blog", label: "Blog" },
] as const;

const sectionNavigation = [
  { href: "/#domy", label: "Domy Modern i Loft" },
  { href: "/domy-i-galeria#poznaj-domy", label: "Wnętrza i udogodnienia" },
  { href: "/jezioro-krzywe#poznaj-jezioro", label: "Nad samym jeziorem" },
  { href: "/atrakcje#gotowe-plany", label: "Gotowe plany wycieczek" },
  { href: "/oferta#pory-roku", label: "Pobyt przez cały rok" },
  { href: "/kontakt#dostepnosc", label: "Dostępność i rezerwacja" },
] as const;

const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=53.8024%2C21.2638";

export function SiteFooter() {
  return (
    <>
      <footer className="site-footer" aria-labelledby="site-footer-title">
        <div className="site-footer__glow" aria-hidden="true" />
        <div className="site-footer__shell">
          <section className="site-footer__invitation">
            <div>
              <p>Krzywe Lake Houses · Mazury</p>
              <h2 id="site-footer-title">
                Zostań bliżej <em>wody.</em>
              </h2>
            </div>
            <div className="site-footer__invitation-action">
              <span>Dwa całoroczne domy, jeden spokojny brzeg.</span>
              <Link href="/kontakt#dostepnosc">
                Sprawdź dostępność <ArrowUpRight />
              </Link>
            </div>
          </section>

          <div className="site-footer__grid">
            <section className="site-footer__brand" aria-label="Krzywe Lake Houses">
              <Link className="site-footer__brand-lockup" href="/" aria-label="Krzywe Lake Houses — strona główna">
                <img src="/brand-mark.png" alt="" width="76" height="76" />
                <span>
                  <strong>Krzywe</strong>
                  <small>Lake Houses · Mazury</small>
                </span>
              </Link>
              <p>
                Dwa całoroczne domy nad Jeziorem Krzywe — między Mrągowem,
                Mikołajkami i spokojem, po który przyjeżdża się na Mazury.
              </p>
              <div className="site-footer__socials" aria-label="Media społecznościowe">
                <a href={SOCIAL_LINKS[0]} target="_blank" rel="noreferrer" aria-label="Krzywe Lake Houses na Facebooku">
                  <Facebook />
                </a>
                <a href={SOCIAL_LINKS[1]} target="_blank" rel="noreferrer" aria-label="Krzywe Lake Houses na Instagramie">
                  <Instagram />
                </a>
                <a href={DIRECTIONS_URL} target="_blank" rel="noreferrer" aria-label="Wyznacz trasę do Krzywe Lake Houses">
                  <MapPin />
                </a>
              </div>
            </section>

            <nav className="site-footer__nav" aria-label="Mapa strony">
              <p className="site-footer__label">Odkrywaj</p>
              <div>
                {primaryNavigation.map((item) => (
                  <Link href={item.href} key={item.href}>{item.label}</Link>
                ))}
              </div>
            </nav>

            <nav className="site-footer__nav site-footer__nav--sections" aria-label="Najważniejsze sekcje strony">
              <p className="site-footer__label">Najważniejsze</p>
              <div>
                {sectionNavigation.map((item) => (
                  <Link href={item.href} key={item.href}>{item.label}</Link>
                ))}
              </div>
            </nav>

            <section className="site-footer__contact" aria-label="Kontakt z Krzywe Lake Houses">
              <p className="site-footer__label">Kontakt</p>
              <address>
                <a className="site-footer__contact-row" href={`tel:${CONTACT.phoneInternational}`}>
                  <span><Phone /></span>
                  <span><small>Telefon</small><strong>{CONTACT.phoneDisplay}</strong></span>
                </a>
                <a className="site-footer__contact-row" href={`mailto:${CONTACT.email}`}>
                  <span><Mail /></span>
                  <span><small>E-mail</small><strong>{CONTACT.email}</strong></span>
                </a>
                <a className="site-footer__contact-row" href={DIRECTIONS_URL} target="_blank" rel="noreferrer">
                  <span><MapPin /></span>
                  <span><small>Adres</small><strong>{CONTACT.streetAddress}<br />{CONTACT.postalCode} {CONTACT.locality}</strong></span>
                </a>
              </address>
            </section>
          </div>

          <div className="site-footer__bottom">
            <span>© {new Date().getFullYear()} Krzywe Lake Houses</span>
            <nav aria-label="Informacje prawne">
              <Link href="/polityka-prywatnosci">Polityka prywatności</Link>
              <Link href="/regulamin">Regulamin</Link>
            </nav>
            <span>Krzywe · Jezioro · Mazury</span>
          </div>
        </div>
      </footer>

      <div className="creator-strip" data-no-translate>
        <div className="creator-strip__inner">
          <a
            className="creator-strip__credit"
            href="https://hostcontrol.pl"
            target="_blank"
            rel="noreferrer"
            aria-label="HostControl Krystian Stykowski — otwórz hostcontrol.pl"
          >
            <img src="/hostcontrol-logo.svg" alt="HostControl" width="24" height="24" />
            <span><span className="creator-strip__prefix">Stworzono przez </span><strong>HostControl Krystian Stykowski</strong></span>
          </a>
          <a className="creator-strip__phone" href="tel:+48692746031" aria-label="Zadzwoń do HostControl: 692 746 031">
            <Phone /> <span>692 746 031</span>
          </a>
        </div>
      </div>
    </>
  );
}
