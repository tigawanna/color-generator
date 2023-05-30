import { useColorStore } from "@/state/zustand/color_store";
import { useEffect } from "react";
import { Moon, Sun } from "lucide-react"

export function useZustandTheme(){
    const { theme,updateTheme }=useColorStore()


    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        // setTheme(mediaQuery.matches ? 'dark' : 'light');

        const handleChange = (ev: MediaQueryListEvent) => {
            updateTheme(ev.matches ? "dark" : "light");
        };
        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);



    useEffect(() => {
        const colorTheme = theme === "dark" ? "light" : "dark";
        const root = window.document.documentElement;
        root.classList.remove(colorTheme);
        if (theme) {
            root.classList.add(theme);
            localStorage.setItem("theme", theme);
        }
    }, [theme]);

    const nextTheme = theme === "dark" ? "light" : "dark";
    const ThemeIcon = theme === "dark" ? Sun : Moon;
    const toggleTheme = () => {
        updateTheme(nextTheme);
    };

return { theme, toggleTheme, ThemeIcon };
}
