"use client";

import { useEffect } from "react";

export type SiteLanguage = "pl" | "en";

export const LANGUAGE_STORAGE_KEY = "klh-language";
export const LANGUAGE_EVENT = "klh-language-change";

const instantTranslations: Record<string, string> = {
  "Strona główna": "Home",
  "Domy i galeria": "Houses & gallery",
  "Jezioro Krzywe": "Lake Krzywe",
  "Atrakcje": "Attractions",
  "Oferta": "Stay offers",
  "Kontakt": "Contact",
  "Blog": "Journal",
  "Menu główne": "Main menu",
  "Wszystkie": "All",
  "Teren": "Grounds",
  "Wyczyść filtry": "Clear filters",
  "Zarezerwuj": "Book now",
  "Prowadź": "Directions",
  "Regulamin": "Terms",
  "Polityka prywatności": "Privacy policy",
  "Zameldowanie": "Check-in",
  "Wymeldowanie": "Check-out",
  "Bez zwierząt": "No pets",
  "Zakaz palenia": "No smoking",
  "Pokaż kolejne zdjęcia": "Show more photos",
  "Galeria terenu jest w przygotowaniu.": "The grounds gallery is being prepared.",
  "Dodamy tutaj wyłącznie właściwe zdjęcia obiektu.": "Only verified property photos will appear here.",
  "Zobacz dom po swojemu.": "Explore the houses your way.",
  "Dom Modern · galeria": "Modern house · gallery",
  "Wybierz pełną galerię albo przejdź bezpośrednio do zdjęć domu Modern lub Loft. Jeden wybór wystarczy, żeby znaleźć właściwy kadr.": "Browse the full gallery or go straight to Modern, Loft or the shared grounds. One choice is all it takes to find the right view.",
  "Jezioro jest częścią każdego wnętrza.": "The lake is part of every interior.",
  "Proste zasady. Spokojny pobyt.": "Simple rules. A peaceful stay.",
  "Sprawdź termin": "Check dates",
  "Poznaj domy": "Explore the houses",
  "Zobacz więcej": "See more",
  "Czytaj teraz": "Read now",
  "Odkryj atrakcje": "Discover attractions",
  "Znajdź artykuł": "Find an article",
  "Wybierz termin pobytu": "Choose your dates",
  "Rezerwacja bezpośrednia": "Direct booking",
  "Aktualne terminy": "Live availability",
  "Bez dodatkowych pośredników": "No booking middlemen",
  "Sprawdź dostępność domów Modern i Loft nad Jeziorem Krzywe.": "Check availability for the Modern and Loft houses by Lake Krzywe.",
  "Główna nawigacja": "Main navigation",
  "Szybki kontakt i media społecznościowe": "Quick contact and social media",
  "Zadzwoń: 505 586 950": "Call: 505 586 950",
  "Napisz e-mail: krzywelakehouses@gmail.com": "Email: krzywelakehouses@gmail.com",
  "Zamknij menu": "Close menu",
  "Otwórz menu": "Open menu",
  "Nawigacja mobilna": "Mobile navigation",
  "Krzywe · Mazury": "Krzywe · Masuria",
  "Dwa domy.": "Two houses.",
  "Jedno jezioro.": "One lake.",
  "Modern · Loft · Mazury": "Modern · Loft · Masuria",
  "Nowoczesne stodoły stojące 10 metrów od brzegu. Każda mieści do 10 osób. W obu domach panoramiczne przeszklenia znajdują się w sypialni głównej oraz salonie z aneksem kuchennym.": "Contemporary barn houses just 10 metres from the shore. Each welcomes up to 10 guests. Both houses have panoramic glazing in the main bedroom and in the living room with kitchenette.",
  "Otwórz galerię": "Open gallery",
  "Zaplanuj pobyt": "Plan your stay",
  "powierzchni każdego domu": "in each house",
  "niezależne sypialnie": "separate bedrooms",
  "komfortowe łazienki": "comfortable bathrooms",
  "do 10 gości": "up to 10 guests",
  "Przeszklenia w salonie i głównej sypialni kadrują wodę od rana do wieczora. Taras, ogród i brzeg tworzą jedną, naturalną przestrzeń wypoczynku.": "Panoramic windows in the living room and main bedroom frame the water from morning until evening. The terrace, grounds and shoreline form one natural space for unwinding.",
  "do jeziora": "to the lake",
  "panoramiczne przeszklenia": "panoramic windows",
  "Widok z domu prowadzi prosto nad wodę": "The view from the house leads straight to the water",
  "Warto wiedzieć przed przyjazdem": "Good to know before arrival",
  "Informacje organizacyjne podajemy jasno, aby po przyjeździe można było od razu zwolnić tempo.": "We keep the practical details clear, so you can slow down as soon as you arrive.",
  "Dom czeka na Was od godziny 16:00.": "Your house is ready from 4:00 pm.",
  "Prosimy o opuszczenie domu do 11:00.": "Please check out by 11:00 am.",
  "Obiekt nie przyjmuje zwierząt.": "Pets are not accepted.",
  "Wnętrza obu domów są wolne od dymu.": "Both houses are smoke-free.",
  "Jasny Modern i nastrojowy Loft": "Bright Modern and atmospheric Loft",
  "Wybierz dom": "Choose a house",
  "Pełna kuchnia": "Fully equipped kitchen",
  "Pościel i ręczniki": "Bed linen and towels",
  "Wi‑Fi i Smart TV": "Wi-Fi and Smart TV",
  "10 m od jeziora": "10 m from the lake",
  "Miejsce na ognisko": "Firepit",
  "Jacuzzi": "Hot tub",
  "Parking przy domu": "Parking by the house",
  "Całoroczne": "Open year-round",
  "Wspólny teren": "Shared grounds",
  "Ogród, dojście do jeziora i wspólna przestrzeń obu domów.": "The garden, lake access and the shared outdoor space of both houses.",
};

const originalText = new WeakMap<Text, string>();
const translatedText = new WeakMap<Text, string>();
const originalAttributes = new WeakMap<Element, Map<string, string>>();
const translationCache = new Map<string, string>(Object.entries(instantTranslations));

const separator = "\n__KLH_SPLIT_9842__\n";
let observer: MutationObserver | null = null;
let translateTimer = 0;

function shouldTranslate(text: string) {
  const value = text.trim();
  if (!value || value.length < 2) return false;
  if (/^(https?:|mailto:|tel:|\+?\d[\d\s–—.,:/-]*|\d+\s?(m|m²|ha|min|km|zł|%))$/i.test(value)) return false;
  return /[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]/.test(value);
}

function isProtected(node: Node) {
  const parent = node.parentElement;
  if (!parent) return true;
  return Boolean(parent.closest("script, style, noscript, code, pre, [data-no-translate], .brand"));
}

function readCachedTranslations() {
  try {
    const saved = JSON.parse(localStorage.getItem("klh-translations-en-v1") || "{}") as Record<string, string>;
    Object.entries(saved).forEach(([key, value]) => {
      if (key && value) translationCache.set(key, value);
    });
  } catch {
    // A damaged cache should never block the language switcher.
  }
}

function persistTranslations(entries: Array<[string, string]>) {
  if (!entries.length) return;
  try {
    const current = JSON.parse(localStorage.getItem("klh-translations-en-v1") || "{}") as Record<string, string>;
    entries.forEach(([source, result]) => { current[source] = result; });
    localStorage.setItem("klh-translations-en-v1", JSON.stringify(current));
  } catch {
    // Translation still works in the current view if storage is unavailable.
  }
}

async function requestTranslation(strings: string[]) {
  if (!strings.length) return new Map<string, string>();
  const joined = strings.join(separator);
  const endpoint = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=pl&tl=en&dt=t&q=${encodeURIComponent(joined)}`;
  const response = await fetch(endpoint);
  if (!response.ok) throw new Error("Translation service unavailable");
  const data = await response.json() as [Array<[string]>];
  const translated = (data[0] || []).map((part) => part[0] || "").join("");
  const pieces = translated.split(/\s*__KLH_SPLIT_9842__\s*/);
  if (pieces.length !== strings.length) throw new Error("Translation response mismatch");
  return new Map(strings.map((source, index) => [source, pieces[index].trim()]));
}

async function translateMissing(strings: string[]) {
  const result = new Map<string, string>();
  for (let index = 0; index < strings.length; index += 14) {
    const batch = strings.slice(index, index + 14);
    try {
      const translated = await requestTranslation(batch);
      translated.forEach((value, key) => {
        if (value) result.set(key, value);
      });
    } catch {
      // Curated interface translations remain available when the online fallback is blocked.
    }
  }
  const saved = [...result.entries()];
  saved.forEach(([key, value]) => translationCache.set(key, value));
  persistTranslations(saved);
  return result;
}

function collectTextNodes() {
  const nodes: Text[] = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let current: Node | null;
  while ((current = walker.nextNode())) {
    const text = current as Text;
    if (!isProtected(text) && shouldTranslate(text.data)) nodes.push(text);
  }
  return nodes;
}

const translatableAttributes = ["aria-label", "title", "placeholder"];

function applyCachedText(nodes: Text[]) {
  nodes.forEach((node) => {
    const raw = originalText.get(node) || node.data;
    const source = raw.trim();
    const translation = translationCache.get(source);
    if (!translation) return;
    const leading = raw.match(/^\s*/)?.[0] || "";
    const trailing = raw.match(/\s*$/)?.[0] || "";
    const next = `${leading}${translation}${trailing}`;
    translatedText.set(node, next);
    node.data = next;
  });
}

function applyCachedAttributes() {
  document.querySelectorAll("[aria-label], [title], [placeholder]").forEach((element) => {
    const originals = originalAttributes.get(element);
    originals?.forEach((source, attribute) => {
      const translation = translationCache.get(source);
      if (translation) element.setAttribute(attribute, translation);
    });
  });
}

async function applyEnglish() {
  document.documentElement.lang = "en";
  document.documentElement.dataset.language = "en";

  const nodes = collectTextNodes();
  const pending = new Set<string>();
  nodes.forEach((node) => {
    const previousTranslation = translatedText.get(node);
    if (previousTranslation && node.data === previousTranslation) return;
    const source = node.data.trim();
    originalText.set(node, node.data);
    if (!translationCache.has(source)) pending.add(source);
  });

  document.querySelectorAll("[aria-label], [title], [placeholder]").forEach((element) => {
    if (element.closest("[data-no-translate]")) return;
    let originals = originalAttributes.get(element);
    if (!originals) {
      originals = new Map();
      originalAttributes.set(element, originals);
    }
    translatableAttributes.forEach((attribute) => {
      const value = element.getAttribute(attribute);
      if (!value || !shouldTranslate(value)) return;
      const source = originals.get(attribute) || value;
      originals?.set(attribute, source);
      if (!translationCache.has(source)) pending.add(source);
    });
  });

  // Curated interface copy must switch immediately. The online fallback is
  // deliberately secondary, so a blocked translation endpoint can never make
  // the language control appear unresponsive.
  applyCachedText(nodes);
  applyCachedAttributes();

  if (pending.size) {
    await translateMissing([...pending]);
    if (document.documentElement.dataset.language !== "en") return;
    applyCachedText(collectTextNodes());
    applyCachedAttributes();
  }
}

function applyPolish() {
  document.documentElement.lang = "pl";
  document.documentElement.dataset.language = "pl";
  collectTextNodes().forEach((node) => {
    const source = originalText.get(node);
    if (source !== undefined) node.data = source;
  });
  document.querySelectorAll("[aria-label], [title], [placeholder]").forEach((element) => {
    originalAttributes.get(element)?.forEach((value, attribute) => element.setAttribute(attribute, value));
  });
}

export function setSiteLanguage(language: SiteLanguage) {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  // Set the source of truth synchronously so DOM mutations triggered by the
  // previous translation cannot schedule a stale language update.
  document.documentElement.lang = language;
  document.documentElement.dataset.language = language;
  window.dispatchEvent(new CustomEvent(LANGUAGE_EVENT, { detail: language }));
}

export function LanguageController() {
  useEffect(() => {
    readCachedTranslations();

    const update = (language: SiteLanguage) => {
      window.clearTimeout(translateTimer);
      translateTimer = window.setTimeout(() => {
        if (language === "en") void applyEnglish();
        else applyPolish();
      }, 40);
    };

    const onLanguage = (event: Event) => {
      const language = (event as CustomEvent<SiteLanguage>).detail;
      update(language === "en" ? "en" : "pl");
    };

    const language = localStorage.getItem(LANGUAGE_STORAGE_KEY) === "en" ? "en" : "pl";
    update(language);
    window.addEventListener(LANGUAGE_EVENT, onLanguage);

    observer = new MutationObserver(() => {
      if (document.documentElement.dataset.language === "en") update("en");
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener(LANGUAGE_EVENT, onLanguage);
      observer?.disconnect();
      observer = null;
      window.clearTimeout(translateTimer);
    };
  }, []);

  return null;
}
