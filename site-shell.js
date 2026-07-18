const BOOKING_TRIGGER_SELECTOR = [
  ".site-header .cta",
  ".mobile-cta",
  ".footer-v2-hero > a",
  ".footer-reserve",
  ".reserve-fab",
  ".offer-booking-button",
  "[data-main-booking]",
].join(",");

const BOOKING_LABEL = /(?:zarezerwuj|sprawdź\s+termin(?:y)?|sprawdź\s+dostępność)/i;

const normaliseLabel = (element) => (element.textContent || "").replace(/\s+/g, " ").trim();

const enhanceMobileNavigation = () => {
  const header = document.querySelector("[data-header]");
  const toggle = header?.querySelector("[data-menu-toggle]");
  const panel = header?.querySelector("[data-mobile-panel]");
  if (!header || !toggle || !panel || panel.dataset.enhanced === "true") return;

  panel.dataset.enhanced = "true";
  panel.setAttribute("aria-label", "Menu mobilne");
  header.querySelectorAll([
    ".instagram-link",
    ".facebook-link",
    '.mobile-social-link[href*="instagram.com"]',
    '.mobile-social-link[href*="facebook.com"]',
  ].join(",")).forEach((link) => link.remove());
  const heading = panel.querySelector(".mobile-panel-heading");
  if (heading) {
    heading.innerHTML = `
      <span><small>Nawigacja</small><strong>Odkryj Krzywe</strong></span>
      <button class="mobile-panel-close" type="button" aria-label="Zamknij menu">×</button>`;
  }

  const phone = panel.querySelector(".mobile-contact-link");
  const phoneCopy = phone?.querySelector("span");
  if (phoneCopy) phoneCopy.innerHTML = "<small>Telefon</small><strong>505 586 950</strong>";

  const email = panel.querySelector('.mobile-social-link[href^="mailto:"]');
  if (email) {
    email.removeAttribute("aria-label");
    email.insertAdjacentHTML("beforeend", "<span><small>E-mail</small><strong>krzywelakehouses@icloud.com</strong></span>");
  }

  const contactRow = panel.querySelector(".mobile-contact-row");
  if (contactRow && !panel.querySelector(".mobile-address-link")) {
    contactRow.insertAdjacentHTML("afterend", `
      <a class="mobile-address-link" href="https://www.google.com/maps/dir/?api=1&amp;destination=53.802408%2C21.263949" target="_blank" rel="noopener">
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s7-6.2 7-13A7 7 0 0 0 5 9c0 6.8 7 13 7 13Z"/><circle cx="12" cy="9" r="2.3"/></svg>
        <span><small>Adres</small><strong>ul. Zwycięstwa, 11-710 Piecki</strong></span>
      </a>`);
  }

  panel.querySelectorAll(".mobile-cta").forEach((link) => {
    link.textContent = "Sprawdź termin";
    link.setAttribute("href", "./kontakt.html#zapytanie");
    link.dataset.bookingModal = "";
  });

  const closeMenu = () => {
    header.classList.remove("menu-open");
    toggle.setAttribute("aria-expanded", "false");
  };
  const syncMenuA11y = () => {
    const open = header.classList.contains("menu-open");
    panel.setAttribute("aria-hidden", String(!open));
    const label = toggle.querySelector(".sr-only");
    if (label) label.textContent = open ? "Zamknij menu" : "Otwórz menu";
  };
  new MutationObserver(syncMenuA11y).observe(header, { attributes: true, attributeFilter: ["class"] });
  syncMenuA11y();
  panel.querySelector(".mobile-panel-close")?.addEventListener("click", closeMenu);
  document.addEventListener("click", (event) => {
    if (header.classList.contains("menu-open") && event.target instanceof Node && !header.contains(event.target)) closeMenu();
  });
};

const enhanceDocumentLandmarks = () => {
  const main = document.querySelector("main");
  if (!main) return;
  if (!main.id) main.id = "main-content";
  if (document.querySelector(".skip-link")) return;
  const link = document.createElement("a");
  link.className = "skip-link";
  link.href = `#${main.id}`;
  link.textContent = "Przejdź do treści";
  document.body.prepend(link);
};

const enhanceFooter = () => {
  const footer = document.querySelector(".footer-v2");
  const grid = footer?.querySelector(".footer-v2-grid");
  if (!footer || !grid || footer.dataset.enhanced === "true") return;
  footer.dataset.enhanced = "true";

  const brand = grid.querySelector(".footer-v2-brand");
  brand?.querySelector("a")?.insertAdjacentHTML("afterend", '<span class="footer-v2-brand-kicker">Całoroczne domy · pierwsza linia jeziora</span>');
  brand?.insertAdjacentHTML("beforeend", `
    <nav class="footer-v2-socials" aria-label="Media społecznościowe">
      <a href="https://www.instagram.com/" target="_blank" rel="noopener" aria-label="Instagram Krzywe Lake Houses">
        <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></svg><span>Instagram</span>
      </a>
      <a href="https://www.facebook.com/" target="_blank" rel="noopener" aria-label="Facebook Krzywe Lake Houses">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3.5l.5-4h-4V7a1 1 0 0 1 1-1h3z"/></svg><span>Facebook</span>
      </a>
    </nav>`);

  grid.insertAdjacentHTML("beforeend", `
    <section class="footer-v2-location">
      <h3>Tu jesteśmy</h3>
      <a class="footer-v2-map-card" href="https://www.google.com/maps/dir/?api=1&amp;destination=53.802408%2C21.263949" target="_blank" rel="noopener">
        <span aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 22s7-6.2 7-13A7 7 0 0 0 5 9c0 6.8 7 13 7 13Z"/><circle cx="12" cy="9" r="2.3"/></svg></span>
        <div><small>Krzywe Lake Houses</small><strong>ul. Zwycięstwa<br>11-710 Piecki</strong></div>
      </a>
      <p>Spokojna baza na Pojezierzu Mrągowskim — blisko Piecek, Mrągowa i Mikołajek.</p>
      <a class="footer-v2-route" href="https://www.google.com/maps/dir/?api=1&amp;destination=53.802408%2C21.263949" target="_blank" rel="noopener">Wyznacz trasę <span aria-hidden="true">↗</span></a>
    </section>`);

  grid.insertAdjacentHTML("afterend", `
    <div class="footer-v2-highlights" aria-label="Najważniejsze informacje o obiekcie">
      <article><span>01</span><div><strong>Bezpośredni dostęp</strong><small>do jeziora i pomostu</small></div></article>
      <article><span>02</span><div><strong>Dwa domy</strong><small>jeden lub oba razem</small></div></article>
      <article><span>20</span><div><strong>Do 20 gości</strong><small>rodziny i grupy</small></div></article>
      <article><span>365</span><div><strong>Cały rok</strong><small>cztery pory Mazur</small></div></article>
    </div>`);
};

const createBookingModal = () => {
  const dialog = document.createElement("dialog");
  dialog.className = "booking-modal";
  dialog.setAttribute("aria-labelledby", "booking-modal-title");
  dialog.innerHTML = `
    <div class="booking-modal-card">
      <button class="booking-modal-close" type="button" aria-label="Zamknij okno rezerwacji">×</button>
      <img class="booking-modal-logo" src="./assets/krzywe-logo-horizontal-transparent.png" alt="Krzywe Lake Houses">
      <p class="booking-modal-kicker">Rezerwacje online</p>
      <h2 id="booking-modal-title">Zewnętrzny system rezerwacji wkrótce.</h2>
      <p class="booking-modal-copy">Kończymy integrację bezpiecznego systemu rezerwacji i płatności. Do tego czasu termin możesz ustalić bezpośrednio z nami — telefonicznie lub przez formularz.</p>
      <p class="booking-modal-status"><i aria-hidden="true"></i><span>Channel manager jest w przygotowaniu. Żaden klik nie potwierdza jeszcze rezerwacji.</span></p>
      <div class="booking-modal-actions">
        <a class="booking-modal-contact" href="./kontakt.html#zapytanie">Przejdź do formularza</a>
        <a href="tel:+48505586950">Zadzwoń: 505 586 950</a>
      </div>
    </div>`;
  document.body.append(dialog);
  return dialog;
};

const createReserveButton = () => {
  document.querySelectorAll(".reserve-fab").forEach((element) => element.remove());
  const button = document.createElement("button");
  button.className = "reserve-fab";
  button.type = "button";
  button.dataset.bookingModal = "";
  button.setAttribute("aria-label", "Otwórz informacje o rezerwacji");
  button.innerHTML = `
    <span class="reserve-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24"><path d="M8 2v4M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="4" /><path d="M3 10h18m-9 6 2 2 4-5" /></svg>
    </span>
    <span class="reserve-copy"><span>Zarezerwuj</span><small>system wkrótce</small></span>`;
  document.body.append(button);
  return button;
};

const createHeroBookingModule = () => {
  const hero = document.querySelector(".home-hero, .subpage-hero");
  if (!hero || document.querySelector(".hero-booking-module")) return null;

  const heroContent = hero.querySelector(".home-hero-content, .subpage-hero-content");
  const heroFacts = hero.querySelector(
    ".home-hero-facts, .homes-hero-stats, .lake-hero-stats, .attraction-hero-stats, .offer-hero-stats, .contact-hero-stats"
  );
  if (!heroContent) return null;

  const button = document.createElement("button");
  button.className = "hero-booking-module";
  button.type = "button";
  button.dataset.bookingModal = "";
  button.setAttribute("aria-label", "Sprawdź termin — system rezerwacji online wkrótce");
  button.innerHTML = `
    <span class="hero-booking-inner">
      <span class="hero-booking-heading">
        <span class="hero-booking-heading-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M8 2v4M16 2v4"/><rect x="3" y="4" width="18" height="18" rx="4"/><path d="M3 10h18m-12 4h2m3 0h2m-9 4h2m3 0h2"/></svg>
        </span>
        <span><small>Rezerwacja pobytu</small><strong>Znajdź dogodny termin</strong></span>
        <em><i aria-hidden="true"></i> System wkrótce</em>
      </span>
      <span class="hero-booking-date">
        <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M8 2v4M16 2v4"/><rect x="3" y="4" width="18" height="18" rx="4"/><path d="M3 10h18"/></svg>
        <span><small>Przyjazd</small><strong>Wybierz datę</strong></span>
      </span>
      <span class="hero-booking-arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>
      </span>
      <span class="hero-booking-date">
        <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M8 2v4M16 2v4"/><rect x="3" y="4" width="18" height="18" rx="4"/><path d="M3 10h18"/></svg>
        <span><small>Wyjazd</small><strong>Wybierz datę</strong></span>
      </span>
      <span class="hero-booking-submit">
        <span>Sprawdź termin</span>
        <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>
      </span>
    </span>`;

  if (heroFacts) heroFacts.insertAdjacentElement("afterend", button);
  else heroContent.append(button);
  return button;
};

const normaliseBookingControls = () => {
  document.querySelectorAll(".site-header .cta").forEach((link) => {
    link.textContent = "Sprawdź termin";
    link.setAttribute("href", "./kontakt.html#zapytanie");
    link.dataset.bookingModal = "";
  });
  document.querySelectorAll(".offer-booking-button").forEach((link) => {
    const label = link.querySelector("span");
    if (label) label.textContent = "Sprawdź termin";
    link.dataset.bookingModal = "";
  });
  document.querySelectorAll("[data-main-booking]").forEach((link) => {
    link.textContent = "Sprawdź termin";
    link.dataset.bookingModal = "";
  });
};

enhanceDocumentLandmarks();
enhanceMobileNavigation();
enhanceFooter();
normaliseBookingControls();

const dialog = createBookingModal();
createReserveButton();
createHeroBookingModule();
const hero = document.querySelector(".home-hero, .subpage-hero");
if (hero) document.body.classList.add("hero-in-view");
if (hero && "IntersectionObserver" in window) {
  new IntersectionObserver(([entry]) => {
    document.body.classList.toggle("hero-in-view", entry.isIntersecting);
  }, { threshold: 0.18 }).observe(hero);
}

const isBookingTrigger = (element) => {
  if (!(element instanceof HTMLElement)) return false;
  if (element.matches(BOOKING_TRIGGER_SELECTOR) || element.hasAttribute("data-booking-modal")) return true;
  return element.matches("a, button") && BOOKING_LABEL.test(normaliseLabel(element));
};

const openBookingModal = () => {
  if (dialog.open) return;
  dialog.showModal();
  document.body.classList.add("booking-modal-open");
  dialog.querySelector(".booking-modal-close")?.focus();
};

const closeBookingModal = () => {
  if (dialog.open) dialog.close();
};

document.querySelectorAll("a, button").forEach((element) => {
  if (!isBookingTrigger(element)) return;
  element.setAttribute("aria-haspopup", "dialog");
});

document.addEventListener("click", (event) => {
  const trigger = event.target instanceof Element ? event.target.closest("a, button") : null;
  if (!trigger || !isBookingTrigger(trigger)) return;
  event.preventDefault();
  openBookingModal();
});

dialog.querySelector(".booking-modal-close")?.addEventListener("click", closeBookingModal);
dialog.querySelectorAll(".booking-modal-actions a").forEach((link) => link.addEventListener("click", closeBookingModal));
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) closeBookingModal();
});
dialog.addEventListener("close", () => document.body.classList.remove("booking-modal-open"));
