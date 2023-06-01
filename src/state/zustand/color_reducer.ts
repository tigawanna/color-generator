import { useReducer } from "react";
import { useColorThemeStore } from "./color_theme";
import { cssVariablesToJson, default_variables } from "@/my-ui/color_themes/helpers";

interface ColorJsonState {
    color_json: { [key: string]: string };
}



type ColorJsonAction =
    | { type: "SET_COLOR_JSON"; payload: { [key: string]: string } }
    | { type: "UPDATE_COLOR_JSON"; payload: { key: string; value: string } };


function reducer(state: ColorJsonState, action: ColorJsonAction) {
    switch (action.type) {
        case "SET_COLOR_JSON":
            return { ...state, color_json: action.payload };
        case "UPDATE_COLOR_JSON":
            return {
                ...state,
                color_json: {
                    ...state.color_json,
                    [action.payload.key]: action.payload.value,
                },
            };
        default:
            return state;
    }
}

export function useColorJsonReducer() {
    const{color_variables_obj,mode}=useColorThemeStore()
    const color_json = cssVariablesToJson(color_variables_obj[mode]??default_variables)
    const initialState: ColorJsonState = {
        color_json
    };

    return useReducer(reducer,initialState);
}
