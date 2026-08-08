import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../components/SiteHeader";
import { ArrowDown, ArrowRight, ArrowUpRight, MapPin, Waves } from "../components/Icons";
import { BOOKING_URL } from "../lib/booking";
import { LakeIcon } from "./LakeIcons";

const images = {
  strait: {
    src: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Krzywe_przesmyk.JPG",
    page: "https://commons.wikimedia.org/wiki/File:Krzywe_przesmyk.JPG",
  },
  bay: {
    src: "/lake-bays.webp",
    page: "",
  },
  pier: {
    src: "/lake-east-shore.jpg",
    page: "",
  },
  summer: {
    src: "/mazury-summer-commons.jpg",
    page: "https://commons.wikimedia.org/wiki/File:Mazurskie_jezioro.jpg",
  },
  winter: {
    src: "/mazury-winter-commons.jpg",
    page: "https://commons.wikimedia.org/wiki/File:Zdr%C3%B3%C5%BCno_Lake_in_winter,_2021.jpg",
  },
} as const;

const fish = ["Szczupak", "Sandacz", "Lin", "Leszcz", "Płoć", "Węgorz"];

const lakeMoments = [
  {
    time: "06:30",
    label: "Pierwsze światło",
    title: "Poranek zaczyna się przy trzcinach.",
    text: "Zanim dzień nabierze tempa, tafla jest spokojniejsza, a brzeg pachnie wodą i lasem. To najlepsza pora na kawę, krótki spacer albo kilka cichych minut bez planu.",
    image: "/home-rhythm-morning.webp",
    alt: "Spokojny, zielony brzeg mazurskiego jeziora o poranku",
  },
  {
    time: "10:15",
    label: "Na wodzie",
    title: "Kajak wtedy, kiedy naprawdę masz ochotę.",
    text: "Bez dojazdu, szukania parkingu i pakowania całego dnia do samochodu. Wystarczy zejść nad brzeg, sprawdzić warunki i pozwolić, żeby zatoki wyznaczyły trasę.",
    image: "/home-rhythm-day.webp",
    alt: "Kajakarka płynąca wśród roślinności na spokojnym jeziorze",
  },
  {
    time: "19:40",
    label: "Złota godzina",
    title: "Wieczór zatrzymuje się na pomoście.",
    text: "Gdy światło robi się cieplejsze, jezioro zmienia kolor z zieleni w grafit i miedź. To moment na rozmowę, zdjęcia albo patrzenie, jak wiatr układa wodę.",
    image: "/home-signature-rhythm.webp",
    alt: "Wieczorny odpoczynek na pomoście nad mazurskim jeziorem",
  },
  {
    time: "21:30",
    label: "Po zachodzie",
    title: "Ognisko domyka dzień nad wodą.",
    text: "Po powrocie z brzegu nie kończy się mazurski rytm. Ciepło ognia, spokojny ogród i bliskość domu pozwalają zostać razem jeszcze trochę dłużej.",
    image: "/home-rhythm-evening-family.webp",
    alt: "Rodzinny wieczór przy ognisku po dniu spędzonym nad wodą",
  },
] as const;

const faqs = [
  {
    question: "Gdzie znajduje się Jezioro Krzywe?",
    answer:
      "Jezioro Krzywe leży na Pojezierzu Mrągowskim, w gminie Mrągowo i powiecie mrągowskim, przy miejscowości Krzywe. Od zachodu jego okolica graniczy z gminą Piecki.",
  },
  {
    question: "Jaką głębokość ma Jezioro Krzywe?",
    answer:
      "Maksymalna głębokość jeziora wynosi 22,5 m, a średnia około 5 m. Dno jest zróżnicowane, co jest typowe dla jezior rynnowych.",
  },
  {
    question: "Jakie ryby występują w Jeziorze Krzywe?",
    answer:
      "W opracowaniach dotyczących akwenu wymieniane są m.in. szczupak, sandacz, lin, leszcz, płoć i węgorz. Przed wędkowaniem trzeba kupić zezwolenie i sprawdzić aktualny regulamin gospodarza wody.",
  },
  {
    question: "Czy na Jeziorze Krzywe obowiązuje strefa ciszy?",
    answer:
      "Tak. Gospodarstwo Rybackie w Mrągowie oznacza Jezioro Krzywe jako akwen objęty strefą ciszy. To sprzyja wypoczynkowi, kajakom i spokojnemu korzystaniu z brzegu.",
  },
  {
    question: "Jak daleko domy Krzywe Lake Houses stoją od jeziora?",
    answer:
      "Oba domy znajdują się około 10 metrów od linii brzegowej i mają bezpośredni dostęp do Jeziora Krzywe.",
  },
  {
    question: "Co można robić nad Jeziorem Krzywe?",
    answer:
      "Spokojny charakter akwenu sprzyja kajakom, deskom SUP, odpoczynkowi nad brzegiem, obserwowaniu przyrody i wędkowaniu po wykupieniu aktualnego zezwolenia. Każdą aktywność trzeba dopasować do pogody i własnych umiejętności.",
  },
  {
    question: "Czy warto przyjechać nad jezioro poza latem?",
    answer:
      "Tak. Wiosna i jesień są spokojniejsze, pełne zmiennego światła i intensywnych kolorów, a zimą okolica wycisza się najmocniej. Domy są całoroczne, dlatego pobyt nie musi kończyć się wraz z wakacjami.",
  },
];

export const metadata: Metadata = {
  title: "Jezioro Krzywe koło Mrągowa — głębokość, ryby i wypoczynek",
  description:
    "Poznaj Jezioro Krzywe w powiecie mrągowskim: 155,5 ha powierzchni, 22,5 m głębokości, ryby, strefa ciszy i domy około 10 m od brzegu.",
  keywords: [
    "Jezioro Krzywe",
    "Jezioro Krzywe Mrągowo",
    "Jezioro Krzywe powiat mrągowski",
    "Jezioro Krzywe głębokość",
    "Jezioro Krzywe ryby",
    "Krzywe Mazury",
    "domy nad Jeziorem Krzywe",
    "domy nad jeziorem Mrągowo",
    "domy na wynajem Mrągowo",
    "domy na wynajem Mikołajki",
    "noclegi nad jeziorem Mazury",
    "domy nad samą wodą Mazury",
    "wakacje nad jeziorem Mazury",
  ],
  alternates: { canonical: "/jezioro-krzywe" },
  openGraph: {
    title: "Jezioro Krzywe — spokojne Mazury 10 metrów od domu",
    description:
      "Rynnowe jezioro w powiecie mrągowskim, strefa ciszy, urozmaicone brzegi i bezpośredni dostęp z Krzywe Lake Houses.",
    url: "/jezioro-krzywe",
    type: "website",
    locale: "pl_PL",
    images: [
      {
        url: images.strait.src,
        width: 2304,
        height: 1728,
        alt: "Przesmyk na Jeziorze Krzywe w powiecie mrągowskim",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jezioro Krzywe koło Mrągowa | Krzywe Lake Houses",
    description:
      "Głębokość, rybostan, strefa ciszy i wypoczynek nad Jeziorem Krzywe na Mazurach.",
    images: [images.strait.src],
  },
};

export default function LakePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Place", "BodyOfWater"],
        "@id": "https://www.krzywelakehouses.pl/jezioro-krzywe#lake",
        name: "Jezioro Krzywe na Pojezierzu Mrągowskim",
        description: metadata.description,
        image: Object.values(images).map((image) =>
          image.src.startsWith("http")
            ? image.src
            : `https://www.krzywelakehouses.pl${image.src}`,
        ),
        geo: {
          "@type": "GeoCoordinates",
          latitude: 53.7953,
          longitude: 21.2658,
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Krzywe",
          addressRegion: "warmińsko-mazurskie",
          addressCountry: "PL",
        },
        additionalProperty: [
          { "@type": "PropertyValue", name: "Powierzchnia", value: "155,5 ha" },
          { "@type": "PropertyValue", name: "Głębokość maksymalna", value: "22,5 m" },
          { "@type": "PropertyValue", name: "Głębokość średnia", value: "5 m" },
          { "@type": "PropertyValue", name: "Rodzaj jeziora", value: "rynnowe" },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Strona główna",
            item: "https://www.krzywelakehouses.pl/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Jezioro Krzywe",
            item: "https://www.krzywelakehouses.pl/jezioro-krzywe",
          },
        ],
      },
    ],
  };

  return (
    <main className="lake-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="lake-hero" aria-labelledby="lake-title">
        <SiteHeader activePath="/jezioro-krzywe" />
        <div className="lake-hero__grid">
          <div className="lake-hero__copy">
            <p className="eyebrow">Krzywe · powiat mrągowski</p>
            <h1 id="lake-title">
              <span className="hero-title__primary">Jezioro zaczyna się</span>
              <em>tuż za oknem.</em>
            </h1>
            <p className="lake-hero__lead">
              Tu pobyt nie ma „wyjścia nad jezioro” wpisanego w plan. Rynnowy
              akwen, zalesione zatoki i spokojny brzeg zaczynają się około
              10 metrów od domów — zawsze blisko, od pierwszego światła po wieczór.
            </p>
            <div className="lake-hero__actions">
              <a className="button button--primary" href="#poznaj-jezioro">
                Poznaj jezioro <ArrowDown />
              </a>
              <Link className="button button--quiet" href="/domy-i-galeria">
                Zobacz domy <ArrowUpRight />
              </Link>
            </div>
            <div className="lake-hero__stats property-facts" aria-label="Najważniejsze informacje o Jeziorze Krzywe">
              <div><strong>155,5 ha</strong><span>powierzchni jeziora</span></div>
              <div><strong>22,5 m</strong><span>głębokości maksymalnej</span></div>
              <div><strong>Strefa ciszy</strong><span>spokojniejszy rytm wody</span></div>
            </div>
          </div>

          <div className="lake-hero__visual">
            <figure className="lake-hero__main-photo">
              <img
                src={images.strait.src}
                alt="Przesmyk i zalesione brzegi Jeziora Krzywe na Pojezierzu Mrągowskim"
                fetchPriority="high"
              />
              <figcaption>
                <span>Jezioro Krzywe</span>
                Prawdziwy kadr znad akwenu
              </figcaption>
            </figure>
            <figure className="lake-hero__side-photo">
              <img
                src={images.bay.src}
                alt="Spokojna zatoka Jeziora Krzywe otoczona zielenią"
              />
              <figcaption>Zatoki, półwyspy, spokojne brzegi</figcaption>
            </figure>
            <div className="lake-hero__distance">
              <Waves />
              <span><strong>około 10 m</strong>od domów do brzegu</span>
            </div>
            <div className="lake-hero__place">
              <MapPin />
              <span><small>Pojezierze Mrągowskie</small>Krzywe · Mazury</span>
            </div>
          </div>
        </div>
        <a className="lake-hero__scroll hero-scroll-cue" href="#poznaj-jezioro">
          <span>Przewiń nad wodę</span><i aria-hidden="true"><ArrowDown /></i>
        </a>
      </section>

      <section className="lake-intro" id="poznaj-jezioro">
        <div className="section-shell lake-intro__grid">
          <div className="lake-intro__copy">
            <p className="eyebrow">Jezioro Krzywe na Mazurach</p>
            <h2>Nie jest dodatkiem do pobytu. Jest jego najbliższym planem.</h2>
            <p>
              Jezioro leży przy miejscowości Krzywe, w gminie Mrągowo i powiecie
              mrągowskim. Od zachodu okolica styka się z gminą Piecki. To spokojniejsza
              część Mazur — poza największymi portami, ale z wygodnym dojazdem do
              Mrągowa, Mikołajek, Piecek i Krutyni.
            </p>
            <p>
              Urozmaicona linia brzegowa tworzy zatoki i półwyspy, a trzy niewielkie
              wyspy wzmacniają kameralny charakter akwenu. Średnia głębokość wynosi
              około 5 metrów, lecz najgłębszy punkt sięga 22,5 metra.
            </p>
            <div className="lake-intro__links">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=53.802389%2C21.263815"
                target="_blank"
                rel="noreferrer"
              >
                <MapPin /> Prowadź nad jezioro
              </a>
              <a href="#dane-jeziora">Zobacz dane akwenu <ArrowDown /></a>
            </div>
          </div>
          <figure className="lake-intro__photo">
            <img
              src={images.pier.src}
              alt="Drewniany pomost po wschodniej stronie Jeziora Krzywe"
              loading="lazy"
            />
            <figcaption>
              <span>Wschodni brzeg</span>
              Pomost niedaleko jednej z wysp
            </figcaption>
          </figure>
          <div className="lake-intro__location">
            <span>53°47′43″ N</span>
            <span>21°15′57″ E</span>
            <small>Pojezierze Mrągowskie</small>
          </div>
        </div>
      </section>

      <section className="lake-data" id="dane-jeziora" aria-labelledby="lake-data-title">
        <div className="section-shell">
          <div className="lake-data__heading">
            <div>
              <p className="eyebrow">Akwen w liczbach</p>
              <h2 id="lake-data-title">Rynnowe. Głębokie miejscami. Pełne zatok.</h2>
            </div>
            <p>
              Zebraliśmy parametry, które naprawdę pomagają zrozumieć jezioro —
              bez przypadkowych danych dotyczących innych akwenów o tej samej nazwie.
            </p>
          </div>

          <div className="lake-data__layout">
            <div className="lake-data__contour" aria-label="Charakter Jeziora Krzywe">
              <div className="lake-data__contour-line" />
              <div>
                <Waves />
                <span>Pojezierze Mrągowskie</span>
                <strong>Jezioro Krzywe</strong>
                <small>miejscowość Krzywe · gmina Mrągowo</small>
              </div>
            </div>
            <div className="lake-data__facts">
              <article>
                <span><LakeIcon name="area" /></span>
                <strong>155,5 ha</strong>
                <p>powierzchni zwierciadła wody w dokumentacji środowiskowej</p>
              </article>
              <article>
                <span><LakeIcon name="depth" /></span>
                <strong>22,5 m</strong>
                <p>maksymalnej głębokości i około 5 m głębokości średniej</p>
              </article>
              <article>
                <span><LakeIcon name="shore" /></span>
                <strong>13,9 km</strong>
                <p>rozwiniętej linii brzegowej z zatokami i półwyspami</p>
              </article>
              <article>
                <span><LakeIcon name="islands" /></span>
                <strong>3 wyspy</strong>
                <p>niewielkie, zalesione akcenty w krajobrazie akwenu</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="lake-rhythm" aria-labelledby="lake-rhythm-title">
        <div className="section-shell">
          <div className="lake-rhythm__heading">
            <div>
              <p className="eyebrow">Od świtu do ogniska</p>
              <h2 id="lake-rhythm-title">Jeden dzień. Cztery zupełnie różne jeziora.</h2>
            </div>
            <p>
              Światło, wiatr i pora dnia zmieniają Jezioro Krzywe z godziny na
              godzinę. Bliskość brzegu pozwala zobaczyć każdą z tych odsłon bez
              organizowania osobnej wyprawy.
            </p>
          </div>
          <div className="lake-rhythm__grid">
            {lakeMoments.map((moment, index) => (
              <article key={moment.time}>
                <figure>
                  <img src={moment.image} alt={moment.alt} loading="lazy" />
                  <figcaption><span>{moment.time}</span>{moment.label}</figcaption>
                </figure>
                <div>
                  <span className="lake-rhythm__index">0{index + 1}</span>
                  <h3>{moment.title}</h3>
                  <p>{moment.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="lake-atmosphere" aria-labelledby="lake-atmosphere-title">
        <figure className="lake-atmosphere__media">
          <img
            src="/mazury-intro.webp"
            alt="Zachód słońca nad spokojnym mazurskim jeziorem widziany spomiędzy drzew"
            loading="lazy"
          />
        </figure>
        <div className="lake-atmosphere__veil" />
        <div className="section-shell lake-atmosphere__content">
          <div>
            <p className="eyebrow">Strefa ciszy</p>
            <h2 id="lake-atmosphere-title">Cisza, która nie jest pustką.</h2>
            <p>
              Słychać trzcinę, ptaki, kroki na pomoście i wodę uderzającą o brzeg.
              Brak ruchu motorowego nie odbiera jezioru energii — pozwala ją wreszcie zauważyć.
            </p>
          </div>
          <div className="lake-atmosphere__notes" aria-label="Charakter spokojnego jeziora">
            <span><strong>01</strong> naturalny rytm brzegu</span>
            <span><strong>02</strong> zatoki osłonięte zielenią</span>
            <span><strong>03</strong> wieczory bez mariny</span>
          </div>
        </div>
      </section>

      <section className="lake-fish" aria-labelledby="lake-fish-title">
        <div className="section-shell lake-fish__grid">
          <div className="lake-fish__copy">
            <p className="eyebrow">Rybostan Jeziora Krzywe</p>
            <h2 id="lake-fish-title">Co pływa pod powierzchnią?</h2>
            <p>
              W zestawieniach dotyczących Jeziora Krzywe wymieniane są gatunki
              typowe dla mazurskich jezior o zróżnicowanym dnie. Obecność ryb nie
              oznacza gwarancji połowu, ale dobrze pokazuje charakter akwenu.
            </p>
            <div className="lake-fish__species">
              {fish.map((name) => (
                <span key={name}><LakeIcon name="fish" />{name}</span>
              ))}
            </div>
          </div>
          <aside className="lake-fish__permit">
            <span className="lake-fish__permit-icon"><LakeIcon name="fish" /></span>
            <p>Wędkowanie</p>
            <h3>Brzeg i łódź — po sprawdzeniu zasad.</h3>
            <ul>
              <li><LakeIcon name="quiet" /><span>akwen objęty strefą ciszy</span></li>
              <li><LakeIcon name="shore" /><span>gospodarz wskazuje połów z brzegu i łodzi</span></li>
              <li><LakeIcon name="fish" /><span>wymagane aktualne zezwolenie wędkarskie</span></li>
            </ul>
            <a
              href="https://zezwolenia.gospryb.pl/"
              target="_blank"
              rel="noreferrer"
            >
              Kup zezwolenie <ArrowUpRight />
            </a>
            <small>Przed połowem sprawdź aktualny regulamin i okresy ochronne.</small>
          </aside>
        </div>
      </section>

      <section className="lake-seasons" aria-labelledby="lake-seasons-title">
        <div className="section-shell">
          <div className="lake-seasons__heading">
            <div>
              <p className="eyebrow">To samo jezioro · inny rytm</p>
              <h2 id="lake-seasons-title">Dwie piękne odsłony Mazur nad wodą.</h2>
            </div>
            <p>
              Latem niebo i tafla przejmują kolory zachodu. Zimą trzcinowiska,
              lód i niskie światło wyciszają krajobraz jeszcze mocniej. To prawdziwe
              kadry znad mazurskich jezior.
            </p>
          </div>
          <div className="lake-seasons__gallery">
            <figure>
              <img
                src={images.summer.src}
                alt="Letni zachód słońca odbijający się w spokojnym mazurskim jeziorze"
                loading="lazy"
              />
              <figcaption>
                <span>Lato</span>
                Niebo odbija się w spokojnej tafli
                <a href={images.summer.page} target="_blank" rel="noreferrer">Wszatanka · CC BY 3.0</a>
              </figcaption>
            </figure>
            <figure>
              <img
                src={images.winter.src}
                alt="Zimowy widok na zamarznięte Jezioro Zdróżno na Mazurach"
                loading="lazy"
              />
              <figcaption>
                <span>Zima</span>
                Najcichsza odsłona Mazur
                <a href={images.winter.page} target="_blank" rel="noreferrer">Mateusz Giełczyński · CC BY-SA 4.0</a>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="lake-proximity" aria-labelledby="lake-proximity-title">
        <div className="section-shell lake-proximity__grid">
          <figure>
            <img
              src="/modern-sypialnia-glowna.webp"
              alt="Panoramiczne okno domu Modern otwarte na zieleń i Jezioro Krzywe"
              loading="lazy"
            />
            <figcaption><span>Dom Modern</span> Woda pozostaje częścią wnętrza</figcaption>
          </figure>
          <div className="lake-proximity__copy">
            <p className="eyebrow">Około 10 metrów od brzegu</p>
            <h2 id="lake-proximity-title">Krótki dystans. Ogromna różnica w pobycie.</h2>
            <p>
              Bliskość jeziora nie jest tylko pięknym widokiem. Zmienia sposób,
              w jaki korzystacie z całego dnia — spontanicznie, bez presji i bez logistyki.
            </p>
            <div className="lake-proximity__benefits">
              <article>
                <span>01</span>
                <div><h3>Wracasz, kiedy chcesz</h3><p>Po ręcznik, książkę albo ciepłą bluzę — bez kończenia czasu nad wodą.</p></div>
              </article>
              <article>
                <span>02</span>
                <div><h3>Nie trzeba planować całego dnia</h3><p>Kwadrans na brzegu może być równie naturalny jak kilkugodzinna wyprawa kajakiem.</p></div>
              </article>
              <article>
                <span>03</span>
                <div><h3>Jezioro jest obecne przez cały rok</h3><p>Latem otwarte i zielone, jesienią miedziane, zimą minimalistyczne i spokojne.</p></div>
              </article>
            </div>
            <Link className="lake-proximity__link" href="/domy-i-galeria">
              Zobacz wnętrza nad wodą <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section className="lake-practical" aria-labelledby="lake-practical-title">
        <div className="section-shell">
          <div className="lake-practical__heading">
            <div>
              <p className="eyebrow">Dobrze wiedzieć przed wejściem nad wodę</p>
              <h2 id="lake-practical-title">Spokojnie nie znaczy bez uważności.</h2>
            </div>
            <p>
              Jezioro jest naturalnym akwenem. Pogoda, wiatr, temperatura wody
              i widoczność mogą zmieniać się szybciej niż plan dnia.
            </p>
          </div>
          <div className="lake-practical__grid">
            <article>
              <span><LakeIcon name="vest" /></span>
              <h3>Kamizelka na wodzie</h3>
              <p>Na kajaku i desce SUP korzystaj z dobrze dopasowanej asekuracji, także przy spokojnej tafli.</p>
            </article>
            <article>
              <span><LakeIcon name="weather" /></span>
              <h3>Pogoda ma pierwszeństwo</h3>
              <p>Przed wypłynięciem sprawdź wiatr i prognozę burz. W razie pogorszenia warunków wróć do brzegu.</p>
            </article>
            <article>
              <span><LakeIcon name="shore" /></span>
              <h3>Naturalne dno</h3>
              <p>Wchodź do wody ostrożnie, nie skacz w nieznanym miejscu i zawsze nadzoruj dzieci.</p>
            </article>
            <article>
              <span><LakeIcon name="bird" /></span>
              <h3>Zostaw ciszę po sobie</h3>
              <p>Nie wpływaj w szuwary, nie płosz ptaków i zabierz wszystko, co przyniosłeś nad wodę.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="lake-faq" aria-labelledby="lake-faq-title">
        <div className="section-shell lake-faq__grid">
          <div>
            <p className="eyebrow">Jezioro Krzywe · FAQ</p>
            <h2 id="lake-faq-title">Najważniejsze pytania przed pobytem.</h2>
            <p>
              Konkretne odpowiedzi o położeniu, głębokości, rybach, strefie
              ciszy i odległości domów od brzegu.
            </p>
          </div>
          <div className="lake-faq__list">
            {faqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}<span aria-hidden="true">+</span></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="lake-closing">
        <div className="section-shell lake-closing__card">
          <figure>
            <img
              src="/krzywe-hero.webp"
              alt="Dwa domy Krzywe Lake Houses około 10 metrów od Jeziora Krzywe"
              loading="lazy"
            />
            <figcaption><span>Krzywe Lake Houses</span> Około 10 metrów od linii brzegowej</figcaption>
          </figure>
          <div>
            <p className="eyebrow">Zostań nad wodą</p>
            <h2>Nie przyjeżdżaj nad jezioro. Zamieszkaj przy nim.</h2>
            <p>
              Dwa całoroczne domy dla maksymalnie 10 osób każdy. Panoramiczne
              przeszklenia, bezpośredni dostęp do Jeziora Krzywe, jacuzzi i
              miejsce na ognisko.
            </p>
            <div className="lake-closing__facts">
              <span><strong>2</strong> domy</span>
              <span><strong>10</strong> gości w każdym</span>
              <span><strong>10 m</strong> do jeziora</span>
            </div>
            <div className="lake-closing__actions">
              <a className="button button--primary" href={BOOKING_URL}>
                Sprawdź termin <ArrowUpRight />
              </a>
              <Link className="button lake-closing__secondary" href="/domy-i-galeria">
                Zobacz domy <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
