import { useColorThemeStore } from "@/state/zustand/color_theme";
import { useEffect, useState } from "react";
import { hslStringToNewFormat } from "./colors";
import { cssVariablesToJson, CSSVariableList, getcolorObjANdColorString } from "./helpers";

export function useLoadCSSvars() {
  // const [color_variables, setColovariables] = useState(() => {
  //   return localStorage.getItem("color_variables") || "";
  // });
  const{color_variables_obj,mode}=useColorThemeStore()
  const [color_json, setColors] = useState(cssVariablesToJson(color_variables_obj[mode]));


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
