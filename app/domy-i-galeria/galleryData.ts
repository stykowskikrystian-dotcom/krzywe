export type HouseName = "modern" | "loft" | "teren";
export type GalleryRoom =
  | "kuchnia-salon"
  | "sypialnia-glowna"
  | "pozostale-sypialnie"
  | "lazienki"
  | "taras"
  | "ogrod"
  | "teren";

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
  {
    id: 2,
    house: "teren",
    room: "teren",
    src: "/home-hero-main.webp",
    alt: "Teren Krzywe Lake Houses z dwoma domami położonymi przy jeziorze na Mazurach",
    caption: "Teren · domy przy jeziorze",
  },
];
