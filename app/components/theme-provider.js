"use client";

import { useEffect } from "react";
import { resolveTheme, THEME_EVENT, THEME_KEY } from "./theme-state";

export default function ThemeProvider({ children }) {
  useEffect(() => {
    const root = document.documentElement;
    const themeMedia = window.matchMedia?.("(prefers-color-scheme: dark)");

    function syncTheme() {
      root.setAttribute("data-theme", resolveTheme());
    }

    function handleStorage(event) {
      if (event.key && event.key !== THEME_KEY) {
        return;
      }

      syncTheme();
    }

    function handleSystemThemeChange() {
      if (window.localStorage.getItem(THEME_KEY)) {
        return;
      }

      syncTheme();
    }

    function handleThemeEvent(event) {
      root.setAttribute("data-theme", event.detail || resolveTheme());
    }

    syncTheme();

    const readyFrame = window.requestAnimationFrame(() => {
      root.setAttribute("data-theme-ready", "true");
    });

    window.addEventListener("storage", handleStorage);
    window.addEventListener(THEME_EVENT, handleThemeEvent);
    themeMedia?.addEventListener("change", handleSystemThemeChange);

    return () => {
      window.cancelAnimationFrame(readyFrame);
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(THEME_EVENT, handleThemeEvent);
      themeMedia?.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  return children;
}
