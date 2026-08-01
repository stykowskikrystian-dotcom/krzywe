"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Mail } from "../components/Icons";

const EMAIL = "krzywelakehouses@gmail.com";

export function ContactForm() {
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setStatus("");

    const form = new FormData(event.currentTarget);
    const arrival = String(form.get("arrival") || "");
    const departure = String(form.get("departure") || "");
    const privacyAccepted = form.get("privacy") === "accepted";
    const termsAccepted = form.get("terms") === "accepted";

    if (!privacyAccepted || !termsAccepted) {
      setError(
        "Aby przygotować wiadomość, zaakceptuj Politykę prywatności i Regulamin.",
      );
      return;
    }

    if (arrival && departure && departure <= arrival) {
      setError("Data wyjazdu musi być późniejsza niż data przyjazdu.");
      return;
    }

    const name = String(form.get("name") || "");
    const replyEmail = String(form.get("email") || "");
    const phone = String(form.get("phone") || "");
    const house = String(form.get("house") || "");
    const guests = String(form.get("guests") || "");
    const subject = String(form.get("subject") || "");
    const message = String(form.get("message") || "");

    const emailSubject = `Zapytanie o pobyt — ${arrival || "termin do ustalenia"}`;
    const body = [
      "Dzień dobry,",
      "",
      message,
      "",
      "Szczegóły zapytania:",
      `Imię i nazwisko: ${name}`,
      `E-mail zwrotny: ${replyEmail}`,
      `Telefon: ${phone || "nie podano"}`,
      `Temat: ${subject}`,
      `Dom: ${house}`,
      `Przyjazd: ${arrival || "do ustalenia"}`,
      `Wyjazd: ${departure || "do ustalenia"}`,
      `Liczba gości: ${guests || "do ustalenia"}`,
      "",
      "Pozdrawiam",
      name,
    ].join("\n");

    setStatus("Gotowe — otwieramy wiadomość w Twoim programie pocztowym.");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit}
      onChange={() => {
        if (error) setError("");
      }}
    >
      <div className="contact-form__heading">
        <span><Mail /></span>
        <div>
          <small>Formularz kontaktowy</small>
          <strong>Przygotuj zapytanie o pobyt</strong>
        </div>
      </div>

      <div className="contact-form__grid">
        <label>
          <span>Imię i nazwisko *</span>
          <input name="name" type="text" autoComplete="name" required placeholder="Jan Kowalski" />
        </label>
        <label>
          <span>Adres e-mail *</span>
          <input name="email" type="email" autoComplete="email" required placeholder="jan@email.pl" />
        </label>
        <label>
          <span>Telefon</span>
          <input name="phone" type="tel" autoComplete="tel" placeholder="+48 000 000 000" />
        </label>
        <label>
          <span>Temat *</span>
          <select name="subject" required defaultValue="Rezerwacja pobytu">
            <option>Rezerwacja pobytu</option>
            <option>Pytanie o domy</option>
            <option>Pobyt grupowy</option>
            <option>Faktura</option>
            <option>Inna sprawa</option>
          </select>
        </label>
        <label>
          <span>Wybierz dom *</span>
          <select name="house" required defaultValue="">
            <option value="" disabled>Wybierz wariant</option>
            <option>Modern</option>
            <option>Loft</option>
            <option>Oba domy</option>
            <option>Proszę o pomoc w wyborze</option>
          </select>
        </label>
        <label>
          <span>Liczba gości</span>
          <input name="guests" type="number" inputMode="numeric" min="1" max="20" placeholder="np. 8" />
        </label>
        <label className="contact-form__date-field">
          <span>Przyjazd</span>
          <input name="arrival" type="date" />
        </label>
        <label className="contact-form__date-field">
          <span>Wyjazd</span>
          <input name="departure" type="date" />
        </label>
        <label className="contact-form__message">
          <span>Wiadomość *</span>
          <textarea
            name="message"
            required
            rows={6}
            placeholder="Napisz, czego potrzebujesz. Im więcej konkretów, tym szybciej przygotujemy pełną odpowiedź."
          />
        </label>
      </div>

      <fieldset
        className={`contact-form__legal${error.includes("zaakceptuj") ? " has-error" : ""}`}
        aria-describedby={error.includes("zaakceptuj") ? "contact-form-legal-error" : undefined}
      >
        <legend>Zgody wymagane do wysłania zapytania</legend>
        <label className="contact-form__consent">
          <input name="privacy" type="checkbox" value="accepted" />
          <span>
            Akceptuję{" "}
            <a href="/polityka-prywatnosci" target="_blank" rel="noreferrer">
              Politykę prywatności
            </a>{" "}
            i wyrażam zgodę na wykorzystanie danych wyłącznie do obsługi
            mojego zapytania.
          </span>
        </label>
        <label className="contact-form__consent">
          <input name="terms" type="checkbox" value="accepted" />
          <span>
            Zapoznałem/am się z{" "}
            <a href="/regulamin" target="_blank" rel="noreferrer">
              Regulaminem
            </a>{" "}
            i akceptuję jego postanowienia.
          </span>
        </label>
      </fieldset>

      {error ? (
        <p
          className="contact-form__notice is-error"
          id={error.includes("zaakceptuj") ? "contact-form-legal-error" : undefined}
          role="alert"
        >
          {error}
        </p>
      ) : null}
      {status ? <p className="contact-form__notice" role="status">{status}</p> : null}

      <button className="contact-form__submit" type="submit">
        <span>Przygotuj wiadomość</span>
        <ArrowUpRight />
      </button>
      <p className="contact-form__privacy">
        Po kliknięciu otworzymy gotową wiadomość w Twoim programie pocztowym.
        Niczego nie zapisujemy w przeglądarce.
      </p>
    </form>
  );
}
