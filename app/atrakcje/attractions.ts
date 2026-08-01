import imageCredits from "./imageCredits.json";

export type AttractionCategory =
  | "woda"
  | "natura"
  | "historia"
  | "rodzina"
  | "aktywnie"
  | "kultura"
  | "widoki";

export type Attraction = {
  id: number;
  name: string;
  area: "Mikołajki" | "Mrągowo" | "Piecki" | "Ryn" | "Kętrzyn";
  place: string;
  category: AttractionCategory;
  minutes: number;
  description: string;
  website: string;
  mapQuery: string;
  forKids?: boolean;
  indoor?: boolean;
  featured?: boolean;
  image: string;
  imageSource: string;
  imageArtist: string;
  imageLicense: string;
  imageLicenseUrl: string;
};

const official = {
  mikolajki: "https://mikolajki.eu/dla-turysty/zwiedzanie/atrakcje-mikolajki",
  mragowo: "https://www.it.mragowo.pl/atrakcje/mragowo/atrakcje",
  piecki: "https://gminapiecki.pl/strona-95-atrakcje_w_gminie_piecki.html",
  ryn: "https://miastoryn.pl/turystyka-i-sport/atrakcje-turystyczne/",
  ketrzyn: "https://www.miastoketrzyn.pl/miasto-ketrzyn/poznaj-ketrzyn",
};

const raw = [
  { id: 1, name: "Promenada miejska w Mikołajkach", area: "Mikołajki", place: "Mikołajki", category: "woda", minutes: 31, featured: true, description: "Ponad kilometr spaceru wzdłuż jeziora, mariny i ogródków restauracyjnych. Najlepsza na niespieszne popołudnie i wieczorne światło.", website: "https://mikolajki.eu/dla-turysty/artykuly/742-poznaj-historie-mikolajek-spacerujac-promenada", mapQuery: "Promenada miejska Mikołajki" },
  { id: 2, name: "Wioska Żeglarska", area: "Mikołajki", place: "Mikołajki", category: "woda", minutes: 32, featured: true, description: "Żeglarskie serce Mikołajek: port, tawerny, koncerty szantowe i widok na łodzie wracające z Wielkich Jezior.", website: "https://www.mazury.mikolajki.com.pl/porty-na-mazurach/wioska-zeglarska-mikolajki", mapQuery: "Wioska Żeglarska Mikołajki", forKids: true },
  { id: 3, name: "Muzeum Reformacji Polskiej", area: "Mikołajki", place: "Mikołajki", category: "kultura", minutes: 31, description: "Kameralne muzeum ze starodrukami, dokumentami i opowieścią o reformacji na Mazurach. Dobry wybór również na deszcz.", website: "https://mikolajki.luteranie.pl/muzeum-reformacji/", mapQuery: "Muzeum Reformacji Polskiej Mikołajki", indoor: true },
  { id: 4, name: "Kościół Świętej Trójcy", area: "Mikołajki", place: "Mikołajki", category: "historia", minutes: 31, description: "Klasycystyczna świątynia z 1842 roku zaprojektowana przez Karla Friedricha Schinkla — jeden z najważniejszych zabytków miasta.", website: "https://www.mikolajki.luteranie.pl/", mapQuery: "Kościół Ewangelicko-Augsburski Świętej Trójcy Mikołajki", indoor: true },
  { id: 5, name: "Wieża widokowa św. Mikołaja", area: "Mikołajki", place: "Mikołajki", category: "widoki", minutes: 31, description: "Panorama czerwonych dachów, portu oraz pięciu jezior oglądana z 30-metrowej wieży. Warto wejść przy dobrej widoczności.", website: "https://mikolajki.eu/dla-turysty/artykuly/27-wieza-widokowa-w-kosciele-sw-mikolaja", mapQuery: "Wieża widokowa kościół św. Mikołaja Mikołajki" },
  { id: 6, name: "Rejsy po Wielkich Jeziorach", area: "Mikołajki", place: "Mikołajki", category: "woda", minutes: 32, description: "Rejs na Śniardwy, do Rucianego-Nidy, Rynu lub Giżycka. Mazury oglądane z pokładu mają zupełnie inną skalę.", website: "https://mikolajki.eu/dla-turysty/wypoczynek-na-jeziorach/rejsy-statkami", mapQuery: "Przystań statków pasażerskich Mikołajki", forKids: true },
  { id: 7, name: "Plac Wolności i Król Sielaw", area: "Mikołajki", place: "Mikołajki", category: "historia", minutes: 30, description: "Rynek z kolorowymi kamienicami i fontanną legendarnego Króla Sielaw — symbolu Mikołajek. Naturalny przystanek między portem a promenadą.", website: official.mikolajki, mapQuery: "Plac Wolności fontanna Króla Sielaw Mikołajki", forKids: true },
  { id: 8, name: "Park Linowy Mikołajki", area: "Mikołajki", place: "Mikołajki", category: "aktywnie", minutes: 33, description: "Trasy o kilku poziomach trudności poprowadzone w lesie nad jeziorem. Aktywny przerywnik dla dzieci i dorosłych.", website: "https://www.parklinowymikolajki.pl/", mapQuery: "Park Linowy Mikołajki Leśna 9", forKids: true },
  { id: 9, name: "Park wodny Tropikana", area: "Mikołajki", place: "Mikołajki", category: "rodzina", minutes: 30, description: "Baseny, zjeżdżalnie, jacuzzi i sauny pod jednym dachem. Pewny plan dla rodzin, kiedy pogoda nie zachęca do jeziora.", website: "https://www.golebiewski.pl/mikolajki/park-wodny", mapQuery: "Park Wodny Tropikana Mikołajki", forKids: true, indoor: true },
  { id: 10, name: "Alpine Coaster", area: "Mikołajki", place: "Mikołajki", category: "rodzina", minutes: 30, description: "Całoroczny tor saneczkowy z długim zjazdem i widokiem na mazurski krajobraz. Dawkę prędkości można dopasować do siebie.", website: "https://www.golebiewski.pl/mikolajki/stok-golebiewski", mapQuery: "Alpine Coaster Gołębiewski Mikołajki", forKids: true },
  { id: 11, name: "Rezerwat Jezioro Łuknajno", area: "Mikołajki", place: "Łuknajno", category: "natura", minutes: 34, featured: true, description: "Rezerwat biosfery UNESCO i jedno z najważniejszych w Europie miejsc obserwacji łabędzia niemego. Cisza, lunety i otwarty horyzont.", website: "https://mikolajki.eu/dla-turysty/zwiedzanie/atrakcje-mazury", mapQuery: "Rezerwat przyrody Jezioro Łuknajno" },

  { id: 12, name: "Promenada nad Jeziorem Czos", area: "Mrągowo", place: "Mrągowo", category: "woda", minutes: 27, featured: true, description: "Długi spacer przy wodzie prowadzący obok mola, plaży, amfiteatru i zielonych skwerów. Naturalna oś zwiedzania Mrągowa.", website: official.mragowo, mapQuery: "Promenada nad Jeziorem Czos Mrągowo" },
  { id: 13, name: "Molo w Mrągowie", area: "Mrągowo", place: "Mrągowo", category: "widoki", minutes: 27, description: "Krótki spacer w głąb jeziora Czos i dobry punkt na poranną kawę, zdjęcie panoramy albo chwilę odpoczynku.", website: official.mragowo, mapQuery: "Molo Mrągowo", forKids: true },
  { id: 14, name: "Amfiteatr nad Jeziorem Czos", area: "Mrągowo", place: "Mrągowo", category: "kultura", minutes: 29, description: "Jedna z najbardziej rozpoznawalnych scen plenerowych w Polsce. Latem kalendarz wypełniają koncerty i festiwale nad wodą.", website: "https://www.it.mragowo.pl/amfiteatr-wydarzenia-i-koncerty", mapQuery: "Amfiteatr Mrągowo" },
  { id: 15, name: "Ekomarina Mrągowo", area: "Mrągowo", place: "Mrągowo", category: "woda", minutes: 27, description: "Nowoczesna marina przy Czosie, wypożyczalnie sprzętu, żeglarska atmosfera i wygodne miejsce na rozpoczęcie dnia nad wodą.", website: official.mragowo, mapQuery: "Ekomarina Mrągowo" },
  { id: 16, name: "Wieża Mrągowo", area: "Mrągowo", place: "Mrągowo", category: "widoki", minutes: 26, description: "Odrestaurowana Wieża Bismarcka w Parku Sikorskiego. Na szczycie czeka panorama miasta i pofałdowanego krajobrazu Mazur.", website: "https://www.it.mragowo.pl/wieza-mragowo%2C16%2C4938%2Cpl.html", mapQuery: "Wieża Bismarcka Mrągowo" },
  { id: 17, name: "Muzeum w Mrągowie", area: "Mrągowo", place: "Mrągowo", category: "kultura", minutes: 27, description: "Historia ziemi mrągowskiej, lokalna archeologia, dawne rzemiosło i przyroda regionu pokazane w zabytkowym centrum miasta.", website: "https://www.muzeum.olsztyn.pl/oddzialy/muzeum-w-mragowie", mapQuery: "Muzeum w Mrągowie", indoor: true },
  { id: 18, name: "Muzeum Sprzętu Wojskowego", area: "Mrągowo", place: "Mrągowo", category: "historia", minutes: 24, description: "Rozbudowana prywatna kolekcja pojazdów i techniki wojskowej. Część eksponatów można zobaczyć w ruchu lub od środka.", website: "https://muzeum.mragowo.pl/", mapQuery: "Muzeum Sprzętu Wojskowego w Mrągowie", forKids: true },
  { id: 19, name: "Ogrody Pokazowe Markiewicz", area: "Mrągowo", place: "Marcinkowo", category: "natura", minutes: 25, description: "Kilka tematycznych ogrodów, motylarnia i spokojne alejki w Marcinkowie. Miejsce szczególnie przyjemne od późnej wiosny.", website: "https://ogrodymarkiewicz.pl/", mapQuery: "Ogrody Pokazowe Markiewicz Marcinkowo", forKids: true },
  { id: 20, name: "Góra Czterech Wiatrów", area: "Mrągowo", place: "Mrągowo", category: "aktywnie", minutes: 31, description: "Zimą stok narciarski, poza sezonem rozległy punkt widokowy nad jeziorem Czos i cel krótkiego aktywnego wypadu.", website: "https://www.g4w.pl/", mapQuery: "Góra Czterech Wiatrów Mrągowo", forKids: true },
  { id: 21, name: "Źródełko Miłości", area: "Mrągowo", place: "Mrągowo", category: "natura", minutes: 29, description: "Leśny zakątek przy trasie wokół jeziora Czos, otoczony lokalną legendą. Najlepiej połączyć go z dłuższym spacerem.", website: "https://www.it.mragowo.pl/", mapQuery: "Źródełko Miłości Mrągowo" },
  { id: 22, name: "Park im. gen. Sikorskiego", area: "Mrągowo", place: "Mrągowo", category: "natura", minutes: 26, description: "Zielony park na wzgórzu z alejkami, rzeźbami plenerowymi i dojściem do wieży widokowej. Dobry na spokojną godzinę.", website: official.mragowo, mapQuery: "Park im. gen. Sikorskiego Mrągowo", forKids: true },
  { id: 23, name: "Plaża miejska nad Czosem", area: "Mrągowo", place: "Mrągowo", category: "rodzina", minutes: 28, description: "Strzeżone kąpielisko, pomosty i infrastruktura dla rodzin. Prosty plan na słoneczne popołudnie blisko centrum.", website: "https://www.it.mragowo.pl/place-zabaw-i-plaze", mapQuery: "Plaża miejska Mrągowo jezioro Czos", forKids: true },

  { id: 24, name: "Muzeum Regionalne w Pieckach", area: "Piecki", place: "Piecki", category: "kultura", minutes: 13, description: "Unikatowa kolekcja glinianych figurek, mazurskich pamiątek i opowieści Walentyny Dermackiej. Małe muzeum z wielkim charakterem.", website: "https://www.gminapiecki.pl/strona-96-muzeum_regionalne_im_walentyny.html", mapQuery: "Muzeum Regionalne im. Walentyny Dermackiej Piecki", indoor: true },
  { id: 25, name: "Park Dzikich Zwierząt Kadzidłowo", area: "Piecki", place: "Kadzidłowo", category: "rodzina", minutes: 24, featured: true, description: "Rozległy park z rodzimymi gatunkami zwierząt, które ogląda się podczas prowadzonego spaceru. Jeden z rodzinnych klasyków regionu.", website: "https://www.kadzidlowo.pl/", mapQuery: "Park Dzikich Zwierząt Kadzidłowo", forKids: true },
  { id: 26, name: "Spływ kajakowy Krutynią", area: "Piecki", place: "Krutyń", category: "aktywnie", minutes: 20, featured: true, description: "Jeden z najpiękniejszych i najłatwiejszych szlaków kajakowych w Polsce. Przezroczysta woda, las i odcinki dobre także dla początkujących.", website: "https://mazurskipark.pl/", mapQuery: "Spływy kajakowe Krutyń", forKids: true },
  { id: 27, name: "Rezerwat Krutynia Dolna", area: "Piecki", place: "Krutyń", category: "natura", minutes: 22, description: "Leśno-wodny rezerwat chroniący dolny odcinek Krutyni, starorzecza i nadrzeczną roślinność. Najlepiej poznawać go z kajaka.", website: "https://mazurskipark.pl/", mapQuery: "Rezerwat przyrody Krutynia Dolna" },
  { id: 28, name: "Rezerwat Zakręt", area: "Piecki", place: "Krutyń", category: "natura", minutes: 21, description: "Krótka leśna ścieżka prowadzi do zarastających jeziorek z pływającymi wyspami. Kameralna przyrodnicza wyprawa bez tłumu.", website: "https://mazurskipark.pl/", mapQuery: "Rezerwat przyrody Zakręt Krutyń", forKids: true },
  { id: 29, name: "Izba Przyrodnicza w Krutyni", area: "Piecki", place: "Krutyń", category: "natura", minutes: 20, description: "Niewielka ekspozycja Mazurskiego Parku Krajobrazowego pomaga lepiej rozpoznać to, co później zobaczycie w lesie i nad rzeką.", website: "https://mazurskipark.pl/", mapQuery: "Izba Przyrodnicza Krutyń", forKids: true, indoor: true },
  { id: 30, name: "Muzeum Ernsta Wiecherta", area: "Piecki", place: "Piersławek", category: "kultura", minutes: 24, description: "Leśniczówka, w której urodził się mazurski pisarz Ernst Wiechert. Wnętrze, pamiątki i las tworzą wyjątkowo spójną opowieść.", website: "https://mikolajki.eu/dla-turysty/zwiedzanie/atrakcje-mazury", mapQuery: "Muzeum Ernsta Wiecherta Piersławek", indoor: true },
  { id: 31, name: "Leśniczówka Pranie", area: "Piecki", place: "Pranie", category: "kultura", minutes: 42, description: "Muzeum Konstantego Ildefonsa Gałczyńskiego nad Jeziorem Nidzkim. Literatura, sosnowy las i letnie koncerty spotykają się w jednym miejscu.", website: "https://lesniczowkapranie.art.pl/", mapQuery: "Muzeum Konstantego Ildefonsa Gałczyńskiego Pranie", indoor: true },
  { id: 32, name: "Jezioro Wągiel", area: "Piecki", place: "Piecki", category: "woda", minutes: 14, description: "Duże, spokojne jezioro blisko Piecek, dobre na kąpiel, kajak i odpoczynek z dala od największych mazurskich portów.", website: official.piecki, mapQuery: "Jezioro Wągiel Piecki", forKids: true },
  { id: 33, name: "Rodzinny Szlak Turystyczny", area: "Piecki", place: "Piecki", category: "aktywnie", minutes: 13, description: "Lokalna trasa łącząca przyrodę, historię i zadania dla najmłodszych. Dobry sposób na poznanie Piecek bez samochodu.", website: "https://www.gminapiecki.pl/strona-116-rodzinny_szlak_turystyczny.html", mapQuery: "Rodzinny Szlak Turystyczny Piecki", forKids: true },

  { id: 34, name: "Zamek w Rynie", area: "Ryn", place: "Ryn", category: "historia", minutes: 43, featured: true, description: "Monumentalny zamek krzyżacki górujący nad miastem. Dziedziniec, historyczne wnętrza i legenda o Białej Damie budują jego klimat.", website: "https://www.zamekryn.pl/", mapQuery: "Zamek Ryn" },
  { id: 35, name: "Ekomarina Ryn", area: "Ryn", place: "Ryn", category: "woda", minutes: 44, description: "Nowoczesny port nad Jeziorem Ryńskim, położony kilka kroków od zamku i starego młyna. Dobry początek spaceru po mieście.", website: "https://miastoryn.pl/turystyka-i-sport/ekomarina/", mapQuery: "Ekomarina Ryn" },
  { id: 36, name: "Nabrzeże Jeziora Ryńskiego", area: "Ryn", place: "Ryn", category: "woda", minutes: 44, description: "Promenada ze stylowymi latarniami, ławkami i widokiem na port. Wieczorem zamek i miasto odbijają się w wodzie.", website: official.ryn, mapQuery: "Promenada Ryn Jezioro Ryńskie", forKids: true },
  { id: 37, name: "Ścieżka wokół Jeziora Ołów", area: "Ryn", place: "Ryn", category: "aktywnie", minutes: 43, description: "Łatwa pętla spacerowo-rowerowa wokół czystego jeziora. Pozwala w godzinę zamienić miejski rytm na ciszę lasu.", website: official.ryn, mapQuery: "Ścieżka wokół Jeziora Ołów Ryn", forKids: true },
  { id: 38, name: "Plaża miejska w Rynie", area: "Ryn", place: "Ryn", category: "rodzina", minutes: 43, description: "Kąpielisko nad Jeziorem Ołów z pomostem i wygodnym dojściem ze ścieżki spacerowej. Dobre miejsce na rodzinny przystanek.", website: official.ryn, mapQuery: "Plaża miejska Ryn Jezioro Ołów", forKids: true },
  { id: 39, name: "Wiatrak holenderski", area: "Ryn", place: "Ryn", category: "historia", minutes: 42, description: "Murowany wiatrak z 1873 roku stojący na wzgórzu przy wjeździe do Rynu. Charakterystyczny symbol miasta i szeroka panorama.", website: official.ryn, mapQuery: "Wiatrak holenderski Ryn" },
  { id: 40, name: "Zabytkowa wieża ciśnień", area: "Ryn", place: "Ryn", category: "historia", minutes: 42, description: "Ceglany element dawnej infrastruktury miejskiej, który dobrze pokazuje mniej oczywistą, przemysłową warstwę historii Rynu.", website: official.ryn, mapQuery: "Wieża ciśnień Ryn" },
  { id: 41, name: "Ryńskie Zbiory Muzealne", area: "Ryn", place: "Ryn", category: "kultura", minutes: 43, description: "Lokalna historia, archeologia i przedmioty codzienności mieszkańców Rynu. Kameralne miejsce tuż obok głównych atrakcji.", website: "https://www.rpekit.pl/", mapQuery: "Ryńskie Zbiory Muzealne Ryn", indoor: true },

  { id: 42, name: "Zamek Krzyżacki w Kętrzynie", area: "Kętrzyn", place: "Kętrzyn", category: "historia", minutes: 52, featured: true, description: "Odbudowana gotycka warownia nad Gubrem, dziedziniec i muzealne zbiory sztuki dawnej. Jeden z głównych punktów szlaku zamków.", website: "https://zamekketrzyn.pl/", mapQuery: "Zamek Krzyżacki Kętrzyn" },
  { id: 43, name: "Muzeum im. Wojciecha Kętrzyńskiego", area: "Kętrzyn", place: "Kętrzyn", category: "kultura", minutes: 52, description: "Sztuka gotycka, regionalna historia i wyjątkowa dziecięca chorągiew pogrzebowa prezentowane we wnętrzach zamku.", website: "https://www.muzeum.ketrzyn.pl/", mapQuery: "Muzeum im. Wojciecha Kętrzyńskiego", indoor: true },
  { id: 44, name: "Bazylika św. Jerzego", area: "Kętrzyn", place: "Kętrzyn", category: "historia", minutes: 52, description: "Jeden z najlepiej zachowanych kościołów obronnych na Mazurach. W sezonie wieża udostępnia szeroką panoramę Kętrzyna.", website: official.ketrzyn, mapQuery: "Bazylika św. Jerzego Kętrzyn", indoor: true },
  { id: 45, name: "Dawna Loża Masońska", area: "Kętrzyn", place: "Kętrzyn", category: "historia", minutes: 51, description: "Neogotycki budynek z charakterystycznymi wieżyczkami, dziś służący kulturze. Jeden z najbardziej nietypowych zabytków miasta.", website: official.ketrzyn, mapQuery: "Loża Masońska Kętrzyn", indoor: true },
  { id: 46, name: "Stado Ogierów w Kętrzynie", area: "Kętrzyn", place: "Kętrzyn", category: "rodzina", minutes: 50, description: "Historyczny kompleks stajni z czerwonej cegły i tradycją hodowli koni. Warto sprawdzić terminy pokazów oraz zawodów.", website: "https://stadoketrzyn.pl/", mapQuery: "Stado Ogierów Kętrzyn", forKids: true },
  { id: 47, name: "Konsulat Świętego Mikołaja", area: "Kętrzyn", place: "Kętrzyn", category: "rodzina", minutes: 51, description: "Kolorowa manufaktura bombek, warsztaty zdobienia i świąteczny klimat niezależnie od pory roku. Atrakcja szczególnie dla dzieci.", website: "https://www.konsulatmikolaja.pl/", mapQuery: "Konsulat Świętego Mikołaja Kętrzyn", forKids: true, indoor: true },
  { id: 48, name: "Wilczy Szaniec", area: "Kętrzyn", place: "Gierłoż", category: "historia", minutes: 52, featured: true, description: "Rozległy kompleks bunkrów dawnej kwatery Hitlera ukryty w gęstym lesie. Miejsce wymagające czasu i historycznego kontekstu.", website: "https://wolfsschanze.pl/", mapQuery: "Wilczy Szaniec Gierłoż", forKids: true },
  { id: 49, name: "Mazurolandia", area: "Kętrzyn", place: "Gierłoż", category: "rodzina", minutes: 52, description: "Park miniatur Warmii i Mazur, militaria, gród rycerski i strefy zabawy. Można połączyć go z wizytą w Wilczym Szańcu.", website: "https://mazurolandia.pl/", mapQuery: "Mazurolandia Gierłoż", forKids: true },
  { id: 50, name: "Sanktuarium w Świętej Lipce", area: "Kętrzyn", place: "Święta Lipka", category: "kultura", minutes: 52, featured: true, description: "Barokowy zespół pielgrzymkowy słynący z ruchomych organów i bogatego wnętrza. Warto trafić na prezentację instrumentu.", website: "https://www.swlipka.pl/", mapQuery: "Sanktuarium Maryjne Święta Lipka", indoor: true },
  { id: 51, name: "Zamek Biskupów Warmińskich", area: "Kętrzyn", place: "Reszel", category: "historia", minutes: 59, description: "Gotycki zamek w jednym z najładniejszych małych miast regionu. Wieża, dziedziniec i spacer po reszelskiej starówce.", website: "https://zamek-reszel.com/", mapQuery: "Zamek w Reszlu" },
  { id: 52, name: "Muzeum Mazurskie w Owczarni", area: "Kętrzyn", place: "Owczarnia", category: "kultura", minutes: 48, description: "Autentyczne wnętrze mazurskiej chaty, dawne sprzęty i opowieść o codziennym życiu mieszkańców regionu.", website: "https://www.owczarnia.com/", mapQuery: "Muzeum Mazurskie Owczarnia", indoor: true },
  { id: 53, name: "Pałac i Manufaktura Nakomiady", area: "Kętrzyn", place: "Nakomiady", category: "historia", minutes: 45, description: "Odrestaurowany barokowy pałac, park i manufaktura pieców kaflowych. Elegancki, mniej oczywisty przystanek między jeziorami.", website: "https://nakomiady.pl/", mapQuery: "Pałac Nakomiady" },
] satisfies Omit<Attraction, "image" | "imageSource" | "imageArtist" | "imageLicense" | "imageLicenseUrl">[];

const sourcedImage = (image: string, source: string, artist: string, license = "materiał serwisu źródłowego") => ({
  image,
  imageSource: source,
  imageArtist: artist,
  imageLicense: license,
  imageLicenseUrl: source,
});

const verifiedImageById = new Map<number, Pick<Attraction, "image" | "imageSource" | "imageArtist" | "imageLicense" | "imageLicenseUrl">>([
  [1, sourcedImage(
    "https://www.doraco.pl/images/page_images/foto_main/168/mikolajki1.jpg",
    "https://www.doraco.pl/pl/realizacje/budowa-nabrzeza-nad-jeziorem-mikolajskim",
    "DORACO · nabrzeże Jeziora Mikołajskiego",
  )],
  [2, sourcedImage(
    "https://r.profitroom.pl/czarterjachtowgrupaamaxspzoo/images/202303021606490.maxus_GA_01.jpg",
    "https://www.mazury.mikolajki.com.pl/porty-na-mazurach/wioska-zeglarska-mikolajki",
    "Wioska Żeglarska Mikołajki",
  )],
  [3, sourcedImage(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/2021-07_Miko%C5%82ajki_%2820%29.jpg/1280px-2021-07_Miko%C5%82ajki_%2820%29.jpg",
    "https://commons.wikimedia.org/wiki/File:2021-07_Miko%C5%82ajki_(20).jpg",
    "Marek Mróz · Wikimedia Commons",
    "CC BY-SA 4.0",
  )],
  [4, sourcedImage(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Holy_Trinity_church_Miko%C5%82ajki_04.jpg/1280px-Holy_Trinity_church_Miko%C5%82ajki_04.jpg",
    "https://commons.wikimedia.org/wiki/File:Holy_Trinity_church_Miko%C5%82ajki_04.jpg",
    "Einsamer Schütze · Wikimedia Commons",
    "CC BY-SA 4.0",
  )],
  [5, sourcedImage(
    "https://mikolajki.eu/cache/preview/baf1620c326f5099c98ed68df33f7a3b.jpg",
    "https://mikolajki.eu/dla-turysty/artykuly/27-wieza-widokowa-w-kosciele-sw-mikolaja",
    "Miasto i Gmina Mikołajki",
  )],
  [6, sourcedImage(
    "https://mikolajki.eu/images/sh8x/2.0/headers/cruises.jpg",
    "https://mikolajki.eu/dla-turysty/wypoczynek-na-jeziorach/rejsy-statkami",
    "Miasto i Gmina Mikołajki",
  )],
  [7, sourcedImage(
    "https://bartekwpodrozy.pl/wp-content/uploads/2023/06/P1350943.jpg",
    "https://bartekwpodrozy.pl/mikolajki-atrakcje-co-warto-zobaczyc-zwiedzic-na-weekend-przewodnik/",
    "Bartek Dziwak · Bartekwpodrozy.pl",
  )],
  [8, sourcedImage(
    "https://www.parklinowymikolajki.pl/wp-content/uploads/sites/5/2022/02/Park-Linowy-Mikolajki_1.jpg",
    "https://www.parklinowymikolajki.pl/",
    "Park Linowy Mikołajki",
  )],
  [9, sourcedImage(
    "https://golebiewski-mikolajki.zuu.tools/thumb?w=1200&h=630&file=golebiewski-mikolajki%2Fuser%2F9+TROPIKANA%2FHG-Miko%C5%82ajki_macnowphoto.pl-32.jpg",
    "https://www.golebiewski.pl/mikolajki/park-wodny",
    "Hotel Gołębiewski Mikołajki",
  )],
  [10, sourcedImage(
    "https://golebiewski-mikolajki.zuu.tools/thumb?w=1200&h=630&file=golebiewski-mikolajki%2Fuser%2Fstok+Go%C5%82ebiewSKI%2FSTOKa..jpg",
    "https://www.golebiewski.pl/mikolajki/stok-golebiewski",
    "Hotel Gołębiewski Mikołajki",
  )],
  [12, sourcedImage(
    "https://panel.it.mragowo.pl/wp-content/uploads/2026/01/17-6.jpg",
    "https://www.it.mragowo.pl/archiwum/pl/2011/01/mragowo-zima%2C1588.html",
    "Informacja Turystyczna Mrągowo",
  )],
  [13, sourcedImage(
    "https://www.it.mragowo.pl/api/media/wp-content/uploads/2026/02/6bb9802d7d3aaf13c5bfffbd4035d9c8-n.jpg",
    "https://www.it.mragowo.pl/otwarta-scena-na-molo%2C1%2C5100%2Cpl.html",
    "Informacja Turystyczna Mrągowo",
  )],
  [14, sourcedImage(
    "https://www.it.mragowo.pl/api/media/wp-content/uploads/2026/04/Amfiteatr-fot.-H.Lenkiewicz-scaled.jpg",
    "https://www.it.mragowo.pl/amfiteatr-wydarzenia-i-koncerty",
    "H. Lenkiewicz · IT Mrągowo",
  )],
  [15, sourcedImage(
    "https://www.it.mragowo.pl/api/media/wp-content/uploads/2020/06/f5b18a6332fe39c6c7dd7df0ad28ed00-n.jpg",
    "https://www.it.mragowo.pl/archiwum/pl/2020/06/pierwsze-regaty-2020%2C5038.html",
    "Informacja Turystyczna Mrągowo",
  )],
  [16, sourcedImage(
    "https://www.it.mragowo.pl/api/media/wp-content/uploads/2026/04/Wieza-Mragowo-Bismarcka-1.jpg",
    "https://www.it.mragowo.pl/wieza-mragowo%2C16%2C4938%2Cpl.html",
    "Informacja Turystyczna Mrągowo",
  )],
  [17, sourcedImage(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Mr%C4%85gowo_Ratusz.jpg/1280px-Mr%C4%85gowo_Ratusz.jpg",
    "https://commons.wikimedia.org/wiki/File:Mr%C4%85gowo_Ratusz.jpg",
    "TBS · Wikimedia Commons",
    "domena publiczna",
  )],
  [18, sourcedImage(
    "https://www.it.mragowo.pl/api/media/wp-content/uploads/2026/02/2aa9b1f267663ca930f48570f368b080-n.jpg",
    "https://www.it.mragowo.pl/muzeum-sprzetu-wojskowego-w-mragowie%2C16%2C1500%2Cpl.html",
    "Informacja Turystyczna Mrągowo",
  )],
  [19, sourcedImage(
    "https://www.it.mragowo.pl/api/media/wp-content/uploads/2026/04/Ogrody-Markiewicz-w-Marcinkowie-9.jpg",
    "https://www.it.mragowo.pl/ogrody-z-pasja-w-marcinkowie%2C16%2C2360%2Cpl.html",
    "Informacja Turystyczna Mrągowo",
  )],
  [20, sourcedImage(
    "https://www.it.mragowo.pl/api/media/wp-content/uploads/2026/04/Na-szlaku-Mragowo-2.jpg",
    "https://www.it.mragowo.pl/szlak-gora-czterech-wiatrow%2C8%2C2137%2Cpl.html",
    "Informacja Turystyczna Mrągowo",
  )],
  [21, sourcedImage(
    "https://www.it.mragowo.pl/api/media/wp-content/uploads/2026/04/Zrodelko-Milosci-6.jpg",
    "https://www.it.mragowo.pl/sciezka-edukacyjna-zrodelko-milosci%2C8%2C2346%2Cpl.html",
    "Informacja Turystyczna Mrągowo",
  )],
  [23, sourcedImage(
    "https://www.it.mragowo.pl/api/media/wp-content/uploads/2026/04/Plaza-przy-ul.-Jaszczurcza-Gora-scaled.jpg",
    "https://www.it.mragowo.pl/place-zabaw-w-mragowie%2C16%2C5438%2Cpl.html",
    "Informacja Turystyczna Mrągowo",
  )],
  [24, sourcedImage(
    "https://www.it.mragowo.pl/api/media/wp-content/uploads/2026/04/Muzeum-Regionalne-im.-Walentyny-Dermackiej-w-Pieckach-7.jpg",
    "https://www.it.mragowo.pl/muzeum-regionalne-im-walentyny-dermackiej-z-sapiehow-w-pieckach%2C16%2C2735%2Cpl.html",
    "Informacja Turystyczna Mrągowo",
  )],
  [28, sourcedImage(
    "https://mpk.warmia.mazury.pl/wp-content/uploads/2022/01/ABI5977_00001-scaled.jpg",
    "https://mpk.warmia.mazury.pl/sciezka-przyrodnicza-rezerwat-zakret/",
    "Mazurski Park Krajobrazowy",
  )],
  [29, sourcedImage(
    "https://mpk.warmia.mazury.pl/wp-content/uploads/2022/01/WBA_0381-%E2%80%94-kopia.jpg",
    "https://mpk.warmia.mazury.pl/",
    "Mazurski Park Krajobrazowy",
  )],
  [30, sourcedImage(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Forsthaus_Kleinort.jpg/1280px-Forsthaus_Kleinort.jpg",
    "https://commons.wikimedia.org/wiki/File:Forsthaus_Kleinort.jpg",
    "Gliwi · Wikimedia Commons",
    "CC BY-SA 3.0 PL",
  )],
  [32, sourcedImage(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Ostr%C3%B3w_Pieckowski_-_beach.jpg/1280px-Ostr%C3%B3w_Pieckowski_-_beach.jpg",
    "https://commons.wikimedia.org/wiki/File:Ostr%C3%B3w_Pieckowski_-_beach.jpg",
    "Mateusz Giełczyński · Wikimedia Commons",
    "CC BY-SA 3.0",
  )],
  [33, sourcedImage(
    "https://gminapiecki.pl/uploads/pub/img_files/img_81/zdjecie.jpg",
    "https://www.gminapiecki.pl/strona-107-rodzinny_szlak_turystyczny.html",
    "Gmina Piecki",
  )],
  [36, sourcedImage(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Jezioro_Ry%C5%84skie%2C_Ryn.jpg/1280px-Jezioro_Ry%C5%84skie%2C_Ryn.jpg",
    "https://commons.wikimedia.org/wiki/File:Jezioro_Ry%C5%84skie,_Ryn.jpg",
    "Wikimedia Commons",
    "CC BY-SA",
  )],
  [37, sourcedImage(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Ryn_-_%C5%9Bcie%C5%BCka_wok%C3%B3%C5%82_Jeziora_O%C5%82%C3%B3w.jpg/1280px-Ryn_-_%C5%9Bcie%C5%BCka_wok%C3%B3%C5%82_Jeziora_O%C5%82%C3%B3w.jpg",
    "https://commons.wikimedia.org/wiki/File:Ryn_-_%C5%9Bcie%C5%BCka_wok%C3%B3%C5%82_Jeziora_O%C5%82%C3%B3w.jpg",
    "Wikimedia Commons",
    "CC BY-SA",
  )],
  [38, sourcedImage(
    "https://miastoryn.pl/wp-content/uploads/2015/03/img_8301.jpg",
    "https://miastoryn.pl/turystyka-i-sport/atrakcje-turystyczne/",
    "Miasto i Gmina Ryn",
  )],
  [39, sourcedImage(
    "https://miastoryn.pl/wp-content/uploads/2015/03/wiatrak.jpg",
    "https://miastoryn.pl/turystyka-i-sport/atrakcje-turystyczne/",
    "Miasto i Gmina Ryn",
  )],
  [40, sourcedImage(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Wie%C5%BCa_ci%C5%9Bnie%C5%84_Ryn_1.jpg/1280px-Wie%C5%BCa_ci%C5%9Bnie%C5%84_Ryn_1.jpg",
    "https://commons.wikimedia.org/wiki/File:Wie%C5%BCa_ci%C5%9Bnie%C5%84_Ryn_1.jpg",
    "Lesnydzban · Wikimedia Commons",
    "CC BY-SA 4.0",
  )],
  [41, sourcedImage(
    "https://www.rpekit.pl/wp-content/uploads/2023/01/muzeum_01.jpg",
    "https://www.rpekit.pl/muzeum/",
    "Regionalny Park Edukacji, Kultury i Turystyki w Rynie",
  )],
  [42, sourcedImage(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Zamek_w_K%C4%99trzynie_3.jpg/1280px-Zamek_w_K%C4%99trzynie_3.jpg",
    "https://commons.wikimedia.org/wiki/File:Zamek_w_K%C4%99trzynie_3.jpg",
    "Lesnydzban · Wikimedia Commons",
    "CC BY-SA 4.0",
  )],
  [43, sourcedImage(
    "https://commons.wikimedia.org/wiki/Special:FilePath/Za%20bram%C4%85%20zamku%20w%20K%C4%99trzynie.jpg?width=1280",
    "https://commons.wikimedia.org/wiki/File:Za_bram%C4%85_zamku_w_K%C4%99trzynie.jpg",
    "Wikimedia Commons",
    "CC BY-SA",
  )],
  [44, sourcedImage(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Ketrzyn_bazylika_sw_Jerzego_2.jpg/1280px-Ketrzyn_bazylika_sw_Jerzego_2.jpg",
    "https://commons.wikimedia.org/wiki/File:Ketrzyn_bazylika_sw_Jerzego_2.jpg",
    "Andrzej Otrębski · Wikimedia Commons",
    "CC BY-SA 3.0",
  )],
  [45, sourcedImage(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Ketrzyn_loza_masonska_1.jpg/1280px-Ketrzyn_loza_masonska_1.jpg",
    "https://commons.wikimedia.org/wiki/File:Ketrzyn_loza_masonska_1.jpg",
    "Andrzej Otrębski · Wikimedia Commons",
    "CC BY-SA 3.0",
  )],
  [46, sourcedImage(
    "https://atrakcje.mazury.pl/wp-content/uploads/2022/02/stado_ogierow.jpg",
    "https://atrakcje.mazury.pl/stado-ogierow/",
    "Atrakcje.Mazury.pl",
  )],
  [47, sourcedImage(
    "https://www.konsulatmikolaja.pl/files/boksy/poduszka1.webp",
    "https://www.konsulatmikolaja.pl/",
    "Konsulat Świętego Mikołaja",
  )],
  [49, sourcedImage(
    "https://mazurolandia.pl/wp-content/uploads/2025/04/urodzinki_w_mazurolandii-1-1024x685.jpg",
    "https://mazurolandia.pl/",
    "Mazurolandia",
  )],
  [52, sourcedImage(
    "https://mazury24.eu/img/miejsca/414_muzeum-mazurskie-w-owczarni_2.webp",
    "https://mazury24.eu/atrakcje-turystyczne/muzeum-mazurskie-w-owczarni%2C414",
    "Mazury24.eu",
  )],
]);

const creditById = new Map(
  imageCredits.map((credit) => [
    credit.id,
    {
      image: credit.image,
      imageSource: credit.source,
      imageArtist: credit.artist,
      imageLicense: credit.license,
      imageLicenseUrl: credit.licenseUrl,
    },
  ]),
);

export const attractions: Attraction[] = raw.map((attraction) => ({
  ...attraction,
  ...(verifiedImageById.get(attraction.id) ?? creditById.get(attraction.id) ?? {
    image: "/krzywe-hero.webp",
    imageSource: "https://www.krzywelakehouses.pl/",
    imageArtist: "Krzywe Lake Houses",
    imageLicense: "materiał własny",
    imageLicenseUrl: "https://www.krzywelakehouses.pl/",
  }),
}));

export const categoryLabels: Record<AttractionCategory, string> = {
  woda: "Nad wodą",
  natura: "Natura",
  historia: "Historia",
  rodzina: "Dla rodzin",
  aktywnie: "Aktywnie",
  kultura: "Kultura",
  widoki: "Punkty widokowe",
};
