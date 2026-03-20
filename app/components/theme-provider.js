"use client";

import { useEffect } from "react";

const THEME_KEY = "godomain-theme";

export default function ThemeProvider({ children }) {
  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const nextTheme = stored || (prefersDark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", nextTheme);
  }, []);

  return children;
}
