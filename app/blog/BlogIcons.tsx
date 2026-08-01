export type BlogIconName =
  | "search"
  | "clock"
  | "calendar"
  | "book"
  | "compass";

export function BlogIcon({ type }: { type: BlogIconName }) {
  if (type === "search") return <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="14" cy="14" r="8" /><path d="m20 20 7 7" /></svg>;
  if (type === "clock") return <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="11" /><path d="M16 9v8l5 3" /></svg>;
  if (type === "calendar") return <svg viewBox="0 0 32 32" aria-hidden="true"><rect x="5" y="7" width="22" height="20" rx="4" /><path d="M10 4v6M22 4v6M5 13h22" /></svg>;
  if (type === "book") return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M5 6h9a4 4 0 0 1 4 4v17H9a4 4 0 0 0-4 2V6ZM27 6h-5a4 4 0 0 0-4 4v17h5a4 4 0 0 1 4 2V6Z" /></svg>;
  if (type === "compass") return <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="12" /><path d="m20.5 11.5-3 6-6 3 3-6 6-3Z" /></svg>;
  return <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="12" /><path d="m20.5 11.5-3 6-6 3 3-6 6-3Z" /></svg>;
}
