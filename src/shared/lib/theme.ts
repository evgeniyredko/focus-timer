import { useEffect } from "react";
import { useAppSelector } from "../../app/store/hooks";

export const useApplyTheme = () => {
  const theme = useAppSelector((s) => s.settings.theme);

  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (resolved: "light" | "dark") => {
      if (resolved === "dark") root.classList.add("dark");
      else root.classList.remove("dark");
    };

    if (theme === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      applyTheme(media.matches ? "dark" : "light");

      const listener = (e: MediaQueryListEvent) => {
        applyTheme(e.matches ? "dark" : "light");
      };

      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }

    applyTheme(theme);
  }, [theme]);
};