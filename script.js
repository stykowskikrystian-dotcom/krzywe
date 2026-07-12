const header = document.querySelector("[data-header]");
const toggle = document.querySelector("[data-menu-toggle]");
const mobilePanel = document.querySelector("[data-mobile-panel]");
const pages = Array.from(document.querySelectorAll("[data-page]"));
const navLinks = Array.from(document.querySelectorAll("[data-nav-link]"));
const tabTransition = document.querySelector("[data-tab-transition]");
const pageIds = new Set(pages.map((page) => page.id));
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const transitionDuration = 2000;
const transitionSwitchDelay = 940;
let activePageId = null;
let pendingPageId = null;
let transitionTimers = [];

const syncHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

const closeMenu = () => {
  header.classList.remove("menu-open");
  toggle.setAttribute("aria-expanded", "false");
};

const clearTransitionTimers = () => {
  transitionTimers.forEach((timer) => window.clearTimeout(timer));
  transitionTimers = [];
};

const getPageIdFromHash = () => {
  const hash = window.location.hash.replace("#", "");
  return pageIds.has(hash) ? hash : "strona-glowna";
};

const setActivePage = (pageId, shouldScroll = false) => {
  activePageId = pageId;
  pendingPageId = null;

  pages.forEach((page) => {
    const isActive = page.id === pageId;
    page.classList.toggle("is-active", isActive);
    page.toggleAttribute("hidden", !isActive);
  });

  navLinks.forEach((link) => {
    const isActive = link.hash.replace("#", "") === pageId;
    link.classList.toggle("is-active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  closeMenu();

  if (shouldScroll) {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }
};

const playPageTransition = (pageId) => {
  if (!tabTransition || reducedMotion.matches) {
    setActivePage(pageId, true);
    return;
  }

  pendingPageId = pageId;
  clearTransitionTimers();
  tabTransition.classList.remove("is-active");
  void tabTransition.offsetWidth;
  tabTransition.classList.add("is-active");

  transitionTimers.push(
    window.setTimeout(() => {
      setActivePage(pageId, true);
    }, transitionSwitchDelay),
  );

  transitionTimers.push(
    window.setTimeout(() => {
      tabTransition.classList.remove("is-active");
      pendingPageId = null;
    }, transitionDuration),
  );
};

const navigateToPage = (pageId, shouldPush = false) => {
  if (!pageIds.has(pageId) || pageId === pendingPageId) {
    return;
  }

  if (pageId === activePageId) {
    closeMenu();
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    return;
  }

  if (shouldPush && window.location.hash !== `#${pageId}`) {
    window.history.pushState(null, "", `#${pageId}`);
  }

  closeMenu();
  playPageTransition(pageId);
};

toggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("menu-open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const pageId = link.hash.replace("#", "");

    if (!pageIds.has(pageId)) {
      return;
    }

    event.preventDefault();
    navigateToPage(pageId, true);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

window.addEventListener("popstate", () => navigateToPage(getPageIdFromHash()));
window.addEventListener("hashchange", () => navigateToPage(getPageIdFromHash()));
window.addEventListener("scroll", syncHeaderState, { passive: true });
syncHeaderState();
setActivePage(getPageIdFromHash());
