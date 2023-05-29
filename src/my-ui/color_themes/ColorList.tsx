import { DialogWrapper } from "@/shadcn/DialogWrapper";
import { useEffect, useState } from "react";
import { copyToClipboard, colorArrayToString, cssVariablesToJson, getcolorObjANdColorString, CSSVariable, CSSVariableGroup, CSSVariableList } from "../color_editor/helpers";
import { useNotificationStore } from "@/state/zustand/store";
import { ColorResult } from "react-color";
import { hslObjectToStringtinyColor, hslStringToNewFormat } from "../color_editor/colors";
import { ColorEditble } from "../color_editor/ColorEdit";
import { ColorCard } from "./ColorCard";

interface ColorsListProps {}

export function ColorList({}: ColorsListProps) {
  const { updateNotification } = useNotificationStore();
  const [color_variables, setColovariables] = useState(() => {
    return localStorage.getItem("color_variables") || "";
  });

  const [color_json, setColors] = useState(cssVariablesToJson(color_variables));
  
  useEffect(() => {
    setColors(cssVariablesToJson(color_variables));
    if (color_variables && color_variables !== "") {
      localStorage.setItem("color_variables", color_variables);
    }
  }, [color_variables]);






  // function groupByVariableName(variables: CSSVariable[]): CSSVariableGroup {
  //   return variables.reduce((groups: CSSVariableGroup, [name, value]: CSSVariable) => {
  //     console.log(name);
  //     const groupName = name.replace(/-foreground$/, '');
  //     if (!groups[groupName]) {
  //       groups[groupName] = [];
  //     }
  //     groups[groupName].push([name, value]);
  //     return groups;
  //   }, {});
  // }
  


  function groupByVariableName(variables: CSSVariableList): CSSVariableGroup {
    return variables.reduce((groups: CSSVariableGroup, [name, value]: CSSVariable) => {
    const group_by = name.split("--")[1].split("-");
      const groupName = group_by[0];
        if (!groups[groupName]) {
          groups[groupName] = [];
        }
        groups[groupName].push([name, value]);
    return groups;
    }, {});
  }

  const colors_arr = Object.entries(color_json) as unknown as  CSSVariableList
  const grouped_variables = Object.entries(groupByVariableName(colors_arr))

  // console.log("grouped variables  === ",grouped_variables)
  return (
    <div className="flex h-full flex-col w-full items-center justify-start">
      <div className="flex gap-3">
        
        <DialogWrapper
          trigger={
            <button className="rounded-lg bg-secondary px-5 py-2 text-accent-foreground hover:bg-accent">
              enter variables
            </button>
          }>
          <textarea
            className="h-auto min-h-[500px] bg-secondary w-full  rounded-lg shadow-md  p-5 outline-none"
            value={color_variables}
            onChange={(e) => setColovariables(e.target.value)}
          />
        </DialogWrapper>

        <button
          onClick={() => {
            copyToClipboard(colorArrayToString(colors_arr), updateNotification);
          }}
          className="rounded-lg bg-secondary px-5 py-2 text-accent-foreground hover:bg-accent">
          save and copy to clipboard
        </button>
      </div>



      <div className="flex w-full flex-wrap items-center justify-center gap-2 p-2">
        {colors_arr.map(([key, value]) => {
          const { color_obj, color_string } = getcolorObjANdColorString(value)
            
 
        return (

            <ColorCard
            color_obj={color_obj}
            color_string={color_string}
            color_key={key}
            key={key}
            colors_arr={colors_arr}
            setColors={setColors}

            
            />
          );
        })}




      </div>




    </div>
  );
}
