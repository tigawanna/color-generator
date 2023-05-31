import { cssVariablesToJson, default_variables } from '@/my-ui/color_themes/helpers';
import { create } from 'zustand'

interface ColorJsonState {
    color_json:{[key:string]:string};
    updateColorJson: (key:string,value:string) => void;
    setColorJson: (color_json: {
        [key: string]: string;
    }) => void
}

export const useColorJsonStore = create<ColorJsonState>()((set) => ({
    color_json:{},
    setColorJson: (color_json: { [key: string]: string }) => set((state) => ({
        ...state,
        ...color_json
    })),
    updateColorJson: (key:string,value:string) => set((state) => ({
        color_json:{
            ...state.color_json,
            [key]:value
        }
    }))
    // increase: (by) => set((state) => ({ bears: state.bears + by })),
}))


function getColorJson(cvr: string) {
    const color_json = cssVariablesToJson(default_variables)
    // console.log("get color varaible == ", color_json)
    return color_json
}
