
import { hslStringToNewFormat } from "@/my-ui/color_themes/colors";
import { CSSVariableList, cssVariablesToJson, default_variables, getcolorObjANdColorString } from "@/my-ui/color_themes/helpers";
import { useEffect, useState } from "react";

export function useLoadCSSvars(theme:"dark"|"light"){

    const [color_variables, setColovariables] = useState(() => {
        if(theme==="dark"){
            return localStorage.getItem("dark_color_variables") || default_variables;
        }
        return localStorage.getItem("color_variables") || default_variables;
    });
    const [color_json, setColors] = useState(cssVariablesToJson(color_variables));
    useEffect(() => {
    const colors_arr = Object.entries(color_json) as unknown as CSSVariableList
        colors_arr.map(([key, value]) => {
            const {  color_string } = getcolorObjANdColorString(value)
            const parsed_hsl = hslStringToNewFormat(color_string);
            if (typeof key === "string") {
                document.documentElement.style.setProperty(key, parsed_hsl);
            }
        })
    },[theme])



}
