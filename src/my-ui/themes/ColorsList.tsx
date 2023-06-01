
import { ColorEditble } from "./ColorEdit";
import { hslStringToNewFormat } from "../../utils/helpers/colors";
import { CSSVariableList, cssVariablesToJson, groupByVariableName } from "../../utils/helpers/helpers";
import { getcolorObjANdColorString, colorArrayToString } from "../../utils/helpers/helpers";
import { useColorThemeStore } from "@/state/zustand/color_theme";
import { useEffect, useState } from "react";

interface ColoListProps {}

export function ColorsList({}: ColoListProps) {

  const{color_variables_obj,mode,updateColorVariables}=useColorThemeStore()  
  const [color_json, setColors] = useState(cssVariablesToJson(color_variables_obj[mode]))
    
  useEffect(() => {
        // setColors(color_variables_obj)
        setColors(cssVariablesToJson(color_variables_obj[mode]))

    }, [mode])
  
  
  const colors_arr = Object.entries(color_json) as unknown as CSSVariableList;
  const grouped_variables = Object.entries(groupByVariableName(colors_arr));
  

  return (
    <div className="flex h-full md:w-[40%] w-[95%] items-center justify-center">
      <div className=" flex h-[80vh] w-full flex-wrap items-center justify-center gap-2 overflow-y-scroll p-5">
        {grouped_variables.map(([key, value]) => {
          const is_pair = value.length === 2;
          return (
            <div
              key={key}
              className="flex w-[90%]  flex-col gap-1 rounded-lg p-1 shadow shadow-accent-foreground  ">
              <div className="font-bold">{key}</div>
              <div className="flex w-full flex-col gap-1 rounded md:flex-row">
                {value.map(([key, value]) => {
                  function variableprimaryorForeground(group_key: string) {
                    const is_fore = group_key?.split("--")[1]?.split("-");
                    if (is_pair && is_fore.length === 1) {
                      return "primary";
                    }
                    if (is_pair && is_fore.length === 2) {
                      return "foreground";
                    }
                    return "solo";
                  }

                  const { color_obj, color_string } = getcolorObjANdColorString(value);
                  return (
                    <div
                    key={key}
                      style={{ borderColor: color_string }}
                      className="flex w-full  items-center justify-between gap-3 rounded-lg bg-slate-900 text-slate-50">
                      <div className="w-fit px-2 text-xs">{key}</div>

                      <ColorEditble
                        color_key={key}
                        color_json={color_json}
                        setColors={setColors}
                        group_type={variableprimaryorForeground(key)}
                        value={color_string}
                        bg_color={color_string}
                        init_color={color_obj}
                        saveColor={() =>
                        //   localStorage.setItem("color_variables", colorArrayToString(colors_arr))
                        updateColorVariables(colorArrayToString(colors_arr),mode)
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
