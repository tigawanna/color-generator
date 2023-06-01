import { cssVariablesToJson, default_variables } from '@/my-ui/color_themes/helpers';
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { devtools } from '@pavlobu/zustand/middleware'


interface  ColorThemeState {
    mode: 'light' | 'dark';
    updateMode: (mode: 'light' | 'dark') => void;
    color_variables_obj:{
        light: string;
        dark: string;
    }
    updateColorVariables: (new_variable:string,mode: 'light' | 'dark') => void;
    color_json: { [key: string]: string };
    updateColorJson: (key: string, value: string) => void;
}

export const useColorThemeStore = create<ColorThemeState>()(
    devtools(
        persist(

            (set,get) => {
       
            // console.log("default_color_variables",default_color_variables)
            // start of state object
           return {
            mode: get()?.mode ?? 'light',
            updateMode: (mode) => set({ mode }),
            color_variables_obj:getInitColorVariables(get),
            updateColorVariables:(new_var,mode)=>set((state)=>({
                color_variables_obj:{
                    ...state.color_variables_obj,
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
            
           }
            // end of state object
    },
        { name: 'color-theme-store' }
        )
    )
)

// mountStoreDevtool('Store', useColorThemeStore);

function getColorJson(){
    const color_json = cssVariablesToJson(default_variables)
    console.log("get color varaible == ",color_json)
    return color_json
}

function getInitColorVariables(get:() => ColorThemeState){
const mode = get()?.mode ?? 'light'
const saved_variables = get()?.color_variables_obj
return saved_variables??{"dark":default_variables,"light":default_variables}
}
