import { cssVariablesToJson } from "@/my-ui/color_themes/helpers";
import { useState } from "react";

export function useColorJson(color_string_variables:string){
    const [color_json, setColors] = useState(cssVariablesToJson(color_string_variables));
    return {
        color_json,
        setColors
    }
}
