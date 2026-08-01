export type HouseName = "modern" | "loft";
export type GalleryRoom =
  | "kuchnia-salon"
  | "sypialnia-glowna"
  | "pozostale-sypialnie"
  | "lazienki"
  | "taras"
  | "ogrod";

export type GalleryImage = {
  id: number;
  house: HouseName;
  room: GalleryRoom;
  src: string;
  alt: string;
  caption: string;
};

export const galleryImages: GalleryImage[] = [
  {
    id: 1,
    house: "modern",
    room: "sypialnia-glowna",
    src: "/modern-sypialnia-glowna.webp",
    alt: "Panoramiczne przeszklenie w sypialni głównej domu Modern z widokiem na Jezioro Krzywe",
    caption: "Modern · sypialnia główna",
  },
];
