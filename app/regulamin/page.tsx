import type { Metadata } from "next";
import { LegalPage } from "../components/LegalPage";

export const metadata: Metadata = {
  title: {
    absolute: "Regulamin pobytu i rezerwacji — Krzywe Lake Houses",
  },
  description:
    "Regulamin pobytu i rezerwacji Krzywe Lake Houses: rezerwacja, płatności, przyjazd, zasady korzystania z domów i zgłaszanie uwag.",
  alternates: { canonical: "/regulamin" },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Rezerwacja i pobyt"
      title="Regulamin"
      lead="Najważniejsze zasady rezerwacji i spokojnego pobytu w domach Modern i Loft nad Jeziorem Krzywe."
      summary="Zameldowanie od 16:00, wymeldowanie do 11:00. Każdy dom mieści do 10 osób. Obiekt jest bez zwierząt i wolny od dymu."
      relatedHref="/polityka-prywatnosci"
      relatedLabel="Polityka prywatności"
      sources={[
        {
          label: "Prawa konsumenta przy wynajmie noclegu",
          href: "https://konsument.gov.pl/wynajem-noclegu-prawa-konsumenta/",
        },
        {
          label: "Informacje o systemie rezerwacji BedBooking",
          href: "https://support.bed-booking.com/hc/en-us/articles/360020183319-BedBooking-Reservation-system-general-information",
        },
        {
          label: "Polityka prywatności BedBooking",
          href: "https://bed-booking.com/privacy-policy/",
        },
      ]}
      sections={[
        {
          id: "postanowienia",
          title: "Postanowienia ogólne",
          content: (
            <>
              <p>
                Regulamin określa zasady rezerwacji i korzystania z dwóch całorocznych
                domów wypoczynkowych <strong>Modern</strong> i <strong>Loft</strong>,
                działających pod marką Krzywe Lake Houses w miejscowości Krzywe,
                w powiecie mrągowskim.
              </p>
              <p>
                Dokonanie rezerwacji oznacza akceptację regulaminu oraz warunków
                cenowych, płatności i anulowania pokazanych przed potwierdzeniem
                konkretnej rezerwacji.
              </p>
            </>
          ),
        },
        {
          id: "obiekt",
          title: "Domy i zakres pobytu",
          content: (
            <>
              <p>
                Każdy dom ma około 130 m², cztery niezależne sypialnie, trzy łazienki
                i jest przeznaczony dla maksymalnie 10 zgłoszonych gości. Domy leżą
                około 10 metrów od linii brzegowej i mają bezpośredni dostęp do jeziora.
              </p>
              <p>
                W cenie i wyposażeniu uwzględnione są elementy wskazane w ofercie
                wybranego terminu, w szczególności pościel, ręczniki, wyposażona
                kuchnia, Wi‑Fi, parking oraz dostęp do przestrzeni wspólnej.
              </p>
            </>
          ),
        },
        {
          id: "rezerwacja",
          title: "Rezerwacja i potwierdzenie",
          content: (
            <>
              <p>
                Dostępność można sprawdzić w module BedBooking umieszczonym na stronie
                lub bezpośrednio w zewnętrznym systemie rezerwacji. Rezerwacja staje
                się wiążąca po wykonaniu kroków wskazanych w formularzu i otrzymaniu
                potwierdzenia na podany adres e-mail.
              </p>
              <ul>
                <li>gość podaje dane prawdziwe i kompletne,</li>
                <li>liczba osób nie może przekraczać limitu wybranego domu,</li>
                <li>osoba dokonująca rezerwacji odpowiada za przekazanie zasad pozostałym gościom,</li>
                <li>zmiana terminu lub liczby osób wymaga potwierdzenia przez obiekt.</li>
              </ul>
            </>
          ),
        },
        {
          id: "cena-platnosc",
          title: "Cena, płatność i anulowanie",
          content: (
            <>
              <p>
                Cena, wymagany sposób i termin płatności oraz zasady anulowania są
                prezentowane dla wybranego terminu przed potwierdzeniem rezerwacji
                i stanowią część umowy. W razie rozbieżności decydują warunki zapisane
                w potwierdzeniu konkretnej rezerwacji.
              </p>
              <p>
                Usługa zakwaterowania przewidziana na oznaczony dzień lub okres nie jest
                objęta zwykłym 14-dniowym prawem odstąpienia od umowy zawartej online.
                Możliwość bezkosztowej rezygnacji zależy dlatego od warunków wybranej oferty.
              </p>
            </>
          ),
        },
        {
          id: "przyjazd",
          title: "Zameldowanie i wymeldowanie",
          content: (
            <>
              <ul>
                <li><strong>Zameldowanie:</strong> od godziny 16:00 w dniu przyjazdu.</li>
                <li><strong>Wymeldowanie:</strong> do godziny 11:00 w dniu wyjazdu.</li>
                <li>Wcześniejszy przyjazd lub późniejszy wyjazd wymaga wcześniejszego potwierdzenia.</li>
                <li>Dom jest przekazywany osobie pełnoletniej odpowiedzialnej za rezerwację.</li>
              </ul>
              <p>
                Szczegóły odbioru dostępu do domu i wskazówki dojazdu przekazujemy
                przed rozpoczęciem pobytu.
              </p>
            </>
          ),
        },
        {
          id: "zasady-domu",
          title: "Zasady korzystania z domów",
          content: (
            <>
              <ul>
                <li>Na terenie obiektu nie przyjmujemy zwierząt.</li>
                <li>Wnętrza obu domów są objęte całkowitym zakazem palenia.</li>
                <li>Goście dbają o wyposażenie, porządek i szacunek dla sąsiedztwa oraz przyrody.</li>
                <li>Nie wolno przekraczać zgłoszonej i potwierdzonej liczby gości.</li>
                <li>Imprezy lub wydarzenia wymagają uprzedniego, wyraźnego uzgodnienia z obiektem.</li>
              </ul>
              <p>
                Rażące naruszenie zasad bezpieczeństwa lub porządku może skutkować
                zakończeniem pobytu bez zwrotu za niewykorzystany okres, z zachowaniem
                praw przysługujących konsumentowi.
              </p>
            </>
          ),
        },
        {
          id: "woda-i-udogodnienia",
          title: "Jezioro, jacuzzi i teren zewnętrzny",
          content: (
            <>
              <p>
                Bezpośredni dostęp do jeziora, jacuzzi, miejsce na ognisko, taras i ogród
                są częścią wypoczynku nad wodą. Należy korzystać z nich zgodnie
                z przeznaczeniem, przekazanymi instrukcjami, pogodą oraz podstawowymi
                zasadami bezpieczeństwa.
              </p>
              <p>
                Dzieci pozostają pod stałą opieką dorosłych, szczególnie przy brzegu,
                pomoście, ogniu i wodzie. Zabronione jest używanie wyposażenia w sposób
                mogący zagrozić ludziom, przyrodzie lub mieniu.
              </p>
            </>
          ),
        },
        {
          id: "odpowiedzialnosc",
          title: "Odpowiedzialność i szkody",
          content: (
            <>
              <p>
                Krzywe Lake Houses odpowiada za zgodne z umową przygotowanie obiektu
                i usunięcie zgłoszonych nieprawidłowości w możliwie krótkim czasie.
                Gość powinien zgłosić zauważoną usterkę bez zbędnej zwłoki, aby ograniczyć
                jej skutki.
              </p>
              <p>
                Goście odpowiadają na zasadach ogólnych za szkody spowodowane przez siebie
                lub osoby objęte ich rezerwacją. Przed wyjazdem należy pozostawić dom
                w stanie umożliwiającym standardowe przygotowanie dla kolejnych gości.
              </p>
            </>
          ),
        },
        {
          id: "reklamacje",
          title: "Uwagi i reklamacje",
          content: (
            <>
              <p>
                Uwagi dotyczące pobytu najlepiej zgłaszać od razu telefonicznie pod numer
                {" "}<a href="tel:+48505586950">505 586 950</a>, aby możliwe było szybkie
                rozwiązanie problemu. Reklamację można również przesłać na adres
                {" "}<a href="mailto:krzywelakehouses@gmail.com">krzywelakehouses@gmail.com</a>.
              </p>
              <p>
                Zgłoszenie powinno zawierać dane rezerwacji, opis sytuacji i oczekiwany
                sposób rozwiązania. Odpowiedzi udzielimy bez zbędnej zwłoki, nie później
                niż w terminie wymaganym przez obowiązujące przepisy.
              </p>
            </>
          ),
        },
        {
          id: "dane-zmiany",
          title: "Dane osobowe i zmiany regulaminu",
          content: (
            <>
              <p>
                Dane związane z rezerwacją przetwarzamy zgodnie z
                {" "}<a href="/polityka-prywatnosci">Polityką prywatności</a>.
                Zasady działania zewnętrznego modułu opisuje również dokumentacja BedBooking.
              </p>
              <p>
                Aktualny regulamin jest publikowany na stronie. Zmiany nie naruszają praw
                nabytych w ramach wcześniej potwierdzonych rezerwacji, chyba że wynikają
                z bezwzględnie obowiązujących przepisów lub zostały indywidualnie uzgodnione.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
