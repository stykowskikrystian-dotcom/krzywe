export type HomeIconName =
  | "house"
  | "area"
  | "guests"
  | "bed"
  | "bath"
  | "kitchen"
  | "towels"
  | "wifi"
  | "lake"
  | "fire"
  | "jacuzzi"
  | "parking"
  | "year"
  | "calendar"
  | "sun"
  | "sunrise"
  | "compass"
  | "moon"
  | "leaf"
  | "shield";

export function HomeIcon({ name, className }: { name: HomeIconName; className?: string }) {
  const content = {
    house: (
      <>
        <path d="m3 11 9-7 9 7" />
        <path d="M5.5 9.5V20h13V9.5M9 20v-6h6v6" />
      </>
    ),
    area: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M9 4v4H4M15 20v-4h5M20 9h-4V4M4 15h4v5" />
      </>
    ),
    guests: (
      <>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9.5" r="2.2" />
        <path d="M3.5 20c.3-4.3 2.1-6.5 5.5-6.5s5.2 2.2 5.5 6.5M14.2 14.6c3.8-.6 5.7 1.3 6.1 4.4" />
      </>
    ),
    bed: (
      <>
        <path d="M3 18V7M21 18v-6.5A2.5 2.5 0 0 0 18.5 9H9v7h12" />
        <path d="M3 16h18M6 9h3V6.5H6A2.5 2.5 0 0 0 3.5 9v7" />
      </>
    ),
    bath: (
      <>
        <path d="M4 11h16v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-3Z" />
        <path d="M7 11V6.5A2.5 2.5 0 0 1 9.5 4c1.3 0 2.3.8 2.5 2M6 20v-1M18 20v-1" />
      </>
    ),
    kitchen: (
      <>
        <path d="M6 3v8M3.5 3v4A2.5 2.5 0 0 0 6 9.5 2.5 2.5 0 0 0 8.5 7V3M6 9.5V21" />
        <path d="M15.5 21V4.8c0-1.5 1-2.3 2-1.3 1.6 1.5 2.5 4.3 2.5 7.5h-4.5" />
      </>
    ),
    towels: (
      <>
        <path d="M7 4h8.5A2.5 2.5 0 0 1 18 6.5V20H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
        <path d="M8 8h7M8 12h7M8 16h5" />
      </>
    ),
    wifi: (
      <>
        <path d="M4 9a12 12 0 0 1 16 0M7 12.5a7.5 7.5 0 0 1 10 0M10 16a3 3 0 0 1 4 0" />
        <circle cx="12" cy="19" r=".8" fill="currentColor" stroke="none" />
      </>
    ),
    lake: (
      <>
        <path d="M3 7c2.2 0 2.2 1.6 4.4 1.6S9.6 7 11.8 7s2.2 1.6 4.4 1.6S18.4 7 21 7" />
        <path d="M3 12c2.2 0 2.2 1.6 4.4 1.6s2.2-1.6 4.4-1.6 2.2 1.6 4.4 1.6 2.2-1.6 4.8-1.6M3 17c2.2 0 2.2 1.6 4.4 1.6s2.2-1.6 4.4-1.6 2.2 1.6 4.4 1.6 2.2-1.6 4.8-1.6" />
      </>
    ),
    fire: (
      <>
        <path d="M12 21c-4 0-7-2.5-7-6.2 0-3 1.8-5.2 4.4-7.8.2 2.2 1.2 3.4 2.1 3.9C12.2 7 14.3 4.5 16 3c.5 4.1 3 6.4 3 10.8 0 4.2-2.9 7.2-7 7.2Z" />
        <path d="M9.2 17c0-1.7 1.2-2.7 2.8-4.4.3 1.5 1.6 2.2 2.6 3.2.1 1.9-.9 3.2-2.6 3.2-1.6 0-2.8-.8-2.8-2Z" />
      </>
    ),
    jacuzzi: (
      <>
        <path d="M4 11h16v3.5A4.5 4.5 0 0 1 15.5 19h-7A4.5 4.5 0 0 1 4 14.5V11Z" />
        <path d="M8 8c-1-1-.9-2 .1-3M12 8c-1-1-.9-2 .1-3M16 8c-1-1-.9-2 .1-3M7 21v-2M17 21v-2" />
      </>
    ),
    parking: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M10 17V7h3.2a3.2 3.2 0 0 1 0 6.4H10" />
      </>
    ),
    year: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    calendar: (
      <>
        <rect x="3.5" y="5.5" width="17" height="15" rx="3" />
        <path d="M8 3.5v4M16 3.5v4M3.5 10h17" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" />
      </>
    ),
    sunrise: (
      <>
        <path d="M4 17h16M6 13a6 6 0 0 1 12 0M12 3v3M4.2 7.2l2.1 2.1M19.8 7.2l-2.1 2.1" />
        <path d="M3 21h18" />
      </>
    ),
    compass: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m15.5 8.5-2.1 4.9-4.9 2.1 2.1-4.9 4.9-2.1Z" />
      </>
    ),
    moon: (
      <path d="M20 15.2A8.3 8.3 0 0 1 8.8 4a8.5 8.5 0 1 0 11.2 11.2Z" />
    ),
    leaf: (
      <>
        <path d="M20 4c-8 .3-13 3.2-13 9.2 0 3.4 2.3 5.8 5.5 5.8C18 19 20.5 13 20 4Z" />
        <path d="M4 21c2.7-5.3 6.5-8.5 11.7-11" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 20 6v5.7c0 4.7-3.2 7.7-8 9.3-4.8-1.6-8-4.6-8-9.3V6l8-3Z" />
        <path d="m8.5 12 2.2 2.2 4.8-5" />
      </>
    ),
  } satisfies Record<HomeIconName, React.ReactNode>;

  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      {content[name]}
    </svg>
  );
}
