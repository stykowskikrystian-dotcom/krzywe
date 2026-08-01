import type { ReactNode } from "react";

export type HouseIconName =
  | "area" | "guests" | "bed" | "bath" | "kitchen" | "linen" | "wifi"
  | "lake" | "fire" | "hotTub" | "parking" | "year" | "window" | "pet" | "smoke"
  | "grid" | "close" | "arrow";

export function HouseIcon({ type }: { type: HouseIconName }) {
  const paths: Record<HouseIconName, ReactNode> = {
    area: <><path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" /><path d="M8 12h8M12 8v8" /></>,
    guests: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.2" /><path d="M3.5 20c.5-4 2.3-6 5.5-6s5 2 5.5 6M14 15c3.8-.5 5.7 1.2 6.2 4.5" /></>,
    bed: <><path d="M3 19v-8h18v8M3 16h18M6 11V7h5a3 3 0 0 1 3 3v1M3 21v-2M21 21v-2" /></>,
    bath: <><path d="M4 12h16v2a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6v-2ZM7 12V6a3 3 0 0 1 6 0" /><path d="M6 20v1M18 20v1" /></>,
    kitchen: <><path d="M5 4v16M9 4v5a2 2 0 0 1-4 0V4M7 12v8M16 4v16M16 4c3 2 3 7 0 9" /></>,
    linen: <><path d="M5 7h14v12H5zM8 4h8v3M8 11h8M8 15h5" /></>,
    wifi: <><path d="M4 9a12 12 0 0 1 16 0M7 13a7.5 7.5 0 0 1 10 0M10 17a3 3 0 0 1 4 0" /><circle cx="12" cy="20" r=".8" /></>,
    lake: <><path d="M3 7c2.2 0 2.2 1.7 4.5 1.7S9.7 7 12 7s2.2 1.7 4.5 1.7S18.8 7 21 7M3 12c2.2 0 2.2 1.7 4.5 1.7S9.7 12 12 12s2.2 1.7 4.5 1.7S18.8 12 21 12M3 17c2.2 0 2.2 1.7 4.5 1.7S9.7 17 12 17s2.2 1.7 4.5 1.7S18.8 17 21 17" /></>,
    fire: <path d="M12 22c4 0 7-2.8 7-7 0-3.4-2.1-6.5-5.6-10 .2 3-1.1 4.4-2.3 5.3-.2-2.2-1.3-3.8-3-5.3.1 3.2-3.1 5.7-3.1 10 0 4.2 3 7 7 7Zm0-3.5c-1.7 0-3-1.1-3-2.8 0-1.5 1-2.5 2-3.7.2 1.2.8 1.8 1.4 2.3.5-.7.8-1.5.7-2.4 1.2 1.2 2 2.4 2 3.8-.1 1.7-1.4 2.8-3.1 2.8Z" />,
    hotTub: <><path d="M4 12h16v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-3ZM7 8c-1-1-.8-2.2.2-3.2M12 8c-1-1-.8-2.2.2-3.2M17 8c-1-1-.8-2.2.2-3.2" /></>,
    parking: <><rect x="5" y="3" width="14" height="18" rx="3" /><path d="M10 17V7h3.2a3 3 0 0 1 0 6H10M10 13h3" /></>,
    year: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
    window: <><rect x="4" y="4" width="16" height="16" rx="1" /><path d="M12 4v16M4 12h16" /></>,
    pet: <><circle cx="8" cy="7" r="2" /><circle cx="16" cy="7" r="2" /><circle cx="5" cy="12" r="1.7" /><circle cx="19" cy="12" r="1.7" /><path d="M8 18c0-3 1.8-5 4-5s4 2 4 5c0 1.5-1.2 2-4 2s-4-.5-4-2Z" /><path d="m4 4 16 16" /></>,
    smoke: <><path d="M4 17h11M4 20h15M16 17l2-6M6 13h10" /><path d="M15 8c-1.2-1.5 1.4-2.1.2-3.7" /><path d="m4 4 16 16" /></>,
    grid: <><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></>,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    arrow: <path d="M5 12h14M14 7l5 5-5 5" />,
  };

  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[type]}</svg>;
}
