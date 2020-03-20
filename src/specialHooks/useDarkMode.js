import { useLocalStorage } from "./useLocalStorage";
import { useEffect } from "react";

export function useDarkMode() {
  const [darkMode, setDarkMode] = useLocalStorage("dark", false);

  useEffect(() => {
    const classBody = document.querySelector("body");

    if (darkMode === true) {
      classBody.classList.add("dark-mode");
    } else {
      classBody.classList.remove("dark-mode");
    }
  }, [darkMode, useLocalStorage]);

  return [darkMode, setDarkMode];
}
