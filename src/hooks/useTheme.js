import { useEffect, useState } from "react";

export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      return saved === "dark";
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);

    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch (e) {}
  }, [isDark]);

  return { isDark, setIsDark };
}