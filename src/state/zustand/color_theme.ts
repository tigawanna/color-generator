import { default_variables } from '@/my-ui/color_themes/helpers';
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface  ColorThemeState {
    mode: 'light' | 'dark';
    updateMode: (mode: 'light' | 'dark') => void;
    colorVariables:string;
    updateColorVariables: (colorVariables:string) => void;
}

export const useColorThemeStore = create<ColorThemeState>()(
    devtools(
        persist((set,get) => ({
            mode:get().mode ?? 'light',
            updateMode: (mode) => set({ mode }),
            colorVariables:get().colorVariables ??default_variables,
            updateColorVariables: (colorVariables) => set({ colorVariables }),
        }),
        { name: 'color-theme-store' }
        )
    )
)
