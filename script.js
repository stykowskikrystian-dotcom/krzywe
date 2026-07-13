const header = document.querySelector("[data-header]");
const toggle = document.querySelector("[data-menu-toggle]");
const mobilePanel = document.querySelector("[data-mobile-panel]");
const pages = Array.from(document.querySelectorAll("[data-page]"));
const navLinks = Array.from(document.querySelectorAll("[data-nav-link]"));
const tabTransition = document.querySelector("[data-tab-transition]");
const routeSlider = document.querySelector("[data-route-slider]");
const lakefrontGallery = document.querySelector("[data-lakefront-gallery]");
const galleryPrevButton = document.querySelector("[data-gallery-prev]");
const galleryNextButton = document.querySelector("[data-gallery-next]");
const constructionModal = document.querySelector("[data-construction-modal]");
const constructionCloseButtons = Array.from(document.querySelectorAll("[data-construction-close]"));
const constructionHomeLinks = Array.from(document.querySelectorAll("[data-construction-home]"));
const pageIds = new Set(pages.map((page) => page.id));
const homePageId = "strona-glowna";
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const introDuration = 5000;
const routeCoordinates = "53.802408,21.263949";
let activePageId = null;
let transitionTimers = [];
let routeNavigationArmed = true;
let constructionReturnFocus = null;

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

const isLockedPage = (pageId) => pageIds.has(pageId) && pageId !== homePageId;

const getPageIdFromHash = () => {
  const hash = window.location.hash.replace("#", "");
  return pageIds.has(hash) && !isLockedPage(hash) ? hash : homePageId;
};

const setActivePage = (pageId, shouldScroll = false) => {
  activePageId = pageId;

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

const playIntroTransition = () => {
  if (!tabTransition || reducedMotion.matches) {
    return;
  }

  clearTransitionTimers();
  tabTransition.classList.remove("is-active");
  void tabTransition.offsetWidth;
  tabTransition.classList.add("is-active");

  transitionTimers.push(
    window.setTimeout(() => {
      tabTransition.classList.remove("is-active");
    }, introDuration),
  );
};

const showConstructionNotice = (trigger = null) => {
  if (!constructionModal) {
    return;
  }

  constructionReturnFocus = trigger instanceof HTMLElement ? trigger : document.activeElement;
  constructionModal.hidden = false;
  document.body.classList.add("construction-open");
  window.setTimeout(() => {
    constructionModal.classList.add("is-visible");
    constructionModal.querySelector("[data-construction-home]")?.focus({ preventScroll: true });
  }, 0);
};

const hideConstructionNotice = () => {
  if (!constructionModal || constructionModal.hidden) {
    return;
  }

  constructionModal.classList.remove("is-visible");
  document.body.classList.remove("construction-open");

  window.setTimeout(
    () => {
      constructionModal.hidden = true;
      constructionReturnFocus?.focus?.({ preventScroll: true });
      constructionReturnFocus = null;
    },
    reducedMotion.matches ? 0 : 180,
  );
};

const keepHomeForLockedPage = (trigger = null) => {
  closeMenu();

  if (activePageId !== homePageId) {
    setActivePage(homePageId, true);
  }

  if (window.location.hash !== `#${homePageId}`) {
    window.history.replaceState(null, "", `#${homePageId}`);
  }

  showConstructionNotice(trigger);
};

const navigateToPage = (pageId, shouldPush = false, trigger = null) => {
  if (!pageIds.has(pageId)) {
    return;
  }

  if (isLockedPage(pageId)) {
    keepHomeForLockedPage(trigger);
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
  setActivePage(pageId, true);
};

const handleHashChange = () => {
  const hash = window.location.hash.replace("#", "");

  if (!pageIds.has(hash)) {
    return;
  }

  if (isLockedPage(hash)) {
    keepHomeForLockedPage();
    return;
  }

  navigateToPage(hash);
};

const getRouteNavigationUrl = () => {
  const isAppleDevice = /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent);

  if (isAppleDevice) {
    return `https://maps.apple.com/?daddr=${routeCoordinates}&dirflg=d`;
  }

  return `https://www.google.com/maps/dir/?api=1&destination=${routeCoordinates}&travelmode=driving`;
};

const setRouteSliderProgress = () => {
  if (!routeSlider) {
    return;
  }

  const sliderShell = routeSlider.closest(".route-slider");
  sliderShell?.style.setProperty("--route-progress", `${routeSlider.value}%`);
};

const resetRouteSlider = () => {
  if (!routeSlider) {
    return;
  }

  routeSlider.value = "0";
  setRouteSliderProgress();
  routeNavigationArmed = true;
};

const handleRouteSliderInput = () => {
  if (!routeSlider) {
    return;
  }

  setRouteSliderProgress();

  if (Number(routeSlider.value) < 96 || !routeNavigationArmed) {
    return;
  }

  routeNavigationArmed = false;
  routeSlider.value = "100";
  setRouteSliderProgress();
  window.open(getRouteNavigationUrl(), "_blank", "noopener");
  window.setTimeout(resetRouteSlider, 700);
};

const updateGalleryControls = () => {
  if (!lakefrontGallery || !galleryPrevButton || !galleryNextButton) {
    return;
  }

  const maxScroll = lakefrontGallery.scrollWidth - lakefrontGallery.clientWidth;
  galleryPrevButton.disabled = lakefrontGallery.scrollLeft <= 4;
  galleryNextButton.disabled = lakefrontGallery.scrollLeft >= maxScroll - 4;
};

const scrollLakefrontGallery = (direction) => {
  if (!lakefrontGallery) {
    return;
  }

  const scrollAmount = Math.max(lakefrontGallery.clientWidth * 0.72, 280);
  lakefrontGallery.scrollBy({
    left: scrollAmount * direction,
    behavior: reducedMotion.matches ? "auto" : "smooth",
  });

  window.setTimeout(updateGalleryControls, reducedMotion.matches ? 0 : 360);
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
    navigateToPage(pageId, true, link);
  });
});

constructionCloseButtons.forEach((button) => {
  button.addEventListener("click", hideConstructionNotice);
});

constructionHomeLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    hideConstructionNotice();
    navigateToPage(homePageId, true, link);
  });
});

constructionModal?.addEventListener("click", (event) => {
  if (event.target === constructionModal) {
    hideConstructionNotice();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideConstructionNotice();
    closeMenu();
  }
});

window.addEventListener("popstate", handleHashChange);
window.addEventListener("hashchange", handleHashChange);
window.addEventListener("scroll", syncHeaderState, { passive: true });
routeSlider?.addEventListener("input", handleRouteSliderInput);
routeSlider?.addEventListener("pointerdown", () => {
  routeNavigationArmed = true;
});
galleryPrevButton?.addEventListener("click", () => scrollLakefrontGallery(-1));
galleryNextButton?.addEventListener("click", () => scrollLakefrontGallery(1));
lakefrontGallery?.addEventListener("scroll", updateGalleryControls, { passive: true });
window.addEventListener("resize", updateGalleryControls);
setRouteSliderProgress();
updateGalleryControls();
syncHeaderState();
const initialHash = window.location.hash.replace("#", "");
setActivePage(getPageIdFromHash());
if (isLockedPage(initialHash)) {
  window.history.replaceState(null, "", `#${homePageId}`);
  window.setTimeout(
    () => showConstructionNotice(),
    reducedMotion.matches ? 0 : introDuration + 80,
  );
}
if (window.location.hash && !pageIds.has(window.location.hash.replace("#", ""))) {
  window.setTimeout(() => {
    document.getElementById(window.location.hash.replace("#", ""))?.scrollIntoView({ block: "start" });
  }, 0);
}
playIntroTransition();
