const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobilePanel = document.querySelector("[data-mobile-panel]");

const closeMenu = () => {
  header?.classList.remove("menu-open");
  menuToggle?.setAttribute("aria-expanded", "false");
};

const syncHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 18);

menuToggle?.addEventListener("click", () => {
  const open = header.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

mobilePanel?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });
window.addEventListener("scroll", syncHeader, { passive: true });
syncHeader();

document.querySelectorAll("[data-home-rhythm]").forEach((rhythm) => {
  const tabs = [...rhythm.querySelectorAll("[data-rhythm-tab]")];
  const panels = [...rhythm.querySelectorAll("[data-rhythm-panel]")];

  const activate = (name, focus = false) => {
    tabs.forEach((tab) => {
      const active = tab.dataset.rhythmTab === name;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      if (active && focus) tab.focus();
    });
    panels.forEach((panel) => { panel.hidden = panel.dataset.rhythmPanel !== name; });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activate(tab.dataset.rhythmTab));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      let next = index;
      if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;
      activate(tabs[next].dataset.rhythmTab, true);
    });
  });
});

document.querySelectorAll(".home-faq-list details").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    document.querySelectorAll(".home-faq-list details").forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});
