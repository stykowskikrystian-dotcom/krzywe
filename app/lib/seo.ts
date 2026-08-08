export const SITE_URL = "https://www.krzywelakehouses.pl";
export const SITE_NAME = "Krzywe Lake Houses";
export const SITE_DESCRIPTION =
  "Dwa całoroczne domy nad Jeziorem Krzywe, blisko Mrągowa, Mikołajek, Rynu i Piecek. Bezpośredni dostęp do jeziora, jacuzzi i miejsce na ognisko.";
export const SITE_LOCALE = "pl_PL";
export const SITE_LANGUAGE = "pl-PL";
export const SITE_IMAGE = "/krzywe-hero.png";
export const SITE_IMAGE_ABSOLUTE = `${SITE_URL}${SITE_IMAGE}`;

export const CONTACT = {
  phoneDisplay: "505 586 950",
  phoneInternational: "+48505586950",
  email: "krzywelakehouses@gmail.com",
  streetAddress: "Krzywe 20",
  postalCode: "11-700",
  locality: "Mrągowo",
  village: "Krzywe",
  region: "warmińsko-mazurskie",
  country: "PL",
  latitude: 53.8024,
  longitude: 21.2638,
} as const;

export const SOCIAL_LINKS = [
  "https://www.facebook.com/krzywelakehousesmazury",
  "https://www.instagram.com/krzywelakehousesmazury/",
] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}
