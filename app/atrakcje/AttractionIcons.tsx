import type { AttractionCategory } from "./attractions";

export function AttractionIcon({ type }: { type: AttractionCategory | "search" | "route" | "clock" | "sun" | "rain" | "child" | "heart" }) {
  if (type === "woda") return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M3 11c3.3 0 3.3 2.5 6.5 2.5S12.8 11 16 11s3.3 2.5 6.5 2.5S25.8 11 29 11M3 17c3.3 0 3.3 2.5 6.5 2.5S12.8 17 16 17s3.3 2.5 6.5 2.5S25.8 17 29 17M3 23c3.3 0 3.3 2.5 6.5 2.5S12.8 23 16 23s3.3 2.5 6.5 2.5S25.8 23 29 23" /></svg>;
  if (type === "natura") return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 27V12M16 15c-5 0-8-3-8-9 5 0 8 3 8 9ZM16 20c5 0 8-3 8-9-5 0-8 3-8 9ZM8 27h16" /></svg>;
  if (type === "historia") return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M5 27h22M7 24h18M9 21V10h14v11M7 10h18L16 4 7 10ZM13 21v-7h6v7" /></svg>;
  if (type === "rodzina") return <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="12" cy="9" r="4" /><circle cx="23" cy="12" r="3" /><path d="M4 27v-5a8 8 0 0 1 16 0v5M20 18.5a6 6 0 0 1 8 5.7V27" /></svg>;
  if (type === "aktywnie") return <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="6" r="3" /><path d="m13 13 5 3 4-3M18 16l-3 5-6 5M18 16l3 5 5 5M13 13l-3 6" /></svg>;
  if (type === "kultura") return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M7 5h16a3 3 0 0 1 3 3v17H10a4 4 0 0 1-4-4V6a1 1 0 0 1 1-1ZM10 5v20M14 11h8M14 16h8" /></svg>;
  if (type === "widoki") return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="m4 25 8-12 5 7 4-5 7 10H4ZM22 7a4 4 0 1 0 0 .1" /></svg>;
  if (type === "search") return <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="14" cy="14" r="8" /><path d="m20 20 7 7" /></svg>;
  if (type === "route") return <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="7" cy="7" r="3" /><circle cx="25" cy="25" r="3" /><path d="M9 9c7 2 9 4 5 8s0 6 8 6" /></svg>;
  if (type === "clock") return <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="11" /><path d="M16 9v8l5 3" /></svg>;
  if (type === "rain") return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M9 21h14a6 6 0 0 0 0-12 8 8 0 0 0-15-1 6 6 0 0 0 1 13ZM10 25l-2 3M17 25l-2 3M24 25l-2 3" /></svg>;
  if (type === "child") return <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="7" r="3" /><path d="M9 14c2-2 4-3 7-3s5 1 7 3M16 11v9M11 28l5-8 5 8M10 17h12" /></svg>;
  if (type === "heart") return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 27S5 20.5 5 13a6 6 0 0 1 11-3.3A6 6 0 0 1 27 13c0 7.5-11 14-11 14Z" /></svg>;
  return <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="8" /></svg>;
}
