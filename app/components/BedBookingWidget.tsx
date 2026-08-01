"use client";

import { useEffect, useState } from "react";

const SCRIPT_ID = "w1";
const SCRIPT_URL = "https://bed-booking.com/widget/widget.js";
const WIDGET_ID = "fdcbe00b103f474c172bcf0455bca64a2ef0705b";

type BedBookingFunction = ((...args: unknown[]) => void) & {
  q?: unknown[][];
};

declare global {
  interface Window {
    "BB-Widget"?: string;
    w1?: BedBookingFunction;
  }
}

export function BedBookingWidget({ targetId }: { targetId: string }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let initializationFrame = 0;
    let stylingFrame = 0;
    let stylingAttempts = 0;
    let restoreScrollFrame = 0;
    let returnScrollFrame = 0;
    let returnScrollTimer = 0;
    let styledHost: HTMLElement | null = null;
    let bodyStyleObserver: MutationObserver | null = null;
    let pickerStateObserver: MutationObserver | null = null;
    let pickerScrollY = 0;
    let pickerWasOpen = false;
    let saveRequested = false;
    let lastWidgetInteraction = 0;
    let bodyScrollLock:
      | {
          overflow: string;
          position: string;
          top: string;
          width: string;
        }
      | undefined;

    const setPickerPageState = (open: boolean) => {
      const root = document.documentElement;

      if (open) {
        root.classList.add("bed-booking-picker-open");
        root.dataset.bedBookingPickerOwner = targetId;
        return;
      }

      if (root.dataset.bedBookingPickerOwner === targetId) {
        root.classList.remove("bed-booking-picker-open");
        delete root.dataset.bedBookingPickerOwner;
      }
    };

    const isPickerOpen = () => {
      const shadowRoot = styledHost?.shadowRoot;
      const picker = shadowRoot?.querySelector<HTMLElement>(
        '.MuiDialog-root, .MuiDrawer-root, [role="dialog"], [aria-modal="true"]',
      );

      if (!picker || picker.getAttribute("aria-hidden") === "true") return false;

      const pickerStyle = window.getComputedStyle(picker);
      return (
        pickerStyle.display !== "none" &&
        pickerStyle.visibility !== "hidden" &&
        Number(pickerStyle.opacity || "1") > 0
      );
    };

    const scrollToBookingCalendar = () => {
      const localWidget = document.getElementById(targetId);
      const calendar =
        localWidget?.closest<HTMLElement>(".direct-booking-panel__calendar") ??
        document.querySelector<HTMLElement>(".direct-booking-panel__calendar");

      if (!calendar) {
        window.scrollTo({ top: pickerScrollY, behavior: "smooth" });
        return;
      }

      const headerOffset = window.matchMedia("(max-width: 900px)").matches
        ? 96
        : 112;
      const calendarTop =
        calendar.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({
        top: Math.max(0, calendarTop),
        behavior: "smooth",
      });
    };

    const returnToBookingCalendar = () => {
      window.clearTimeout(returnScrollTimer);
      window.cancelAnimationFrame(returnScrollFrame);

      returnScrollTimer = window.setTimeout(() => {
        restoreBodyScroll();
        returnScrollFrame = window.requestAnimationFrame(() => {
          returnScrollFrame = window.requestAnimationFrame(
            scrollToBookingCalendar,
          );
        });
      }, 120);
    };

    const syncPickerPageState = () => {
      const pickerOpen = isPickerOpen();

      setPickerPageState(pickerOpen);

      if (pickerWasOpen && !pickerOpen && saveRequested) {
        saveRequested = false;
        returnToBookingCalendar();
      }

      pickerWasOpen = pickerOpen;
    };

    const restoreBodyScroll = () => {
      if (!bodyScrollLock) return;

      const scrollY = pickerScrollY;
      const previousStyles = bodyScrollLock;
      bodyScrollLock = undefined;

      document.body.style.overflow = previousStyles.overflow;
      document.body.style.position = previousStyles.position;
      document.body.style.top = previousStyles.top;
      document.body.style.width = previousStyles.width;
      delete document.body.dataset.bedBookingScrollOwner;

      restoreScrollFrame = window.requestAnimationFrame(() => {
        window.scrollTo(0, scrollY);
      });
    };

    const preserveMobileScroll = () => {
      if (!window.matchMedia("(max-width: 900px)").matches) return;
      if (performance.now() - lastWidgetInteraction > 1200) return;

      const body = document.body;
      if (
        body.style.position === "fixed" &&
        !body.style.top &&
        !body.dataset.bedBookingScrollOwner
      ) {
        bodyScrollLock = {
          overflow: body.style.overflow,
          position: "",
          top: "",
          width: body.style.width,
        };
        body.dataset.bedBookingScrollOwner = targetId;
        body.style.overflow = "hidden";
        body.style.top = `-${pickerScrollY}px`;
        body.style.width = "100%";
        return;
      }

      if (
        bodyScrollLock &&
        body.dataset.bedBookingScrollOwner === targetId &&
        body.style.position !== "fixed"
      ) {
        restoreBodyScroll();
      }
    };

    const rememberWidgetPosition = () => {
      if (document.body.dataset.bedBookingScrollOwner) return;
      if (document.documentElement.classList.contains("bed-booking-picker-open")) {
        return;
      }

      pickerScrollY = window.scrollY;
      lastWidgetInteraction = performance.now();
    };

    const handleWidgetClick = (event: MouseEvent) => {
      const action = event
        .composedPath()
        .find(
          (node): node is HTMLElement =>
            node instanceof HTMLElement &&
            (node.tagName === "BUTTON" ||
              node.getAttribute("role") === "button"),
        );
      const actionLabel = action?.textContent
        ?.replace(/\s+/g, " ")
        .trim()
        .toLocaleLowerCase("pl");

      if (actionLabel !== "zapisz") return;

      saveRequested = true;
      window.clearTimeout(returnScrollTimer);
      returnScrollTimer = window.setTimeout(syncPickerPageState, 220);
    };

    const markReady = () => {
      if (!cancelled) setReady(true);
    };

    const applyBrandCorners = () => {
      if (cancelled) return;

      const host = document
        .getElementById(targetId)
        ?.querySelector<HTMLElement>("bb-widget");
      const shadowRoot = host?.shadowRoot;

      if (shadowRoot) {
        if (!shadowRoot.querySelector("[data-krzywe-widget-style]")) {
          const style = document.createElement("style");
          style.dataset.krzyweWidgetStyle = "true";
          style.textContent = `
            :host {
              display: block !important;
              width: 100% !important;
              min-width: 0 !important;
              overflow: visible !important;
              border-radius: 20px !important;
              background: transparent !important;
            }

            [class*="WidgetContainer-"] {
              width: 100% !important;
              min-width: 0 !important;
              box-sizing: border-box !important;
            }

            [class*="WidgetContainer-"] > div:first-child {
              width: 100% !important;
              max-width: 100% !important;
              min-width: 0 !important;
              height: auto !important;
              min-height: 0 !important;
              margin: 0 !important;
              padding: 0 24px 30px !important;
              box-sizing: border-box !important;
              overflow: visible !important;
              border-radius: 18px !important;
              box-shadow: 0 12px 30px rgba(28, 48, 36, 0.1) !important;
            }

            .MuiDialog-root,
            .MuiDrawer-root {
              z-index: 10050 !important;
            }

            .MuiBackdrop-root {
              background: rgba(18, 31, 23, 0.08) !important;
              backdrop-filter: blur(14px) saturate(118%) !important;
              -webkit-backdrop-filter: blur(14px) saturate(118%) !important;
            }

            .MuiDialog-container {
              background: transparent !important;
            }

            .MuiDialog-paper {
              width: min(920px, calc(100vw - 48px)) !important;
              max-width: 920px !important;
              max-height: calc(100dvh - 48px) !important;
              margin: 24px !important;
              overflow: hidden !important;
              border: 1px solid rgba(255, 255, 255, 0.68) !important;
              border-radius: 24px !important;
              background: rgba(250, 250, 247, 0.82) !important;
              box-shadow: 0 32px 90px rgba(17, 31, 22, 0.28) !important;
              backdrop-filter: blur(28px) saturate(116%) !important;
              -webkit-backdrop-filter: blur(28px) saturate(116%) !important;
            }

            [class*="DatePickerWrapper__DateRangePickerWrapper"] {
              max-width: 100% !important;
              box-sizing: border-box !important;
              overflow-x: hidden !important;
              border-radius: 22px !important;
              background: rgba(250, 250, 247, 0.78) !important;
              backdrop-filter: blur(24px) saturate(112%) !important;
              -webkit-backdrop-filter: blur(24px) saturate(112%) !important;
            }

            .DayPicker,
            .DayPicker__horizontal,
            .DayPicker_transitionContainer {
              max-width: 100% !important;
              box-sizing: border-box !important;
            }

            @media (max-width: 768px) {
              [class*="WidgetContainer-"] > div:first-child {
                width: 100% !important;
                max-width: 100% !important;
                margin: 0 !important;
                padding: 9px 8px !important;
                border-radius: 14px !important;
              }

              [class*="WidgetContainer-"] > div:first-child
                > div[style*="align-items"][style*="justify-content"]
                > div:first-child {
                min-width: 0 !important;
                max-width: 340px !important;
              }

              [class*="WidgetContainer-"] > div:first-child
                > div[style*="align-items"][style*="justify-content"]
                > div:first-child > div:first-child,
              [class*="WidgetContainer-"] > div:first-child
                > div[style*="align-items"][style*="justify-content"]
                > div:first-child > div:last-child {
                min-width: 0 !important;
              }

              [class*="WidgetContainer-"] > div:first-child
                > div[style*="align-items"][style*="justify-content"]
                > div:first-child > div:first-child {
                padding-left: 8px !important;
              }

              [class*="WidgetContainer-"] > div:first-child
                > div[style*="align-items"][style*="justify-content"]
                > div:first-child > div:last-child {
                padding-left: 18px !important;
              }

              [class*="WidgetContainer-"] > div:first-child
                > div[style*="align-items"][style*="justify-content"]
                > div:first-child > div:first-child > div:last-child,
              [class*="WidgetContainer-"] > div:first-child
                > div[style*="align-items"][style*="justify-content"]
                > div:first-child > div:last-child > div:last-child {
                min-width: 0 !important;
                margin-left: 6px !important;
                overflow: visible !important;
              }

              [class*="WidgetContainer-"] > div:first-child
                > div[style*="align-items"][style*="justify-content"]
                > div:first-child > div:first-child > div:last-child span,
              [class*="WidgetContainer-"] > div:first-child
                > div[style*="align-items"][style*="justify-content"]
                > div:first-child > div:last-child > div:last-child span {
                white-space: nowrap !important;
              }

              [class*="WidgetContainer-"] > div:first-child
                > div[style*="align-items"][style*="justify-content"]
                > div:first-child > div:nth-child(2) {
                left: 50% !important;
              }
            }

            @media (max-width: 900px) {
              .MuiDrawer-paperAnchorBottom {
                width: 100% !important;
                max-height: calc(100dvh - 8px) !important;
                overflow: hidden !important;
                border: 1px solid rgba(255, 255, 255, 0.72) !important;
                border-bottom: 0 !important;
                border-radius: 24px 24px 0 0 !important;
                background: rgba(250, 250, 247, 0.96) !important;
                box-shadow: 0 -22px 70px rgba(17, 31, 22, 0.24) !important;
              }

              [class*="DatePickerWrapper__DateRangePickerWrapper"] {
                width: 100% !important;
                max-width: 100% !important;
                height: calc(100dvh - 8px) !important;
                padding-top: 18px !important;
                overflow-x: hidden !important;
                overflow-y: auto !important;
                overscroll-behavior: contain !important;
                border-radius: 24px 24px 0 0 !important;
              }

              .DayPicker,
              .DayPicker__verticalScrollable {
                width: 100% !important;
                min-width: 0 !important;
                overflow-x: hidden !important;
              }

              .DayPicker_weekHeader,
              .DayPicker_weekHeader__verticalScrollable {
                display: none !important;
              }

              .DayPicker_transitionContainer__verticalScrollable {
                padding-top: 0 !important;
              }
            }
          `;
          shadowRoot.appendChild(style);
        }

        if (styledHost !== host) {
          styledHost?.removeEventListener(
            "pointerdown",
            rememberWidgetPosition,
            true,
          );
          styledHost?.removeEventListener("click", handleWidgetClick, true);
          styledHost = host;
          styledHost.addEventListener(
            "pointerdown",
            rememberWidgetPosition,
            true,
          );
          styledHost.addEventListener("click", handleWidgetClick, true);

          pickerStateObserver?.disconnect();
          pickerStateObserver = new MutationObserver(syncPickerPageState);
          pickerStateObserver.observe(shadowRoot, {
            attributes: true,
            attributeFilter: ["aria-hidden", "class", "style"],
            childList: true,
            subtree: true,
          });
          syncPickerPageState();
        }

        if (!bodyStyleObserver) {
          bodyStyleObserver = new MutationObserver(preserveMobileScroll);
          bodyStyleObserver.observe(document.body, {
            attributes: true,
            attributeFilter: ["style"],
          });
        }

        return;
      }

      stylingAttempts += 1;
      if (stylingAttempts < 180) {
        stylingFrame = window.requestAnimationFrame(applyBrandCorners);
      }
    };

    if (!window.w1) {
      window["BB-Widget"] = SCRIPT_ID;

      const queue: BedBookingFunction = (...args: unknown[]) => {
        queue.q = queue.q || [];
        queue.q.push(args);
      };

      window.w1 = queue;
    }

    initializationFrame = window.requestAnimationFrame(() => {
      try {
        window.w1?.("init", {
          targetElementId: targetId,
          widgetId: WIDGET_ID,
          type: "simple",
          staticWidget: 1,
        });
      } catch {
        // The external widget must never be able to block the navigation UI.
      }
    });
    stylingFrame = window.requestAnimationFrame(applyBrandCorners);

    const existingScript = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

    if (existingScript) {
      if (existingScript.dataset.loaded === "true") {
        markReady();
      } else {
        existingScript.addEventListener("load", markReady, { once: true });
      }

      return () => {
        cancelled = true;
        window.cancelAnimationFrame(initializationFrame);
        window.cancelAnimationFrame(stylingFrame);
        window.cancelAnimationFrame(restoreScrollFrame);
        window.cancelAnimationFrame(returnScrollFrame);
        window.clearTimeout(returnScrollTimer);
        styledHost?.removeEventListener(
          "pointerdown",
          rememberWidgetPosition,
          true,
        );
        styledHost?.removeEventListener("click", handleWidgetClick, true);
        bodyStyleObserver?.disconnect();
        pickerStateObserver?.disconnect();
        setPickerPageState(false);
        restoreBodyScroll();
        existingScript.removeEventListener("load", markReady);
      };
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_URL;
    script.async = true;
    script.addEventListener(
      "load",
      () => {
        script.dataset.loaded = "true";
        markReady();
      },
      { once: true },
    );
    document.head.appendChild(script);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(initializationFrame);
      window.cancelAnimationFrame(stylingFrame);
      window.cancelAnimationFrame(restoreScrollFrame);
      window.cancelAnimationFrame(returnScrollFrame);
      window.clearTimeout(returnScrollTimer);
      styledHost?.removeEventListener(
        "pointerdown",
        rememberWidgetPosition,
        true,
      );
      styledHost?.removeEventListener("click", handleWidgetClick, true);
      bodyStyleObserver?.disconnect();
      pickerStateObserver?.disconnect();
      setPickerPageState(false);
      restoreBodyScroll();
    };
  }, [targetId]);

  return (
    <div className={`bed-booking-widget${ready ? " is-ready" : ""}`}>
      <div className="bed-booking-widget__loading" aria-hidden={ready}>
        <span />
        <p>Ładujemy aktualne terminy…</p>
      </div>
      <div id={targetId} className="bed-booking-widget__holder" />
    </div>
  );
}
