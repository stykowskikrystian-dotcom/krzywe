"use client";

import { useEffect, useMemo, useState } from "react";
import { HouseIcon } from "./HouseIcons";
import { ArrowLeft, ArrowRight } from "../components/Icons";
import type { GalleryImage, HouseName } from "./galleryData";

const houseFilters: { value: "all" | HouseName; label: string }[] = [
  { value: "all", label: "Wszystkie" },
  { value: "modern", label: "Modern" },
  { value: "loft", label: "Loft" },
  { value: "teren", label: "Teren" },
];

const houseLabel = (house: HouseName) => house === "modern" ? "Modern" : house === "loft" ? "Loft" : "Teren";
const lightboxLabel = (house: HouseName) => house === "teren" ? "Teren obiektu" : `Dom ${houseLabel(house)}`;

export function HouseGallery({ images }: { images: GalleryImage[] }) {
  const [house, setHouse] = useState<"all" | HouseName>("all");
  const [activeId, setActiveId] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(10);

  const filtered = useMemo(
    () => images.filter((item) => house === "all" || item.house === house),
    [house, images]
  );

  const activeIndex = activeId === null ? -1 : filtered.findIndex((item) => item.id === activeId);
  const active = activeIndex >= 0 ? filtered[activeIndex] : null;
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visible.length < filtered.length;

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveId(null);
      if (event.key === "ArrowRight") {
        setActiveId(filtered[(activeIndex + 1) % filtered.length].id);
      }
      if (event.key === "ArrowLeft") {
        setActiveId(filtered[(activeIndex - 1 + filtered.length) % filtered.length].id);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, activeIndex, filtered]);

  const clearFilters = () => {
    setHouse("all");
  };

  return (
    <section className="house-gallery" id="galeria" aria-labelledby="gallery-title">
      <div className="section-shell">
        <div className="houses-section-heading house-gallery__heading">
          <div>
            <p className="eyebrow">Dom Modern · galeria</p>
            <h2 id="gallery-title">Zobacz dom po swojemu.</h2>
          </div>
          <p>
            Wybierz pełną galerię albo przejdź bezpośrednio do zdjęć domu
            Modern, Loft lub wspólnego terenu. Jeden wybór wystarczy, żeby znaleźć właściwy kadr.
          </p>
        </div>

        <div className="house-gallery__toolbar">
          <div className="house-gallery__filter-group">
            <span>Dom</span>
            <div>
              {houseFilters.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  className={house === filter.value ? "is-active" : ""}
                  aria-pressed={house === filter.value}
                  onClick={() => {
                    setHouse(filter.value);
                    setVisibleCount(10);
                  }}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="house-gallery__results" aria-live="polite">
          <p><HouseIcon type="grid" /><strong>{filtered.length}</strong> {filtered.length === 1 ? "zdjęcie" : filtered.length < 5 ? "zdjęcia" : "zdjęć"}</p>
          {house !== "all" && (
            <button type="button" onClick={clearFilters}>Wyczyść filtry <HouseIcon type="close" /></button>
          )}
        </div>

        {visible.length > 0 ? (
          <div className={`house-gallery__grid${visible.length === 1 ? " is-single" : ""}`}>
            {visible.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={(index % 9 === 0 || index % 9 === 5) ? "is-wide" : ""}
                onClick={() => setActiveId(item.id)}
                aria-label={`Powiększ: ${item.caption}`}
              >
                <img src={item.src} alt={item.alt} loading="lazy" />
                <span><small>{houseLabel(item.house)}</small>{item.caption.replace(/^(Modern|Loft|Teren|Wspólny ogród) · /, "")}</span>
                <i><HouseIcon type="arrow" /></i>
              </button>
            ))}
          </div>
        ) : (
          <div className="house-gallery__empty">
            <HouseIcon type="grid" />
            <strong>{house === "teren" ? "Galeria terenu jest w przygotowaniu." : `Galeria domu ${houseLabel(house === "all" ? "loft" : house)} jest w przygotowaniu.`}</strong>
            <p>Dodamy tutaj wyłącznie właściwe zdjęcia obiektu.</p>
          </div>
        )}

        {hasMore && (
          <div className="house-gallery__more">
            <button
              type="button"
              onClick={() => setVisibleCount((count) => Math.min(count + 10, filtered.length))}
            >
              Pokaż kolejne zdjęcia
              <span>{filtered.length - visible.length}</span>
              <HouseIcon type="arrow" />
            </button>
          </div>
        )}

      </div>

      {active && (
        <div className="house-lightbox" role="dialog" aria-modal="true" aria-label={active.caption}>
          <button className="house-lightbox__backdrop" type="button" onClick={() => setActiveId(null)} aria-label="Zamknij galerię" />
          <div className="house-lightbox__panel">
            <button className="house-lightbox__close" type="button" onClick={() => setActiveId(null)} aria-label="Zamknij">
              <HouseIcon type="close" />
            </button>
            <figure>
              <img src={active.src} alt={active.alt} />
              <figcaption>
                <span>{lightboxLabel(active.house)}</span>
                <strong>{active.caption}</strong>
                <small>{activeIndex + 1} / {filtered.length}</small>
              </figcaption>
            </figure>
            {filtered.length > 1 && (
              <div className="house-lightbox__nav">
                <button type="button" onClick={() => setActiveId(filtered[(activeIndex - 1 + filtered.length) % filtered.length].id)} aria-label="Poprzednie zdjęcie"><ArrowLeft /></button>
                <button type="button" onClick={() => setActiveId(filtered[(activeIndex + 1) % filtered.length].id)} aria-label="Następne zdjęcie"><ArrowRight /></button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
