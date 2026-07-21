const bar = document.querySelector('.topbar');
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.mobile-menu');
const bookingDrawer = document.getElementById('bookingDrawer');
const bookingToggle = document.getElementById('bookingToggle');
const bookingPanel = document.getElementById('bookingPanel');
const mobileBookingSlot = document.getElementById('mobileBookingSlot');
const bookingHost = document.getElementById('widgetHolder_o71a3abns');
const bedBookingSourceColor = 'rgb(64,84,54)';

let bedBookingShadow = null;
let bedBookingScanQueued = false;

function compactColor(value) {
  return String(value || '').replace(/\s+/g, '').toLowerCase();
}

function isBedBookingSourceColor(value) {
  const color = compactColor(value);
  return color === bedBookingSourceColor || color.startsWith('rgba(64,84,54,');
}

function isBedBookingAction(element) {
  return element.matches('button,a,[role="button"],input[type="button"],input[type="submit"]') ||
    Boolean(element.closest('button,a,[role="button"]'));
}

function scanBedBookingTheme() {
  if (!bedBookingShadow) return;
  [...bedBookingShadow.querySelectorAll('*')].forEach((element) => {
    if (element.id === 'klh-bedbooking-theme') return;
    const style = getComputedStyle(element);
    const isAction = isBedBookingAction(element);
    if (isBedBookingSourceColor(style.backgroundColor) || compactColor(style.backgroundImage).includes('64,84,54')) {
      element.classList.toggle('klh-bb-action', isAction);
      element.classList.toggle('klh-bb-background', !isAction);
    }
    if ([style.borderTopColor, style.borderRightColor, style.borderBottomColor, style.borderLeftColor].some(isBedBookingSourceColor)) {
      element.classList.add('klh-bb-border');
    }
    if (isBedBookingSourceColor(style.color)) element.classList.add('klh-bb-color');
    if (isBedBookingSourceColor(style.fill)) element.classList.add('klh-bb-fill');
    if (isBedBookingSourceColor(style.stroke)) element.classList.add('klh-bb-stroke');
  });
}

function queueBedBookingScan() {
  if (bedBookingScanQueued) return;
  bedBookingScanQueued = true;
  requestAnimationFrame(() => {
    bedBookingScanQueued = false;
    scanBedBookingTheme();
  });
}

function syncBedBookingMode() {
  if (!bookingHost) return;
  const widget = bookingHost.querySelector('bb-widget');
  if (!widget || !widget.shadowRoot) return;
  widget.setAttribute('data-klh-colored', String(innerWidth <= 1230 || Boolean(bar?.classList.contains('scrolled'))));
  if (widget.shadowRoot === bedBookingShadow) {
    queueBedBookingScan();
    return;
  }
  bedBookingShadow = widget.shadowRoot;
  const theme = document.createElement('style');
  theme.id = 'klh-bedbooking-theme';
  theme.textContent = `
    :host([data-klh-colored="false"]),:host([data-klh-colored="false"])::before,:host([data-klh-colored="false"])::after{background:transparent!important;box-shadow:none!important;filter:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
    .klh-bb-background,.klh-bb-background::before,.klh-bb-background::after{background-color:transparent!important;background-image:none!important;box-shadow:none!important;filter:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
    :host([data-klh-colored="true"]) .klh-bb-background{background-color:#091f18!important}
    .klh-bb-border{border-color:var(--nav-frame-color,rgba(232,226,213,.18))!important}
    .klh-bb-color{color:#102820!important}.klh-bb-fill{fill:#102820!important}.klh-bb-stroke{stroke:#102820!important}
    .klh-bb-action{background-color:#091f18!important;background-image:none!important;color:#fff!important;opacity:1!important;visibility:visible!important}
    .klh-bb-action *{color:#fff!important;fill:#fff!important;stroke:#fff!important}`;
  bedBookingShadow.appendChild(theme);
  new MutationObserver(queueBedBookingScan).observe(bedBookingShadow, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class', 'style', 'disabled', 'aria-disabled']
  });
  queueBedBookingScan();
}

if (bookingHost) {
  new MutationObserver(syncBedBookingMode).observe(bookingHost, { childList: true, subtree: true });
  [0, 250, 750, 1500, 3000].forEach((delay) => setTimeout(syncBedBookingMode, delay));
}

function updateHeader() {
  bar?.classList.toggle('scrolled', scrollY > 30);
  syncBedBookingMode();
}

addEventListener('resize', syncBedBookingMode, { passive: true });
addEventListener('scroll', updateHeader, { passive: true });

function setBooking(open) {
  if (!bookingDrawer || !bookingToggle) return;
  bookingDrawer.classList.toggle('collapsed', !open);
  bookingToggle.setAttribute('aria-expanded', String(open));
  bookingToggle.setAttribute('aria-label', open ? 'Zwiń moduł rezerwacji' : 'Rozwiń moduł rezerwacji');
}

bookingToggle?.addEventListener('click', () => setBooking(bookingDrawer?.classList.contains('collapsed')));

function mountBookingInMenu() {
  if (mobileBookingSlot && bookingPanel && bookingPanel.parentNode !== mobileBookingSlot) mobileBookingSlot.appendChild(bookingPanel);
}

function restoreBookingToDrawer() {
  if (bookingPanel && bookingDrawer && bookingPanel.parentNode !== bookingDrawer) bookingDrawer.insertBefore(bookingPanel, bookingToggle);
}

function setMenu(open) {
  if (!menu || !menuBtn) return;
  if (open) {
    setBooking(false);
    mountBookingInMenu();
  } else {
    restoreBookingToDrawer();
  }
  menu.classList.toggle('open', open);
  menu.setAttribute('aria-hidden', String(!open));
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Zamknij menu' : 'Otwórz menu');
  menuBtn.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
  document.body.style.overflow = open ? 'hidden' : '';
  syncBedBookingMode();
}

menuBtn?.addEventListener('click', () => setMenu(!menu?.classList.contains('open')));
menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
addEventListener('resize', () => {
  if (innerWidth > 1230 && menu?.classList.contains('open')) setMenu(false);
}, { passive: true });
addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu?.classList.contains('open')) {
    setMenu(false);
    menuBtn?.focus();
  }
});

const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const counterObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (!entry.isIntersecting) return;
  const number = entry.target.querySelector('b');
  if (!number) return;
  const finish = Number(number.dataset.count);
  const suffix = number.dataset.suffix || '';
  let value = 0;
  const step = Math.max(1, Math.ceil(finish / 45));
  const tick = () => {
    value = Math.min(finish, value + step);
    number.textContent = value + suffix;
    if (value < finish) requestAnimationFrame(tick);
  };
  tick();
  counterObserver.unobserve(entry.target);
}), { threshold: .5 });
document.querySelectorAll('.stat').forEach((element) => counterObserver.observe(element));

const heroScenes = [...document.querySelectorAll('.hero-scene')];
const heroChapterButtons = [...document.querySelectorAll('[data-hero-slide]')];
let activeHeroScene = 0;
let heroTimer;

function showHeroScene(index, restart = true) {
  if (!heroScenes.length) return;
  activeHeroScene = (index + heroScenes.length) % heroScenes.length;
  heroScenes.forEach((scene, sceneIndex) => scene.classList.toggle('is-active', sceneIndex === activeHeroScene));
  heroChapterButtons.forEach((button, buttonIndex) => button.classList.toggle('is-active', buttonIndex === activeHeroScene));
  if (restart && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    clearInterval(heroTimer);
    heroTimer = setInterval(() => showHeroScene(activeHeroScene + 1, false), 6500);
  }
}

heroChapterButtons.forEach((button) => button.addEventListener('click', () => showHeroScene(Number(button.dataset.heroSlide))));
if (heroScenes.length) showHeroScene(0);
document.addEventListener('visibilitychange', () => {
  if (!heroScenes.length) return;
  if (document.hidden) clearInterval(heroTimer);
  else showHeroScene(activeHeroScene);
});

const storyTabs = [...document.querySelectorAll('[data-story-tab]')];
const storyPanels = [...document.querySelectorAll('[data-story-panel]')];

function showStoryPanel(index, moveFocus = false) {
  storyTabs.forEach((tab, tabIndex) => {
    const isActive = tabIndex === index;
    tab.classList.toggle('is-active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
    if (isActive && moveFocus) tab.focus();
  });
  storyPanels.forEach((panel, panelIndex) => {
    const isActive = panelIndex === index;
    panel.classList.toggle('is-active', isActive);
    panel.setAttribute('aria-hidden', String(!isActive));
  });
}

storyTabs.forEach((tab, tabIndex) => {
  tab.addEventListener('click', () => showStoryPanel(tabIndex));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = tabIndex;
    if (event.key === 'ArrowLeft') nextIndex = (tabIndex - 1 + storyTabs.length) % storyTabs.length;
    if (event.key === 'ArrowRight') nextIndex = (tabIndex + 1) % storyTabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = storyTabs.length - 1;
    showStoryPanel(nextIndex, true);
  });
});
if (storyTabs.length) showStoryPanel(0);

const lakeClock = document.querySelector('[data-lake-clock]');
const lakeMoment = document.querySelector('[data-lake-moment]');
const lakeDaypartMedia = document.querySelector('[data-lake-daypart-media]');
const lakeDaypartImages = [...document.querySelectorAll('[data-lake-daypart-image]')];
const lakeDayparts = {
  morning: { source: 'assets/chapter-01-05-08.jpg', message: 'Jezioro budzi się wcześniej niż reszta świata.' },
  day: { source: 'assets/chapter-01-08-18.jpg', message: 'Woda, las i dzień bez obowiązkowego planu.' },
  evening: { source: 'assets/chapter-01-18-22.jpg', message: 'Światło mięknie, a jezioro powoli cichnie.' },
  night: { source: 'assets/chapter-01-22-05.jpg', message: 'Noc nad wodą ma swój własny, spokojny rytm.' }
};
let activeLakeImageIndex = lakeDaypartImages.findIndex((image) => image.classList.contains('is-active'));
if (activeLakeImageIndex < 0) activeLakeImageIndex = 0;
let activeLakePeriod = lakeDaypartImages[activeLakeImageIndex]?.dataset.period || '';
const lakeTimeFormatter = new Intl.DateTimeFormat('pl-PL', {
  timeZone: 'Europe/Warsaw',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
});

function getLakePeriod(hour) {
  if (hour >= 5 && hour < 8) return 'morning';
  if (hour >= 8 && hour < 18) return 'day';
  if (hour >= 18 && hour < 22) return 'evening';
  return 'night';
}

function showLakeDaypart(period) {
  const daypart = lakeDayparts[period];
  if (!lakeDaypartMedia || !lakeDaypartImages.length || !daypart) return;
  lakeDaypartMedia.dataset.lakePeriod = period;
  if (period === activeLakePeriod) return;

  const currentImage = lakeDaypartImages[activeLakeImageIndex];
  const nextImageIndex = (activeLakeImageIndex + 1) % lakeDaypartImages.length;
  const nextImage = lakeDaypartImages[nextImageIndex];
  let revealed = false;
  const revealNextImage = () => {
    if (revealed) return;
    revealed = true;
    nextImage.dataset.period = period;
    nextImage.classList.add('is-active');
    currentImage?.classList.remove('is-active');
    activeLakeImageIndex = nextImageIndex;
    activeLakePeriod = period;
  };

  nextImage.addEventListener('load', revealNextImage, { once: true });
  nextImage.src = daypart.source;
  if (nextImage.complete) revealNextImage();
}

function updateLakeClock() {
  const now = new Date();
  const hour = Number(new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Warsaw',
    hour: '2-digit',
    hour12: false
  }).format(now));
  const period = getLakePeriod(hour);
  if (lakeClock) {
    lakeClock.textContent = lakeTimeFormatter.format(now);
    lakeClock.dateTime = now.toISOString();
  }
  if (lakeMoment) lakeMoment.textContent = lakeDayparts[period].message;
  showLakeDaypart(period);
}

updateLakeClock();
if (lakeClock || lakeDaypartMedia) setInterval(updateLakeClock, 60000);

const storyPointerTargets = [document.querySelector('.story-prologue'), document.querySelector('.story-visual')].filter(Boolean);
if (matchMedia('(pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  storyPointerTargets.forEach((element) => {
    element.addEventListener('pointermove', (event) => {
      const rect = element.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - .5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - .5) * 2;
      element.style.setProperty('--story-x', x.toFixed(3));
      element.style.setProperty('--story-y', y.toFixed(3));
    });
    element.addEventListener('pointerleave', () => {
      element.style.setProperty('--story-x', 0);
      element.style.setProperty('--story-y', 0);
    });
  });
}

const dayJourney = document.querySelector('[data-day-journey]');
const dayJourneyTrack = document.querySelector('[data-day-track]');
const dayJourneyPanels = [...document.querySelectorAll('[data-day-panel]')];
const dayJourneyButtons = [...document.querySelectorAll('[data-day-goto]')];
const dayJourneyProgress = document.querySelector('[data-day-progress]');
const dayJourneyCurrent = document.querySelector('[data-day-current]');
let dayJourneyFrame = 0;
let activeDayPanel = -1;

function updateDayJourney() {
  dayJourneyFrame = 0;
  if (!dayJourney || !dayJourneyTrack || !dayJourneyPanels.length) return;

  const rect = dayJourney.getBoundingClientRect();
  const verticalDistance = Math.max(1, dayJourney.offsetHeight - window.innerHeight);
  const progress = Math.min(1, Math.max(0, -rect.top / verticalDistance));
  const horizontalDistance = Math.max(0, dayJourneyTrack.scrollWidth - window.innerWidth);
  dayJourneyTrack.style.transform = `translate3d(${-progress * horizontalDistance}px, 0, 0)`;
  dayJourneyProgress?.style.setProperty('--day-progress', progress.toFixed(4));

  const nextActivePanel = Math.min(dayJourneyPanels.length - 1, Math.round(progress * (dayJourneyPanels.length - 1)));
  if (nextActivePanel === activeDayPanel) return;
  activeDayPanel = nextActivePanel;
  dayJourneyPanels.forEach((panel, index) => panel.classList.toggle('is-active', index === activeDayPanel));
  dayJourneyButtons.forEach((button, index) => {
    const isActive = index === activeDayPanel;
    button.classList.toggle('is-active', isActive);
    if (isActive) button.setAttribute('aria-current', 'step');
    else button.removeAttribute('aria-current');
  });
  if (dayJourneyCurrent) dayJourneyCurrent.textContent = String(activeDayPanel + 1).padStart(2, '0');
}

function requestDayJourneyUpdate() {
  if (!dayJourneyFrame) dayJourneyFrame = requestAnimationFrame(updateDayJourney);
}

dayJourneyButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    if (!dayJourney) return;
    const sectionTop = window.scrollY + dayJourney.getBoundingClientRect().top;
    const verticalDistance = Math.max(1, dayJourney.offsetHeight - window.innerHeight);
    const panelProgress = dayJourneyButtons.length > 1 ? index / (dayJourneyButtons.length - 1) : 0;
    window.scrollTo({
      top: sectionTop + verticalDistance * panelProgress,
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
  });
});

if (dayJourney) {
  window.addEventListener('scroll', requestDayJourneyUpdate, { passive: true });
  window.addEventListener('resize', requestDayJourneyUpdate, { passive: true });
  window.addEventListener('pageshow', requestDayJourneyUpdate);
  updateDayJourney();
}

const attractionsJourney = document.querySelector('[data-attractions-journey]');
const attractionsTrack = document.querySelector('[data-attractions-track]');
const attractionPanels = [...document.querySelectorAll('[data-attraction-panel]')];
const attractionButtons = [...document.querySelectorAll('[data-attraction-goto]')];
const attractionsProgress = document.querySelector('[data-attractions-progress]');
const attractionCurrent = document.querySelector('[data-attraction-current]');
const attractionTitle = document.querySelector('[data-attraction-title]');
const attractionsNav = document.querySelector('.attractions-journey-nav');
let attractionsFrame = 0;
let activeAttractionPanel = -1;

function updateAttractionsJourney() {
  attractionsFrame = 0;
  if (!attractionsJourney || !attractionsTrack || !attractionPanels.length) return;

  const rect = attractionsJourney.getBoundingClientRect();
  const verticalDistance = Math.max(1, attractionsJourney.offsetHeight - window.innerHeight);
  const progress = Math.min(1, Math.max(0, -rect.top / verticalDistance));
  const horizontalDistance = Math.max(0, attractionsTrack.scrollWidth - window.innerWidth);
  attractionsTrack.style.transform = `translate3d(${-progress * horizontalDistance}px, 0, 0)`;
  attractionsProgress?.style.setProperty('--attraction-progress', progress.toFixed(4));

  const nextActivePanel = Math.min(attractionPanels.length - 1, Math.round(progress * (attractionPanels.length - 1)));
  if (nextActivePanel === activeAttractionPanel) return;
  activeAttractionPanel = nextActivePanel;
  attractionPanels.forEach((panel, index) => panel.classList.toggle('is-active', index === activeAttractionPanel));
  attractionButtons.forEach((button, index) => {
    const isActive = index === activeAttractionPanel;
    button.classList.toggle('is-active', isActive);
    if (isActive) button.setAttribute('aria-current', 'step');
    else button.removeAttribute('aria-current');
  });
  if (attractionCurrent) attractionCurrent.textContent = String(activeAttractionPanel + 1).padStart(2, '0');
  if (attractionTitle) attractionTitle.textContent = attractionButtons[activeAttractionPanel]?.dataset.attractionLabel || '';
  if (attractionsNav && window.innerWidth <= 760) {
    const activeButton = attractionButtons[activeAttractionPanel];
    const targetLeft = activeButton.offsetLeft - (attractionsNav.clientWidth - activeButton.offsetWidth) / 2;
    attractionsNav.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
  }
}

function requestAttractionsUpdate() {
  if (!attractionsFrame) attractionsFrame = requestAnimationFrame(updateAttractionsJourney);
}

function goToAttractionPanel(index) {
  if (!attractionsJourney) return;
  const sectionTop = window.scrollY + attractionsJourney.getBoundingClientRect().top;
  const verticalDistance = Math.max(1, attractionsJourney.offsetHeight - window.innerHeight);
  const panelProgress = attractionButtons.length > 1 ? index / (attractionButtons.length - 1) : 0;
  window.scrollTo({
    top: sectionTop + verticalDistance * panelProgress,
    behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  });
}

attractionButtons.forEach((button, index) => {
  button.addEventListener('click', () => goToAttractionPanel(index));
  button.addEventListener('keydown', (event) => {
    let nextIndex = index;
    if (event.key === 'ArrowLeft') nextIndex = Math.max(0, index - 1);
    else if (event.key === 'ArrowRight') nextIndex = Math.min(attractionButtons.length - 1, index + 1);
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = attractionButtons.length - 1;
    else return;
    event.preventDefault();
    attractionButtons[nextIndex].focus();
    goToAttractionPanel(nextIndex);
  });
});

if (attractionsJourney) {
  window.addEventListener('scroll', requestAttractionsUpdate, { passive: true });
  window.addEventListener('resize', requestAttractionsUpdate, { passive: true });
  window.addEventListener('pageshow', requestAttractionsUpdate);
  updateAttractionsJourney();
}

const offersJourney = document.querySelector('[data-offers-journey]');
const offersTrack = document.querySelector('[data-offers-track]');
const offerPanels = [...document.querySelectorAll('[data-offer-panel]')];
const offerButtons = [...document.querySelectorAll('[data-offer-goto]')];
const offersProgress = document.querySelector('[data-offers-progress]');
const offerCurrent = document.querySelector('[data-offer-current]');
const offerTitle = document.querySelector('[data-offer-title]');
const offersNav = document.querySelector('.offers-journey-nav');
let offersFrame = 0;
let activeOfferPanel = -1;

function updateOffersJourney() {
  offersFrame = 0;
  if (!offersJourney || !offersTrack || !offerPanels.length) return;

  const rect = offersJourney.getBoundingClientRect();
  const verticalDistance = Math.max(1, offersJourney.offsetHeight - window.innerHeight);
  const progress = Math.min(1, Math.max(0, -rect.top / verticalDistance));
  const horizontalDistance = Math.max(0, offersTrack.scrollWidth - window.innerWidth);
  offersTrack.style.transform = `translate3d(${-progress * horizontalDistance}px, 0, 0)`;
  offersProgress?.style.setProperty('--offer-progress', progress.toFixed(4));

  const nextActivePanel = Math.min(offerPanels.length - 1, Math.round(progress * (offerPanels.length - 1)));
  if (nextActivePanel === activeOfferPanel) return;
  activeOfferPanel = nextActivePanel;
  offerPanels.forEach((panel, index) => panel.classList.toggle('is-active', index === activeOfferPanel));
  offerButtons.forEach((button, index) => {
    const isActive = index === activeOfferPanel;
    button.classList.toggle('is-active', isActive);
    if (isActive) button.setAttribute('aria-current', 'step');
    else button.removeAttribute('aria-current');
  });
  if (offerCurrent) offerCurrent.textContent = String(activeOfferPanel + 1).padStart(2, '0');
  if (offerTitle) offerTitle.textContent = offerButtons[activeOfferPanel]?.dataset.offerLabel || '';
  if (offersNav && window.innerWidth <= 760) {
    const activeButton = offerButtons[activeOfferPanel];
    const targetLeft = activeButton.offsetLeft - (offersNav.clientWidth - activeButton.offsetWidth) / 2;
    offersNav.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
  }
}

function requestOffersUpdate() {
  if (!offersFrame) offersFrame = requestAnimationFrame(updateOffersJourney);
}

function goToOfferPanel(index) {
  if (!offersJourney) return;
  const sectionTop = window.scrollY + offersJourney.getBoundingClientRect().top;
  const verticalDistance = Math.max(1, offersJourney.offsetHeight - window.innerHeight);
  const panelProgress = offerButtons.length > 1 ? index / (offerButtons.length - 1) : 0;
  window.scrollTo({
    top: sectionTop + verticalDistance * panelProgress,
    behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  });
}

offerButtons.forEach((button, index) => {
  button.addEventListener('click', () => goToOfferPanel(index));
  button.addEventListener('keydown', (event) => {
    let nextIndex = index;
    if (event.key === 'ArrowLeft') nextIndex = Math.max(0, index - 1);
    else if (event.key === 'ArrowRight') nextIndex = Math.min(offerButtons.length - 1, index + 1);
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = offerButtons.length - 1;
    else return;
    event.preventDefault();
    offerButtons[nextIndex].focus();
    goToOfferPanel(nextIndex);
  });
});

if (offersJourney) {
  window.addEventListener('scroll', requestOffersUpdate, { passive: true });
  window.addEventListener('resize', requestOffersUpdate, { passive: true });
  window.addEventListener('pageshow', requestOffersUpdate);
  updateOffersJourney();
}

const houses = [
  { name: 'Brzoza', desc: 'Jasny, miękki, pełen porannego słońca.', img: 'assets/interior.png', details: ['10 gości', '3 sypialnie', 'prywatna sauna'] },
  { name: 'Sosna', desc: 'Głęboki, spokojny, otwarty na wieczorne światło.', img: 'assets/hero-lake-houses.png', details: ['10 gości', '3 sypialnie', 'kominek i sauna'] }
];
let currentHouse = 0;

function setHouse(direction) {
  const stage = document.querySelector('.house-stage');
  if (!stage) return;
  currentHouse = (currentHouse + direction + houses.length) % houses.length;
  const house = houses[currentHouse];
  stage.querySelector('img').src = house.img;
  stage.querySelector('.house-card>span').textContent = `DOM 0${currentHouse + 1}`;
  stage.querySelector('h3').textContent = house.name;
  stage.querySelector('.house-card p').textContent = house.desc;
  stage.querySelector('ul').innerHTML = house.details.map((detail) => `<li>${detail}</li>`).join('');
  stage.querySelector('.switcher span').innerHTML = `<b>0${currentHouse + 1}</b> / 02`;
}

document.querySelector('.prev')?.addEventListener('click', () => setHouse(-1));
document.querySelector('.next')?.addEventListener('click', () => setHouse(1));

const toast = document.querySelector('.toast');
function showToast(text) {
  if (!toast) return;
  toast.textContent = text;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

document.getElementById('bookingForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formNote = document.getElementById('formNote');
  if (formNote) formNote.textContent = 'Dziękujemy — właściwą dostępność sprawdzisz w module BedBooking przy nawigacji.';
  showToast('Przejdź do modułu TERMIN, aby sprawdzić dostępność');
});

document.querySelectorAll('[data-legal-link]').forEach((link) => link.addEventListener('click', (event) => {
  event.preventDefault();
  showToast(`${link.textContent.trim()} — treść przygotujemy w kolejnym etapie.`);
}));

if (document.body.dataset.page === 'offer' && window.location.hash) {
  const offerHashTarget = document.getElementById(window.location.hash.slice(1));
  if (offerHashTarget) {
    window.addEventListener('load', () => {
      window.setTimeout(() => offerHashTarget.scrollIntoView({ block: 'start', behavior: 'auto' }), 120);
    }, { once: true });
  }
}

const ambientToggle = document.getElementById('ambientToggle');
const ambientAudio = new Audio('assets/mazury-forest-ambience.ogg');
ambientAudio.loop = true;
ambientAudio.preload = 'auto';
ambientAudio.volume = .16;

let ambientMuted = false;
try {
  ambientMuted = sessionStorage.getItem('klhAmbientMuted') === 'true';
} catch (_) {}

function updateAmbientControl() {
  if (!ambientToggle) return;
  ambientToggle.classList.toggle('is-muted', ambientMuted);
  ambientToggle.setAttribute('aria-pressed', String(ambientMuted));
  ambientToggle.setAttribute('aria-label', ambientMuted ? 'Włącz dźwięk tła' : 'Wyłącz dźwięk tła');
  const label = ambientToggle.querySelector('b');
  if (label) label.textContent = ambientMuted ? 'Włącz dźwięk' : 'Wyłącz dźwięk';
}

async function startAmbient() {
  if (ambientMuted || !ambientAudio.paused) return;
  try {
    await ambientAudio.play();
  } catch (_) {
    // Przeglądarka uruchomi dźwięk przy pierwszej świadomej interakcji użytkownika.
  }
}

ambientAudio.addEventListener('loadedmetadata', () => {
  try {
    const savedTime = Number(sessionStorage.getItem('klhAmbientTime'));
    if (Number.isFinite(savedTime) && savedTime > 0 && ambientAudio.duration) ambientAudio.currentTime = savedTime % ambientAudio.duration;
  } catch (_) {}
  startAmbient();
}, { once: true });

function unlockAmbient() {
  startAmbient();
}

document.addEventListener('pointerdown', unlockAmbient, { once: true, capture: true });
document.addEventListener('keydown', unlockAmbient, { once: true, capture: true });

ambientToggle?.addEventListener('click', () => {
  ambientMuted = !ambientMuted;
  try { sessionStorage.setItem('klhAmbientMuted', String(ambientMuted)); } catch (_) {}
  if (ambientMuted) ambientAudio.pause();
  else startAmbient();
  updateAmbientControl();
});

addEventListener('pagehide', () => {
  try { sessionStorage.setItem('klhAmbientTime', String(ambientAudio.currentTime || 0)); } catch (_) {}
});

updateAmbientControl();
startAmbient();
document.querySelectorAll('a[href="#instagram"],a[href="#facebook"]').forEach((link) => link.addEventListener('click', (event) => {
  event.preventDefault();
  showToast('Podłączymy profil po podaniu właściwego adresu social media.');
}));

updateHeader();
