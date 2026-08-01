# Krzywe Lake Houses

Wielostronicowy serwis Krzywe Lake Houses przygotowany jako natywna aplikacja Next.js App Router do wdrożenia na Vercel.

## Uruchomienie lokalne

```bash
npm ci
npm run dev
```

## Weryfikacja produkcyjna

```bash
npm run typecheck
npm run build
```

## Wdrożenie na Vercel

Vercel automatycznie wykrywa framework Next.js. Ustawienia projektu:

- Framework Preset: `Next.js`
- Root Directory: `./`
- Install Command: `npm ci`
- Build Command: `npm run build`
- Output Directory: pozostaw puste
- Node.js: `22.x`

Po połączeniu repozytorium GitHub każda zmiana na gałęzi `main` uruchomi wdrożenie produkcyjne. Alternatywnie projekt można wdrożyć bez GitHub przez `npx vercel --prod`.

## SEO techniczne

Projekt zawiera metadane i canonicale dla wszystkich tras, Open Graph i Twitter Cards, dane strukturalne Schema.org, `robots.txt`, dynamiczną mapę `/sitemap.xml`, manifest PWA oraz kompletny zestaw ikon i favicon.
