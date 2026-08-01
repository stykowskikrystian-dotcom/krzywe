"use client";

import { useEffect, useState } from "react";

const SESSION_KEY = "krzywe-lake-houses:first-entry:v4";
const EXIT_AFTER_MS = 8200;
const REMOVE_AFTER_MS = 9000;

type IntroState = "hidden" | "active" | "leaving";

export function FirstEntryExperience() {
  const [state, setState] = useState<IntroState>("hidden");

  useEffect(() => {
    const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";
    let visitAlreadyStarted = false;

    try {
      visitAlreadyStarted = Boolean(window.sessionStorage.getItem(SESSION_KEY));
      if (!visitAlreadyStarted) {
        window.sessionStorage.setItem(SESSION_KEY, "seen");
      }
    } catch {
      visitAlreadyStarted =
        document.documentElement.dataset.krzyweVisitStarted === "true";
      document.documentElement.dataset.krzyweVisitStarted = "true";
    }

    if (visitAlreadyStarted) return;

    // Landing on another route starts the visit without replaying the intro
    // when the guest later moves to the homepage.
    if (currentPath !== "/") return;

    document.documentElement.classList.add("entry-intro-lock");
    const activationFrame = window.requestAnimationFrame(() => {
      setState("active");
    });

    const exitTimer = window.setTimeout(() => {
      setState("leaving");
    }, EXIT_AFTER_MS);

    const removeTimer = window.setTimeout(() => {
      setState("hidden");
      document.documentElement.classList.remove("entry-intro-lock");
    }, REMOVE_AFTER_MS);

    return () => {
      window.cancelAnimationFrame(activationFrame);
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
      document.documentElement.classList.remove("entry-intro-lock");
    };
  }, []);

  if (state === "hidden") return null;

  return (
    <div
      className={`entry-intro${state === "leaving" ? " is-leaving" : ""}`}
      role="status"
      aria-label="Witamy w Krzywe Lake Houses"
    >
      <div className="entry-intro__image" aria-hidden="true" />
      <div className="entry-intro__wash" aria-hidden="true" />
      <div className="entry-intro__sunlight" aria-hidden="true" />
      <div className="entry-intro__grain" aria-hidden="true" />
      <div className="entry-intro__mist" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>

      <div className="entry-intro__topline" aria-hidden="true">
        <span>MAZURY · WODA I LAS</span>
        <span>JEZIORO KRZYWE</span>
      </div>

      <div className="entry-intro__frame">
        <i className="entry-intro__corner entry-intro__corner--tl" aria-hidden="true" />
        <i className="entry-intro__corner entry-intro__corner--tr" aria-hidden="true" />
        <i className="entry-intro__corner entry-intro__corner--bl" aria-hidden="true" />
        <i className="entry-intro__corner entry-intro__corner--br" aria-hidden="true" />

        <div className="entry-intro__brand">
          <div className="entry-intro__mark">
            <span className="entry-intro__orbit" aria-hidden="true" />
            <img src="/brand-mark.png" alt="" />
          </div>
          <p>
            <strong>KRZYWE</strong>
            <span>LAKE HOUSES · MAZURY</span>
          </p>
        </div>

        <div className="entry-intro__motto" aria-hidden="true">
          <span>Jak już uciekasz od świata,</span>
          <em>to tylko na Mazury.</em>
        </div>
      </div>

      <div className="entry-intro__facts" aria-hidden="true">
        <span><b>02</b> domy</span>
        <span><b>10 m</b> do jeziora</span>
        <span><b>20</b> gości</span>
      </div>

      <div className="entry-intro__progress" aria-hidden="true">
        <span>Woda · las · własny rytm</span>
        <i />
        <small>Krzywe Lake Houses</small>
      </div>

      <div className="entry-intro__ripples" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}
