import { cssVariablesToJson, default_variables } from '@/my-ui/color_themes/helpers';
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { mountStoreDevtool } from 'simple-zustand-devtools';

interface  ColorThemeState {
    mode: 'light' | 'dark';
    updateMode: (mode: 'light' | 'dark') => void;
    color_variables:{
        light: string;
        dark: string;
    }
    updateColorVariables: (new_variable:string,mode: 'light' | 'dark') => void;
    color_json: { [key: string]: string };
    updateColorJson: (key: string, value: string) => void;
}

export const useColorThemeStore = create<ColorThemeState>()(
    devtools(
        persist((set,get) => ({
            mode:get()?.mode ?? 'light',
            updateMode: (mode) => set({ mode }),
            color_variables:get()?.color_variables ??default_variables,
            updateColorVariables:(new_var,mode)=>set((state)=>({
                color_variables:{
                    ...state.color_variables,
                    [mode]:new_var
                }
            })),

            color_json:{},

            updateColorJson: (key: string, value: string) => set((state) => ({
                color_json: {
                    ...state.color_json,
                    [key]: value
                }
            }))

        }),
        { name: 'color-theme-store' }
        )
    )
)

mountStoreDevtool('Store', useColorThemeStore);

function getColorJson(){
    const color_json = cssVariablesToJson(default_variables)
    console.log("get color varaible == ",color_json)
    return color_json
}
