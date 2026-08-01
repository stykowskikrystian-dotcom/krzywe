import { HomeIcon } from "./HomeIcon";
import { BedBookingWidget } from "./BedBookingWidget";

type DirectBookingPanelProps = {
  headingId?: string;
  targetId: string;
  variant?: "default" | "home";
};

export function DirectBookingPanel({
  headingId,
  targetId,
  variant = "default",
}: DirectBookingPanelProps) {
  return (
    <div
      className={`direct-booking-panel${
        variant === "home" ? " direct-booking-panel--home" : ""
      }`}
    >
      <div className="direct-booking-panel__copy">
        <p className="direct-booking-panel__eyebrow">
          <HomeIcon name="calendar" />
          Rezerwacja bezpośrednia
        </p>

        <h2 id={headingId}>
          Wybierz termin.
          <em>Resztę układamy razem.</em>
        </h2>

        <p className="direct-booking-panel__description">
          Sprawdź aktualną dostępność domów Modern i Loft. Po wybraniu dat
          BedBooking przeprowadzi Cię bezpiecznie przez dalszą część rezerwacji.
        </p>

        <div className="direct-booking-panel__benefits" aria-label="Najważniejsze informacje">
          <span>
            <HomeIcon name="shield" />
            Bez pośredników
          </span>
          <span>
            <HomeIcon name="house" />
            Modern lub Loft
          </span>
          <span>
            <HomeIcon name="lake" />
            10 m od jeziora
          </span>
        </div>
      </div>

      <div className="direct-booking-panel__calendar">
        <div className="direct-booking-panel__calendar-head">
          <div>
            <span>Aktualna dostępność</span>
            <strong>Znajdź pobyt nad Jeziorem Krzywe</strong>
          </div>
          <span className="direct-booking-panel__live">
            <i aria-hidden="true" />
            online
          </span>
        </div>

        <div className="direct-booking-panel__widget">
          <BedBookingWidget targetId={targetId} />
        </div>

        <div className="direct-booking-panel__calendar-foot">
          <span>Zameldowanie od 16:00</span>
          <span>Wymeldowanie do 11:00</span>
        </div>
      </div>
    </div>
  );
}
