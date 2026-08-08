"use client";

import { useEffect, useMemo, useState } from "react";
import { BOOKING_URL } from "../lib/booking";
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "../components/Icons";
import { AttractionIcon } from "./AttractionIcons";
import { categoryLabels, type Attraction, type AttractionCategory } from "./attractions";

const areas = ["Wszystkie", "Mikołajki", "Mrągowo", "Piecki", "Ryn", "Kętrzyn"] as const;
const categories = Object.keys(categoryLabels) as AttractionCategory[];

const cyclingGroups = [
  {
    area: "Mikołajki",
    note: "12 pętli ze śladami GPS",
    source: "https://mikolajki.eu/dla-turysty/aktywny-wypoczynek/trasy-rowerowe?showall=1",
    routes: [
      { name: "Mała pętla nad jezioro Łuknajno", distance: "11,1 km", href: "https://www.traseo.pl/trasa/mala-petla-nad-jezioro-luknajno-it-mikolajki" },
      { name: "Szlakiem Łabędzia Niemego", distance: "19 km", href: "https://www.traseo.pl/trasa/szlakiem-labedzia-niemego-it-mikolajki" },
      { name: "Mała pętla na południe od Mikołajek", distance: "20,1 km", href: "https://www.traseo.pl/trasa/mala-petla-na-poludnie-od-mikolajek-it-mikolajki" },
      { name: "Pętla na północ od Mikołajek", distance: "21,5 km", href: "https://www.traseo.pl/trasa/mala-petla-na-polnoc-od-mikolajek-it-mikolajki" },
      { name: "Mikołajki–Baranowo–Użranki", distance: "33,2 km", href: "https://www.traseo.pl/trasa/petla-mikolajki-baranowo-uzranki-mikolajki-it-mikolajki" },
      { name: "Pętla Bełdany", distance: "38,6 km", href: "https://www.traseo.pl/trasa/petla-beldany-it-mikolajki" },
      { name: "Pętla Bełdany MTB", distance: "42,1 km", href: "https://www.traseo.pl/trasa/petla-beldany-mtb-it-mikolajki" },
      { name: "Wokół jezior Tałty i Ryńskie", distance: "47,2 km", href: "https://www.traseo.pl/trasa/petla-dookola-jezior-talty-i-rynskie-it-mikolajki" },
      { name: "Pętla Śniardwy", distance: "80,2 km", href: "https://www.traseo.pl/trasa/petla-sniardwy" },
      { name: "Pętla Bełdany i Nidzkie", distance: "86,9 km", href: "https://www.traseo.pl/trasa/petla-beldany-i-nidzkie-it-mikolajki" },
      { name: "Pętla Bełdany–Śniardwy", distance: "87,9 km", href: "https://www.traseo.pl/trasa/petla-beldany-sniardwy-it-mikolajki" },
      { name: "Pętla Śniardwy z Łuknajnem", distance: "89,6 km", href: "https://www.traseo.pl/trasa/petla-sniardwy-z-luknajnem" },
    ],
  },
  {
    area: "Mrągowo",
    note: "lokalne szlaki i wielka pętla",
    source: "https://www.it.mragowo.pl/aktywnie/szlaki-rowerowe",
    routes: [
      { name: "Wokół jeziora Juno", distance: "23,3 km", href: "https://www.it.mragowo.pl/zielona-trasa-rowerowa-wokol-jeziora-juno%2C8%2C1018%2Cpl.html" },
      { name: "Duża Pętla Mrągowska", distance: "28,6 km", href: "https://www.it.mragowo.pl/niebieski-szlak-rowerowy-duza-petla-mragowska%2C8%2C1215%2Cpl.html" },
      { name: "Mikołajki–Mrągowo–Święta Lipka", distance: "szlak czerwony", href: "https://www.it.mragowo.pl/media/art/1915/file/Szlak%20czerwony%20Miko%C5%82ajki%20-%20%C5%9Awi%C4%99ta%20Lipka%202.pdf" },
      { name: "Mazurska Pętla Rowerowa", distance: "około 300 km", href: "https://www.it.mragowo.pl/mazurska-petla-rowerowa%2C8%2C5648%2Cpl.html" },
    ],
  },
  {
    area: "Piecki i Krutyń",
    note: "trasy Mazurskiego Parku Krajobrazowego",
    source: "https://mpk.warmia.mazury.pl/category/turystyka/szlaki-rowerowe/",
    routes: [
      { name: "Rodzinny Szlak Mrągowo–Krutyń", distance: "23 km", href: "https://mpk.warmia.mazury.pl/rodzinny-szlak-turystyczny-mragowo-krutyn/" },
      { name: "Jezioro Mokre", distance: "26 km", href: "https://mpk.warmia.mazury.pl/szlak-rowerowy-jezioro-mokre/" },
      { name: "Rezerwaty Krutyńskie", distance: "14,5 km", href: "https://mpk.warmia.mazury.pl/szlak-rowerowy-rezerwaty-krutynskie/" },
      { name: "Kulturowo-Historyczny", distance: "21 km", href: "https://mpk.warmia.mazury.pl/szlak-rowerowy-kulturowo-historyczny/" },
      { name: "Ernsta Wiecherta", distance: "34,5 km", href: "https://mpk.warmia.mazury.pl/szlak-rowerowy-ernsta-wiecherta/" },
    ],
  },
] as const;

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

function externalNavigation(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function AttractionCard({
  attraction,
  index,
  isFavorite,
  onToggleFavorite,
}: {
  attraction: Attraction;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}) {
  return (
    <article className="attraction-card">
      <div className="attraction-card__image">
        <img
          src={attraction.image}
          alt={`${attraction.name} — ${attraction.place}`}
          loading={index < 6 ? "eager" : "lazy"}
        />
        <span className="attraction-card__number">{String(attraction.id).padStart(2, "0")}</span>
        <span className="attraction-card__category">
          <AttractionIcon type={attraction.category} />
          {categoryLabels[attraction.category]}
        </span>
        <a
          className="attraction-card__credit"
          href={attraction.imageSource}
          target="_blank"
          rel="noreferrer"
          title={`${attraction.imageArtist} · ${attraction.imageLicense}`}
        >
          Zdjęcie <ArrowUpRight />
        </a>
        <button
          type="button"
          className={`attraction-card__favorite${isFavorite ? " is-active" : ""}`}
          aria-label={
            isFavorite
              ? `Usuń ${attraction.name} z ulubionych`
              : `Dodaj ${attraction.name} do ulubionych`
          }
          aria-pressed={isFavorite}
          onClick={onToggleFavorite}
        >
          <AttractionIcon type="heart" />
        </button>
      </div>
      <div className="attraction-card__content">
        <div className="attraction-card__meta">
          <span>{attraction.area} · {attraction.place}</span>
          <span><AttractionIcon type="clock" /> około {attraction.minutes} min</span>
        </div>
        <h3>{attraction.name}</h3>
        <p>{attraction.description}</p>
        <div className="attraction-card__tags">
          {attraction.forKids && <span><AttractionIcon type="child" /> dla rodzin</span>}
          {attraction.indoor && <span><AttractionIcon type="rain" /> na niepogodę</span>}
        </div>
        <div className="attraction-card__actions">
          <a href={attraction.website} target="_blank" rel="noreferrer">
            Przejdź do strony <ArrowUpRight />
          </a>
          <a href={externalNavigation(attraction.mapQuery)} target="_blank" rel="noreferrer">
            <AttractionIcon type="route" /> Nawiguj
          </a>
        </div>
      </div>
    </article>
  );
}

export function AttractionsExplorer({ attractions }: { attractions: Attraction[] }) {
  const favoritesStorageKey = "krzywe-lake-houses-favorite-attractions";
  const [query, setQuery] = useState("");
  const [area, setArea] = useState<(typeof areas)[number]>("Wszystkie");
  const [category, setCategory] = useState<AttractionCategory | "wszystkie">("wszystkie");
  const [forKids, setForKids] = useState(false);
  const [indoor, setIndoor] = useState(false);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);
  const [visible, setVisible] = useState(12);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(favoritesStorageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          void Promise.resolve().then(() => {
            setFavoriteIds(
              parsed.filter((id): id is number => Number.isInteger(id)),
            );
          });
        }
      }
    } catch {
      // Prywatny tryb przeglądarki może blokować localStorage.
    } finally {
      setFavoritesLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!favoritesLoaded) return;

    try {
      window.localStorage.setItem(
        favoritesStorageKey,
        JSON.stringify(favoriteIds),
      );
    } catch {
      // Ulubione nadal działają w bieżącej sesji.
    }
  }, [favoriteIds, favoritesLoaded]);

  const filtered = useMemo(() => {
    const needle = normalize(query.trim());
    return attractions.filter((attraction) => {
      const matchesQuery =
        !needle ||
        normalize(`${attraction.name} ${attraction.place} ${attraction.description}`).includes(needle);
      return (
        matchesQuery &&
        (area === "Wszystkie" || attraction.area === area) &&
        (category === "wszystkie" || attraction.category === category) &&
        (!forKids || attraction.forKids) &&
        (!indoor || attraction.indoor) &&
        (!favoritesOnly || favoriteIds.includes(attraction.id))
      );
    });
  }, [
    area,
    attractions,
    category,
    favoriteIds,
    favoritesOnly,
    forKids,
    indoor,
    query,
  ]);
  const galleryFallback = attractions[0];
  const galleryMikolajki = attractions.find((item) => item.id === 1) ?? galleryFallback;
  const galleryMragowo = attractions.find((item) => item.id === 12) ?? galleryFallback;
  const galleryRyn = attractions.find((item) => item.id === 34) ?? galleryFallback;

  const reset = () => {
    setQuery("");
    setArea("Wszystkie");
    setCategory("wszystkie");
    setForKids(false);
    setIndoor(false);
    setFavoritesOnly(false);
    setVisible(12);
  };

  const toggleFavorite = (id: number) => {
    setFavoriteIds((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id],
    );
  };

  return (
    <>
      <section className="attraction-categories" id="kategorie">
        <div className="section-shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Rodzaje atrakcji</p>
              <h2>Wybierz to, na co<br />macie ochotę.</h2>
            </div>
            <p>Wybierz rodzaj atrakcji — wodę, naturę, historię albo rodzinny plan. Przewodnik od razu zawęzi listę miejsc pasujących do Was.</p>
          </div>
          <div className="category-pictograms">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className={category === item ? "is-active" : ""}
                onClick={() => {
                  setCategory(category === item ? "wszystkie" : item);
                  setVisible(12);
                  document.getElementById("wyszukiwarka")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                <span><AttractionIcon type={item} /></span>
                <strong>{categoryLabels[item]}</strong>
                <small>{attractions.filter((attraction) => attraction.category === item).length} miejsc</small>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="day-plans" id="gotowe-plany">
        <div className="section-shell">
          <div className="section-heading section-heading--light">
            <div>
              <p className="eyebrow">Gotowe scenariusze</p>
              <h2>Nie musisz układać<br />dnia od zera.</h2>
            </div>
            <p>Trzy proste kierunki, kiedy chcecie po prostu wsiąść do samochodu i dobrze wykorzystać dzień.</p>
          </div>
          <div className="day-plans__grid">
            <button type="button" onClick={() => { setArea("Piecki"); setCategory("aktywnie"); setVisible(12); document.getElementById("wyszukiwarka")?.scrollIntoView({ behavior: "smooth" }); }}>
              <span className="day-plans__index">01 / RANO</span>
              <AttractionIcon type="woda" />
              <h3>Woda i las</h3>
              <p>Spływ Krutynią, rezerwat Zakręt i spokojny powrót przez Piecki.</p>
              <strong>Uruchom ten plan <ArrowDownRight /></strong>
            </button>
            <button type="button" onClick={() => { setArea("Kętrzyn"); setCategory("historia"); setVisible(12); document.getElementById("wyszukiwarka")?.scrollIntoView({ behavior: "smooth" }); }}>
              <span className="day-plans__index">02 / CAŁY DZIEŃ</span>
              <AttractionIcon type="historia" />
              <h3>Śladami historii</h3>
              <p>Wilczy Szaniec, zamek w Kętrzynie i barokowy finał w Świętej Lipce.</p>
              <strong>Uruchom ten plan <ArrowDownRight /></strong>
            </button>
            <button type="button" onClick={() => { setForKids(true); setCategory("rodzina"); setArea("Wszystkie"); setVisible(12); document.getElementById("wyszukiwarka")?.scrollIntoView({ behavior: "smooth" }); }}>
              <span className="day-plans__index">03 / RODZINNIE</span>
              <AttractionIcon type="rodzina" />
              <h3>Bez nudy</h3>
              <p>Kadzidłowo, Mazurolandia lub Tropikana — także na mniej pewną pogodę.</p>
              <strong>Uruchom ten plan <ArrowDownRight /></strong>
            </button>
          </div>
        </div>
      </section>

      <section className="attractions-search" id="wyszukiwarka">
        <div className="section-shell">
          <div className="attractions-search__top">
            <div>
              <p className="eyebrow">Interaktywny przewodnik</p>
              <h2>Co chcecie<br />dziś odkryć?</h2>
            </div>
            <div className="search-field">
              <AttractionIcon type="search" />
              <label htmlFor="attraction-search">Szukaj po nazwie lub pomyśle</label>
              <input
                id="attraction-search"
                type="search"
                value={query}
                placeholder="np. kajak, zamek, jezioro…"
                onChange={(event) => {
                  setQuery(event.target.value);
                  setVisible(12);
                }}
              />
            </div>
          </div>

          <div className="filter-panel" aria-label="Filtry atrakcji">
            <div className="filter-panel__group">
              <span>Kierunek</span>
              <div>
                {areas.map((item) => (
                  <button key={item} type="button" className={area === item ? "is-active" : ""} onClick={() => { setArea(item); setVisible(12); }}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="filter-panel__group">
              <span>Rodzaj atrakcji</span>
              <div>
                <button type="button" className={category === "wszystkie" ? "is-active" : ""} onClick={() => { setCategory("wszystkie"); setVisible(12); }}>Wszystkie</button>
                {categories.map((item) => (
                  <button key={item} type="button" className={category === item ? "is-active" : ""} onClick={() => { setCategory(item); setVisible(12); }}>
                    {categoryLabels[item]}
                  </button>
                ))}
              </div>
            </div>
            <div className="filter-panel__toggles">
              <button type="button" className={forKids ? "is-active" : ""} aria-pressed={forKids} onClick={() => { setForKids(!forKids); setVisible(12); }}>
                <AttractionIcon type="child" /> Dla rodzin
              </button>
              <button type="button" className={indoor ? "is-active" : ""} aria-pressed={indoor} onClick={() => { setIndoor(!indoor); setVisible(12); }}>
                <AttractionIcon type="rain" /> Na niepogodę
              </button>
              <button type="button" className={favoritesOnly ? "is-active" : ""} aria-pressed={favoritesOnly} onClick={() => { setFavoritesOnly(!favoritesOnly); setVisible(12); }}>
                <AttractionIcon type="heart" /> Ulubione <strong>{favoriteIds.length}</strong>
              </button>
            </div>
          </div>

          <div className="results-bar" aria-live="polite">
            <p><strong>{filtered.length}</strong> {filtered.length === 1 ? "miejsce pasuje" : "miejsc pasuje"} do Twojego planu</p>
            {(query || area !== "Wszystkie" || category !== "wszystkie" || forKids || indoor || favoritesOnly) && (
              <button type="button" onClick={reset}>Wyczyść wszystkie filtry ×</button>
            )}
          </div>

          {filtered.length ? (
            <>
              <div className="attractions-grid">
                {filtered.slice(0, visible).map((attraction, index) => (
                  <AttractionCard
                    key={attraction.id}
                    attraction={attraction}
                    index={index}
                    isFavorite={favoriteIds.includes(attraction.id)}
                    onToggleFavorite={() => toggleFavorite(attraction.id)}
                  />
                ))}
              </div>
              {visible < filtered.length && (
                <button className="load-more" type="button" onClick={() => setVisible((value) => value + 12)}>
                  <span>Pokaż kolejne miejsca</span>
                  <small>{Math.min(12, filtered.length - visible)} z {filtered.length - visible} pozostałych</small>
                </button>
              )}
            </>
          ) : (
            <div className="empty-results">
              <AttractionIcon type={favoritesOnly ? "heart" : "search"} />
              <h3>{favoritesOnly && favoriteIds.length === 0 ? "Nie masz jeszcze ulubionych." : "Ten plan jest zbyt precyzyjny."}</h3>
              <p>{favoritesOnly && favoriteIds.length === 0 ? "Kliknij serce na karcie atrakcji, a miejsce zapisze się w tej przeglądarce." : "Usuń jeden z filtrów albo wpisz szersze hasło."}</p>
              <button type="button" onClick={reset}>Pokaż wszystkie miejsca</button>
            </div>
          )}
        </div>
      </section>

      <section className="cycling-routes" id="szlaki-rowerowe" aria-labelledby="cycling-routes-title">
        <div className="section-shell">
          <div className="cycling-routes__heading">
            <div>
              <p className="eyebrow">Mazury na dwóch kołach</p>
              <h2 id="cycling-routes-title">21 tras. Od krótkiej pętli po cały dzień wokół jezior.</h2>
            </div>
            <div className="cycling-routes__intro">
              <span><AttractionIcon type="route" /> Sprawdzone źródła i ślady GPS</span>
              <p>
                Zebraliśmy w jednym miejscu trasy publikowane przez oficjalne serwisy Mikołajek,
                Mrągowa i Mazurskiego Parku Krajobrazowego. Kliknij wybraną pozycję, aby zobaczyć
                dokładny przebieg, nawierzchnię oraz informacje praktyczne.
              </p>
            </div>
          </div>

          <div className="cycling-routes__tips" aria-label="Jak wybrać trasę rowerową">
            <span><strong>Krótko</strong> 11–23 km na spokojny poranek</span>
            <span><strong>Aktywnie</strong> 26–47 km na pół dnia</span>
            <span><strong>Wyprawa</strong> 80–90 km na cały dzień</span>
          </div>

          <div className="cycling-routes__groups">
            {cyclingGroups.map((group, groupIndex) => (
              <article className={`cycling-routes__group${groupIndex === 0 ? " is-featured" : ""}`} key={group.area}>
                <header>
                  <div>
                    <span>{String(groupIndex + 1).padStart(2, "0")}</span>
                    <h3>{group.area}</h3>
                  </div>
                  <p>{group.note}</p>
                </header>
                <ol>
                  {group.routes.map((route, routeIndex) => (
                    <li key={route.name}>
                      <a href={route.href} target="_blank" rel="noreferrer">
                        <span>{String(routeIndex + 1).padStart(2, "0")}</span>
                        <div><strong>{route.name}</strong><small>{route.distance}</small></div>
                        <ArrowUpRight />
                      </a>
                    </li>
                  ))}
                </ol>
                <a className="cycling-routes__source" href={group.source} target="_blank" rel="noreferrer">
                  Pełna baza i informacje organizatora <ArrowUpRight />
                </a>
              </article>
            ))}
          </div>

          <p className="cycling-routes__notice">
            Nawierzchnia i oznakowanie mogą zmieniać się sezonowo. Przed wyjazdem sprawdź opis
            organizatora, pogodę oraz aktualne zasady przepraw promowych na dłuższych pętlach.
          </p>
        </div>
      </section>

      <section className="attractions-seo" aria-labelledby="attractions-region-title">
        <div className="section-shell">
          <div className="attractions-seo__intro">
            <div>
              <p className="eyebrow">Jedna spokojna baza · pięć kierunków</p>
              <h2 id="attractions-region-title">Atrakcje Mikołajek, Mrągowa i Rynu — bez zmiany domu co noc.</h2>
            </div>
            <p>
              Krzywe Lake Houses to domy nad jeziorem na Mazurach, położone pomiędzy najciekawszymi
              kierunkami regionu. Rano możecie ruszyć na atrakcje w Pieckach, po południu odwiedzić
              Mikołajki lub Mrągowo, a wieczorem wrócić nad samą wodę.
            </p>
          </div>
          {galleryFallback && (
            <div className="attractions-seo__gallery" aria-label="Mikołajki, Mrągowo i Ryn w kadrach">
              <figure>
                <img src={galleryMikolajki.image} alt="Promenada i port w Mikołajkach" loading="lazy" />
                <figcaption><span>Mikołajki</span> Promenada nad Jeziorem Mikołajskim</figcaption>
              </figure>
              <figure>
                <img src={galleryMragowo.image} alt="Promenada nad Jeziorem Czos w Mrągowie" loading="lazy" />
                <figcaption><span>Mrągowo</span> Spacer wzdłuż Jeziora Czos</figcaption>
              </figure>
              <figure>
                <img src={galleryRyn.image} alt="Zamek i panorama Rynu" loading="lazy" />
                <figcaption><span>Ryn</span> Historia pomiędzy jeziorami</figcaption>
              </figure>
            </div>
          )}
          <div className="attractions-seo__routes" aria-label="Najpopularniejsze kierunki">
            <article><span>13 min</span><h3>Piecki i Krutyń</h3><p>Kajaki, dzika przyroda i rodzinne odkrywanie Mazurskiego Parku Krajobrazowego.</p></article>
            <article><span>27–32 min</span><h3>Mrągowo i Mikołajki</h3><p>Promenady, porty, kultura, rejsy i najwięcej pomysłów na mniej pewną pogodę.</p></article>
            <article><span>43–59 min</span><h3>Ryn i Kętrzyn</h3><p>Zamki, muzea, Święta Lipka i Wilczy Szaniec na pełny dzień poza domem.</p></article>
          </div>
          <p className="attractions-seo__copy">
            Jeśli szukacie wakacyjnego domu na wynajem w okolicy Mikołajek, Mrągowa albo Rynu,
            nie musicie rezygnować z ciszy. Domy na wynajem nad samą wodą w Krzywem łączą bezpośredni
            dostęp do jeziora z wygodnym dojazdem do najważniejszych atrakcji Mazur.
          </p>
        </div>
      </section>

      <section className="attractions-closing" id="powrot-nad-jezioro">
        <div className="section-shell attractions-closing__card">
          <div className="attractions-closing__image">
            <img src="/krzywe-hero.webp" alt="Krzywe Lake Houses nad jeziorem po całym dniu zwiedzania Mazur" loading="lazy" />
            <div className="attractions-closing__image-note">
              <span>Powrót do ciszy</span>
              Krzywe · nad samą wodą
            </div>
          </div>
          <div className="attractions-closing__content">
            <p className="eyebrow">Po całym dniu</p>
            <h2>Najlepszy kierunek prowadzi z powrotem nad jezioro.</h2>
            <p>
              Zachowaj kilka pomysłów, ale nie planuj każdej godziny. Tutaj warto zostawić miejsce
              na spokojny poranek, jacuzzi, miejsce na ognisko i wieczór przy wodzie.
            </p>
            <div className="attractions-closing__facts" aria-label="Najważniejsze cechy pobytu">
              <span><strong>01</strong> bezpośredni dostęp do jeziora</span>
              <span><strong>02</strong> jacuzzi i miejsce na ognisko</span>
              <span><strong>03</strong> dwa niezależne domy</span>
            </div>
            <div className="attractions-closing__actions">
              <a className="button button--primary" href={BOOKING_URL}>Zaplanuj pobyt <ArrowUpRight /></a>
              <a className="button attractions-closing__secondary" href="/domy-i-galeria">Zobacz domy <ArrowRight /></a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
