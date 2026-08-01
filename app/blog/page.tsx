import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../components/SiteHeader";
import { BOOKING_URL } from "../lib/booking";
import { BlogExplorer, type BlogCardData } from "./BlogExplorer";
import { BlogIcon } from "./BlogIcons";
import { blogArticles, formatBlogDate } from "./articles";

export const metadata: Metadata = {
  title: "Blog o Mazurach — Mikołajki, Mrągowo i domy nad jeziorem",
  description:
    "Praktyczny blog o Mazurach: atrakcje Mikołajek, Mrągowa, Rynu i Piecek, rodzinne wyjazdy oraz wybór domu nad jeziorem na wynajem.",
  keywords: [
    "blog Mazury",
    "turystyka Mazury",
    "domy na wynajem Mikołajki",
    "domy na wynajem Mrągowo",
    "domy na wynajem Krzywe",
    "domy na wynajem Ryn",
    "domy na wynajem Piecki",
    "domy nad jeziorem Mazury",
    "atrakcje Mikołajki",
    "atrakcje Mrągowo",
    "atrakcje Ryn",
    "atrakcje Piecki",
    "hotelarstwo Mazury",
    "wakacje na Mazurach",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Dziennik z Krzywe — przewodniki po Mazurach",
    description:
      "Mikołajki, Mrągowo, Krutyń i spokojny wypoczynek w domu nad jeziorem. Konkretne plany i lokalne inspiracje.",
    url: "/blog",
    type: "website",
    locale: "pl_PL",
    images: [{ url: blogArticles[0].image, alt: blogArticles[0].imageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog o Mazurach | Krzywe Lake Houses",
    description:
      "Przewodniki po Mikołajkach, Mrągowie i wypoczynku nad jeziorem.",
    images: [blogArticles[0].image],
  },
};

export default function BlogPage() {
  const articles = blogArticles;
  const cards: BlogCardData[] = articles.map((article) => ({
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    category: article.category,
    dateLabel: formatBlogDate(article.publishedAt),
    readingTime: article.readingTime,
    image: article.image,
    imageAlt: article.imageAlt,
  }));
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": "https://www.krzywelakehouses.pl/blog#blog",
        name: "Dziennik z Krzywe",
        description: metadata.description,
        url: "https://www.krzywelakehouses.pl/blog",
        inLanguage: "pl-PL",
        about: [
          "Mazury",
          "Mikołajki",
          "Mrągowo",
          "Ryn",
          "Piecki",
          "domy nad jeziorem",
          "turystyka",
        ],
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Mazury",
        },
        publisher: {
          "@type": "Organization",
          name: "Krzywe Lake Houses",
          url: "https://www.krzywelakehouses.pl",
          logo: {
            "@type": "ImageObject",
            url: "https://www.krzywelakehouses.pl/brand-logo.png",
          },
        },
        blogPost: articles.map((article) => ({
          "@type": "BlogPosting",
          headline: article.title,
          description: article.seoDescription,
          datePublished: article.publishedAt,
          dateModified: article.updatedAt,
          image: article.image,
          url: `https://www.krzywelakehouses.pl/blog/${article.slug}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Strona główna",
            item: "https://www.krzywelakehouses.pl/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: "https://www.krzywelakehouses.pl/blog",
          },
        ],
      },
    ],
  };

  return (
    <main className="blog-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="blog-hero" aria-labelledby="blog-title">
        <SiteHeader activePath="/blog" />
        <div className="blog-hero__grid">
          <div className="blog-hero__copy">
            <p className="eyebrow">Dziennik z Krzywe</p>
            <h1 id="blog-title">
              <span className="hero-title__primary">Mazury.</span>
              <em>Bez pośpiechu.</em>
            </h1>
            <p className="blog-hero__lead">
              Lokalne przewodniki, rozsądne plany dnia i odpowiedzi na pytania,
              które pojawiają się przed wynajęciem domu nad jeziorem.
            </p>
            <div className="blog-hero__actions">
              <a className="button button--primary" href="#artykuly">
                Znajdź artykuł <span aria-hidden="true">↓</span>
              </a>
              <Link className="button button--quiet" href="/atrakcje">
                Odkryj atrakcje <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <div className="blog-hero__stats" aria-label="Zawartość dziennika">
              <div><strong>{articles.length}</strong><span>pełnych przewodników</span></div>
              <div><strong>6</strong><span>obszarów tematycznych</span></div>
              <div><strong>Lokalnie</strong><span>sprawdzone mazurskie wskazówki</span></div>
            </div>
          </div>

          <div className="blog-hero__visual" aria-label="Najnowsze historie z Mazur">
            <figure className="blog-hero__feature">
              <img src={articles[0].image} alt={articles[0].imageAlt} />
              <figcaption>
                <span>Przewodnik główny · {articles[0].readingTime} min</span>
                <strong>{articles[0].shortTitle}</strong>
                <Link href={`/blog/${articles[0].slug}`}>Czytaj teraz <BlogIcon type="arrow" /></Link>
              </figcaption>
            </figure>
            <figure className="blog-hero__small blog-hero__small--top">
              <img src={articles[1].image} alt={articles[1].imageAlt} />
              <figcaption><span>{articles[1].category}</span>{articles[1].shortTitle}</figcaption>
            </figure>
            <figure className="blog-hero__small blog-hero__small--bottom">
              <img src={articles[2].image} alt={articles[2].imageAlt} />
              <figcaption><span>{articles[2].category}</span>{articles[2].shortTitle}</figcaption>
            </figure>
          </div>
        </div>
        <a className="blog-hero__scroll hero-scroll-cue" href="#artykuly">
          <span>Przewiń do dziennika</span>
          <i aria-hidden="true">↓</i>
        </a>
      </section>

      <section className="blog-manifesto">
        <div className="section-shell">
          <div className="blog-manifesto__card">
            <div className="blog-manifesto__grid">
              <div>
                <p className="eyebrow">Sprawdzone przed wyjazdem</p>
                <h2>Nie piszemy o wszystkim. Piszemy o tym, co pomaga dobrze wybrać.</h2>
              </div>
              <div className="blog-manifesto__copy">
                <span className="blog-manifesto__stamp">
                  <BlogIcon type="compass" />
                  <span>Lokalnie redagowane</span>
                </span>
                <p>
                  Dziennik łączy lokalną turystykę z doświadczeniem pobytu w domu
                  nad wodą. Zamiast anonimowych list znajdziesz tu plany, realne
                  odległości i podpowiedzi na różną pogodę.
                </p>
              </div>
            </div>
            <div className="blog-manifesto__principles">
              <article>
                <BlogIcon type="compass" />
                <div>
                  <strong>Realne odległości</strong>
                  <p>Trasy, dojazdy i rytm dnia opisane z perspektywy bazy nad Jeziorem Krzywe.</p>
                </div>
              </article>
              <article>
                <BlogIcon type="book" />
                <div>
                  <strong>Pełne przewodniki</strong>
                  <p>Bez pustych rankingów — z planem, kontekstem i praktycznymi podpowiedziami.</p>
                </div>
              </article>
              <article>
                <BlogIcon type="calendar" />
                <div>
                  <strong>Regularnie aktualizowane</strong>
                  <p>Treści wracają do weryfikacji, gdy zmieniają się trasy, godziny lub warunki zwiedzania.</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <BlogExplorer articles={cards} />

      <section className="blog-destinations" aria-labelledby="blog-destinations-title">
        <div className="section-shell">
          <div className="blog-destinations__intro">
            <div>
              <p className="eyebrow">Jedna baza · wiele kierunków</p>
              <h2 id="blog-destinations-title">Czytaj o miejscu, które planujesz zobaczyć.</h2>
            </div>
            <p>
              Krzywe Lake Houses leży pomiędzy najważniejszymi kierunkami tej
              części Mazur. Wybierz temat, a później wróć do ciszy nad jeziorem.
            </p>
          </div>
          <div className="blog-destinations__grid">
            <article>
              <figure>
                <img src={blogArticles[1].image} alt={blogArticles[1].imageAlt} loading="lazy" />
                <span>01 · Żeglarskie miasto</span>
              </figure>
              <div>
                <h3>Mikołajki</h3>
                <p>Port, promenada, rejsy i atrakcje na mniej pewną pogodę.</p>
                <Link href="/blog/mikolajki-na-weekend-plan-bez-pospiechu">Czytaj przewodnik <BlogIcon type="arrow" /></Link>
              </div>
            </article>
            <article>
              <figure>
                <img src={blogArticles[2].image} alt={blogArticles[2].imageAlt} loading="lazy" />
                <span>02 · Jezioro Czos</span>
              </figure>
              <div>
                <h3>Mrągowo</h3>
                <p>Kultura, widoki i spacerowa trasa przez miasto nad wodą.</p>
                <Link href="/blog/mragowo-atrakcje-nad-jeziorem-czos">Czytaj przewodnik <BlogIcon type="arrow" /></Link>
              </div>
            </article>
            <article>
              <figure>
                <img src={blogArticles[3].image} alt={blogArticles[3].imageAlt} loading="lazy" />
                <span>03 · Rzeka i las</span>
              </figure>
              <div>
                <h3>Krutyń</h3>
                <p>Kajaki, rezerwaty i aktywny dzień blisko Piecek.</p>
                <Link href="/blog/splyw-krutynia-poradnik-pierwszy-raz">Czytaj przewodnik <BlogIcon type="arrow" /></Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="blog-cta">
        <div className="section-shell blog-cta__card">
          <figure className="blog-cta__visual">
            <img src="/krzywe-hero.webp" alt="Dwa domy Krzywe Lake Houses nad Jeziorem Krzywe" loading="lazy" />
            <figcaption>
              <span>Krzywe · Mazury</span>
              <strong>2 domy · do 20 gości</strong>
            </figcaption>
          </figure>
          <div className="blog-cta__content">
            <p className="eyebrow">Najpierw inspiracja, później wyjazd</p>
            <h2>Znajdź swój dom pomiędzy wodą a najciekawszymi miejscami Mazur.</h2>
            <p>
              Dwa całoroczne domy nad Jeziorem Krzywe, do 10 osób w każdym.
              Bezpośredni dostęp do jeziora, jacuzzi i miejsce na ognisko.
            </p>
            <div className="blog-cta__actions">
              <Link className="button button--primary" href="/domy-i-galeria">
                Zobacz domy <BlogIcon type="arrow" />
              </Link>
              <a className="button blog-cta__secondary" href={BOOKING_URL}>
                Sprawdź termin <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
