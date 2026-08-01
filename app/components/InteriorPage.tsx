import Link from "next/link";
import { ArrowUpRight } from "./Icons";
import { SiteHeader } from "./SiteHeader";

type InteriorPageProps = {
  activePath: string;
  chapter: string;
  eyebrow: string;
  title: string;
  titleAccent?: string;
  description: string;
};

export function InteriorPage({
  activePath,
  chapter,
  eyebrow,
  title,
  titleAccent,
  description,
}: InteriorPageProps) {
  return (
    <main className="interior">
      <SiteHeader activePath={activePath} />
      <section className="interior__hero">
        <div className="interior__orb" />
        <p className="interior__chapter">{chapter}</p>
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>
            <span className="hero-title__primary">{title}</span>
            {titleAccent ? <em>{titleAccent}</em> : null}
          </h1>
          <p className="interior__lead">{description}</p>
          <Link className="button button--primary" href="/kontakt">
            Zapytaj o termin
            <ArrowUpRight />
          </Link>
        </div>
        <p className="interior__note">
          Budujemy tę podstronę jako kolejny rozdział Krzywe Lake Houses.
        </p>
      </section>
    </main>
  );
}
