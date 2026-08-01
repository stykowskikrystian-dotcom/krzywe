import type { BlogArticle, BlogFaq, BlogSection } from "./articles";
import { attractions } from "../atrakcje/attractions";

type ImageOverride = Pick<
  BlogArticle,
  "image" | "imageAlt" | "imageSource" | "imageCredit"
>;

type ArticleEnrichment = {
  sections: BlogSection[];
  faq: BlogFaq[];
  image?: ImageOverride;
};

const pexels = (photo: string, page: string, credit: string, alt: string): ImageOverride => ({
  image: photo,
  imageAlt: alt,
  imageSource: page,
  imageCredit: `${credit} · Pexels`,
});

const attractionImage = (index: number, alt: string): ImageOverride => ({
  image: attractions[index].image,
  imageAlt: alt,
  imageSource: attractions[index].imageSource,
  imageCredit: attractions[index].imageArtist,
});

const enrichments: Record<string, ArticleEnrichment> = {
  "domy-nad-jeziorem-na-mazurach-jak-wybrac": {
    image: {
      image: "/home-hero-main.webp",
      imageAlt: "Dwa całoroczne domy Krzywe Lake Houses nad mazurskim jeziorem",
      imageSource: "",
      imageCredit: "Krzywe Lake Houses",
    },
    sections: [
      {
        heading: "Jak czytać ofertę domu krok po kroku",
        paragraphs: [
          "Najpierw oddziel fakty od nastroju. Zdjęcie zachodu słońca mówi, że okolica jest piękna, ale nie odpowiada na pytania o liczbę osobnych sypialni, łazienek, miejsce przy stole i drogę do brzegu. Zapisz potrzeby grupy, a dopiero później porównuj obiekty. Dzięki temu efektowna galeria nie przesłoni wygody codziennego pobytu.",
          "Drugi etap to weryfikacja planu dnia. Jeżeli rano chcecie zostać nad wodą, a po południu zwiedzać Mikołajki lub Mrągowo, ważniejsza od adresu znanego kurortu będzie dobra baza pomiędzy kierunkami. Sprawdź dojazdy, parking, najbliższy sklep i to, czy po powrocie można odpocząć bez szukania kolejnej atrakcji.",
          "Na końcu przeczytaj regulamin i warunki rezerwacji. Godziny pobytu, zasady dotyczące zwierząt, palenia, kaucji oraz liczby gości powinny być jasne przed wpłatą. Dobrze opisana oferta oszczędza obu stronom nieporozumień i pozwala przyjechać z realistycznymi oczekiwaniami.",
        ],
        bullets: [
          "poproś o rzut domu lub dokładny opis rozmieszczenia pokoi",
          "sprawdź, czy wszystkie osoby mają normalne miejsca do spania",
          "porównaj cenę całego pobytu, nie samą stawkę za noc",
          "upewnij się, że zdjęcia pokazują konkretny wynajmowany dom",
        ],
      },
      {
        heading: "Pytania, które warto zadać przed rezerwacją",
        paragraphs: [
          "Zapytaj, co dokładnie znajduje się w kuchni, czy ręczniki i pościel są w cenie oraz ile samochodów można zaparkować przy domu. Przy większej grupie znaczenie mają pozornie drobne rzeczy: druga lodówka, zmywarka, liczba krzeseł na tarasie i możliwość wspólnego przygotowania posiłku.",
          "Przy pobycie z dziećmi sprawdź charakter terenu i dostęp do wody. Naturalny brzeg jest piękny, lecz wymaga nadzoru i rozsądnych zasad. Przy wyjeździe poza latem zapytaj o ogrzewanie, odśnieżanie oraz możliwość wygodnego spędzenia dłuższego wieczoru wewnątrz.",
          "Jeżeli odpowiedzi są konkretne, łatwo ocenić, czy miejsce pasuje do Waszego sposobu podróżowania. Nie ma jednego idealnego domu dla wszystkich — dobry wybór to ten, w którym układ, lokalizacja i zasady współgrają z rytmem konkretnej grupy.",
        ],
      },
      {
        heading: "Czerwone flagi w ogłoszeniu",
        paragraphs: [
          "Uważaj na sformułowania bez skali: „kilka kroków od jeziora”, „dla dużej grupy” albo „w pełni wyposażony”. Powinny za nimi stać liczby, lista wyposażenia i zdjęcia. Brak adresu lub mapy okolicy również utrudnia ocenę, czy dojazd do atrakcji rzeczywiście będzie wygodny.",
          "Niepokoić powinny też galerie z wieloma stylami wnętrz, bez podpisu domu i pomieszczenia. Przy dwóch obiektach upewnij się, który z nich rezerwujesz i czy wskazane udogodnienia dotyczą obu. Transparentność jest ważniejsza niż liczba marketingowych obietnic.",
          "Przed płatnością zachowaj potwierdzenie ustaleń, przeczytaj warunki anulacji i sprawdź dane gospodarza. To proste kroki, które chronią urlop skuteczniej niż kolejna godzina oglądania zdjęć.",
        ],
      },
    ],
    faq: [
      { question: "Co sprawdzić na zdjęciach domu nad jeziorem?", answer: "Szukaj zdjęć dojścia do brzegu, wszystkich sypialni i łazienek, kuchni, stołu dla całej grupy, tarasu oraz parkingu. Kadry powinny dotyczyć konkretnego domu." },
      { question: "Jak porównać cenę dwóch domów na Mazurach?", answer: "Porównaj pełny koszt pobytu z opłatami dodatkowymi, wyposażenie i liczbę wygodnych miejsc do spania. Przy grupie warto również policzyć koszt na osobę." },
    ],
  },
  "mikolajki-na-weekend-plan-bez-pospiechu": {
    sections: [
      {
        heading: "Plan godzinowy, który zostawia miejsce na Mazury",
        paragraphs: [
          "Pierwszego dnia przyjedź do Mikołajek rano, zanim promenada wypełni się ruchem. Zacznij od portu i nabrzeża, później zjedz spokojny obiad i wybierz jeden rejs albo muzeum. Wieczorny spacer zostaw na czas, gdy światło jest miękkie, a najwięcej jednodniowych gości wraca już do swoich baz.",
          "Drugiego dnia nie powtarzaj miejskiego programu. Wybierz Łuknajno, Kadzidłowo lub Krutyń i pozwól, aby przyroda była główną treścią wyjazdu. Dzięki temu weekend nie zamienia się w dwa podobne dni spędzone między parkingiem, restauracją i pamiątkami.",
          "Powrót do domu nad Jeziorem Krzywe planuj przed późnym wieczorem. Kolacja, ognisko albo spokojny czas nad brzegiem domykają dzień lepiej niż dokładanie ostatniego punktu tylko dlatego, że znajduje się na mapie.",
        ],
        bullets: ["rano: port i promenada", "południe: rejs albo muzeum", "popołudnie: obiad i swobodny spacer", "wieczór: powrót nad Jezioro Krzywe"],
      },
      {
        heading: "Mikołajki z dziećmi, we dwoje i z grupą przyjaciół",
        paragraphs: [
          "Rodzinom przyda się krótsza trasa i jeden mocny punkt, na przykład rejs albo park wodny. Dzieci szybciej zapamiętują moment karmienia kaczek i widok łodzi niż pięć kolejnych nazw zabytków. Zabierz wodę, nakrycie głowy i lekką warstwę przeciwwiatrową, bo nad jeziorem odczuwalna temperatura potrafi szybko się zmienić.",
          "Weekend we dwoje najlepiej oprzeć na porannym spacerze, rejsie i kolacji bez pośpiechu. Grupa przyjaciół może dodać aktywność na wodzie, ale warto wcześniej ustalić wspólny punkt spotkania. W sezonie port jest głośny i łatwo rozdzielić się w tłumie.",
          "Niezależnie od składu nie planuj całego dnia na stojąco. Ławka przy promenadzie, taras nad wodą i dłuższy obiad są częścią poznawania miasta, a nie stratą czasu.",
        ],
      },
      {
        heading: "Parking, rejsy i plan awaryjny",
        paragraphs: [
          "W wysokim sezonie zostaw zapas czasu na parkowanie i dojście do portu. Godziny rejsów oraz otwarcia atrakcji sprawdzaj bezpośrednio u organizatorów, najlepiej w dniu wyjazdu. Mazurska pogoda może zmienić rozkład, dlatego nie buduj całego weekendu wokół jednego połączenia.",
          "Jeżeli pada, połącz Muzeum Reformacji z kawą i krótkim spacerem podczas przerwy w opadach. Przy dłuższej niepogodzie Tropikana jest wygodnym planem rodzinnym. Nie próbuj jednak za wszelką cenę zostać w centrum — czasem lepszym wyborem jest wcześniejszy powrót do domu i przełożenie miasta na następny dzień.",
          "Najbardziej udany weekend ma plan A, B i wolne okno. To wystarczy, aby korzystać z Mikołajek bez poczucia, że pogoda lub kolejka odebrała cały wyjazd.",
        ],
      },
    ],
    faq: [
      { question: "Ile czasu przeznaczyć na promenadę w Mikołajkach?", answer: "Na spokojny spacer z portem i przerwą na kawę warto zarezerwować około dwóch–trzech godzin, więcej jeśli planujesz obiad lub rejs." },
      { question: "Czy Mikołajki można zwiedzać bez całodziennego pobytu w centrum?", answer: "Tak. Najważniejsze nabrzeże, port i centrum można poznać podczas pół dnia, a resztę czasu przeznaczyć na jezioro lub okoliczną przyrodę." },
    ],
  },
  "mragowo-atrakcje-nad-jeziorem-czos": {
    sections: [
      { heading: "Mrągowo krok po kroku: od wody do centrum", paragraphs: [
        "Najwygodniej potraktować promenadę nad Czosem jako kręgosłup wycieczki. Zacznij przy wodzie, przejdź w stronę mola i amfiteatru, a dopiero później odbij do centrum. Dzięki temu nie wracasz kilka razy tą samą trasą i przez większość dnia masz jezioro w zasięgu wzroku.",
        "Na drugą część dnia wybierz jeden temat: historię w muzeum, panoramę z wieży albo rodzinny odpoczynek na plaży. Próba połączenia wszystkich atrakcji zwykle kończy się szybkim przechodzeniem bez czasu na miejsce, które akurat najbardziej spodobało się grupie.",
        "Jeżeli w amfiteatrze odbywa się wydarzenie, sprawdź organizację ruchu i parking wcześniej. W dni koncertowe miasto funkcjonuje inaczej, a spokojny plan wymaga większego zapasu czasu."], bullets:["promenada i molo", "jeden obiekt kulturalny", "przerwa na obiad", "wieża lub park na zakończenie"] },
      { heading: "Mrągowo na słoneczny i deszczowy dzień", paragraphs: [
        "Przy słońcu warto dłużej zostać nad Czosem: plaża, molo i Ekomarina tworzą kilka różnych sposobów spędzenia czasu bez zmiany dzielnicy. Jeśli grupa lubi ruch, można dodać spacer przez park lub wypożyczenie sprzętu, wcześniej sprawdzając aktualną ofertę na miejscu.",
        "Deszcz nie przekreśla wyjazdu. Muzeum w Mrągowie lub Muzeum Sprzętu Wojskowego zapewniają konkretną treść, a przerwę w opadach można wykorzystać na krótki odcinek promenady. Zamiast czekać na idealną prognozę, dobrze jest mieć jeden wariant pod dachem.",
        "Poza sezonem sprawdzaj godziny otwarcia. Kameralność jest wtedy największą zaletą miasta, lecz część miejsc działa krócej niż w wakacje." ] },
      { heading: "Co warto wiedzieć przed przyjazdem", paragraphs: [
        "Wygodne buty są ważniejsze niż elegancki plan: pomiędzy wodą, centrum i parkiem uzbiera się kilka kilometrów. Latem zabierz wodę i ochronę przeciwsłoneczną, jesienią warstwę od wiatru. Nad Jeziorem Czos pogoda odczuwalna jest mocniej niż między budynkami.",
        "Rodzinom warto wskazać jeden stały punkt spotkania. Parom i osobom fotografującym polecamy wcześniejszy poranek lub późne popołudnie, gdy światło odbija się od tafli, a promenada jest spokojniejsza.",
        "Mrągowo dobrze łączy się z powrotem do Krzywe bez dodatkowego objazdu. Dzięki temu miejskie popołudnie może zakończyć się kolacją i ciszą nad innym, kameralnym jeziorem." ] },
    ],
    faq: [
      { question:"Czy promenada nad Jeziorem Czos jest dobrym początkiem zwiedzania?", answer:"Tak. Łączy molo, plażę, amfiteatr i zielone skwery, dlatego pozwala ułożyć większość dnia bez częstego przestawiania samochodu." },
      { question:"Co wybrać w Mrągowie podczas deszczu?", answer:"Dobrym wyborem są Muzeum w Mrągowie i Muzeum Sprzętu Wojskowego. Krótki spacer nad Czosem można dodać w przerwie między opadami." },
    ],
  },
  "splyw-krutynia-poradnik-pierwszy-raz": {
    sections: [
      { heading:"Jak wybrać trasę bez przeceniania swoich sił", paragraphs:[
        "Pierwszy spływ nie powinien być najdłuższy. Liczy się spokojne tempo, możliwość łatwego zakończenia i czas na oswojenie kajaka. Zapytaj wypożyczalnię o nurt, miejsca wymagające przenoszenia sprzętu, aktualny stan wody oraz realny czas dla początkującej załogi, a nie wynik doświadczonych kajakarzy.",
        "Rodziny z dziećmi powinny dobrać trasę do najmłodszego uczestnika. Krótszy odcinek zakończony z uśmiechem buduje lepsze wspomnienie niż ambitny plan i nerwowe ostatnie kilometry. Przy większej grupie ustal, kto płynie pierwszy, a kto zamyka kolumnę.",
        "Przed startem wykonaj kilka prostych manewrów blisko brzegu: skręt, hamowanie i bezpieczne dobicie. Pięć minut praktyki potrafi oszczędzić dużo stresu na pierwszym zakręcie."], bullets:["kamizelka dla każdej osoby", "telefon w szczelnym etui", "suche ubranie w worku", "woda i lekka przekąska", "ochrona przed słońcem i deszczem"] },
      { heading:"Bezpieczeństwo i dobre zachowanie na rzece", paragraphs:[
        "Kamizelka asekuracyjna powinna być zapięta, a nie leżeć pod siedzeniem. Nie przywiązuj bagażu do ciała i unikaj luźnych linek. Jeśli pogoda gwałtownie się pogarsza, skontaktuj się z organizatorem i wybierz bezpieczne miejsce do zejścia z wody.",
        "Krutynia jest popularna, dlatego kultura na szlaku ma znaczenie. Nie blokuj całej szerokości rzeki, nie wpływaj w trzcinowiska, zachowaj dystans od zwierząt i zabierz wszystkie odpady. Cisza jest częścią tego miejsca — muzyka z głośnika odbiera ją również innym.",
        "Po alkoholu nie wsiadaj do kajaka. Woda wygląda łagodnie, ale wychłodzenie, gałęzie i panika potrafią szybko zmienić drobną wywrotkę w poważny problem." ] },
      { heading:"Co zrobić po spływie", paragraphs:[
        "Zostaw co najmniej godzinę zapasu między deklarowanym końcem trasy a kolejnym planem. Oddanie sprzętu, przebranie i transport powrotny trwają dłużej, gdy na rzece jest dużo osób. Dobry obiad w Krutyni jest naturalnym finałem, nie przystankiem w drodze do kolejnej atrakcji.",
        "Po powrocie nad Jezioro Krzywe zaplanuj spokojny wieczór. Ciepły prysznic, jacuzzi i kolacja pozwalają mięśniom odpocząć. Następnego dnia lepiej wybrać krótki spacer lub dzień nad domem niż kolejny intensywny program.",
        "Wspólnie zapiszcie, co działało: długość trasy, ustawienie osób w kajaku i wyposażenie. Przy następnym spływie będziecie podejmować decyzje na podstawie doświadczenia, a nie samej reklamy trasy." ] },
    ],
    faq:[
      {question:"Czy na pierwszy spływ Krutynią trzeba umieć pływać?", answer:"Umiejętność pływania zwiększa bezpieczeństwo, ale nie zastępuje prawidłowo zapiętej kamizelki. Warunki i odcinek zawsze skonsultuj z organizatorem."},
      {question:"Co zrobić z telefonem podczas spływu?", answer:"Włóż go do szczelnego etui lub worka przypiętego do kajaka, nigdy luźno do kieszeni. Dokumenty i kluczyki zabezpiecz osobno."},
    ],
  },
  "mazury-z-dziecmi-rodzinny-urlop": {
    image: {
      image:"/home-rhythm-evening-family.webp", imageAlt:"Rodzina spędzająca wieczór przy ognisku podczas urlopu na Mazurach", imageSource:"https://www.pexels.com/photo/12932681/", imageCredit:"freestockpro.com · Pexels"
    },
    sections:[
      {heading:"Rodzinny tydzień bez codziennego pakowania", paragraphs:[
        "Dzieci lepiej znoszą wyjazd, gdy miejsce noclegu pozostaje stałe. Ten sam pokój, znana łazienka i własny kąt na zabawki dają poczucie bezpieczeństwa. Zamiast zmieniać hotel, można codziennie wybierać inny kierunek i wracać do rytmu, który cała rodzina już zna.",
        "Przeplataj dni: po większej atrakcji zaplanuj prosty poranek nad wodą, spacer lub zabawę w ogrodzie. Dorosłym może wydawać się, że program jest zbyt luźny, ale dzieci potrzebują czasu na własną zabawę i przetworzenie nowych wrażeń.",
        "W dwóch domach łatwiej połączyć kilka rodzin. Maluchy mogą wcześniej zasnąć, starsze dzieci zostać dłużej przy wspólnym stole, a dorośli nie muszą kończyć wieczoru o jednej godzinie."], bullets:["jeden większy punkt dziennie", "codziennie czas bez samochodu", "zapas ubrań i przekąsek w aucie", "plan pod dachem na zmianę pogody"]},
      {heading:"Bezpieczeństwo nad naturalnym brzegiem", paragraphs:[
        "Bezpośredni dostęp do jeziora jest ogromną zaletą, ale wymaga jasnych rodzinnych zasad. Małe dzieci nie powinny przebywać przy wodzie bez dorosłego, nawet przez chwilę. Kamizelka jest potrzebna na kajaku i desce, lecz nie zastępuje nadzoru.",
        "Ustal strefę, po której dzieci mogą poruszać się samodzielnie, oraz miejsce odkładania ręczników, butów i sprzętu. Po zmroku używajcie latarek. Naturalny teren ma korzenie, mokrą trawę i nierówności, których nie widać w świetle telefonu.",
        "Przed kąpielą oceń pogodę, wiatr i dno w miejscu wejścia. Nie zakładaj, że spokojna tafla oznacza identyczne warunki każdego dnia." ]},
      {heading:"Atrakcje dopasowane do wieku", paragraphs:[
        "Przedszkolakom zwykle wystarczy Kadzidłowo, krótki spacer i czas na placu zabaw. Starsze dzieci mogą spróbować łatwego odcinka Krutyni, parku linowego albo rodzinnego szlaku w Pieckach. Nastolatkom warto oddać część decyzji i pozwolić wybrać między wodą, miastem a aktywnością.",
        "W Mikołajkach nie trzeba robić wszystkiego. Rejs i lody przy promenadzie mogą być pełnym planem. W Mrągowie połącz molo z jednym muzeum albo plażą. Krótsze, czytelne dni ograniczają zmęczenie i konflikty.",
        "Przy niepogodzie trzymaj w rezerwie muzeum, park wodny, planszówki oraz wspólne gotowanie. Dzień w domu nie jest porażką urlopu — często właśnie wtedy rodzina naprawdę spędza czas razem." ]},
    ],
    faq:[
      {question:"Ile atrakcji dziennie planować z dziećmi na Mazurach?",answer:"Najczęściej wystarczy jedna większa atrakcja oraz prosty spacer lub czas nad wodą. Zostaw zapas na posiłek, odpoczynek i zmianę pogody."},
      {question:"Czy naturalny brzeg jeziora jest odpowiedni dla rodzin?",answer:"Tak, pod warunkiem stałego nadzoru nad dziećmi, używania kamizelek na sprzęcie wodnym i ustalenia jasnych zasad poruszania się przy wodzie."},
    ],
  },
  "jesien-na-mazurach-dom-nad-jeziorem": {
    image:{image:"/home-season-autumn.webp", imageAlt:"Jesienny krajobraz jeziora i lasu na Mazurach", imageSource:"", imageCredit:"Krzywe Lake Houses"},
    sections:[
      {heading:"Jak korzystać z krótszego dnia", paragraphs:[
        "Jesienią najdłuższą wycieczkę ustaw w środku dnia, a poranek i wieczór zostaw nad jeziorem. To właśnie wtedy mgła, niskie światło i cisza tworzą krajobraz, którego nie ma w lipcu. Nie walcz z wcześniejszym zmrokiem — potraktuj go jako część wyjazdu.",
        "Wybieraj trasy z elastycznym zakończeniem. Spacer w rezerwacie Zakręt, promenada w Mrągowie lub zwiedzanie Rynu można skrócić, gdy zacznie padać. Długie przejazdy po ciemku ograniczaj, zwłaszcza na lokalnych drogach przez las.",
        "Po powrocie dobrze działa stały rytuał: ciepły posiłek, jacuzzi, książka albo planszówki. Jesienny dom nad jeziorem powinien być miejscem pobytu, nie tylko noclegiem między wycieczkami."], bullets:["ciepła warstwa i kurtka od deszczu", "nieprzemakalne buty", "termos i czołówka", "elastyczna lista atrakcji pod dachem"]},
      {heading:"Kolory, cisza i fotografia", paragraphs:[
        "Najlepsze kadry powstają zwykle nie w pełnym południowym świetle, lecz po wschodzie, przed zachodem i tuż po deszczu. Zabierz ściereczkę do obiektywu lub telefonu, bo wilgoć szybko osiada na sprzęcie. Nie schodź z wyznaczonych ścieżek tylko dla zdjęcia.",
        "Jesienne Mazury są spokojniejsze, ale nadal żywe. W lasach i na polach trwa sezon prac oraz polowań, dlatego respektuj oznaczenia, nie wchodź na prywatny teren i po zmroku noś element odblaskowy.",
        "Cisza sprzyja obserwowaniu ptaków oraz zwierząt, jeśli zachowasz dystans. Lornetka daje więcej niż próba podejścia z telefonem na kilka metrów." ]},
      {heading:"Dla kogo jest jesienny wyjazd", paragraphs:[
        "To dobry wybór dla par, osób pracujących zdalnie i grup, które cenią wspólne gotowanie bardziej niż sezonowe wydarzenia. Rodziny ze starszymi dziećmi również docenią krótkie wyprawy i wieczory przy domu, pod warunkiem przygotowania planu na deszcz.",
        "Przed rezerwacją sprawdź ogrzewanie i działanie udogodnień poza sezonem. Restauracje, rejsy i wypożyczalnie mogą mieć skrócone godziny, więc warto zrobić podstawowe zakupy po drodze.",
        "Jesień nie jest tańszą wersją lata. To osobny sposób doświadczania Mazur: mniej bodźców, więcej krajobrazu i większa swoboda zmiany planu." ]},
    ],
    faq:[
      {question:"Co spakować na jesienny pobyt na Mazurach?",answer:"Najważniejsze są warstwy, kurtka przeciwdeszczowa, nieprzemakalne buty, termos i latarka. Przyda się też plan atrakcji pod dachem."},
      {question:"Czy jesienią atrakcje na Mazurach są otwarte?",answer:"Część działa krócej lub tylko w wybrane dni, dlatego godziny trzeba sprawdzać bezpośrednio przed wyjazdem."},
    ],
  },
  "praca-zdalna-na-mazurach-workation": {
    image: pexels("https://images.pexels.com/photos/7047421/pexels-photo-7047421.jpeg?auto=compress&cs=tinysrgb&w=1600", "https://www.pexels.com/photo/person-typing-on-a-laptop-while-sitting-near-the-lake-7047421/", "cottonbro studio", "Praca zdalna z laptopem nad spokojnym jeziorem"),
    sections:[
      {heading:"Warunki techniczne przed pięknym widokiem", paragraphs:[
        "Workation zaczyna się od niezawodnego połączenia, nie od tarasu. Zapytaj o Wi‑Fi, zasięg sieci komórkowych i miejsce, w którym można odbyć rozmowę bez echa. Jeżeli praca jest krytyczna, zabierz zapasowy internet w telefonie i sprawdź limit danych przed przyjazdem.",
        "Stół jadalny może służyć do krótkiej pracy, ale przez kilka dni ważne są wysokość krzesła, światło i możliwość odłożenia sprzętu. Ustal z grupą godziny ciszy oraz to, kto korzysta z części wspólnej podczas spotkań.",
        "Zrób próbę po przyjeździe: połącz się z firmowym VPN, uruchom wideokonferencję i sprawdź przesyłanie większego pliku. Lepiej wykryć problem wieczorem niż minutę przed ważnym spotkaniem."], bullets:["główne i zapasowe łącze", "słuchawki z mikrofonem", "przedłużacz i ładowarki", "wydzielone miejsce do rozmów"]},
      {heading:"Rytm dnia, który nie zamienia Mazur w biuro", paragraphs:[
        "Wyznacz stałe godziny pracy i zamknij komputer po ich zakończeniu. Najbardziej wymagające zadania ustaw rano, gdy w domu jest ciszej, a po południu zostaw czas na spacer, kajak albo krótki wyjazd. Bez granicy workation szybko staje się zwykłą pracą z innym tłem.",
        "Nie planuj dalekiej atrakcji po każdym dniu roboczym. Czasem najlepszym wykorzystaniem miejsca jest pół godziny nad brzegiem i kolacja przygotowana bez pośpiechu. Większe wyjazdy zostaw na wolny dzień.",
        "Przy pracy kilku osób ustalcie jeden wspólny posiłek. Dzięki temu każdy zachowuje własny kalendarz, ale wyjazd nadal ma wspólny rytm." ]},
      {heading:"Dłuższy pobyt i organizacja codzienności", paragraphs:[
        "Przy tygodniu lub dwóch liczy się kuchnia, pralka w okolicy, miejsce na zakupy i wygodne przechowywanie rzeczy. Sprawdź, co jest na wyposażeniu, aby nie wozić całego biura i połowy domu.",
        "Jedna baza pomiędzy Mrągowem, Mikołajkami i Krutynią pozwala wykorzystać wolny dzień bez przeprowadzki. W tygodniu można zostać przy Jeziorze Krzywe, a w weekend wybrać dłuższą trasę.",
        "Dobrze zaplanowane workation nie wymaga urlopowej intensywności. Jego wartość polega na tym, że zwykły dzień kończy się nad wodą, a nie w korku lub przed kolejnym ekranem." ]},
    ],
    faq:[
      {question:"Co sprawdzić przed workation na Mazurach?",answer:"Zweryfikuj Wi‑Fi, zasięg zapasowej sieci, miejsce do rozmów, liczbę gniazdek i zasady ciszy w grupie. Przetestuj VPN po przyjeździe."},
      {question:"Jak połączyć pracę z wypoczynkiem?",answer:"Ustal stałe godziny pracy, najtrudniejsze zadania wykonuj rano, a po zamknięciu laptopa wybierz prostą aktywność blisko domu zamiast codziennych dalekich wycieczek."},
    ],
  },
  "ryn-na-jeden-dzien-zamek-jeziora": {
    sections:[
      {heading:"Trasa piesza bez zbędnego przestawiania auta", paragraphs:[
        "Zacznij od zamku, gdy masz najwięcej energii i pewność godzin zwiedzania. Później zejdź w stronę Ekomariny i nabrzeża Jeziora Ryńskiego. Centrum jest na tyle zwarte, że większość dnia można spędzić pieszo, pod warunkiem wygodnych butów.",
        "Po obiedzie przejdź nad Jezioro Ołów. Pętla wokół wody daje wyraźną zmianę nastroju: z kamiennej historii miasta do lasu i spokojnego brzegu. Nie musisz przechodzić całej trasy, jeśli grupa woli krótszy spacer.",
        "Wiatrak i punkty na obrzeżach potraktuj jako opcję, nie obowiązek. Lepiej dłużej zostać przy nabrzeżu niż kończyć dzień szybkim objazdem kilku miejsc widzianych wyłącznie przez szybę."], bullets:["rano: zamek", "południe: Ekomarina i obiad", "popołudnie: Jezioro Ołów", "wieczór: powrót do Krzywe"]},
      {heading:"Ryn z dziećmi i w mniej pewną pogodę", paragraphs:[
        "Dzieciom łatwiej zainteresować się zamkiem, gdy opowieść ma jeden temat: rycerze, budowa warowni albo legenda. Nie wymagaj oglądania każdej sali. Po zwiedzaniu zaplanuj przestrzeń na ruch przy wodzie.",
        "W deszczu zacznij od wnętrz i obserwuj pogodę. Krótka przerwa wystarczy na przejście nabrzeżem, a później można wrócić do muzealnej części miasta lub spokojnego obiadu.",
        "Godziny udostępniania wnętrz mogą się zmieniać, dlatego sprawdź je na oficjalnej stronie. Sam zamek pełni również funkcje hotelowe, co wpływa na zakres dostępnych przestrzeni." ]},
      {heading:"Dlaczego Ryn dobrze pasuje do bazy w Krzywe", paragraphs:[
        "Ryn jest wystarczająco blisko na pełny dzień, ale ma inny charakter niż Mikołajki i Mrągowo. Łączy mocny zabytek z dwoma jeziorami, dzięki czemu nie trzeba wybierać między historią a spokojnym spacerem.",
        "Po powrocie nie planuj kolejnego miasta. Dom nad Jeziorem Krzywe daje naturalne zakończenie: kolację, jacuzzi albo wieczór przy ognisku. Taki kontrast sprawia, że wycieczka pozostaje przyjemnością, a nie logistycznym maratonem.",
        "Jeżeli region odwiedzasz przez tydzień, Ryn warto wstawić pomiędzy bardziej aktywny spływ i miejski dzień w Mrągowie. Zmiana tempa pomaga lepiej zapamiętać każdy kierunek." ]},
    ],
    faq:[
      {question:"Czy Ryn da się zwiedzić pieszo?",answer:"Tak. Zamek, nabrzeże i centrum leżą blisko siebie. Do Jeziora Ołów również można dojść pieszo, a długość spaceru dopasować do grupy."},
      {question:"Ile czasu przeznaczyć na Ryn?",answer:"Na zamek, obiad i spacer nad jednym lub dwoma jeziorami warto przeznaczyć większość dnia bez dokładania kolejnego miasta."},
    ],
  },
  "mazury-na-niepogode-atrakcje": {
    sections:[
      {heading:"Jak podzielić deszczowy dzień na bloki", paragraphs:[
        "Zamiast szukać jednego miejsca na osiem godzin, połącz dwie krótsze aktywności. Rano wybierz muzeum lub zamek, później zjedz spokojny obiad, a podczas przerwy w deszczu przejdź krótki odcinek promenady. Taki plan jest odporny na zmianę pogody.",
        "Atrakcje grupuj geograficznie. Mikołajki i Ryn tworzą jeden kierunek, Mrągowo drugi, a Kętrzyn ze Świętą Lipką trzeci. Jazda między wszystkimi miastami w deszczu odbiera więcej energii niż samo zwiedzanie.",
        "Zawsze sprawdzaj godziny otwarcia i bilety. W sezonie popularne obiekty mogą być zatłoczone właśnie wtedy, gdy pada, a poza sezonem część ekspozycji działa krócej."], bullets:["Mikołajki: muzeum i park wodny", "Mrągowo: muzea i krótka promenada", "Ryn: zamek i lokalne zbiory", "Kętrzyn: zamek, muzeum i bazylika"]},
      {heading:"Plan rodzinny, spokojny i historyczny", paragraphs:[
        "Rodzinom najłatwiej połączyć jeden angażujący obiekt z czasem w domu. Park wodny, Konsulat Świętego Mikołaja lub Muzeum Sprzętu Wojskowego zwykle wystarczą jako główna atrakcja. Po powrocie dzieci potrzebują swobodnej zabawy bardziej niż kolejnego biletu.",
        "Pary i osoby szukające ciszy mogą wybrać kameralne muzeum, kawę i spacer w lekkim deszczu. Miłośnicy historii powinni skoncentrować się na jednym mieście, aby mieć czas na kontekst, a nie tylko zdjęcie fasady.",
        "Jeśli pogoda jest naprawdę trudna, zostań w domu. Wspólne gotowanie, planszówki i jacuzzi są pełnoprawnym dniem urlopu, zwłaszcza gdy kolejne dni zapowiadają się lepiej." ]},
      {heading:"Co zabrać i jak wrócić w dobrym nastroju", paragraphs:[
        "Lekka odzież przeciwdeszczowa, zapasowe skarpety i mały ręcznik w samochodzie rozwiązują większość drobnych problemów. Nie przegrzewaj się ciężką kurtką, jeśli większość czasu spędzasz we wnętrzach.",
        "Zostaw czas na spokojny powrót przed zmrokiem. Mokre lokalne drogi przez las wymagają większej uwagi, a dokładanie ostatniego punktu rzadko poprawia dzień.",
        "Po powrocie rozwieś rzeczy, przygotuj ciepły posiłek i ułóż plan na następny poranek dopiero po sprawdzeniu prognozy. Elastyczność jest na Mazurach ważniejsza niż perfekcyjny harmonogram." ]},
    ],
    faq:[
      {question:"Jakie atrakcje na Mazurach wybrać podczas deszczu?",answer:"Najpewniejsze są zamki, muzea, Park Wodny Tropikana i rodzinne obiekty pod dachem. Wybieraj maksymalnie jeden region dziennie."},
      {question:"Czy warto zostać w domu podczas całodziennego deszczu?",answer:"Tak. Dobrze wyposażony dom, wspólne gotowanie, gry i jacuzzi mogą dać więcej odpoczynku niż wielogodzinna jazda między zatłoczonymi atrakcjami."},
    ],
  },
  "tydzien-na-mazurach-plan-z-krzywe": {
    image:{image:"/home-longstay-directions.webp", imageAlt:"Aktywny tydzień na Mazurach z jedną bazą nad jeziorem", imageSource:"", imageCredit:"Krzywe Lake Houses"},
    sections:[
      {heading:"Jak ustawić kolejność dni", paragraphs:[
        "Nie przypisuj całego tygodnia do dat przed przyjazdem. Podziel pomysły na trzy grupy: aktywne na dobrą pogodę, miejskie na dzień umiarkowany i pod dachem na deszcz. Każdego wieczoru wybierz następny plan na podstawie prognozy oraz energii grupy.",
        "Po intensywnym spływie zaplanuj spokojniejszy Ryn lub dzień przy domu. Po miejskich Mikołajkach dobrze działa las i rezerwat. Naprzemienny rytm ogranicza zmęczenie oraz poczucie, że urlop stał się kolejnym projektem do wykonania.",
        "Jedną wycieczkę historyczną — Kętrzyn, Wilczy Szaniec lub Świętą Lipkę — zostaw na dzień z najstabilniejszym czasem przejazdu. To najdalszy kierunek i wymaga większego zapasu."], bullets:["2 dni aktywne", "2 dni miejskie lub kulturowe", "1 dzień historyczny", "2 dni bez obowiązkowego programu"]},
      {heading:"Zakupy, posiłki i logistyka grupy", paragraphs:[
        "Pierwszego dnia zrób podstawowe zakupy na śniadania, wodę i kolację po późnym powrocie. Nie planuj codziennych restauracji jako jedynej opcji — przy dzieciach lub większej grupie wspólna kuchnia daje potrzebną elastyczność.",
        "Ustal, kto prowadzi, kto rezerwuje bilety i o której wszyscy są gotowi. Prosty podział ról zapobiega porannym opóźnieniom. W dwóch domach wybierz jeden wspólny punkt spotkania, aby nie przenosić każdej decyzji między pokojami.",
        "Pakuj małą torbę dzienną zamiast rozkładać cały bagaż w samochodzie. Bluza, woda, przekąska, ręcznik i powerbank wystarczą do większości mazurskich planów." ]},
      {heading:"Jak nie przegapić odpoczynku", paragraphs:[
        "Najczęstszy błąd to traktowanie dnia przy domu jako pustej rubryki. Bezpośredni dostęp do Jeziora Krzywe, ogród, ognisko i jacuzzi są atrakcją, za którą wybrało się tę bazę. Zarezerwuj na nią czas tak samo świadomie jak na rejs.",
        "Pozwól grupie czasem się rozdzielić. Jedna część może pojechać do muzeum, druga zostać nad wodą, a wszyscy spotkają się na kolacji. Wspólny urlop nie wymaga identycznego programu od rana do wieczora.",
        "Ostatni dzień pozostaw lekki. Spokojne śniadanie, porządkowanie rzeczy i krótki spacer są lepsze niż nerwowa wycieczka przed drogą powrotną." ]},
    ],
    faq:[
      {question:"Jak zaplanować tydzień na Mazurach bez przemęczenia?",answer:"Przeplataj dni aktywne, miejskie i spokojne. Zostaw co najmniej dwa dni bez obowiązkowego programu i wybieraj kolejność według pogody."},
      {question:"Czy jedna baza wystarczy do zwiedzania Mikołajek, Mrągowa i Rynu?",answer:"Tak. Baza w Krzywe pozwala wybierać różne kierunki bez codziennego pakowania, a po wycieczce wracać nad własne jezioro."},
    ],
  },
  "dom-na-wynajem-czy-hotel-na-mazurach": {
    image:{image:"/home-hero-main.webp", imageAlt:"Samodzielne domy wakacyjne nad jeziorem na Mazurach", imageSource:"", imageCredit:"Krzywe Lake Houses"},
    sections:[
      {heading:"Porównanie dla pary, rodziny i dużej grupy", paragraphs:[
        "Para jadąca na krótki weekend może docenić hotelowe śniadanie i obsługę. Przy dłuższym pobycie dom daje jednak więcej prywatności, możliwość gotowania i swobodny wieczór na tarasie. Decyzja zależy od tego, czy chcecie korzystać z infrastruktury obiektu, czy z własnej przestrzeni.",
        "Rodzina potrzebuje miejsca na różne pory snu, mokre ręczniki i przekąski dostępne bez czekania na restaurację. Dla większej grupy samodzielny dom lub dwa domy upraszczają wspólne posiłki, rozmowy i podział kosztu.",
        "Nie porównuj pokoju hotelowego z całym domem tylko po cenie za noc. Policz wszystkie potrzebne pokoje, parking, śniadania i możliwe opłaty dodatkowe. Dopiero pełny koszt pokazuje różnicę."], bullets:["prywatność", "własna kuchnia", "przestrzeń wspólna", "obsługa i posiłki", "koszt całej grupy"]},
      {heading:"Ukryte koszty i wygoda codzienności", paragraphs:[
        "W hotelu sprawdź opłaty za parking, dostawki, strefę wellness i posiłki. W domu zweryfikuj sprzątanie, kaucję, energię, drewno oraz zasady korzystania z jacuzzi. Transparentna oferta powinna pozwolić policzyć pełną kwotę przed rezerwacją.",
        "Dom oznacza większą samodzielność: trzeba zrobić zakupy, przygotować śniadanie i posprzątać po wspólnym gotowaniu. Dla jednych jest to wada, dla innych sedno swobody. Ważne, aby grupa miała te same oczekiwania.",
        "Przy dwóch rodzinach ustalcie z góry podział sypialni i łazienek. Nawet duży metraż nie rozwiąże konfliktu, jeśli jedna osoba zakłada prywatny pokój, a druga wspólne spanie." ]},
      {heading:"Kiedy dwa domy są lepsze niż jeden", paragraphs:[
        "Dwa sąsiednie domy pozwalają być razem w ogrodzie i przy ognisku, a jednocześnie zachować osobny rytm poranków. To szczególnie wygodne przy małych dzieciach, seniorach lub osobach pracujących przez część wyjazdu.",
        "W Krzywe każdy dom ma własne sypialnie i łazienki, więc grupa nie musi zamieniać salonu w noclegownię. Wspólna przestrzeń może pozostać miejscem posiłków oraz odpoczynku.",
        "Jeżeli grupa liczy mniej osób, wynajem jednego domu jest prostszy. Dwa mają sens wtedy, gdy prywatność i elastyczność są realną potrzebą, a nie tylko dodatkowym metrażem." ]},
    ],
    faq:[
      {question:"Co jest tańsze dla dużej grupy: hotel czy dom?",answer:"To zależy od terminu i standardu, ale należy porównać kilka pokoi hotelowych z pełną ceną domu, doliczając parking, posiłki oraz opłaty dodatkowe."},
      {question:"Kiedy warto wynająć dwa domy obok siebie?",answer:"Przy dwóch rodzinach, kilku pokoleniach lub grupie do 20 osób, gdy ważne są wspólne chwile oraz możliwość osobnego snu i odpoczynku."},
    ],
  },
  "jezioro-krzywe-przewodnik-dla-gosci": {
    image:{image:"/krzywe-hero.webp", imageAlt:"Spokojna tafla Jeziora Krzywe w powiecie mrągowskim", imageSource:"", imageCredit:"Krzywe Lake Houses"},
    sections:[
      {heading:"Dzień nad jeziorem od świtu do wieczora", paragraphs:[
        "Rano woda bywa najspokojniejsza, dlatego to dobry czas na kajak, obserwację ptaków lub kawę przy brzegu. Przed wyjściem zawsze oceń wiatr i zachmurzenie. Pogoda nad wodą może zmienić się szybciej niż w miejscowości osłoniętej lasem.",
        "W środku dnia wybierz cień, książkę albo wyjazd na obiad. Najmocniejsze słońce odbija się od tafli, więc ochrona głowy i krem są potrzebne również przy lekkim wietrze. Wieczorem wróć nad brzeg, ale po zmroku poruszaj się z latarką.",
        "Bliskość domu pozwala reagować bez pakowania całego samochodu. Można wrócić po ręcznik, ciepłą bluzę lub posiłek, a potem znów zejść do wody. To właśnie ta elastyczność odróżnia pobyt przy jeziorze od jednodniowej wizyty na plaży."], bullets:["kamizelka na sprzęcie wodnym", "kontrola pogody i wiatru", "nadzór nad dziećmi", "latarka po zmroku"]},
      {heading:"Naturalny brzeg i odpowiedzialny wypoczynek", paragraphs:[
        "Trzciny oraz przybrzeżna roślinność są schronieniem dla ptaków, ryb i owadów. Nie wycinaj przejść, nie wpływaj w gniazda i nie zostawiaj odpadów. Cisza po zmroku chroni przyrodę i komfort innych osób nad jeziorem.",
        "Nie dokarmiaj dzikich zwierząt resztkami jedzenia. Obserwuj je z dystansu, najlepiej przez lornetkę. Jeśli korzystasz z kajaka lub deski, omijaj płytkie, zarośnięte zatoki.",
        "Naturalny brzeg zmienia się sezonowo. Po deszczu może być śliski, latem pojawiają się owady, a jesienią szybciej zapada zmrok. Dobre przygotowanie pozwala korzystać z miejsca bez prób zamieniania go w miejskie kąpielisko." ]},
      {heading:"Jezioro jako baza, nie jedyny punkt programu", paragraphs:[
        "Jeden dzień przeznacz wyłącznie na wodę i dom. W kolejne poranki można wyjechać do Piecek, Krutyni, Mrągowa lub Mikołajek, a po południu wrócić nad spokojniejszy brzeg. Nie trzeba wybierać między ciszą a zwiedzaniem.",
        "Przy zmiennej pogodzie jezioro daje krótkie okna aktywności. Pół godziny na kajaku przed deszczem może być przyjemniejsze niż wielogodzinna wyprawa zaplanowana wbrew warunkom.",
        "Goście często zapamiętują nie największą atrakcję, lecz powtarzalny rytuał: poranny widok, krótki spacer i wieczorne światło. Warto zostawić na niego miejsce w każdym dniu." ]},
    ],
    faq:[
      {question:"Jak bezpiecznie korzystać z Jeziora Krzywe?",answer:"Sprawdzaj pogodę, używaj kamizelki na sprzęcie wodnym, nie zostawiaj dzieci bez nadzoru i po zmroku poruszaj się z latarką."},
      {question:"Czy warto przeznaczyć cały dzień tylko na jezioro?",answer:"Tak. Dzień bez samochodu pozwala wykorzystać największą zaletę noclegu przy brzegu i odpocząć między dalszymi wycieczkami."},
    ],
  },
  "wedkowanie-na-mazurach-jezioro-krzywe": {
    image: pexels("https://images.pexels.com/photos/24871715/pexels-photo-24871715.jpeg?auto=compress&cs=tinysrgb&w=1600", "https://www.pexels.com/photo/man-with-fishing-rod-by-lake-24871715/", "Teju", "Wędkarz z wędką nad spokojnym jeziorem"),
    sections:[
      {heading:"Formalności przed pierwszym zarzuceniem", paragraphs:[
        "Najpierw ustal gospodarza wody i aktualny regulamin. Sam fakt posiadania karty wędkarskiej nie zawsze oznacza, że można łowić w dowolnym miejscu bez dodatkowego zezwolenia. Sprawdź dozwolone metody, wymiary i okresy ochronne oraz zasady dotyczące łodzi.",
        "Dokumenty kupuj lub potwierdzaj w oficjalnym kanale właściwego użytkownika rybackiego. Zasady mogą się zmieniać, dlatego artykuł turystyczny nie powinien być jedynym źródłem. Zachowaj potwierdzenie przy sobie, również przy krótkim porannym wyjściu.",
        "Jeżeli planujesz łowić z brzegu obiektu, zapytaj gospodarza, gdzie można bezpiecznie rozłożyć sprzęt. Pomost lub naturalne przejście może być współdzielone z kąpiącymi się i osobami korzystającymi z kajaka."], bullets:["aktualne zezwolenie", "regulamin gospodarza wody", "miarka i podbierak", "oświetlenie po zmroku", "porządek na stanowisku"]},
      {heading:"Sprzęt i rytm spokojnego łowienia", paragraphs:[
        "Na krótki wyjazd zabierz jeden sprawdzony zestaw zamiast całego magazynu akcesoriów. Dopasowanie metody do warunków skonsultuj lokalnie; znaczenie mają pora roku, wiatr, temperatura wody i roślinność przy brzegu.",
        "Poranek oraz późne popołudnie pozwalają połączyć łowienie z resztą urlopu. Ustal z grupą, kiedy stanowisko jest Twoją przestrzenią, a kiedy brzeg służy wspólnemu odpoczynkowi. Dzięki temu wędkarstwo nie przejmuje całego wyjazdu.",
        "Zabierz odzież warstwową, środek na owady i czołówkę. Mokra trawa, niska temperatura o świcie i szybko zapadający zmrok potrafią zaskoczyć nawet latem." ]},
      {heading:"Etyka, bezpieczeństwo i wspólny brzeg", paragraphs:[
        "Nie zostawiaj żyłki, haczyków ani opakowań po zanęcie. Dla ptaków i dzieci są szczególnie niebezpieczne. Stanowisko po zakończeniu powinno wyglądać tak, jak przed Twoim przyjściem.",
        "Przy wypuszczaniu ryb ogranicz czas poza wodą, przygotuj wcześniej aparat i używaj mokrych dłoni. Jeśli zabieranie ryb jest dozwolone, przestrzegaj limitów oraz wymiarów — nie traktuj ich jako celu do maksymalnego wykorzystania.",
        "Nie wchodź na niestabilny lód i nie wypływaj przy silnym wietrze. Kamizelka na łodzi lub kajaku jest podstawą także dla doświadczonego wędkarza." ]},
    ],
    faq:[
      {question:"Czy do wędkowania na Jeziorze Krzywe potrzebne jest zezwolenie?",answer:"Należy sprawdzić aktualnego gospodarza wody i jego regulamin. Zwykle wymagane są odpowiednie uprawnienia oraz zezwolenie na konkretny akwen."},
      {question:"Co zabrać na krótki wyjazd wędkarski?",answer:"Oprócz sprawdzonego zestawu przydadzą się dokumenty, miarka, podbierak, czołówka, odzież warstwowa, środek na owady i worek na wszystkie odpady."},
    ],
  },
  "mikolajki-poza-sezonem": {
    image: attractionImage(0, "Spokojna promenada i port w Mikołajkach nad jeziorem"),
    sections:[
      {heading:"Mikołajki bez wakacyjnego scenariusza", paragraphs:[
        "Po sezonie promenada staje się miejscem zwykłego spaceru, a nie ciągłym wydarzeniem. Warto przyjechać późnym rankiem, przejść wzdłuż portu i obserwować, jak miasto wraca do lokalnego rytmu. Nie wszystkie tawerny będą otwarte, ale właśnie brak tłumu jest główną wartością.",
        "Wybierz jeden obiekt pod dachem i zostaw czas na wodę. Muzeum Reformacji daje historyczny kontekst, a kościół Świętej Trójcy pozwala zobaczyć inną warstwę miasta niż sezonowe nabrzeże.",
        "Zimą i wczesną wiosną dzień jest krótki. Zaplanuj powrót przed zmrokiem i nie zakładaj, że letnie parkingi, rejsy czy gastronomia funkcjonują bez zmian."], bullets:["sprawdź godziny otwarcia", "zabierz ciepłą warstwę od wiatru", "wybierz jedną atrakcję pod dachem", "zostaw czas na pustą promenadę"]},
      {heading:"Jesień, zima i wiosna — trzy różne miasta", paragraphs:[
        "Jesienią najważniejsze są kolory, spokojne nabrzeże i miękkie światło. Zimą port nabiera surowego charakteru, a spacer powinien być krótszy i połączony z ciepłą przerwą. Wiosną miasto budzi się stopniowo; niektóre usługi ruszają dopiero bliżej długich weekendów.",
        "Nie oceniaj wyjazdu liczbą otwartych lokali. Poza sezonem Mikołajki są dobrym celem dla osób, które chcą zobaczyć strukturę miasta, jeziora i port bez wakacyjnej dekoracji.",
        "Przy niepewnej pogodzie przygotuj alternatywę w Mrągowie lub Rynie. Stała baza w Krzywe pozwala zmienić kierunek rano bez zmiany noclegu." ]},
      {heading:"Gdzie zjeść i jak nie zostać bez planu", paragraphs:[
        "Restauracje sprawdzaj bezpośrednio w dniu wizyty. Informacje w mapach bywają nieaktualne poza sezonem. Dobrym rozwiązaniem jest wcześniejszy telefon oraz zapas przekąsek w samochodzie.",
        "Nie buduj dnia wokół rejsu, dopóki nie potwierdzisz rozkładu. Zamiast tego potraktuj ewentualne połączenie jako bonus, a podstawą niech będzie spacer, muzeum i obiad.",
        "Po powrocie do całorocznego domu czekają ogrzewane wnętrza, własna kuchnia i spokojny wieczór. To ważniejsze poza sezonem niż bliskość nocnych atrakcji centrum." ]},
    ],
    faq:[
      {question:"Czy warto jechać do Mikołajek poza latem?",answer:"Tak, jeśli zależy Ci na spokojnej promenadzie, lokalnym rytmie i mniejszej liczbie gości. Trzeba jedynie sprawdzać aktualne godziny atrakcji i gastronomii."},
      {question:"Czy poza sezonem odbywają się rejsy?",answer:"Rozkłady są sezonowe i zależne od warunków, dlatego trzeba je potwierdzić u operatora. Nie warto opierać całego dnia na niepotwierdzonym połączeniu."},
    ],
  },
  "mragowo-na-weekend-plan": {
    image: attractionImage(11, "Promenada nad Jeziorem Czos w Mrągowie"),
    sections:[
      {heading:"Dzień pierwszy: Czos i miejskie centrum", paragraphs:[
        "Pierwszy poranek rozpocznij od promenady nad Jeziorem Czos. Przejdź obok mola i amfiteatru, zatrzymaj się na kawę, a później skieruj do centrum. Taki układ pozwala zobaczyć najbardziej rozpoznawalną stronę Mrągowa bez ciągłego wracania do samochodu.",
        "Po obiedzie wybierz Muzeum w Mrągowie albo wieżę w Parku Sikorskiego. Jeżeli pogoda jest dobra, wydłuż spacer; jeżeli pada, postaw na wnętrze i spokojny powrót.",
        "Nie kończ dnia kolejnym miastem. Wróć nad Jezioro Krzywe na kolację i wieczór przy domu. Weekend działa najlepiej, gdy miejska treść ma wyraźny kontrast."], bullets:["promenada", "molo", "centrum i obiad", "muzeum albo wieża"]},
      {heading:"Dzień drugi: wybierz jeden temat", paragraphs:[
        "Rodziny mogą odwiedzić Muzeum Sprzętu Wojskowego albo Ogrody Pokazowe w sezonie. Osoby szukające ruchu powinny wybrać dłuższy spacer, rower lub punkt widokowy. Miłośnicy kultury mogą sprawdzić wydarzenia w amfiteatrze i lokalnych instytucjach.",
        "Nie próbuj połączyć wszystkich wariantów. Jeden temat i dobry obiad wystarczą, aby dzień miał własny charakter. Zostaw także godzinę na spontaniczny przystanek, który zauważycie po drodze.",
        "Przed wyjazdem sprawdź wydarzenia. Duży koncert zmienia dostępność parkingów i rytm nabrzeża, ale może też stać się głównym celem całego weekendu." ]},
      {heading:"Weekend bez logistycznego chaosu", paragraphs:[
        "Wygodne buty, niewielka torba i warstwowe ubranie wystarczą do miejskiego planu. Nie woź całego bagażu w samochodzie. Zostaw go w stałej bazie i zabierz tylko to, czego potrzebujesz do zmiany pogody.",
        "Jeśli podróżujecie większą grupą, ustalcie miejsce spotkania przy promenadzie i godzinę powrotu. Część osób może zostać nad wodą, a część wejść do muzeum bez konieczności podporządkowania wszystkich jednej aktywności.",
        "Krzywe leży na tyle blisko, aby Mrągowo było wygodnym kierunkiem, ale na tyle spokojnie, aby po powrocie weekend nie kończył się w miejskim gwarze." ]},
    ],
    faq:[
      {question:"Czy Mrągowo wystarczy na cały weekend?",answer:"Tak. Jeden dzień można przeznaczyć na Jezioro Czos i centrum, a drugi na muzeum, ogrody, wydarzenie lub dłuższy spacer."},
      {question:"Kiedy sprawdzić kalendarz wydarzeń w Mrągowie?",answer:"Najlepiej przed rezerwacją i ponownie kilka dni przed wyjazdem, ponieważ duże wydarzenia wpływają na parkingi, ruch oraz dostępność restauracji."},
    ],
  },
  "wilczy-szaniec-ketrzyn-swieta-lipka-trasa": {
    image: attractionImage(47, "Bunkry Wilczego Szańca ukryte w mazurskim lesie"),
    sections:[
      {heading:"Kolejność trasy i realny czas", paragraphs:[
        "Wyjedź rano i zacznij od Wilczego Szańca, zanim pojawią się największe grupy. To rozległy teren leśny, którego nie warto oglądać w pośpiechu. Kętrzyn zostaw na środek dnia — zamek, bazylika i obiad pozwolą zmienić tempo.",
        "Święta Lipka dobrze działa jako finał, ale sprawdź godziny udostępniania i ewentualnej prezentacji organów. Nie przyjeżdżaj w ostatniej chwili. Miejsce sakralne wymaga również spokojnego zachowania i odpowiedniego stroju.",
        "Jeżeli grupa wolno zwiedza lub podróżuje z dziećmi, zrezygnuj z jednego punktu w Kętrzynie. Trzy miejscowości są możliwe jednego dnia, lecz tylko przy rozsądnym wyborze priorytetów."], bullets:["rano: Wilczy Szaniec", "południe: Kętrzyn i obiad", "popołudnie: Święta Lipka", "wieczór: powrót nad jezioro"]},
      {heading:"Jak zwiedzać odpowiedzialnie", paragraphs:[
        "Wilczy Szaniec jest miejscem historycznym związanym z wojną i systemem totalitarnym. Warto korzystać z rzetelnego przewodnika lub materiałów, unikać sensacyjnego tonu i nie traktować ruin jak parku rozrywki.",
        "Poruszaj się po wyznaczonych trasach. Betonowe konstrukcje są nierówne, wilgotne i miejscami ograniczone. Dobre buty oraz latarka przydadzą się bardziej niż elegancki strój.",
        "W Świętej Lipce szanuj nabożeństwa i innych odwiedzających. Fotografowanie oraz zwiedzanie powinny ustąpić pierwszeństwa funkcji religijnej miejsca." ]},
      {heading:"Trasa z dziećmi i seniorami", paragraphs:[
        "Starszym dzieciom warto wcześniej wyjaśnić kontekst, aby bunkry nie były tylko wielkimi ruinami. Młodsze mogą szybko zmęczyć się leśnym spacerem, dlatego ogranicz liczbę przystanków i zaplanuj przerwę w Kętrzynie.",
        "Seniorom przyda się informacja o nierównym podłożu i długości przejścia. Nie każda część trasy będzie wygodna dla osoby o ograniczonej mobilności; aktualną dostępność należy sprawdzić u operatora.",
        "Zabierz wodę, przekąski i warstwę od deszczu. W lesie bywa chłodniej, a zasięg może być słabszy. Po powrocie nie planuj już intensywnych atrakcji." ]},
    ],
    faq:[
      {question:"Ile czasu przeznaczyć na Wilczy Szaniec?",answer:"Na spokojne przejście głównej trasy warto zarezerwować kilka godzin, zależnie od tempa i wybranego sposobu zwiedzania. Aktualne warianty sprawdź u operatora."},
      {question:"Czy Wilczy Szaniec, Kętrzyn i Święta Lipka zmieszczą się w jednym dniu?",answer:"Tak, przy wczesnym wyjeździe i ograniczeniu programu w Kętrzynie. Najwięcej czasu warto zostawić na Wilczy Szaniec."},
    ],
  },
  "zima-na-mazurach-dom-nad-jeziorem": {
    image:{image:"/home-season-winter.webp", imageAlt:"Zimowe jezioro i zaśnieżony mazurski krajobraz", imageSource:"", imageCredit:"Krzywe Lake Houses"},
    sections:[
      {heading:"Bezpieczny zimowy dzień nad wodą", paragraphs:[
        "Zamarznięta tafla nigdy nie jest automatycznym zaproszeniem do wejścia. Grubość lodu może różnić się w pobliżu trzcin, dopływów i pomostów. Bez oficjalnej informacji oraz lokalnej oceny pozostań na brzegu, nawet jeśli widzisz ślady innych osób.",
        "Spacer planuj w środku dnia, kiedy jest najwięcej światła. Zabierz czołówkę, termos i warstwową odzież. Na oblodzonych fragmentach zwolnij; kijki lub nakładki antypoślizgowe mogą znacząco poprawić bezpieczeństwo.",
        "Po zmroku nie podchodź do brzegu bez oświetlenia. Śnieg wyrównuje krawędzie terenu i utrudnia ocenę, gdzie kończy się ląd."], bullets:["nie wchodź na niezweryfikowany lód", "sprawdzaj drogi i pogodę", "zabierz czołówkę", "wracaj przed zmrokiem"]},
      {heading:"Co robić, gdy mróz zatrzymuje w domu", paragraphs:[
        "Zimowy wyjazd powinien zakładać długi czas wewnątrz. Wspólne gotowanie, gry, książka i jacuzzi nie są planem awaryjnym, lecz główną częścią pobytu. Wybierz dom z wygodnym salonem oraz stołem dla całej grupy.",
        "Jeżeli pracujesz zdalnie, wykorzystaj cichy poranek, a krótki spacer zaplanuj w południe. Rodziny mogą przygotować prosty rytm: aktywność na zewnątrz, ciepły posiłek i spokojne popołudnie.",
        "Nie ogrzewaj wnętrza przy otwartych drzwiach i stosuj się do zasad korzystania z kominka lub innych urządzeń. Bezpieczeństwo i komfort wszystkich gości są ważniejsze niż zdjęcie z zimowym klimatem." ]},
      {heading:"Zimowe wycieczki bez presji", paragraphs:[
        "Mrągowo i Mikołajki pokazują poza sezonem spokojniejszą stronę. Wybierz jedną promenadę, muzeum lub restaurację i sprawdź godziny przed wyjazdem. Krótkie dni nie sprzyjają objazdowi wielu miast.",
        "Kętrzyn i Ryn są dobrym kierunkiem na dzień historyczny, jeśli drogi są bezpieczne. Nie ruszaj w trasę tylko dlatego, że plan został zapisany wcześniej — oblodzenie i intensywne opady są wystarczającym powodem do zmiany.",
        "Najlepszy zimowy pobyt pozostawia margines. Czasem widok śniegu nad Jeziorem Krzywe i spokojny obiad w domu tworzą pełniejszy dzień niż najdłuższa lista atrakcji." ]},
    ],
    faq:[
      {question:"Czy można wejść zimą na zamarznięte jezioro?",answer:"Nie bez oficjalnie potwierdzonych warunków i lokalnej oceny bezpieczeństwa. Lód ma różną grubość i może być szczególnie słaby przy roślinności oraz dopływach."},
      {question:"Co robić zimą na Mazurach bez śniegu?",answer:"Warto zaplanować spacery, muzea, spokojne miasta, wspólne gotowanie i odpoczynek w całorocznym domu. Zima nie wymaga sportowego programu."},
    ],
  },
  "majowka-na-mazurach-plan-pobytu": {
    image:{image:"/home-season-spring.webp", imageAlt:"Wiosenna zieleń i jezioro podczas majówki na Mazurach", imageSource:"", imageCredit:"Krzywe Lake Houses"},
    sections:[
      {heading:"Cztery dni, trzy tempa", paragraphs:[
        "Dzień przyjazdu zostaw na Krzywe. Drugiego dnia wybierz Mikołajki albo Mrągowo, trzeciego naturę w Krutyni lub rezerwacie, a ostatni poranek ponownie przeznacz na jezioro. Taki układ daje różnorodność bez codziennego pośpiechu.",
        "Najcieplejszy dzień zachowaj na wodę i spacer. Przy wietrze lub deszczu przenieś się do muzeum, zamku albo parku wodnego. Kolejność ustal rano, nie kilka tygodni przed wyjazdem.",
        "Nie próbuj odwiedzać dwóch dużych miast jednego dnia. Długi weekend jest krótki, ale większa liczba przejazdów nie sprawi, że odpoczniesz bardziej."], bullets:["dzień 1: Krzywe", "dzień 2: miasto", "dzień 3: natura", "dzień 4: spokojny poranek"]},
      {heading:"Majowa pogoda i pakowanie", paragraphs:[
        "Słońce nie wyklucza chłodnego wiatru, szczególnie nad wodą. Spakuj warstwy, kurtkę przeciwdeszczową, pełne buty oraz czapkę na chłodniejszy wieczór. Krem z filtrem również jest potrzebny, bo promieniowanie odbija się od tafli.",
        "Na ognisko przygotuj cieplejsze ubranie, którego nie szkoda zapachu dymu. Do samochodu włóż zapasowe skarpety i mały ręcznik. To drobiazgi, które pozwalają kontynuować dzień po krótkim deszczu.",
        "Przed przyjazdem sprawdź, czy sezonowe rejsy i wypożyczalnie już działają. Majówka jest początkiem sezonu, ale nie każda usługa startuje w tym samym terminie." ]},
      {heading:"Rezerwacja i wspólny plan grupy", paragraphs:[
        "Długi weekend rezerwuj wcześniej, szczególnie dla większej grupy. Ustal liczbę gości i podział sypialni przed wpłatą. W dwóch domach można łatwo połączyć rodziny, ale warto z góry zdecydować, gdzie odbywają się wspólne posiłki.",
        "Zrób jedną listę zakupów i jeden wspólny czat organizacyjny. Każda osoba nie musi przywozić tych samych produktów ani osobno sprawdzać godzin atrakcji.",
        "Najważniejszym punktem planu niech pozostanie czas nad Jeziorem Krzywe. To dzięki niemu majówka różni się od zwykłego miejskiego weekendu." ]},
    ],
    faq:[
      {question:"Jak zaplanować czterodniową majówkę na Mazurach?",answer:"Połącz dzień przy domu, jeden dzień miejski, jeden przyrodniczy i spokojny poranek przed wyjazdem. Kolejność dopasuj do pogody."},
      {question:"Czy w maju działają już rejsy i wypożyczalnie?",answer:"Część działa sezonowo, ale terminy rozpoczęcia mogą się różnić. Aktualną ofertę trzeba potwierdzić bezpośrednio przed wyjazdem."},
    ],
  },
  "mazury-dla-20-osob-dwa-domy": {
    image: pexels("https://images.pexels.com/photos/6130011/pexels-photo-6130011.jpeg?auto=compress&cs=tinysrgb&w=1600", "https://www.pexels.com/photo/happy-people-enjoying-summer-sunset-on-lakeside-6130011/", "Quang Nguyen Vinh", "Grupa przyjaciół spędzająca wspólny czas nad jeziorem"),
    sections:[
      {heading:"Podział domów, pokoi i odpowiedzialności", paragraphs:[
        "Zanim ktokolwiek wpłaci pieniądze, ustal liczbę osób, par, dzieci i potrzebę osobnych łóżek. Rozpisz sypialnie obu domów i daj grupie możliwość zgłoszenia ważnych potrzeb: ciszy, bliskości łazienki lub wcześniejszego snu dzieci.",
        "Wyznacz jedną osobę do kontaktu z gospodarzem, drugą do zakupów i trzecią do rozliczeń. Nie chodzi o formalny komitet, lecz o uniknięcie sytuacji, w której pięć osób zadaje to samo pytanie, a nikt nie kupuje wody na pierwszy wieczór.",
        "Ustal, który dom jest miejscem wspólnych posiłków. Dzięki temu drugi może pozostać spokojniejszy dla dzieci, seniorów lub osób, które chcą wcześniej odpocząć."], bullets:["lista gości i łóżek", "podział sypialni", "jedna osoba kontaktowa", "wspólna lista zakupów", "jasne zasady ciszy"]},
      {heading:"Budżet bez niedomówień", paragraphs:[
        "Policz pełny koszt: noclegi, opłaty dodatkowe, dojazd, zakupy i bilety. Ustal, które wydatki dzielicie równo, a które dotyczą wyłącznie części grupy. Rodzina z dwojgiem dzieci nie zawsze powinna rozliczać każdą atrakcję identycznie jak para.",
        "Wpłaty zbierz przed terminem płatności do obiektu. Jedna osoba nie powinna finansować całej rezerwacji przez kilka tygodni. Zapisuj przelewy w prostym arkuszu lub aplikacji do dzielenia kosztów.",
        "Zostaw małą wspólną rezerwę na drewno, dodatkowe zakupy lub transport. Po wyjeździe rozlicz ją jednym zestawieniem, zamiast wielu drobnych wiadomości." ]},
      {heading:"Wspólny urlop bez wspólnego obowiązku", paragraphs:[
        "Duża grupa nie musi codziennie jechać w to samo miejsce. Ustal jeden wspólny punkt dnia — śniadanie, obiad lub ognisko — a pozostały czas pozwól spędzać w mniejszych zespołach. Jedni mogą pojechać na Krutyń, inni zostać nad wodą.",
        "Przygotuj dwa warianty transportu i upewnij się, że kierowcy znają plan powrotu. W sezonie parking dla kilku aut w centrum Mikołajek może wymagać więcej czasu niż sama trasa.",
        "Najlepszą zaletą dwóch domów jest możliwość bycia razem bez stałego tłoku. Korzystaj z niej świadomie: wspólny ogród i ognisko, osobne łazienki oraz spokojne poranki." ]},
    ],
    faq:[
      {question:"Jak podzielić dwa domy między 20 osób?",answer:"Najpierw rozpisz rzeczywiste łóżka i potrzeby gości, potem podziel sypialnie. Jeden dom może pełnić funkcję wspólną, a drugi spokojniejszą."},
      {question:"Jak rozliczać wyjazd dużej grupy?",answer:"Z góry ustal koszty wspólne i indywidualne, zbierz wpłaty przed terminem rezerwacji i prowadź jedno czytelne zestawienie wszystkich wydatków."},
    ],
  },
  "romantyczny-weekend-na-mazurach": {
    image:{image:"/blog-romantic-weekend.webp", imageAlt:"Para odpoczywająca na pomoście nad mazurskim jeziorem", imageSource:"https://www.pexels.com/photo/3839438/", imageCredit:"Gantas Vaičiulėnas · Pexels"},
    sections:[
      {heading:"Weekend, który nie potrzebuje dziesięciu atrakcji", paragraphs:[
        "Najlepszy plan we dwoje ma dużo pustego miejsca. Po przyjeździe zostańcie nad Jeziorem Krzywe, przygotujcie kolację i przejdźcie się przed zachodem. Nie rozpoczynajcie weekendu od kolejnej godziny w samochodzie tylko dlatego, że lista atrakcji jest długa.",
        "Na pełny dzień wybierzcie jeden kierunek: promenadę i rejs w Mikołajkach, spacer nad Czosem w Mrągowie albo zamek i jeziora w Rynie. Po obiedzie wróćcie do domu bez poczucia, że trzeba jeszcze coś zaliczyć.",
        "Drugi poranek zostawcie spokojny. Kawa nad wodą, późne śniadanie i krótki spacer są lepszym zakończeniem niż nerwowe pakowanie po wczesnej wycieczce."], bullets:["pierwszy wieczór nad jeziorem", "jeden wspólny kierunek", "kolacja bez pośpiechu", "późne śniadanie przed wyjazdem"]},
      {heading:"Pomysły na pogodę dobrą i niepewną", paragraphs:[
        "Przy słońcu wybierzcie kajak, spokojny spacer lub rejs. Nie planujcie aktywności wymagającej ciągłego patrzenia na zegarek. Wspólny czas działa najlepiej, gdy można zatrzymać się przy widoku albo zmienić trasę.",
        "W deszczu odwiedźcie jedno kameralne muzeum, zjedzcie dłuższy obiad i wróćcie do jacuzzi. Dobrze wyposażony dom pozwala potraktować niepogodę jako zmianę nastroju, a nie zepsuty weekend.",
        "Poza sezonem sprawdzajcie restauracje i atrakcje przed wyjazdem. Mniejsza liczba otwartych miejsc jest rekompensowana ciszą, ale wymaga trochę lepszej organizacji posiłków." ]},
      {heading:"Małe rzeczy, które budują nastrój", paragraphs:[
        "Zabierzcie ulubioną muzykę, składniki na jedno dobre śniadanie i ubranie na wieczór przy ognisku. Nie potrzeba dekoracji ani skomplikowanego scenariusza — liczy się brak codziennych obowiązków oraz miejsce, w którym można rozmawiać bez pośpiechu.",
        "Telefony zostawcie na godzinę w domu podczas spaceru. Zdjęcia są ważne, ale ciągłe szukanie kadru odrywa od krajobrazu. Jedna wspólna fotografia w zupełności wystarczy.",
        "Jeżeli chcecie zrobić niespodziankę, ustalcie z gospodarzem możliwości przed przyjazdem. Nie używajcie świec lub dekoracji niezgodnie z zasadami bezpieczeństwa obiektu." ]},
    ],
    faq:[
      {question:"Co robić podczas romantycznego weekendu na Mazurach?",answer:"Wybierz jeden spokojny kierunek, zostaw czas nad jeziorem, zaplanuj wspólną kolację i nie wypełniaj całego pobytu atrakcjami."},
      {question:"Czy romantyczny weekend na Mazurach ma sens poza latem?",answer:"Tak. Jesień, zima i wiosna oferują więcej ciszy, pod warunkiem wyboru całorocznego domu i sprawdzenia godzin restauracji oraz atrakcji."},
    ],
  },
};

const countWords = (article: BlogArticle) =>
  [article.lead, ...article.sections.flatMap((section) => [section.heading, ...section.paragraphs, ...(section.bullets ?? [])]), ...article.faq.flatMap((item) => [item.question, item.answer])]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

export function enrichBlogArticle(article: BlogArticle): BlogArticle {
  const enrichment = enrichments[article.slug];
  if (!enrichment) return article;

  const enriched: BlogArticle = {
    ...article,
    ...(enrichment.image ?? {}),
    updatedAt: "2026-08-01",
    sections: [...article.sections, ...enrichment.sections],
    faq: [...article.faq, ...enrichment.faq],
  };

  return {
    ...enriched,
    readingTime: Math.max(10, Math.ceil(countWords(enriched) / 180)),
  };
}
