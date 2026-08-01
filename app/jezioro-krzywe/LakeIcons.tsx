import type { ReactNode } from "react";

type LakeIconName =
  | "area"
  | "depth"
  | "islands"
  | "quiet"
  | "fish"
  | "paddle"
  | "shore"
  | "bird"
  | "vest"
  | "weather";

export function LakeIcon({ name }: { name: LakeIconName }) {
  const paths: Record<LakeIconName, ReactNode> = {
    area: (
      <>
        <path d="M4 7.5 9 4l5 2 6-2v12.5L15 20l-5-2-6 2Z" />
        <path d="m9 4 1 14M14 6l1 14" />
      </>
    ),
    depth: (
      <>
        <path d="M6 4v16M3.5 7H8.5M3.5 12H8.5M3.5 17H8.5" />
        <path d="M12 7c2.3 0 2.3 2 4.6 2S18.9 7 21 7M12 13c2.3 0 2.3 2 4.6 2s2.3-2 4.4-2" />
      </>
    ),
    islands: (
      <>
        <path d="M3 17c3-1.2 4.7-4.3 7.7-4.3 3.2 0 4.5 3.1 10.3 4.3" />
        <path d="M8 12c.2-3.1 1.1-5.5 2.7-8M11 8c1.2-.1 2.4-.8 3.1-1.8M10 10c-1.4-.2-2.7-.8-3.6-1.9" />
        <path d="M3 20c2.5 0 2.5-1.2 5-1.2s2.5 1.2 5 1.2 2.5-1.2 5-1.2 2.5 1.2 3 1.2" />
      </>
    ),
    quiet: (
      <>
        <path d="M5 9v6h4l5 4V5L9 9Z" />
        <path d="m18 9 4 4M22 9l-4 4" />
      </>
    ),
    fish: (
      <>
        <path d="M4 12c3.5-5 9-6.4 14-2l3-2v8l-3-2c-5 4.4-10.5 3-14-2Z" />
        <circle cx="14.7" cy="11" r=".65" fill="currentColor" stroke="none" />
      </>
    ),
    paddle: (
      <>
        <path d="m5 19 14-14M4 15c-2.1 2.1-1.3 4.4 1 6 2.3-1.8 3-3.9 1-6M18 4c2.1-2.1 4.4-1.3 6 1-1.8 2.3-3.9 3-6 1" />
      </>
    ),
    shore: (
      <>
        <path d="M3 15c2.7 0 2.7 2 5.3 2s2.7-2 5.4-2 2.6 2 5.3 2 2.7-2 3-2" />
        <path d="M3 20c2.7 0 2.7 2 5.3 2s2.7-2 5.4-2 2.6 2 5.3 2 2.7-2 3-2M5 12l5-9 5 9" />
      </>
    ),
    bird: (
      <>
        <path d="M3 15c3-5.6 6-6.5 9-2.5 3-4 6-3.1 9 2.5" />
        <path d="M7 18c2.2-2 4.1-2 5.8 0 1.8-2 3.5-2 5.2 0" />
      </>
    ),
    vest: (
      <>
        <path d="M8 4 5 7v13h14V7l-3-3-2 5h-4Z" />
        <path d="M10 9v11M14 9v11M5 14h14" />
      </>
    ),
    weather: (
      <>
        <path d="M8 16H6.5a3.5 3.5 0 1 1 .7-6.9A5.5 5.5 0 0 1 18 10.5h.5a2.5 2.5 0 0 1 0 5H16" />
        <path d="m12 13-2 4h3l-2 4" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
