"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BlogIcon } from "./BlogIcons";
import type { BlogCategory } from "./articles";

export type BlogCardData = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  dateLabel: string;
  readingTime: number;
  image: string;
  imageAlt: string;
};

const categories: Array<BlogCategory | "Wszystkie"> = [
  "Wszystkie",
  "Przewodniki",
  "Mikołajki",
  "Mrągowo",
  "Aktywnie",
  "Rodzinne",
  "Pory roku",
];

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

export function BlogExplorer({ articles }: { articles: BlogCardData[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("Wszystkie");

  const filtered = useMemo(() => {
    const needle = normalize(query.trim());
    return articles.filter((article) => {
      const matchesQuery =
        !needle ||
        normalize(`${article.title} ${article.excerpt} ${article.category}`).includes(needle);
      const matchesCategory =
        category === "Wszystkie" || article.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [articles, category, query]);

  const reset = () => {
    setQuery("");
    setCategory("Wszystkie");
  };

  return (
    <section className="blog-library" id="artykuly" aria-labelledby="blog-library-title">
      <div className="section-shell">
        <div className="blog-library__heading">
          <div>
            <p className="eyebrow">Czytaj według własnego planu</p>
            <h2 id="blog-library-title">Przewodniki, które pomagają dobrze wykorzystać pobyt.</h2>
          </div>
          <div className="blog-search">
            <BlogIcon type="search" />
            <label htmlFor="blog-search">Szukaj w dzienniku</label>
            <input
              id="blog-search"
              type="search"
              value={query}
              placeholder="np. Mikołajki, dzieci, jesień…"
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </div>

        <div className="blog-filters" aria-label="Kategorie artykułów">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={category === item ? "is-active" : ""}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
              <span>
                {item === "Wszystkie"
                  ? articles.length
                  : articles.filter((article) => article.category === item).length}
              </span>
            </button>
          ))}
        </div>

        <div className="blog-results" aria-live="polite">
          <p><strong>{filtered.length}</strong> {filtered.length === 1 ? "artykuł" : "artykułów"}</p>
          {(query || category !== "Wszystkie") && (
            <button type="button" onClick={reset}>Wyczyść wyszukiwanie ×</button>
          )}
        </div>

        {filtered.length ? (
          <div className="blog-grid">
            {filtered.map((article, index) => (
              <article
                className={`blog-card${index === 0 && !query && category === "Wszystkie" ? " blog-card--featured" : ""}`}
                key={article.slug}
              >
                <Link className="blog-card__image" href={`/blog/${article.slug}`} aria-label={`Czytaj: ${article.title}`}>
                  <img src={article.image} alt={article.imageAlt} loading={index < 3 ? "eager" : "lazy"} />
                  <span>{article.category}</span>
                </Link>
                <div className="blog-card__content">
                  <div className="blog-card__meta">
                    <span><BlogIcon type="calendar" /> {article.dateLabel}</span>
                    <span><BlogIcon type="clock" /> {article.readingTime} min</span>
                  </div>
                  <h3><Link href={`/blog/${article.slug}`}>{article.title}</Link></h3>
                  <p>{article.excerpt}</p>
                  <Link className="blog-card__read" href={`/blog/${article.slug}`}>
                    Czytaj artykuł <BlogIcon type="arrow" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="blog-empty">
            <BlogIcon type="book" />
            <h3>Nie znaleźliśmy takiego artykułu.</h3>
            <p>Wpisz szersze hasło albo wybierz inną kategorię.</p>
            <button type="button" onClick={reset}>Pokaż wszystkie artykuły</button>
          </div>
        )}
      </div>
    </section>
  );
}
