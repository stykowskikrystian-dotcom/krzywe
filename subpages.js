const header = document.querySelector("[data-header]");
const toggle = document.querySelector("[data-menu-toggle]");
const contactForm = document.querySelector("[data-contact-form]");

const closeMenu = () => {
  header?.classList.remove("menu-open");
  toggle?.setAttribute("aria-expanded", "false");
};

toggle?.addEventListener("click", () => {
  const isOpen = header.classList.toggle("menu-open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll("[data-mobile-panel] a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
}, { passive: true });

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

if (contactForm) {
  const arrivalInput = contactForm.querySelector("[data-arrival]");
  const departureInput = contactForm.querySelector("[data-departure]");
  const guestInputs = [...contactForm.querySelectorAll("[data-guests]")];
  const houseInputs = [...contactForm.querySelectorAll('input[name="house"]')];
  const stayInputs = [...contactForm.querySelectorAll('input[name="stayType"]')];
  const status = contactForm.querySelector("[data-contact-status]");
  const summaryDate = document.querySelector("[data-summary-date]");
  const summaryNights = document.querySelector("[data-summary-nights]");
  const summaryGuests = document.querySelector("[data-summary-guests]");
  const summaryHouse = document.querySelector("[data-summary-house]");
  const summaryStay = document.querySelector("[data-summary-stay]");
  const summaryYoungest = document.querySelector("[data-summary-youngest]");
  const dateFormatter = new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric" });

  const toLocalDate = (value) => value ? new Date(`${value}T12:00:00`) : null;
  const toInputDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const pluralizeNights = (count) => {
    if (count === 1) return "1 noc";
    const lastTwo = count % 100;
    const last = count % 10;
    if (last >= 2 && last <= 4 && !(lastTwo >= 12 && lastTwo <= 14)) return `${count} noce`;
    return `${count} nocy`;
  };
  const guestLabel = (adults, childrenOver4, childrenUnder4) => {
    const adultText = adults === 1 ? "1 dorosły" : `${adults} dorosłych`;
    const children = childrenOver4 + childrenUnder4;
    if (!children) return adultText;
    const childText = children === 1 ? "1 dziecko" : `${children} dzieci`;
    return `${adultText}, ${childText}`;
  };

  const setDateLimits = () => {
    const today = new Date();
    today.setHours(12, 0, 0, 0);
    if (arrivalInput) arrivalInput.min = toInputDate(today);
    if (departureInput) departureInput.min = toInputDate(today);
  };

  const updateSummary = () => {
    const arrival = toLocalDate(arrivalInput?.value);
    const departure = toLocalDate(departureInput?.value);
    const adults = Math.max(1, Number(guestInputs.find((input) => input.name === "adults")?.value) || 1);
    const childrenOver4 = Math.max(0, Number(guestInputs.find((input) => input.name === "childrenOver4")?.value) || 0);
    const childrenUnder4 = Math.max(0, Number(guestInputs.find((input) => input.name === "childrenUnder4")?.value) || 0);
    const house = houseInputs.find((input) => input.checked)?.value || "Jeden dom";
    const stay = stayInputs.find((input) => input.checked)?.value || "Pobyt rodzinny";
    const validRange = arrival && departure && departure > arrival;

    if (summaryDate) {
      summaryDate.textContent = validRange
        ? `${dateFormatter.format(arrival)} — ${dateFormatter.format(departure)}`
        : "Wybierz daty pobytu";
    }
    if (summaryNights) {
      const nights = validRange ? Math.round((departure - arrival) / 86400000) : 0;
      summaryNights.textContent = nights ? pluralizeNights(nights) : "—";
    }
    if (summaryGuests) summaryGuests.textContent = guestLabel(adults, childrenOver4, childrenUnder4);
    if (summaryHouse) summaryHouse.textContent = house;
    if (summaryStay) summaryStay.textContent = stay;
    if (summaryYoungest) summaryYoungest.textContent = childrenUnder4
      ? `${childrenUnder4} ${childrenUnder4 === 1 ? "dziecko" : "dzieci"} · z rodzicami`
      : "Brak dzieci do 4 lat";
  };

  arrivalInput?.addEventListener("change", () => {
    const arrival = toLocalDate(arrivalInput.value);
    if (arrival && departureInput) {
      const nextDay = new Date(arrival);
      nextDay.setDate(nextDay.getDate() + 1);
      departureInput.min = toInputDate(nextDay);
      if (!departureInput.value || toLocalDate(departureInput.value) <= arrival) {
        departureInput.value = toInputDate(nextDay);
      }
    }
    departureInput?.setCustomValidity("");
    updateSummary();
  });

  departureInput?.addEventListener("change", () => {
    const arrival = toLocalDate(arrivalInput?.value);
    const departure = toLocalDate(departureInput.value);
    departureInput.setCustomValidity(arrival && departure <= arrival ? "Data wyjazdu musi być późniejsza niż data przyjazdu." : "");
    updateSummary();
  });

  [...guestInputs, ...houseInputs, ...stayInputs].forEach((input) => {
    input.addEventListener("input", updateSummary);
    input.addEventListener("change", updateSummary);
  });

  document.querySelectorAll(".contact-faq-list details").forEach((details) => {
    details.addEventListener("toggle", () => {
      if (!details.open) return;
      document.querySelectorAll(".contact-faq-list details").forEach((other) => {
        if (other !== details) other.open = false;
      });
    });
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const arrival = toLocalDate(arrivalInput?.value);
    const departure = toLocalDate(departureInput?.value);
    if (arrival && departure && departure <= arrival) {
      departureInput?.setCustomValidity("Data wyjazdu musi być późniejsza niż data przyjazdu.");
      departureInput?.reportValidity();
      return;
    }

    const data = new FormData(contactForm);
    const adults = Number(data.get("adults")) || 1;
    const childrenOver4 = Number(data.get("childrenOver4")) || 0;
    const childrenUnder4 = Number(data.get("childrenUnder4")) || 0;
    const nights = arrival && departure ? Math.round((departure - arrival) / 86400000) : 0;
    const subject = encodeURIComponent(`Zapytanie o pobyt ${data.get("arrival") || ""}–${data.get("departure") || ""} – ${data.get("name") || "Krzywe Lake Houses"}`);
    const body = encodeURIComponent(
      [
        "Dzień dobry,",
        "",
        "proszę o informację o dostępności i aktualnej cenie pobytu:",
        "",
        `Imię i nazwisko: ${data.get("name") || ""}`,
        `Telefon: ${data.get("phone") || "nie podano"}`,
        `E-mail: ${data.get("email") || ""}`,
        `Przyjazd: ${data.get("arrival") || ""}`,
        `Wyjazd: ${data.get("departure") || ""}`,
        `Długość pobytu: ${nights ? pluralizeNights(nights) : "do ustalenia"}`,
        `Dorośli: ${adults}`,
        `Dzieci powyżej 4 lat: ${childrenOver4}`,
        `Dzieci do 4 lat: ${childrenUnder4} (śpią w łóżku z rodzicami)`,
        `Domy: ${data.get("house") || "do ustalenia"}`,
        `Sezon / wariant z oferty: ${data.get("season") || "nie wybrano"}`,
        `Charakter pobytu: ${data.get("stayType") || "do ustalenia"}`,
        "Zasady: obiekt bezdymny, zwierzęta nie są akceptowane",
        "",
        "Dodatkowe informacje:",
        data.get("message") || "Brak dodatkowych informacji.",
        "",
        "Pozdrawiam",
        data.get("name") || "",
      ].join("\n"),
    );
    if (status) status.textContent = "Wiadomość jest gotowa — otwieramy Twoją aplikację pocztową.";
    window.setTimeout(() => {
      window.location.href = `mailto:krzywelakehouses@icloud.com?subject=${subject}&body=${body}`;
    }, 120);
  });

  setDateLimits();
  const query = new URLSearchParams(window.location.search);
  const requestedStay = query.get("stay");
  const requestedSeason = query.get("season");
  const stayBySlug = {
    rodzina: "Pobyt rodzinny",
    grupa: "Kameralny wyjazd grupowy",
    spokoj: "Spokojny wypoczynek",
    workation: "Praca zdalna i odpoczynek",
  };
  const matchingStay = stayInputs.find((input) => input.value === stayBySlug[requestedStay]);
  if (matchingStay) matchingStay.checked = true;
  if (requestedSeason) {
    const seasonField = document.createElement("input");
    seasonField.type = "hidden";
    seasonField.name = "season";
    seasonField.value = requestedSeason;
    contactForm.append(seasonField);
    if (status) status.textContent = `Przeniesiono wybór z Oferty: ${requestedSeason}. Uzupełnij termin i dane kontaktowe.`;
  }
  updateSummary();
}

const offerPage = document.querySelector(".offer-page");

if (offerPage) {
  const seasonButtons = [...offerPage.querySelectorAll("[data-offer-season]")];
  const seasonPanels = [...offerPage.querySelectorAll("[data-season-panel]")];
  const audienceButtons = [...offerPage.querySelectorAll("[data-offer-audience]")];
  const audiencePanels = [...offerPage.querySelectorAll("[data-audience-panel]")];
  const mainBooking = offerPage.querySelector("[data-main-booking]");
  const offerQuery = new URLSearchParams(window.location.search);
  const seasonBySlug = { wiosna: "spring", lato: "summer", jesien: "autumn", zima: "winter" };
  const requestedOfferSeason = seasonBySlug[offerQuery.get("season")];
  const requestedOfferAudience = offerQuery.get("stay");
  let activeSeason = requestedOfferSeason || "spring";
  let activeAudience = ["rodzina", "grupa", "workation"].includes(requestedOfferAudience) ? requestedOfferAudience : "rodzina";
  const seasonSlugs = { spring: "wiosna", summer: "lato", autumn: "jesien", winter: "zima" };

  const contactHref = (season, audience) => {
    const params = new URLSearchParams();
    if (season) params.set("season", seasonSlugs[season] || season);
    if (audience) params.set("stay", audience);
    return `./kontakt.html?${params.toString()}#zapytanie`;
  };

  const updateBookingLinks = () => {
    offerPage.querySelectorAll("[data-booking-link]").forEach((link) => {
      link.href = contactHref(link.dataset.season, activeAudience);
    });
    offerPage.querySelectorAll("[data-audience-booking]").forEach((link) => {
      link.href = contactHref(activeSeason, activeAudience);
    });
    if (mainBooking) mainBooking.href = contactHref(activeSeason, activeAudience);
  };

  const selectSeason = (season) => {
    activeSeason = season;
    seasonButtons.forEach((button) => {
      const selected = button.dataset.offerSeason === season;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-selected", String(selected));
    });
    seasonPanels.forEach((panel) => {
      panel.hidden = panel.dataset.seasonPanel !== season;
    });
    updateBookingLinks();
  };

  const selectAudience = (audience) => {
    activeAudience = audience;
    audienceButtons.forEach((button) => {
      const selected = button.dataset.offerAudience === audience;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-selected", String(selected));
    });
    audiencePanels.forEach((panel) => {
      panel.hidden = panel.dataset.audiencePanel !== audience;
    });
    updateBookingLinks();
  };

  seasonButtons.forEach((button) => {
    button.addEventListener("click", () => selectSeason(button.dataset.offerSeason));
  });
  audienceButtons.forEach((button) => {
    button.addEventListener("click", () => selectAudience(button.dataset.offerAudience));
  });

  offerPage.querySelectorAll(".offer-faq details").forEach((details) => {
    details.addEventListener("toggle", () => {
      if (!details.open) return;
      offerPage.querySelectorAll(".offer-faq details").forEach((other) => {
        if (other !== details) other.open = false;
      });
    });
  });

  selectSeason(activeSeason);
  selectAudience(activeAudience);
}

const attractionsGrid = document.querySelector("[data-attractions-grid]");

if (attractionsGrid) {
  const cards = [...attractionsGrid.querySelectorAll(".attraction-card")];
  const search = document.querySelector("[data-attraction-search]");
  const regionSelect = document.querySelector("[data-attraction-region]");
  const categoryButtons = [...document.querySelectorAll("[data-attraction-category]")];
  const savedFilter = document.querySelector("[data-saved-filter]");
  const savedCount = document.querySelector("[data-saved-count]");
  const resultCount = document.querySelector("[data-attraction-count]");
  const loadMore = document.querySelector("[data-attraction-more]");
  const emptyState = document.querySelector("[data-attraction-empty]");
  const resetButtons = [...document.querySelectorAll("[data-attraction-reset], [data-attraction-empty-reset]")];
  const quickRegionLinks = [...document.querySelectorAll("[data-quick-region]")];
  const featuredLinks = [...document.querySelectorAll("[data-jump-attraction]")];
  const storageKey = "krzywe-saved-attractions";
  const pageSize = 12;
  let category = "all";
  let region = "all";
  let query = "";
  let showSavedOnly = false;
  let visibleLimit = pageSize;
  let saved = new Set();

  const normalize = (value = "") => value
    .toLocaleLowerCase("pl")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

  const regionOverrides = new Map([
    ["ferma jeleniowatych w kosewie", "kosewo"],
    ["jezioro nidzkie i puszcza piska", "ruciane"],
  ]);

  cards.forEach((card, index) => {
    const title = card.querySelector("h3")?.textContent?.trim() || `Miejsce ${index + 1}`;
    const normalizedTitle = normalize(title);
    const titleSlug = normalizedTitle
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    if (!card.id) card.id = `attraction-${titleSlug}`;
    if (regionOverrides.has(normalizedTitle)) card.dataset.region = regionOverrides.get(normalizedTitle);

    // The photo and the main source led to the same page. Keep the photo clickable,
    // but remove the duplicate visible call-to-action and add useful navigation instead.
    card.querySelector(".attraction-photo-link > span")?.remove();
    const primaryLink = card.querySelector(":scope > .attraction-link");
    if (primaryLink && !card.querySelector(".attraction-card-actions")) {
      const metaLocation = card.querySelector(".attraction-card-meta span")?.textContent?.trim() || "Mazury";
      const destination = card.dataset.address || `${title}, ${metaLocation}`;
      const actions = document.createElement("div");
      actions.className = "attraction-card-actions";
      primaryLink.before(actions);
      actions.append(primaryLink);

      const navigationLink = document.createElement("a");
      navigationLink.className = "attraction-nav";
      navigationLink.href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
      navigationLink.target = "_blank";
      navigationLink.rel = "noopener noreferrer";
      navigationLink.setAttribute("aria-label", `Nawiguj do: ${title}`);
      navigationLink.innerHTML = 'Nawiguj <svg aria-hidden="true"><use href="#attraction-icon-map"/></svg>';
      actions.append(navigationLink);
    }
    card.dataset.searchText = normalize(`${card.dataset.name || ""} ${card.textContent || ""}`);
  });

  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) || "[]");
    if (Array.isArray(stored)) saved = new Set(stored);
  } catch {
    saved = new Set();
  }

  const saveFavorites = () => {
    try {
      localStorage.setItem(storageKey, JSON.stringify([...saved]));
    } catch {
      // The guide remains fully usable when storage is unavailable.
    }
  };

  const updateSavedUi = () => {
    cards.forEach((card) => {
      const button = card.querySelector("[data-save-attraction]");
      const isSaved = saved.has(card.id);
      const attractionName = card.querySelector("h3")?.textContent || "atrakcję";
      button?.setAttribute("aria-pressed", String(isSaved));
      button?.setAttribute("aria-label", isSaved ? `Usuń z zapisanych: ${attractionName}` : `Zapisz: ${attractionName}`);
      card.classList.toggle("is-saved", isSaved);
    });
    if (savedCount) savedCount.textContent = String(saved.size);
  };

  const matchingCards = () => cards.filter((card) => {
    const matchesCategory = category === "all" || card.dataset.category?.split(" ").includes(category);
    const matchesRegion = region === "all" || card.dataset.region === region;
    const matchesQuery = !query || card.dataset.searchText.includes(query);
    const matchesSaved = !showSavedOnly || saved.has(card.id);
    return matchesCategory && matchesRegion && matchesQuery && matchesSaved;
  });

  const render = () => {
    const matches = matchingCards();
    const visible = matches.slice(0, visibleLimit);
    const visibleIds = new Set(visible.map((card) => card.id));

    cards.forEach((card) => {
      card.hidden = !visibleIds.has(card.id);
    });

    const shown = Math.min(matches.length, visibleLimit);
    if (resultCount) {
      const resultLabel = matches.length === 1 ? "pasującej atrakcji" : "pasujących atrakcji";
      resultCount.textContent = matches.length
        ? `Pokazujemy ${shown} z ${matches.length} ${resultLabel}`
        : "Brak atrakcji pasujących do filtrów";
    }

    if (emptyState) emptyState.hidden = matches.length > 0;
    if (loadMore) {
      const remaining = Math.max(0, matches.length - shown);
      loadMore.hidden = remaining === 0;
      const badge = loadMore.querySelector("span");
      if (badge) badge.textContent = `+${Math.min(pageSize, remaining)}`;
    }
  };

  const setCategory = (nextCategory) => {
    category = nextCategory;
    categoryButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.attractionCategory === category));
    });
  };

  const resetFilters = () => {
    category = "all";
    region = "all";
    query = "";
    showSavedOnly = false;
    visibleLimit = pageSize;
    setCategory("all");
    if (search) search.value = "";
    if (regionSelect) regionSelect.value = "all";
    savedFilter?.setAttribute("aria-pressed", "false");
    render();
  };

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setCategory(button.dataset.attractionCategory || "all");
      visibleLimit = pageSize;
      render();
    });
  });

  search?.addEventListener("input", () => {
    query = normalize(search.value);
    visibleLimit = pageSize;
    render();
  });

  regionSelect?.addEventListener("change", () => {
    region = regionSelect.value;
    visibleLimit = pageSize;
    render();
  });

  savedFilter?.addEventListener("click", () => {
    showSavedOnly = !showSavedOnly;
    savedFilter.setAttribute("aria-pressed", String(showSavedOnly));
    visibleLimit = pageSize;
    render();
  });

  cards.forEach((card) => {
    card.querySelector("[data-save-attraction]")?.addEventListener("click", () => {
      if (saved.has(card.id)) saved.delete(card.id);
      else saved.add(card.id);
      saveFavorites();
      updateSavedUi();
      render();
    });
  });

  loadMore?.addEventListener("click", () => {
    visibleLimit += pageSize;
    render();
  });

  resetButtons.forEach((button) => button.addEventListener("click", resetFilters));

  quickRegionLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      region = link.dataset.quickRegion || "all";
      query = "";
      showSavedOnly = false;
      visibleLimit = pageSize;
      setCategory("all");
      if (regionSelect) regionSelect.value = region;
      if (search) search.value = "";
      savedFilter?.setAttribute("aria-pressed", "false");
      render();
      document.querySelector("#przewodnik")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  featuredLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.getElementById(link.dataset.jumpAttraction || "");
      if (!target) return;
      event.preventDefault();
      category = "all";
      region = "all";
      query = "";
      showSavedOnly = false;
      visibleLimit = cards.length;
      setCategory("all");
      if (regionSelect) regionSelect.value = "all";
      if (search) search.value = "";
      savedFilter?.setAttribute("aria-pressed", "false");
      render();
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      target.animate?.(
        [{ boxShadow: "0 0 0 0 rgba(166, 100, 47, 0)" }, { boxShadow: "0 0 0 5px rgba(166, 100, 47, 0.34)" }, { boxShadow: "0 0 0 0 rgba(166, 100, 47, 0)" }],
        { duration: 1100, easing: "ease-out" },
      );
    });
  });

  document.querySelectorAll(".attraction-plan-grid details").forEach((details) => {
    details.addEventListener("toggle", () => {
      if (!details.open) return;
      document.querySelectorAll(".attraction-plan-grid details").forEach((other) => {
        if (other !== details) other.open = false;
      });
    });
  });

  document.querySelectorAll(".attraction-faq .contact-faq-list details").forEach((details) => {
    details.addEventListener("toggle", () => {
      if (!details.open) return;
      document.querySelectorAll(".attraction-faq .contact-faq-list details").forEach((other) => {
        if (other !== details) other.open = false;
      });
    });
  });

  updateSavedUi();
  render();
}

const lakePage = document.querySelector(".lake-page");

if (lakePage) {
  const rhythmButtons = [...lakePage.querySelectorAll("[data-lake-rhythm]")];
  const rhythmPanels = [...lakePage.querySelectorAll("[data-lake-rhythm-panel]")];
  const activityButtons = [...lakePage.querySelectorAll("[data-lake-activity]")];
  const activityPanels = [...lakePage.querySelectorAll("[data-lake-activity-panel]")];
  const lightbox = document.querySelector("[data-lake-lightbox]");
  const lightboxImage = lightbox?.querySelector("[data-lake-lightbox-image]");
  const lightboxCaption = lightbox?.querySelector("[data-lake-lightbox-caption]");
  const lightboxClose = lightbox?.querySelector("[data-lake-lightbox-close]");

  const selectTab = (buttons, panels, buttonDataKey, panelDataKey, value, focus = false) => {
    buttons.forEach((button) => {
      const selected = button.dataset[buttonDataKey] === value;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
      if (selected && focus) button.focus();
    });
    panels.forEach((panel) => {
      panel.hidden = panel.dataset[panelDataKey] !== value;
    });
  };

  const bindTabs = (buttons, panels, buttonDataKey, panelDataKey) => {
    buttons.forEach((button, index) => {
      button.addEventListener("click", () => {
        selectTab(buttons, panels, buttonDataKey, panelDataKey, button.dataset[buttonDataKey]);
      });
      button.addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        let nextIndex = index;
        if (event.key === "ArrowLeft") nextIndex = (index - 1 + buttons.length) % buttons.length;
        if (event.key === "ArrowRight") nextIndex = (index + 1) % buttons.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = buttons.length - 1;
        const next = buttons[nextIndex];
        selectTab(buttons, panels, buttonDataKey, panelDataKey, next.dataset[buttonDataKey], true);
      });
    });
  };

  bindTabs(rhythmButtons, rhythmPanels, "lakeRhythm", "lakeRhythmPanel");
  bindTabs(activityButtons, activityPanels, "lakeActivity", "lakeActivityPanel");

  lakePage.querySelectorAll(".lake-safety-list details, .lake-faq details").forEach((details) => {
    details.addEventListener("toggle", () => {
      if (!details.open) return;
      const group = details.closest(".lake-safety-list, .lake-faq");
      group?.querySelectorAll("details").forEach((other) => {
        if (other !== details) other.open = false;
      });
    });
  });

  lakePage.querySelectorAll("[data-lake-gallery]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!lightbox || !lightboxImage) return;
      lightboxImage.src = button.dataset.src || "";
      lightboxImage.alt = button.dataset.alt || "Powiększone zdjęcie jeziora";
      if (lightboxCaption) lightboxCaption.textContent = button.dataset.alt || "";
      if (typeof lightbox.showModal === "function") lightbox.showModal();
    });
  });

  const closeLightbox = () => {
    if (lightbox?.open) lightbox.close();
  };

  lightboxClose?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  const lakeNewsletter = document.querySelector("#lake-footer-email")?.closest("form");
  lakeNewsletter?.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = lakeNewsletter.querySelector('input[type="email"]');
    if (!input?.reportValidity()) return;
    window.location.href = `mailto:krzywelakehouses@icloud.com?subject=${encodeURIComponent("Newsletter Krzywe Lake Houses")}&body=${encodeURIComponent(`Proszę o dodanie adresu ${input.value} do listy informacji o dostępności.`)}`;
  });
}

const homesPage = document.querySelector(".homes-page");

if (homesPage) {
  const bindHomesTabs = (buttonSelector, panelSelector, buttonKey, panelKey) => {
    const buttons = [...homesPage.querySelectorAll(buttonSelector)];
    const panels = [...homesPage.querySelectorAll(panelSelector)];

    const select = (value, focus = false) => {
      buttons.forEach((button) => {
        const selected = button.dataset[buttonKey] === value;
        button.classList.toggle("is-active", selected);
        button.setAttribute("aria-selected", String(selected));
        button.tabIndex = selected ? 0 : -1;
        if (selected && focus) button.focus();
      });
      panels.forEach((panel) => {
        panel.hidden = panel.dataset[panelKey] !== value;
      });
    };

    buttons.forEach((button, index) => {
      button.addEventListener("click", () => select(button.dataset[buttonKey]));
      button.addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        let nextIndex = index;
        if (event.key === "ArrowLeft") nextIndex = (index - 1 + buttons.length) % buttons.length;
        if (event.key === "ArrowRight") nextIndex = (index + 1) % buttons.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = buttons.length - 1;
        select(buttons[nextIndex].dataset[buttonKey], true);
      });
    });
  };

  bindHomesTabs("[data-home-house]", "[data-home-house-panel]", "homeHouse", "homeHousePanel");
  bindHomesTabs("[data-home-moment]", "[data-home-moment-panel]", "homeMoment", "homeMomentPanel");

  const filterButtons = [...homesPage.querySelectorAll("[data-home-filter]")];
  const photoCards = [...homesPage.querySelectorAll("[data-home-photo-card]")];

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.homeFilter;
      filterButtons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle("is-active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      photoCards.forEach((card) => {
        card.hidden = filter !== "all" && card.dataset.homeCategory !== filter;
      });
    });
  });

  const lightbox = document.querySelector("[data-home-lightbox]");
  const lightboxImage = lightbox?.querySelector("[data-home-lightbox-image]");
  const lightboxCaption = lightbox?.querySelector("[data-home-lightbox-caption]");

  homesPage.querySelectorAll("[data-home-photo]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!lightbox || !lightboxImage) return;
      lightboxImage.src = button.dataset.src || "";
      lightboxImage.alt = button.dataset.alt || "Powiększone zdjęcie domu";
      if (lightboxCaption) lightboxCaption.textContent = button.dataset.alt || "";
      if (typeof lightbox.showModal === "function") lightbox.showModal();
    });
  });

  const closeHomesLightbox = () => {
    if (lightbox?.open) lightbox.close();
  };

  lightbox?.querySelector("[data-home-lightbox-close]")?.addEventListener("click", closeHomesLightbox);
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeHomesLightbox();
  });

  homesPage.querySelectorAll(".homes-faq details").forEach((details) => {
    details.addEventListener("toggle", () => {
      if (!details.open) return;
      homesPage.querySelectorAll(".homes-faq details").forEach((other) => {
        if (other !== details) other.open = false;
      });
    });
  });

  document.querySelector("[data-homes-newsletter]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = event.currentTarget.querySelector('input[type="email"]');
    if (!input?.reportValidity()) return;
    const subject = encodeURIComponent("Zapytanie o domy Krzywe Lake Houses");
    const body = encodeURIComponent(`Dzień dobry,\n\nproszę o kontakt w sprawie dostępności domów.\nMój adres e-mail: ${input.value}\n\nPozdrawiam`);
    window.location.href = `mailto:krzywelakehouses@icloud.com?subject=${subject}&body=${body}`;
  });
}
