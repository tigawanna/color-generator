import { default_variables } from "@/my-ui/color_themes/helpers";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ColorsState {
    theme: "light" | "dark";
    color_variables:{
     light:string,
     dark:string
    }
    setColorVariables: (value: string, theme: "light" | "dark") => void;
    updateTheme: (theme: "light" | "dark") => void;
    getColorVariables: (theme: "light" | "dark") => string
}

export const useColorStore = create<ColorsState>()(
    devtools(
        persist((set,get) => ({
            theme: "light",
            color_variables:{
                dark:default_variables,
                light:default_variables
            },
            setColorVariables: (value, theme) => set(
                {color_variables:{...get().color_variables, [theme]:value}}
            ),
            updateTheme: (theme) => set({ theme }),
            getColorVariables:(theme) => get().color_variables[theme]

        }),{
            name: "shad_color_variables"
        })
    )
)
