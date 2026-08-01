import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "./Icons";
import { SiteHeader } from "./SiteHeader";

type LegalSection = {
  id: string;
  title: string;
  content: ReactNode;
};

type LegalSource = {
  label: string;
  href: string;
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  lead: string;
  summary: string;
  sections: LegalSection[];
  sources: LegalSource[];
  relatedHref: string;
  relatedLabel: string;
};

export function LegalPage({
  eyebrow,
  title,
  lead,
  summary,
  sections,
  sources,
  relatedHref,
  relatedLabel,
}: LegalPageProps) {
  return (
    <main className="legal-page">
      <SiteHeader />

      <header className="legal-hero">
        <div className="legal-shell legal-hero__grid">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            <p>{lead}</p>
          </div>
          <div className="legal-hero__meta">
            <span>Aktualizacja</span>
            <strong>28 lipca 2026</strong>
            <Link href={relatedHref}>
              {relatedLabel}
              <ArrowUpRight />
            </Link>
          </div>
        </div>
      </header>

      <div className="legal-shell legal-layout">
        <aside className="legal-aside">
          <div className="legal-aside__summary">
            <small>W skrócie</small>
            <p>{summary}</p>
          </div>
          <nav aria-label={`Spis treści: ${title}`}>
            {sections.map((section, index) => (
              <a key={section.id} href={`#${section.id}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {section.title}
              </a>
            ))}
          </nav>
          <div className="legal-aside__contact">
            <small>Masz pytanie?</small>
            <a href="mailto:krzywelakehouses@gmail.com"><Mail />Napisz do nas</a>
            <a href="tel:+48505586950"><Phone />505 586 950</a>
          </div>
        </aside>

        <article className="legal-content">
          {sections.map((section, index) => (
            <section key={section.id} id={section.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2>{section.title}</h2>
                {section.content}
              </div>
            </section>
          ))}

          <section className="legal-sources" aria-labelledby="legal-sources-title">
            <span>↗</span>
            <div>
              <h2 id="legal-sources-title">Dokumenty i informacje zewnętrzne</h2>
              <p>
                Poniższe materiały prowadzą do oficjalnych informacji prawnych i zasad
                systemu rezerwacyjnego.
              </p>
              <div>
                {sources.map((source) => (
                  <a key={source.href} href={source.href} target="_blank" rel="noreferrer">
                    {source.label}
                    <ArrowUpRight />
                  </a>
                ))}
              </div>
            </div>
          </section>
        </article>
      </div>

      <section className="legal-contact">
        <div className="legal-shell legal-contact__inner">
          <div>
            <p className="eyebrow">Jasne zasady, spokojny pobyt</p>
            <h2>Najpierw odpowiedzi. Później tylko jezioro.</h2>
          </div>
          <div>
            <a href="mailto:krzywelakehouses@gmail.com">krzywelakehouses@gmail.com</a>
            <a href="tel:+48505586950">505 586 950</a>
          </div>
        </div>
      </section>

      <footer className="legal-footer">
        <div className="legal-shell">
          <Link className="legal-footer__brand" href="/">
            <img src="/brand-mark.png" alt="" />
            <span><strong>Krzywe</strong><small>Lake Houses · Mazury</small></span>
          </Link>
          <nav aria-label="Dokumenty i nawigacja pomocnicza">
            <Link href="/polityka-prywatnosci">Polityka prywatności</Link>
            <Link href="/regulamin">Regulamin</Link>
            <Link href="/kontakt">Kontakt</Link>
            <Link href="/">Strona główna</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
