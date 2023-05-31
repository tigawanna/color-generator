import { hslStringToNewFormat } from "@/my-ui/color_themes/colors";
import {
  CSSVariableList,
  cssVariablesToJson,
  getcolorObjANdColorString,
} from "@/my-ui/color_themes/helpers";
import { useEffect, useState } from "react";

export function useLoadCSSvars() {
  const [color_variables, setColovariables] = useState(() => {
    return localStorage.getItem("color_variables") || "";
  });
  const [color_json, setColors] = useState(cssVariablesToJson(color_variables));
  useEffect(() => {
    const colors_arr = Object.entries(color_json) as unknown as CSSVariableList;
    colors_arr.map(([key, value]) => {
      const { color_string } = getcolorObjANdColorString(value);
      const parsed_hsl = hslStringToNewFormat(color_string);
      if (typeof key === "string") {
        document.documentElement.style.setProperty(key, parsed_hsl);
      }
    });
  }, []);
}
