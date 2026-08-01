"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Calendar, Facebook, Instagram, Mail, MapPin, Phone } from "./Icons";
import { BedBookingWidget } from "./BedBookingWidget";
import {
  LANGUAGE_EVENT,
  LANGUAGE_STORAGE_KEY,
  setSiteLanguage,
  type SiteLanguage,
} from "./LanguageController";

const FACEBOOK_URL = "https://www.facebook.com/krzywelakehousesmazury";
const INSTAGRAM_URL = "https://www.instagram.com/krzywelakehousesmazury/";
const EMAIL_URL = "mailto:krzywelakehouses@gmail.com";
const DIRECTIONS_URL = "https://www.google.com/maps/dir/?api=1&destination=53.8024%2C21.2638";

const navigation = [
  { href: "/", label: "Strona główna" },
  { href: "/domy-i-galeria", label: "Domy i galeria" },
  { href: "/jezioro-krzywe", label: "Jezioro Krzywe" },
  { href: "/atrakcje", label: "Atrakcje" },
  { href: "/oferta", label: "Oferta" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/blog", label: "Blog" },
];

function LanguageFlag({ language }: { language: SiteLanguage }) {
  if (language === "pl") {
    return (
      <svg className="language-toggle__flag" viewBox="0 0 28 18" aria-hidden="true">
        <rect width="28" height="18" rx="2.5" fill="#fff" />
        <path d="M0 9h28v6.5A2.5 2.5 0 0 1 25.5 18h-23A2.5 2.5 0 0 1 0 15.5V9Z" fill="#dc143c" />
      </svg>
    );
  }

  return (
    <svg className="language-toggle__flag" viewBox="0 0 28 18" aria-hidden="true">
      <rect width="28" height="18" rx="2.5" fill="#17365d" />
      <path d="M0 0 28 18M28 0 0 18" stroke="#fff" strokeWidth="4.4" />
      <path d="M0 0 28 18M28 0 0 18" stroke="#c8102e" strokeWidth="1.7" />
      <path d="M14 0v18M0 9h28" stroke="#fff" strokeWidth="6" />
      <path d="M14 0v18M0 9h28" stroke="#c8102e" strokeWidth="3.2" />
    </svg>
  );
}

export function SiteHeader({ activePath = "" }: { activePath?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState<SiteLanguage>("pl");
  const bookingButtonRef = useRef<HTMLButtonElement>(null);
  const bookingCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 24);

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    const syncLanguage = () => {
      const active = document.documentElement.dataset.language
        || localStorage.getItem(LANGUAGE_STORAGE_KEY);
      setLanguage(active === "en" ? "en" : "pl");
    };

    syncLanguage();
    const onLanguage = (event: Event) => {
      setLanguage((event as CustomEvent<SiteLanguage>).detail === "en" ? "en" : "pl");
    };
    const rootObserver = new MutationObserver(syncLanguage);
    rootObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang", "data-language"],
    });
    window.addEventListener(LANGUAGE_EVENT, onLanguage);
    return () => {
      rootObserver.disconnect();
      window.removeEventListener(LANGUAGE_EVENT, onLanguage);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen && !bookingOpen) return;

    const scrollPosition = window.scrollY;
    const previousBodyStyles = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = "100%";

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyStyles.overflow;
      document.body.style.position = previousBodyStyles.position;
      document.body.style.top = previousBodyStyles.top;
      document.body.style.width = previousBodyStyles.width;
      window.scrollTo(0, scrollPosition);
    };
  }, [bookingOpen, menuOpen]);

  useEffect(() => {
    if (!menuOpen && !bookingOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (bookingOpen) {
        setBookingOpen(false);
        requestAnimationFrame(() => bookingButtonRef.current?.focus());
      } else {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [bookingOpen, menuOpen]);

  useEffect(() => {
    if (bookingOpen) bookingCloseRef.current?.focus();
  }, [bookingOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((current) => !current);
  };

  const openBooking = () => {
    setMenuOpen(false);
    setBookingOpen(true);
  };

  const closeBooking = () => {
    setBookingOpen(false);
    requestAnimationFrame(() => bookingButtonRef.current?.focus());
  };

  return (
    <>
      <div className="site-header-slot" aria-hidden="true" />
      <header
        className={`site-header${scrolled ? " is-scrolled" : ""}${menuOpen ? " is-menu-open" : ""}`}
      >
        <Link className="brand" href="/" aria-label="Krzywe Lake Houses — strona główna">
          <img src="/brand-mark.png" alt="" />
          <span className="brand__name">
            Krzywe
            <small>Lake Houses · Mazury</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Główna nawigacja">
          {navigation.map((item) => (
            <Link
              key={item.href}
              className={activePath === item.href ? "is-active" : ""}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <button
            className="language-toggle"
            type="button"
            data-no-translate
            aria-label={language === "pl" ? "Zmień język na angielski" : "Switch language to Polish"}
            title={language === "pl" ? "English" : "Polski"}
            onClick={() => {
              const next = document.documentElement.dataset.language === "en" ? "pl" : "en";
              setLanguage(next);
              setSiteLanguage(next);
            }}
          >
            <LanguageFlag language={language} />
            <small>{language.toUpperCase()}</small>
          </button>
          <div className="header-socials" aria-label="Szybki kontakt i media społecznościowe">
            <a
              className="header-social-link header-phone-link"
              href="tel:+48505586950"
              aria-label="Zadzwoń: 505 586 950"
            >
              <Phone />
            </a>
            <a
              className="header-social-link"
              href={FACEBOOK_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Krzywe Lake Houses na Facebooku"
            >
              <Facebook />
            </a>
            <a
              className="header-social-link"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Krzywe Lake Houses na Instagramie"
            >
              <Instagram />
            </a>
            <a
              className="header-social-link"
              href={EMAIL_URL}
              aria-label="Napisz e-mail: krzywelakehouses@gmail.com"
            >
              <Mail />
            </a>
          </div>
          <button
            className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
            type="button"
            aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        className={`mobile-menu${menuOpen ? " is-open" : ""}`}
        role="dialog"
        aria-modal={menuOpen}
        aria-hidden={!menuOpen}
        aria-label="Menu główne"
      >
        <div className="mobile-menu__meta">
          <span>Menu główne</span>
          <span>Krzywe · Mazury</span>
        </div>
        <nav aria-label="Nawigacja mobilna">
          {navigation.map((item) => (
            <Link
              key={item.href}
              className={activePath === item.href ? "is-active" : ""}
              href={item.href}
              onClick={closeMenu}
            >
              <span>{item.label}</span>
              <ArrowUpRight />
            </Link>
          ))}
        </nav>

        <section className="mobile-menu__stay" aria-label="Najważniejsze informacje o pobycie">
          <div className="mobile-menu__stay-copy">
            <small>Bliskość, którą czuć od rana</small>
            <strong>Modern lub Loft — tuż nad Jeziorem Krzywe</strong>
          </div>
          <div className="mobile-menu__stay-facts property-facts property-facts--menu" aria-label="Parametry obiektu">
            <span><strong>2</strong><small>niezależne domy</small></span>
            <span><strong>do 20</strong><small>gości łącznie</small></span>
            <span><strong>10 m</strong><small>od brzegu jeziora</small></span>
          </div>
          <div className="mobile-menu__legal">
            <Link href="/polityka-prywatnosci" onClick={closeMenu}>Polityka prywatności</Link>
            <Link href="/regulamin" onClick={closeMenu}>Regulamin</Link>
          </div>
        </section>

        <section className="mobile-menu__calendar" aria-label="Wybierz termin pobytu">
          {menuOpen ? <BedBookingWidget targetId="widgetHolder_mobile_navigation" /> : null}
        </section>

        <div className="mobile-menu__quick" aria-label="Szybki kontakt">
          <a className="mobile-menu__quick-phone" href="tel:+48505586950">
            <Phone /><span>505 586 950</span>
          </a>
          <a href={EMAIL_URL} aria-label="Napisz e-mail">
            <Mail />
          </a>
          <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" aria-label="Facebook">
            <Facebook />
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram">
            <Instagram />
          </a>
          <a
            className="mobile-menu__quick-route"
            href={DIRECTIONS_URL}
            onClick={closeMenu}
          >
            <MapPin /><span>Prowadź</span>
          </a>
        </div>

      </div>

      <button
        ref={bookingButtonRef}
        className={`booking-fab${menuOpen || bookingOpen ? " is-hidden" : ""}`}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={bookingOpen}
        aria-controls="booking-dialog"
        onClick={openBooking}
      >
        <span className="booking-fab__icon"><Calendar /></span>
        <span>Zarezerwuj</span>
        <ArrowUpRight />
      </button>

      <div
        className={`booking-modal${bookingOpen ? " is-open" : ""}`}
        aria-hidden={!bookingOpen}
      >
        <button
          className="booking-modal__backdrop"
          type="button"
          aria-label="Zamknij panel rezerwacji, klikając tło"
          tabIndex={-1}
          onClick={closeBooking}
        />
        <section
          id="booking-dialog"
          className="booking-modal__panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-dialog-title"
        >
          <header className="booking-modal__header">
            <div>
              <span>Rezerwacja bezpośrednia</span>
              <h2 id="booking-dialog-title">Wybierz termin pobytu</h2>
              <p>Sprawdź dostępność domów Modern i Loft nad Jeziorem Krzywe.</p>
            </div>
            <button
              ref={bookingCloseRef}
              className="booking-modal__close"
              type="button"
              aria-label="Zamknij panel rezerwacji"
              onClick={closeBooking}
            >
              <span />
              <span />
            </button>
          </header>

          <div className="booking-modal__widget">
            {bookingOpen ? <BedBookingWidget targetId="widgetHolder_booking_dialog" /> : null}
          </div>

          <footer className="booking-modal__footer">
            <span><i aria-hidden="true" /> Aktualne terminy</span>
            <span><i aria-hidden="true" /> Rezerwacja bezpośrednia</span>
            <span><i aria-hidden="true" /> Bez dodatkowych pośredników</span>
          </footer>
        </section>
      </div>
    </>
  );
}
