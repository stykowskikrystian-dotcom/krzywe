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
    link.setAttribute("href", "#widgetHolder_mwczl89f2");
    link.removeAttribute("data-booking-modal");
    link.dataset.bookingWidget = "";
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

const createReserveButton = () => {
  document.querySelectorAll(".reserve-fab").forEach((element) => element.remove());
  const button = document.createElement("button");
  button.className = "reserve-fab";
  button.type = "button";
  button.dataset.bookingWidget = "";
  button.setAttribute("aria-label", "Przejdź do kalendarza rezerwacji");
  button.innerHTML = `
    <span class="reserve-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24"><path d="M8 2v4M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="4" /><path d="M3 10h18m-9 6 2 2 4-5" /></svg>
    </span>
    <span class="reserve-copy"><span>Zarezerwuj</span><small>sprawdź termin online</small></span>`;
  document.body.append(button);
  return button;
};

const enhanceDirectBedBookingWidget = () => {
  const hero = document.querySelector(".home-hero, .subpage-hero");
  const module = document.querySelector("#widgetHolder_mwczl89f2.hero-booking-module");
  if (!hero || !module) return null;

  const markAsLoaded = () => {
    if (module.children.length) module.dataset.widgetState = "ready";
  };

  markAsLoaded();
  new MutationObserver(markAsLoaded).observe(module, { childList: true, subtree: true });

  if ("ResizeObserver" in window) {
    const syncPanelHeight = () => {
      hero.style.setProperty("--hero-booking-panel-height", `${Math.ceil(module.getBoundingClientRect().height)}px`);
    };
    new ResizeObserver(syncPanelHeight).observe(module);
    requestAnimationFrame(syncPanelHeight);
  }

  window.setTimeout(() => {
    if (module.dataset.widgetState === "loading") module.dataset.widgetState = "error";
  }, 15000);

  return module;
};

const normaliseBookingControls = () => {
  document.querySelectorAll(".site-header .cta").forEach((link) => {
    link.textContent = "Sprawdź termin";
    link.setAttribute("href", "#widgetHolder_mwczl89f2");
    link.removeAttribute("data-booking-modal");
    link.dataset.bookingWidget = "";
  });
  document.querySelectorAll(".offer-booking-button").forEach((link) => {
    const label = link.querySelector("span");
    if (label) label.textContent = "Sprawdź termin";
    link.setAttribute("href", "#widgetHolder_mwczl89f2");
    link.removeAttribute("data-booking-modal");
    link.dataset.bookingWidget = "";
  });
  document.querySelectorAll("[data-main-booking]").forEach((link) => {
    link.textContent = "Sprawdź termin";
    link.setAttribute("href", "#widgetHolder_mwczl89f2");
    link.removeAttribute("data-booking-modal");
    link.dataset.bookingWidget = "";
  });
};

enhanceDocumentLandmarks();
enhanceMobileNavigation();
enhanceFooter();
normaliseBookingControls();

createReserveButton();
enhanceDirectBedBookingWidget();
const hero = document.querySelector(".home-hero, .subpage-hero");
if (hero) document.body.classList.add("hero-in-view");
if (hero && "IntersectionObserver" in window) {
  new IntersectionObserver(([entry]) => {
    document.body.classList.toggle("hero-in-view", entry.isIntersecting);
  }, { threshold: 0.18 }).observe(hero);
}

const isBookingTrigger = (element) => {
  if (!(element instanceof HTMLElement)) return false;
  if (element.closest(".hero-booking-module")) return false;
  if (element.matches(BOOKING_TRIGGER_SELECTOR) || element.hasAttribute("data-booking-widget") || element.hasAttribute("data-booking-modal")) return true;
  return element.matches("a, button") && BOOKING_LABEL.test(normaliseLabel(element));
};

const showBookingWidget = () => {
  const module = document.querySelector(".hero-booking-module");
  if (!module) return;

  const header = document.querySelector("[data-header]");
  header?.classList.remove("menu-open");
  header?.querySelector("[data-menu-toggle]")?.setAttribute("aria-expanded", "false");

  module.classList.remove("is-booking-highlighted");
  module.focus({ preventScroll: true });
  module.scrollIntoView({ behavior: "smooth", block: "center" });
  requestAnimationFrame(() => module.classList.add("is-booking-highlighted"));
  window.setTimeout(() => module.classList.remove("is-booking-highlighted"), 1300);
};

document.querySelectorAll("a, button").forEach((element) => {
  if (!isBookingTrigger(element)) return;
  element.setAttribute("aria-controls", "widgetHolder_mwczl89f2");
  if (element instanceof HTMLAnchorElement) element.setAttribute("href", "#widgetHolder_mwczl89f2");
});

document.addEventListener("click", (event) => {
  const trigger = event.target instanceof Element ? event.target.closest("a, button") : null;
  if (!trigger || !isBookingTrigger(trigger)) return;
  event.preventDefault();
  showBookingWidget();
});
