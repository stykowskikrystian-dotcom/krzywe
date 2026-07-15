import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
  },
  build: {
    rollupOptions: {
      input: {
        home: "index.html",
        houses: "domy-i-galeria.html",
        lake: "jezioro-krzywe.html",
        attractions: "atrakcje-w-okolicy.html",
        offer: "oferta.html",
        contact: "kontakt.html",
        cookies: "pliki-cookies.html",
        privacy: "polityka-prywatnosci.html",
      },
    },
  },
});
