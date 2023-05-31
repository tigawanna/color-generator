import { create } from 'zustand'

interface ColorJsonState {

    color_json:{[key:string]:string};
    updateColorJson: (key:string,value:string) => void
}

export const useColorJsonStore = create<ColorJsonState>()((set) => ({
    color_json:{},
    updateColorJson: (key:string,value:string) => set((state) => ({
        color_json:{
            ...state.color_json,
            [key]:value
        }
    }))
    // increase: (by) => set((state) => ({ bears: state.bears + by })),
}))
