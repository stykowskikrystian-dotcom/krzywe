import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "../../components/SiteHeader";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "../../components/Icons";
import { BOOKING_URL } from "../../lib/booking";
import { BlogIcon } from "../BlogIcons";
import { articleInsights } from "../article-insights";
import {
  blogArticles,
  formatBlogDate,
  getBlogArticle,
  type BlogArticle,
} from "../articles";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

const headingId = (heading: string) =>
  heading
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export function generateStaticParams() {
  return blogArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticle(slug);

  if (!article) {
    return { title: "Artykuł nie został znaleziony" };
  }

  return {
    title: article.seoTitle,
    description: article.seoDescription,
    keywords: article.keywords,
    alternates: {
      canonical: `/blog/${article.slug}`,
    },
    openGraph: {
      type: "article",
      locale: "pl_PL",
      url: `/blog/${article.slug}`,
      title: article.seoTitle,
      description: article.seoDescription,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: ["Krzywe Lake Houses"],
      section: article.category,
      tags: article.keywords,
      images: [{ url: article.image, alt: article.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle,
      description: article.seoDescription,
      images: [article.image],
    },
  };
}

function articleStructuredData(article: BlogArticle) {
  const articleBody = article.sections
    .flatMap((section) => [
      section.heading,
      ...section.paragraphs,
      ...(section.bullets ?? []),
    ])
    .join(" ");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `https://www.krzywelakehouses.pl/blog/${article.slug}#article`,
        headline: article.title,
        description: article.seoDescription,
        image: [article.image],
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        inLanguage: "pl-PL",
        articleSection: article.category,
        articleBody,
        wordCount: articleBody.split(/\s+/).filter(Boolean).length,
        keywords: article.keywords.join(", "),
        isAccessibleForFree: true,
        isPartOf: {
          "@type": "Blog",
          "@id": "https://www.krzywelakehouses.pl/blog#blog",
          name: "Dziennik z Krzywe",
        },
        about: article.keywords.map((keyword) => ({
          "@type": "Thing",
          name: keyword,
        })),
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://www.krzywelakehouses.pl/blog/${article.slug}`,
        },
        author: {
          "@type": "Organization",
          name: "Krzywe Lake Houses",
          url: "https://www.krzywelakehouses.pl",
        },
        publisher: {
          "@type": "Organization",
          name: "Krzywe Lake Houses",
          logo: {
            "@type": "ImageObject",
            url: "https://www.krzywelakehouses.pl/brand-logo.png",
          },
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: article.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
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
          {
            "@type": "ListItem",
            position: 3,
            name: article.shortTitle,
            item: `https://www.krzywelakehouses.pl/blog/${article.slug}`,
          },
        ],
      },
    ],
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getBlogArticle(slug);

  if (!article) notFound();

  const allArticles = blogArticles;
  const articleIndex = allArticles.findIndex((item) => item.slug === article.slug);
  const insight = articleInsights[article.slug];
  const related = [1, 2, 3].map(
    (offset) => allArticles[(articleIndex + offset) % allArticles.length],
  );

  return (
    <main className="blog-article-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData(article)),
        }}
      />

      <div className="blog-article-page__header">
        <SiteHeader activePath="/blog" />
      </div>

      <article>
        <header className="article-hero">
          <div className="section-shell article-hero__grid">
            <div className="article-hero__copy">
              <Link className="article-back" href="/blog">
                <ArrowLeft /> Wróć do dziennika
              </Link>
              <p className="eyebrow">{article.category}</p>
              <h1>{article.title}</h1>
              <p className="article-hero__lead">{article.lead}</p>
              <div className="article-hero__meta">
                <span><BlogIcon type="calendar" /><time dateTime={article.publishedAt}>{formatBlogDate(article.publishedAt)}</time></span>
                <span><BlogIcon type="clock" /> {article.readingTime} min czytania</span>
                <span><BlogIcon type="book" /> Krzywe Lake Houses</span>
              </div>
            </div>
            <figure className="article-hero__image">
              <img src={article.image} alt={article.imageAlt} />
              <figcaption>
                <span>{article.imageCredit}</span>
                {article.imageSource && (
                  <a href={article.imageSource} target="_blank" rel="noreferrer">Źródło zdjęcia <ArrowUpRight /></a>
                )}
              </figcaption>
            </figure>
          </div>
        </header>

        <div className="section-shell article-layout">
          <aside className="article-toc" aria-label="Spis treści">
            <p>W tym artykule</p>
            <nav>
              {article.sections.map((section, index) => (
                <a key={section.heading} href={`#${headingId(section.heading)}`}>
                  <span>0{index + 1}</span>{section.heading}
                </a>
              ))}
            </nav>
            <a href={BOOKING_URL}>Sprawdź termin <ArrowUpRight /></a>
          </aside>

          <div className="article-content">
            {insight && (
              <section className="article-quick" aria-labelledby="article-quick-title">
                <div className="article-quick__heading">
                  <span><BlogIcon type="compass" /></span>
                  <div>
                    <p>Najważniejsze w 30 sekund</p>
                    <h2 id="article-quick-title">Zanim zaczniesz czytać.</h2>
                  </div>
                </div>
                <ul>
                  {insight.takeaways.map((takeaway) => (
                    <li key={takeaway}>{takeaway}</li>
                  ))}
                </ul>
                <aside>
                  <strong>Lokalna podpowiedź</strong>
                  <p>{insight.localTip}</p>
                </aside>
              </section>
            )}

            {article.sections.map((section, index) => (
              <section id={headingId(section.heading)} key={section.heading}>
                <span className="article-content__index">0{index + 1}</span>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                )}
              </section>
            ))}

            <section className="article-faq" aria-labelledby="article-faq-title">
              <p className="eyebrow">Najczęstsze pytania</p>
              <h2 id="article-faq-title">Warto wiedzieć przed wyjazdem.</h2>
              <div>
                {article.faq.map((item) => (
                  <details key={item.question}>
                    <summary>{item.question}<span aria-hidden="true">+</span></summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>
        </div>
      </article>

      <section className="article-related" aria-labelledby="related-title">
        <div className="section-shell">
          <div className="article-related__heading">
            <div>
              <p className="eyebrow">Czytaj dalej</p>
              <h2 id="related-title">Kolejne historie znad jeziora.</h2>
            </div>
            <Link href="/blog">Wszystkie artykuły <ArrowUpRight /></Link>
          </div>
          <div className="article-related__grid">
            {related.map((item) => (
              <article key={item.slug}>
                <Link className="article-related__image" href={`/blog/${item.slug}`}>
                  <img src={item.image} alt={item.imageAlt} loading="lazy" />
                  <span>{item.category}</span>
                </Link>
                <div>
                  <small>{item.readingTime} min czytania</small>
                  <h3><Link href={`/blog/${item.slug}`}>{item.shortTitle}</Link></h3>
                  <Link href={`/blog/${item.slug}`}>Czytaj <ArrowUpRight /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="article-cta">
        <div className="section-shell article-cta__card">
          <div>
            <p className="eyebrow">Zobacz Mazury z bliska</p>
            <h2>Po przeczytaniu zostaje już tylko wybrać termin.</h2>
          </div>
          <div>
            <p>
              Dwa całoroczne domy nad Jeziorem Krzywe. Blisko Mikołajek,
              Mrągowa, Piecek i najciekawszych miejsc regionu.
            </p>
            <div>
              <a className="button button--primary" href={BOOKING_URL}>Sprawdź termin <ArrowUpRight /></a>
              <Link className="button article-cta__secondary" href="/domy-i-galeria">Zobacz domy <ArrowRight /></Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
