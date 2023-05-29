import { DialogWrapper } from "@/shadcn/DialogWrapper";
import { useEffect, useState } from "react";
import { ColorCard } from "./ColorCard";
import { useNotificationStore } from "@/state/zustand/store";
import { cssVariablesToJson, CSSVariableList, CSSVariableGroup, CSSVariable, copyToClipboard, colorArrayToString, getcolorObjANdColorString, default_variables } from "./helpers";

interface ColorsListProps {}

export function ColorList({}: ColorsListProps) {
  const { updateNotification } = useNotificationStore();
  const [color_variables, setColovariables] = useState(() => {
    return localStorage.getItem("color_variables") || default_variables;
  });

  const [color_json, setColors] = useState(cssVariablesToJson(color_variables));

  useEffect(() => {
    setColors(cssVariablesToJson(color_variables));
    if (color_variables && color_variables !== "") {
      localStorage.setItem("color_variables", color_variables);
    }
  }, [color_variables]);


  function groupByVariableName(variables: CSSVariableList): CSSVariableGroup {
    return variables.reduce((groups: CSSVariableGroup, [name, value]: CSSVariable) => {
      const group_by = name?.split("--")[1]?.split("-");
      const groupName = (group_by && group_by.length>0)?group_by[0]:""
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push([name, value]);
      return groups;
    }, {});
  }

  const colors_arr = Object.entries(color_json) as unknown as CSSVariableList;
  const grouped_variables = Object.entries(groupByVariableName(colors_arr));


  return (
    <div className="flex h-full w-full flex-col items-center justify-start">
      <div className="flex gap-3">
        <DialogWrapper
          trigger={
            <button className="rounded-lg bg-secondary px-5 py-2 text-accent-foreground hover:bg-accent hover:brightness-125">
              enter variables
            </button>
          }>
          <textarea
            className="h-auto min-h-[500px] w-full rounded-lg  bg-secondary p-5  shadow-md outline-none"
            value={color_variables}
            onChange={(e) => setColovariables(e.target.value)}
          />
        </DialogWrapper>

        <button
          onClick={() => {
            copyToClipboard(colorArrayToString(colors_arr), updateNotification);
          }}
          className="rounded-lg bg-secondary px-5 py-2 text-accent-foreground hover:brightness-125">
          save and copy to clipboard
        </button>
      </div>

      <div className="flex w-full flex-wrap items-center justify-center md:gap-5 md:p-5 gap-1">
        {
        grouped_variables.map(([key, value]) => {
          const is_pair = value.length===2
          return (
            <div 
            key={key}
            className="w-full md:w-[40%] lg:w-[30%] shadow-md shadow-accent-foreground rounded-lg flex flex-col gap-1 p-2 ">
              <div className="text-lg font-bold">{key}</div>
              <div className="w-full border flex flex-col md:flex-row gap-1 rounded">
              {value.map(([key, value]) => {

              
              function variableprimaryorForeground(group_key:string){
                const is_fore = group_key?.split("--")[1]?.split("-")
                if(is_pair&&is_fore.length===1){
                  return "primary"
                }
                if(is_pair&&is_fore.length===2){
                  return "foreground"
                }
                return "solo"
               }
              
                const { color_obj, color_string } = getcolorObjANdColorString(value);
                return (
                  <ColorCard
                    group_type={variableprimaryorForeground(key)}
                    color_obj={color_obj}
                    color_string={color_string}
                    color_key={key}
                    color_json={color_json}
                    key={key}
                    colors_arr={colors_arr}
                    setColors={setColors}
                    />
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
