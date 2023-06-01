
import { useEffect } from "react";
import { Moon, Sun } from "lucide-react"
import { useColorThemeStore } from "@/state/zustand/color_theme";

export function useZustandTheme() {
    const { mode,updateMode } = useColorThemeStore()
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        // setTheme(mediaQuery.matches ? 'dark' : 'light');

        const handleChange = (ev: MediaQueryListEvent) => {
            updateMode(ev.matches ? "dark" : "light");
        };
        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);



    useEffect(() => {
        const colorTheme = mode === "dark" ? "light" : "dark";
        const root = window.document.documentElement;
        root.classList.remove(colorTheme);
        if (mode) {
            root.classList.add(mode);
            localStorage.setItem("theme", mode);
        }
    }, [mode]);

    const nextTheme = mode === "dark" ? "light" : "dark";
    const ThemeIcon = mode === "dark" ? Sun : Moon;
    const toggleTheme = () => {
        console.log("next theme", nextTheme)
        updateMode(nextTheme);
    };

    return { mode, toggleTheme, ThemeIcon };
}
