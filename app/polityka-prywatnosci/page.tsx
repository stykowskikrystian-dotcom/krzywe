import type { Metadata } from "next";
import { LegalPage } from "../components/LegalPage";

export const metadata: Metadata = {
  title: {
    absolute: "Polityka prywatności — Krzywe Lake Houses",
  },
  description:
    "Polityka prywatności Krzywe Lake Houses: zasady przetwarzania danych, system rezerwacji BedBooking, pliki cookies i prawa użytkownika.",
  alternates: { canonical: "/polityka-prywatnosci" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Prywatność i bezpieczeństwo"
      title="Polityka prywatności"
      lead="Prosto wyjaśniamy, jakie dane mogą pojawić się podczas kontaktu i rezerwacji, po co ich potrzebujemy oraz jakie prawa przysługują każdej osobie."
      summary="Stronę można przeglądać bez zakładania konta. Dane podajesz dopiero, gdy kontaktujesz się z nami lub rozpoczynasz rezerwację w BedBooking."
      relatedHref="/regulamin"
      relatedLabel="Przeczytaj regulamin"
      sources={[
        {
          label: "RODO — pełny tekst w EUR-Lex",
          href: "https://eur-lex.europa.eu/legal-content/PL/TXT/?uri=CELEX%3A32016R0679",
        },
        {
          label: "Polityka prywatności BedBooking",
          href: "https://bed-booking.com/privacy-policy/",
        },
        {
          label: "Polityka cookies BedBooking",
          href: "https://bed-booking.com/cookies-policy/",
        },
      ]}
      sections={[
        {
          id: "administrator",
          title: "Administrator i kontakt",
          content: (
            <>
              <p>
                Administratorem danych przekazywanych bezpośrednio w związku z pobytem
                jest <strong>Krzywe Lake Houses</strong>, Krzywe, powiat mrągowski,
                województwo warmińsko-mazurskie.
              </p>
              <p>
                W sprawach dotyczących prywatności można skontaktować się przez
                e-mail <a href="mailto:krzywelakehouses@gmail.com">krzywelakehouses@gmail.com</a>
                {" "}lub telefonicznie pod numerem <a href="tel:+48505586950">505 586 950</a>.
              </p>
            </>
          ),
        },
        {
          id: "zakres-danych",
          title: "Jakie dane przetwarzamy",
          content: (
            <>
              <p>W zależności od sposobu kontaktu lub rezerwacji mogą to być:</p>
              <ul>
                <li>imię i nazwisko, adres e-mail oraz numer telefonu,</li>
                <li>termin pobytu, liczba gości, wybrany dom i treść wiadomości,</li>
                <li>dane rozliczeniowe i informacje potrzebne do obsługi płatności,</li>
                <li>podstawowe dane techniczne niezbędne do bezpiecznego działania strony.</li>
              </ul>
              <p>
                Lista ulubionych atrakcji jest zapisywana wyłącznie lokalnie w pamięci
                przeglądarki. Nie tworzymy na jej podstawie profilu użytkownika.
              </p>
            </>
          ),
        },
        {
          id: "cele-podstawy",
          title: "Cele i podstawy przetwarzania",
          content: (
            <>
              <p>Dane wykorzystujemy, aby:</p>
              <ul>
                <li>
                  odpowiedzieć na pytanie, przygotować ofertę oraz zawrzeć i wykonać
                  umowę pobytu — art. 6 ust. 1 lit. b RODO,
                </li>
                <li>
                  zrealizować obowiązki podatkowe i rachunkowe — art. 6 ust. 1 lit. c RODO,
                </li>
                <li>
                  zapewnić bezpieczeństwo, obsługiwać korespondencję oraz ustalać
                  lub bronić roszczeń — art. 6 ust. 1 lit. f RODO,
                </li>
                <li>
                  realizować dodatkowe działania oparte na zgodzie, jeżeli taka zgoda
                  zostanie wyraźnie udzielona — art. 6 ust. 1 lit. a RODO.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "odbiorcy",
          title: "Odbiorcy danych",
          content: (
            <>
              <p>
                Dane mogą być powierzane wyłącznie podmiotom niezbędnym do obsługi
                strony i pobytu: dostawcy hostingu, poczty elektronicznej, usług
                księgowych, płatniczych i rezerwacyjnych oraz uprawnionym organom,
                gdy wymagają tego przepisy.
              </p>
              <p>
                Moduł rezerwacji obsługuje <strong>BedBooking</strong>. Informacje
                wprowadzane w jego formularzu są przekazywane do systemu rezerwacyjnego
                w zakresie koniecznym do sprawdzenia dostępności i realizacji rezerwacji.
              </p>
            </>
          ),
        },
        {
          id: "czas",
          title: "Jak długo przechowujemy dane",
          content: (
            <>
              <p>
                Korespondencję niezakończoną rezerwacją przechowujemy przez czas potrzebny
                do obsługi zapytania, co do zasady nie dłużej niż 12 miesięcy. Dane
                dotyczące pobytu przechowujemy przez okres realizacji umowy, wymagany
                okres podatkowy i rachunkowy oraz do czasu przedawnienia ewentualnych
                roszczeń.
              </p>
              <p>
                Dane przetwarzane na podstawie zgody przechowujemy do jej wycofania,
                chyba że inna podstawa prawna pozwala na dalsze, ograniczone przetwarzanie.
              </p>
            </>
          ),
        },
        {
          id: "prawa",
          title: "Twoje prawa",
          content: (
            <>
              <p>W granicach przewidzianych przez RODO przysługuje Ci prawo do:</p>
              <ul>
                <li>dostępu do danych i otrzymania ich kopii,</li>
                <li>sprostowania, usunięcia lub ograniczenia przetwarzania,</li>
                <li>przenoszenia danych oraz wniesienia sprzeciwu,</li>
                <li>wycofania zgody bez wpływu na wcześniejsze zgodne z prawem działania,</li>
                <li>złożenia skargi do Prezesa Urzędu Ochrony Danych Osobowych.</li>
              </ul>
              <p>
                Wniosek można wysłać na adres
                {" "}<a href="mailto:krzywelakehouses@gmail.com">krzywelakehouses@gmail.com</a>.
              </p>
            </>
          ),
        },
        {
          id: "cookies-bedbooking",
          title: "Cookies i moduł BedBooking",
          content: (
            <>
              <p>
                W obecnej wersji strony nie korzystamy z reklamowych ani analitycznych
                plików cookies. Niezbędne mechanizmy techniczne mogą być używane do
                prawidłowego i bezpiecznego wyświetlania serwisu.
              </p>
              <p>
                Moduł BedBooking jest uruchamiany w panelu dostępności. Według informacji
                dostawcy widget działa pasywnie i nie zapisuje niekoniecznych plików cookies
                przed interakcją użytkownika. Po przejściu do systemu rezerwacyjnego
                zastosowanie mają również polityki BedBooking dostępne poniżej.
              </p>
            </>
          ),
        },
        {
          id: "bezpieczenstwo",
          title: "Bezpieczeństwo i zmiany",
          content: (
            <>
              <p>
                Stosujemy rozwiązania organizacyjne i techniczne adekwatne do zakresu
                danych i ryzyka. Nie podejmujemy wobec gości decyzji wyłącznie
                automatycznie i nie prowadzimy profilowania marketingowego na tej stronie.
              </p>
              <p>
                Polityka może być aktualizowana po zmianie funkcji serwisu, dostawców
                lub przepisów. Aktualna data dokumentu jest zawsze widoczna w nagłówku.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
