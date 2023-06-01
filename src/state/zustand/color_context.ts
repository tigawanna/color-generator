import { BearContext } from '@/my-ui/about/about_context';
import { createContext, useContext } from 'react';
import { createStore, useStore } from 'zustand'

interface ColorJsonProps {
    color_json: { [key: string]: string };
 
}

interface ColorJsonState extends ColorJsonProps {
    updateColorJson: (key: string, value: string) => void ;
    updateAllColorJson: (color_json:{ [key: string]: string }) => void;
}

type ColorJsonStore = ReturnType<typeof colorJsonStore>

export const colorJsonStore = (initProps?: Partial<ColorJsonProps>) => {
    const DEFAULT_PROPS: ColorJsonProps = {
      color_json:{}
    }
    return createStore<ColorJsonState>()((set) => ({
        ...DEFAULT_PROPS,
        ...initProps,
        updateColorJson: (key: string, value: string) => set((state) => ({
            color_json: {
                ...state.color_json,
                [key]: value
            }
        })),
        updateAllColorJson: (color_json:{ [key: string]: string }) => set((state) => ({
            ...state,
            ...color_json
        }))

    }))
}


export const ColorJsonContext = createContext<ColorJsonStore | null>(null)


export function useColorJsonContext<T>(
    selector: (state: ColorJsonState) => T,equalityFn?: (left: T, right: T) => boolean
): T {
    const store = useContext(ColorJsonContext)
    if (!store) throw new Error('Missing BearContext.Provider in the tree')
    return useStore(store, selector, equalityFn)
}
